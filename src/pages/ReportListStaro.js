import React, { useEffect, useState } from "react";
import "./style/CreateReport.css";
import MaterialTable from "material-table";
import { refromatDate } from "../utils/utlis.js";
import toast from "../utils/toast";
import { useQuery, client } from "@apollo/client";
import { getListuIzvestaja } from "../graphql/queries";

// export default function ReportList() {
//   const [getIzvestaji, setIzvestaji] = useState([]);
//   const [izvestaji, setIzvestajiGraph] = useState([]);
//   const [dataRender, setDataForRender] = useState([]);
//   const [izvestajiGetData, seti] = useState([]);
// const { loading, error, data } = useQuery(getListuIzvestaja);

//   const fetchIzvestaji = () => {
//     fetch("http://localhost:9000/izvestaji")
//       .then((response) => response.json())
//       .then((response) => setIzvestaji(response))
//       .catch((err) => console.error(err));
//   };

//   const deleteIzvestaj = (izvestajId, callback) => {
//     fetch("http://localhost:9000/delete_izvestaj/" + izvestajId)
//       .then(() => callback())
//       .then(() => toast.success("Uspešno obrisano"))
//       .catch((err) => toast.error("Greška"));
//   };

//   useEffect(() =>{
//       if(data){
//         setIzvestajiGraph(data);
//       }
//   },[data])

//   const renderUzorci = () => {

//     console.log(izvestaji);
//   console.log(izvestaji.getIzvestajs);

//   };

//   var tempObj = {};
//   var i;
//   for(i=0;i<izvestaji.getIzvestajs.size();i++){
//       tempObj.id = izvestaji.getIzvestajs[i].id;
//       tempObj.napomena = izvestaji.getIzvestajs[i].napomena;
//       izvestajiGetData.push(tempObj);
//       tempObj = {};
//   };
//   console.log(izvestaji);
//   console.log(izvestaji.getIzvestajs);
//   izvestaji.forEach((key, i) => {
//     tempObj.name = key;
//     tempObj.director = arrayOfFilmDirectors[i];
//     izvestajiGetData.push(tempObj);
//     tempObj = {};
//   });
//   setDataForRender(izvestajiGetData);
const remoteData = () => {
  return client
    .query({
      query: getListuIzvestaja,
    })
    .then((res) => {
      return {
        data: res.data.getIzvestajs,
      };
    });
};

const ReportList = () => {
  return (
    <MaterialTable
      title={"Izveštaji"}
      columns={[
        // {
        //     title: 'Pacijent',
        //     render: (rowData) => {
        //         if(rowData.kartonIme && rowData.kartonPrezime){
        //             return <span>{`${rowData.kartonIme} ${rowData.kartonPrezime}`}</span>
        //         }
        //     }
        // },
        // {
        //     title: 'Doktor',
        //     render: (rowData) => {
        //         if(rowData.doktor.ime && rowData.doktor.prezime){
        //             return <span>{`${rowData.doktor.ime} ${rowData.doktor.prezime}`}</span>
        //         }
        //     }
        // }
        // {
        //     title: 'Specijalnost doktora',
        //     field: 'specijalnost'
        // },
        // {
        //     title: 'Datum stampanja',
        //     field: 'datumstampanja'
        // },
        {
          field: "napomena",
          title: "Napomena",
        },
      ]}
      // editable={{
      //     onRowDelete: (oldData) => {
      //         return new Promise((resolve, reject) => {
      //             setTimeout(() => {
      //                 deleteIzvestaj(oldData.izvestajid, () =>{
      //                     fetchIzvestaji()
      //                     resolve();

      //                 })

      //             }, 1000);
      // })}}}
      data={remoteData}
    />
    // <MaterialTable
    //     title={"Izveštaji"}
    //     columns={[
    //         {
    //             title: 'Pacijent',
    //             render: (rowData) => {
    //                 if(rowData.kartonIme && rowData.kartonPrezime){
    //                     return <span>{`${rowData.kartonIme} ${rowData.kartonPrezime}`}</span>
    //                 }
    //             }
    //         },
    //         {
    //             title: 'Doktor',
    //             render: (rowData) => {
    //                 if(rowData.doktorIme && rowData.doktorPrezime){
    //                     return <span>{`${rowData.doktorIme} ${rowData.doktorPrezime}`}</span>
    //                 }
    //             }
    //         },
    //         {
    //             title: 'Specijalnost doktora',
    //             field: 'specijalnost'
    //         },
    //         {
    //             title: 'Datum stampanja',
    //             field: 'datumstampanja'
    //         },
    //         {
    //             field: 'napomena',
    //             title: 'Napomena'
    //         }
    //     ]}

    //     editable={{
    //         onRowDelete: (oldData) => {
    //             return new Promise((resolve, reject) => {
    //                 setTimeout(() => {
    //                     deleteIzvestaj(oldData.izvestajid, () =>{
    //                         fetchIzvestaji()
    //                         resolve();

    //                     })

    //                 }, 1000);
    //     })}}}
    // data={getIzvestaji}
    // />
  );
};

export default ReportListStaro;
