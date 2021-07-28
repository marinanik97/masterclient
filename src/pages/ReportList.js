import React, { useState } from "react";
import "./style/CreateReport.css";
import MaterialTable from "material-table";
import toast from "../utils/toast";
import { useQuery, useMutation } from "@apollo/client";
import { getReports } from "../graphql/queries";
import { DeleteReport, EditReportItem } from "../graphql/mutation";

export default function ReportList() {
  const [izvestaji, setIzvestajiGraph] = useState([]);
  const [
    deleteReport,
  ] = useMutation(DeleteReport, {
    refetchQueries: [{ query: getReports }],

    onCompleted: () => {
      toast.success("Izvestaj je obrisan");
    },
  });
  const [
    editReportItem,
  ] = useMutation(EditReportItem);
  const { loading: loadingQue } = useQuery(getReports, {
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

  if (izvestaji.length !== 0) {
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
            return new Promise((resolve) => {
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
                deleteReport(
                  {
                    variables: { id },
                  }
                );
                resolve();
               const izvestaj = id;
               const status = "brisanje";
               editReportItem({
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
