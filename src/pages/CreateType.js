import React, { useState, useEffect } from "react";
import "./style/CreateType.css";
import MaterialTable from "material-table";
import { useQuery, useMutation } from "@apollo/client";
import { getRezultats, getUzorci } from "../graphql/queries";
import {
  NewRezultatMutation,
  DeleteRezultatMutation,
  EditRezultatMutation,
} from "../graphql/mutation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { formatDate } from "../utils/utlis";
import toast from "../utils/toast";

const CreateType = () => {
  const [uzorci, setUzorci] = React.useState([]);
  const [rezultati, setRezultati] = React.useState([]);
  const [posiljalac, setPosiljalac] = useState("");
  const { loading, error, data } = useQuery(getRezultats, {
    onCompleted: setRezultati,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });
  const { loading: loadingU, error: errorU, data: dataU } = useQuery(
    getUzorci,
    { onCompleted: setUzorci }
  );
  const [datumupisa, setDatumupisa] = useState(new Date());
  const [uzorak, setUzorak] = useState();
  const [err, setErr] = useState();
  const [newResult, { loading: loadingRez, error: errorRez }] = useMutation(
    NewRezultatMutation,
    {
      refetchQueries: [{ query: getRezultats }],
      onCompleted: ({ newResult }) => {
        toast.success("Rezultat je sačuvan");
      },
    }
  );

  const [
    deleteResult,
    { loading: loadingRezDel, error: errorRezDel },
  ] = useMutation(DeleteRezultatMutation, {
    refetchQueries: [{ query: getRezultats }],
    onCompleted: ({ deleteResult }) => {
      toast.success("Rezultat je obrisan");
    },
  });

  const [
    editResult,
    { loading: loadingRezEdit, error: errorRezEdit },
  ] = useMutation(EditRezultatMutation, {
    onCompleted: ({ editResult }) => {
      toast.success("Rezultat je izmenjen");
    },
  });

  const [columns, setColumns] = useState([
    { title: "Posiljalac", field: "posiljalac" },
    { title: "Datum upisa", field: "datumupisa" },
  ]);

  const renderUzorci = () => {
    if (uzorci.getUzoraks) {
      console.log(uzorci.getUzoraks);
      console.log(rezultati.getResults);
      console.log(rezultati);
      return uzorci.getUzoraks.map((uzorak, index) => {
        return (
          <MenuItem key={index + "|"} value={uzorak.id}>
            {uzorak.karton.ime + " " + uzorak.karton.prezime}
          </MenuItem>
        );
      });
    } else {
      return <option>test</option>;
    }
  };

  const changeUzorak = (e) => {
    setErr(false);
    setUzorak(e.target.value);
    console.log(uzorak);
  };
  if (rezultati.length != 0) {
    console.log(rezultati);
    let i;

    var editableData = rezultati.getResults.map((o) => ({ ...o }));
    for (i = 0; i < editableData.length; i++) {
      let d = editableData[i].datumupisa.slice(0, 10);
      editableData[i].datumupisa = d;
      console.log(d);
    }
    return (
      <div>
        <form className="form-create-type">
          <div className="div-form">
            <TextField
              // error={error}
              label={"Pošiljalac"}
              type="text"
              value={posiljalac}
              onChange={(e) => {
                setErr(false);
                setPosiljalac(e.target.value);
              }}
            />
            {/* <label>Ime i prezime pacijenta: </label> */}
            <FormControl>
              <InputLabel id="demo-simple-select-helper-label">
                Ime i prezime
              </InputLabel>
              <Select
                error={error}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={changeUzorak}
              >
                {renderUzorci()}
              </Select>
              {/* <label>Datum upisa:</label> */}
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                error={error}
                value={datumupisa}
                onChange={(datumupisa) => {
                  setErr(false);
                  setDatumupisa(datumupisa);
                }}
              />
            </MuiPickersUtilsProvider>
            {/* <DatePicker selected={startDate} onChange={date => setStartDate(date)} setOpen={true}/> */}
            <div className="buttonsEdit">
              <Button
                variant="contained"
                color="primary"
                className="myButton"
                onClick={() =>
                  newResult({
                    variables: { input: { posiljalac, datumupisa, uzorak } },
                  })
                }
              >
                Dodaj
              </Button>
            </div>
          </div>
        </form>
        <MaterialTable
          title={"Rezultati"}
          columns={columns}
          data={editableData}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                const id = oldData.id;
                const posiljalac = newData.posiljalac;
                const datumupisa = newData.datumupisa;
                const uzorak = newData.uzorak.id;
                setTimeout(() => {
                  editResult({
                    variables: {
                      input: { id, posiljalac, datumupisa, uzorak },
                    },
                  });
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) => {
              return new Promise((resolve, reject) => {
                const id = oldData.id;
                console.log();
                setTimeout(() => {
                  deleteResult({
                    variables: { id },
                  });
                  resolve();
                }, 1000);
              });
            },
          }}
        />
      </div>
    );
  } else {
    return null;
  }
};

export default CreateType;
