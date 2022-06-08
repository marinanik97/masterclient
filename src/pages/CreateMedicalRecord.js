import React, { useState } from "react";
import "./style/CreateType.css";
import MaterialTable from "material-table";
import { useQuery, useMutation } from "@apollo/client";
import { getKartons } from "../graphql/queries";
import { EditKarton, SacuvajKarton } from "../graphql/mutation";
import "react-datepicker/dist/react-datepicker.css";
import { Button, TextField } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import toast from "../utils/toast";

const CreateMedicalRecord = () => {
  const [kartoni, setKartoni] = React.useState([]);
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [JMBG, setJmbg] = useState("");
  const [pol, setPol] = React.useState("");
  const [datumrodjenja, setDatumRodjenja] = useState(new Date());
  const [telefon, setTelefon] = useState("");
  const [email, setEmail] = useState("");

  const [err, setErr] = useState();
  const [columns, setColumns] = useState([
    // { title: "KartonID", field: "id", editable: "never" },
    { title: "Ime", field: "ime" },
    { title: "Prezime", field: "prezime" },
    { title: "JMBG", field: "JMBG" },
    { title: "Pol", field: "pol" },
    { title: "Datum rodjenja", field: "datumrodjenja" },
    { title: "Telefon", field: "telefon" },
    { title: "Email", field: "email" },
  ]);
  const { loading, error, data } = useQuery(getKartons, {
    onCompleted: setKartoni,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const [newKarton, { loading: loadingKarton, error: errorKarton }] =
    useMutation(SacuvajKarton, {
      refetchQueries: [{ query: getKartons }],
      onCompleted: ({ newKarton }) => {
        toast.success("Karton je sačuvan");
      },
    });

  const [editKarton, { loading: loadingKartonEdit, error: errorKartonEdit }] =
    useMutation(EditKarton, {
      onCompleted: ({ editKarton }) => {
        toast.success("Karton je izmenjen");
      },
    });
  if (loading) return "Ucitavanje kartona...";

  if (kartoni.length != 0) {
    var editableData = kartoni.getKartons.map((o) => ({ ...o }));
    let i;
    for (i = 0; i < editableData.length; i++) {
      let d = editableData[i].datumrodjenja.slice(0, 10);
      editableData[i].datumrodjenja = d;
      console.log(d);
    }
    return (
      <div>
        <form className="form-create-type">
          <div className="div-form">
            <TextField
              error={err}
              label={"Ime"}
              type="text"
              value={ime}
              onChange={(e) => {
                setErr(false);
                setIme(e.target.value);
              }}
            />
            <TextField
              error={err}
              label={"Prezime"}
              type="text"
              value={prezime}
              onChange={(e) => {
                setErr(false);
                setPrezime(e.target.value);
              }}
            />
            <TextField
              error={err}
              label={"Jmbg"}
              type="text"
              value={JMBG}
              onChange={(e) => {
                setErr(false);
                setJmbg(e.target.value);
              }}
            />
            <TextField
              error={err}
              label={"Pol"}
              type="text"
              value={pol}
              onChange={(e) => {
                setErr(false);
                setPol(e.target.value);
              }}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                error={err}
                value={datumrodjenja}
                onChange={(datumrodjenja) => {
                  setErr(false);
                  setDatumRodjenja(datumrodjenja);
                }}
              />
            </MuiPickersUtilsProvider>
            {/* <DatePicker selected={startDate} onChange={date => setStartDate(date)} setOpen={true}/> */}
            <TextField
              error={err}
              label={"Telefon"}
              type="text"
              value={telefon}
              onChange={(e) => {
                setErr(false);
                setTelefon(e.target.value);
              }}
            />
            <TextField
              error={err}
              label={"Email"}
              type="text"
              value={email}
              onChange={(e) => {
                setErr(false);
                setEmail(e.target.value);
              }}
            />
            <div className="buttonsEdit">
              <Button
                variant="contained"
                color="primary"
                className="myButton"
                onClick={() =>
                  newKarton({
                    variables: {
                      input: {
                        ime,
                        prezime,
                        JMBG,
                        pol,
                        datumrodjenja,
                        telefon,
                        email,
                      },
                    },
                  })
                }
              >
                Dodaj
              </Button>
            </div>
          </div>
        </form>
        <MaterialTable
          title={"Kartoni"}
          columns={columns}
          data={editableData}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                const id = oldData.id;
                const ime = newData.ime;
                const prezime = newData.prezime;
                const datumrodjenja = newData.datumrodjenja;
                const JMBG = newData.JMBG;
                const pol = newData.pol;
                const telefon = newData.telefon;
                const email = newData.email;
                setTimeout(() => {
                  editKarton({
                    variables: {
                      input: {
                        id,
                        ime,
                        prezime,
                        JMBG,
                        pol,
                        datumrodjenja,
                        telefon,
                        email,
                      },
                    },
                  });
                  resolve();
                }, 1000);
              }),
          }}
        />
      </div>
    );
  } else {
    return null;
  }
};

export default CreateMedicalRecord;
