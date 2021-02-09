import React, { useEffect, useState } from "react";
import "./style/CreateReport.css";
import MaterialTable from "material-table";
import { refromatDate } from "../utils/utlis.js";
import toast from "../utils/toast";
import { useQuery, client, useMutation } from "@apollo/client";
import { getListuIzvestaja } from "../graphql/queries";
import { DeleteIzvestaj, EditStavka } from "../graphql/mutation";

export default function ReportList() {
  const [getIzvestaji, setIzvestaji] = useState([]);
  const [izvestaji, setIzvestajiGraph] = useState([]);
  const [dataRender, setDataForRender] = useState([]);
  const [izvestajiGetData, seti] = useState([]);
  const [
    deleteIzvestaj,
    { loading: loadingIzv, error: errorIzv },
  ] = useMutation(DeleteIzvestaj, {
    refetchQueries: [{ query: getListuIzvestaja }],

    onCompleted: ({ deleteIzvestaj }) => {
      toast.success("Izvestaj je obrisan");
    },
  });
  const [
    editStavka,
    { loading: loadingStavka, error: errorStavka },
  ] = useMutation(EditStavka);
  const { loading: loadingQue, error, data } = useQuery(getListuIzvestaja, {
    onCompleted: setIzvestajiGraph,
    notifyOnNetworkStatusChange: true,

    fetchPolicy: "cache-and-network",
  });
  if (loadingQue) return "Loading izvestaji...";

  // useEffect(() =>{
  //     if(data){
  //       setIzvestajiGraph(data);
  //     }
  // },[data])

  if (izvestaji.length != 0) {
    console.log(izvestaji);
    var editableData = izvestaji.getIzvestajs.map((o) => ({ ...o }));
    let i;
    for (i = 0; i < editableData.length; i++) {
      let d = editableData[i].datumstampanja.slice(0,10);
      editableData[i].datumstampanja = d;
      console.log(d);
    }
    return (
      <MaterialTable
        title={"Izveštaji"}
        columns={[
          // {
          //   title: "ID",
          //   field: "id",
          // },
          // {
          //     title: 'Pacijent',
          //     render: (rowData) => {
          //         if(rowData.kartonIme && rowData.kartonPrezime){
          //             return <span>{`${rowData.kartonIme} ${rowData.kartonPrezime}`}</span>
          //         }
          //     }
          // },
          {
            title: "Doktor",
            render: (rowData) => {
              if (rowData.doktor.ime && rowData.doktor.prezime) {
                return (
                  <span>{`${rowData.doktor.ime} ${rowData.doktor.prezime}`}</span>
                );
              }
            },
          },
          {
            title: "Specijalnost doktora",
            field: "doktor.specijalnost",
          },
          {
            title: "Datum stampanja",
            field: "datumstampanja",
          },
          {
            field: "napomena",
            title: "Napomena",
          },
          {
            title: "Pacijent",
            render: (rowData) => {
              if (rowData.karton.ime && rowData.karton.prezime) {
                return (
                  <span>{`${rowData.karton.ime} ${rowData.karton.prezime}`}</span>
                );
              }
            },
          },
        ]}
        editable={{
          onRowDelete: (oldData) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                // deleteIzvestaj({
                //   variables: { input: { id } },
                // })
                const id = oldData.id;
                console.log(id);
                // editableData = deleteIzvestaj(
                //   {
                //     variables: { id },
                //   }
                deleteIzvestaj(
                  {
                    variables: { id },
                  }
                );
                resolve();
               const izvestaj = id;
               const status = "brisanje";
               editStavka({
                variables: { input: { izvestaj, status} },
              })
              }, 1000);
            });
          },
        }}
        data={editableData}
      />
    );
  } else {
    return null;
  }
}
