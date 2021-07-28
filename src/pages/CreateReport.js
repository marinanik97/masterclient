import React, { useState, Fragment } from "react";
import "./style/CreateReport.css";
import TextField from "@material-ui/core/TextField";
import { NetworkStatus, useQuery, useMutation } from "@apollo/client";
import {
  getDoctors,
  getParameters,
  getMedicalRecordById,
} from "../graphql/queries";
import { SaveReportItem } from "../graphql/mutation";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";
import { useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import toast from "../utils/toast";

const CreateReport = () => {
  const location = useLocation();
  const [doktori, setDoktori] = React.useState([]);
  const [doktorforma, setDoktor] = useState();
  const [parametri, setParametri] = React.useState([]);
  const {} = useQuery(getDoctors, { onCompleted: setDoktori });
  const [setKarton] = useState();

  const {} = useQuery(getParameters, { onCompleted: setParametri });
  const [datumst, setDatumSt] = useState(new Date());
  const [napomena, setNapomena] = React.useState("");

  const [parametarforma, setParametar] = useState();

  const [setErr] = useState();
  const [rezultatparametra, setRezP] = useState("");
  const [indikator, setIndikator] = useState("");
  const [dummyReports, setDummyReports] = useState([]);
  const [noviIzvestaj, setNoviIzvestaj] = useState([]);
  const [columns] = useState([
    { title: "Naziv", field: "naziv" },
    { title: "Rezultat", field: "rezultatparametra" },
    { title: "Indikator", field: "indikator" },
    { title: "Ref vrednosti", field: "rf" },
  ]);
  const [newReport] = useMutation(SaveReport, {
    onCompleted: () => {
      setNoviIzvestaj();
      toast.success("Izvestaj je sačuvan");
    },
  });

  const [newReportItem] = useMutation(SaveReportItem);
  const id = location.state.from.id;
  console.log(id);
  const {
    loading: loadingKarton,
    error: errorKarton,
    data: dataKarton,
    networkStatus,
  } = useQuery(
    getMedicalRecordById,
    {
      variables: { id },
    },
    { onCompleted: setKarton }
  );
  if (networkStatus === NetworkStatus.refetch) return "Refetching!";
  if (loadingKarton) return <div>Loading...</div>;
  if (errorKarton) return <div>Error!</div>;
  console.log(doktori);
  // useEffect(() => {
  //   //getDoktori();
  //   // renderDoktors();
  //   //setDoktori(data);
  //   //getParametri();
  //   if (
  //     location &&
  //     location.state &&
  //     location.state.from &&
  //     location.state.from.id
  //   ) {
  //     const id = location.state.from.id;
  //     console.log(id);
  //     // getKartonGraph({
  //     //   variables: { id },
  //     // });
  //   }
  // }, []);

  const renderParametri = () => {
    console.log(parametri, "test");
    if (parametri.getParameters) {
      return parametri.getParameters.map((parametar, index) => {
        return (
          <MenuItem key={index + "|"} value={parametar.id}>
            {parametar.naziv}
          </MenuItem>
        );
      });
    } else {
      return <option>test</option>;
    }
  };

  const renderD = () => {
    //console.log(dataKarton.getKartonById);
    if (doktori.getDoctors) {
      //console.log(doktori);
      return doktori.getDoctors.map((doktor, index) => {
        return (
          <MenuItem key={index + "|"} value={doktor.id}>
            {doktor.ime + " " + doktor.prezime}
          </MenuItem>
        );
      });
    } else {
      return <option>test</option>;
    }
  };

  const updateDummyReports = (e) => {
    e.preventDefault();
    if (!rezultatparametra || !indikator || !doktorforma || !parametarforma) {
      setErr(true);
      return;
    }
    console.log({
      rf: parametarforma.referentnevrednosti,
      naziv: parametarforma.naziv,
      parametar: parametarforma.id,
      rezultatparametra: rezultatparametra,
      indikator: indikator,
    });
    setDummyReports([
      ...dummyReports,
      {
        rf: parametarforma.referentnevrednosti,
        naziv: parametarforma.naziv,
        parametar: parametarforma.id,
        rezultatparametra: rezultatparametra,
        indikator: indikator,
      },
    ]);
  };
  const changeParam = (e) => {
    setErr(false);
    setParametar(
      parametri.getParameters.find((param) => param.id === e.target.value)
    );
    console.log(parametarforma);
  };
  const changeDoktor = (e) => {
    setErr(false);
    setDoktor(e.target.value);
    console.log(doktorforma);
  };
  const SaveReport = async (event) => {
    event.preventDefault();
    const karton = dataKarton.getKartonById.id;
    console.log(doktorforma);
    const doktor = doktorforma;
    const datumstampanja = datumst;
    const sacuvanIzvestaj = await newReport({
      variables: { input: { datumstampanja, napomena, doktor, karton } },
    });
    console.log(sacuvanIzvestaj.data.newReport.id);
    let i;
    let idizvestaj = sacuvanIzvestaj.data.newReport.id;
    for (i = 0; i < dummyReports.length; i++) {
      let rb = i + 1;
      let indikator = dummyReports[i].indikator;
      let rezultatparametra = parseFloat(dummyReports[i].rezultatparametra);
      let status = "dodavanje";
      let izvestaj = idizvestaj;
      let parametar = dummyReports[i].parametar;
      newReportItem({
        variables: {
          input: {
            rb,
            indikator,
            rezultatparametra,
            status,
            izvestaj,
            parametar,
          },
        },
      });
    }
    console.log(noviIzvestaj);
  };
  if (dataKarton.length !== 0) {
    console.log(dataKarton);
    return (
      <Fragment>
        <div style={{ marginBottom: "50px", paddingTop: "30px" }}>
          <Grid container spacing={3}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              spacing={1}
            >
              <Grid item md={3} xl={3} lg={3} xs={3}>
                <TextField
                  label={"Ime i prezime"}
                  type="text"
                  className="form-control"
                  id="imeprezime"
                  value={
                    dataKarton.getKartonById
                      ? dataKarton.getKartonById.ime +
                        " " +
                        dataKarton.getKartonById.prezime
                      : "imeprezime"
                  }
                  disabled
                />
              </Grid>
              <Grid item md={3} xl={3} lg={3} xs={3}>
                <TextField
                  label={"Datum rodjenja"}
                  type="text"
                  className="form-control"
                  id="datumrodjenja"
                  placeholder="datumrodjenja"
                  value={
                    dataKarton.getKartonById
                      ? dataKarton.getKartonById.datumrodjenja.slice(0, 10)
                      : "datum"
                  }
                  disabled
                />
              </Grid>
              <Grid item md={3} xl={3} lg={3} xs={3}>
                <TextField
                  label={"Pol"}
                  type="text"
                  className="form-control"
                  id="pol"
                  placeholder="pol"
                  value={
                    dataKarton.getKartonById
                      ? dataKarton.getKartonById.pol
                      : "pol"
                  }
                  disabled
                />
              </Grid>
              <Grid item md={3} xl={3} lg={3} xs={3}>
                <TextField
                  label={"KartonID"}
                  type="text"
                  className="form-control"
                  id="kartonid"
                  placeholder="kartonid"
                  value={
                    dataKarton.getKartonById
                      ? dataKarton.getKartonById.id
                      : "kid"
                  }
                  disabled
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              spacing={1}
            >
              <Grid item md={4} xl={4} lg={4} xs={4}>
                <FormControl>
                  <InputLabel id="demo-simple-select-helper-label">
                    Doktor
                  </InputLabel>
                  <Select onChange={changeDoktor}>{renderD()}</Select>
                </FormControl>
              </Grid>

              <Grid item md={4} xl={4} lg={4} xs={4}>
                <TextField
                  //  error={error}
                  label={"Napomena"}
                  type="text"
                  className="form-control"
                  id="napomena"
                  placeholder="napomena"
                  onChange={(e) => {
                    setErr(false);
                    setNapomena(e.target.value);
                  }}
                />
              </Grid>
              <Grid item md={4} xl={4} lg={4} xs={4}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    //  error={error}
                    value={datumst}
                    onChange={(datumst) => {
                      setErr(false);
                      setDatumSt(datumst);
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid container>
                <Grid item md={4} xl={4} lg={4} xs={4}>
                  <FormControl>
                    <InputLabel id="demo-simple-select-helper-label">
                      Parametri
                    </InputLabel>
                    <Select onChange={changeParam}>{renderParametri()}</Select>
                  </FormControl>
                </Grid>
                <Grid item md={4} xl={4} lg={4} xs={4}>
                  <TextField
                    //error={error}
                    label={"Rezultat"}
                    type="text"
                    className="form-control"
                    id="kartonid"
                    value={rezultatparametra}
                    onChange={(e) => {
                      setErr(false);
                      setRezP(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item md={4} xl={4} lg={4} xs={4}>
                  <TextField
                    //  error={error}
                    label={"Indikator"}
                    type="text"
                    className="form-control"
                    id="kartonid"
                    value={indikator}
                    onChange={(e) => {
                      setErr(false);
                      setIndikator(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <div className="action_container">
              <Button
                variant="contained"
                color="primary"
                className="myButton"
                onClick={updateDummyReports}
              >
                Dodaj
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="myButton"
                onClick={SaveReport}
              >
                Sačuvaj
              </Button>
            </div>
          </Grid>
        </div>
        <MaterialTable
          title={"Stavke izveštaja"}
          columns={columns}
          data={dummyReports}
          // options={{
          //   selection: true,
          // }}
          editable={{
            isDeletable: (rowData) => true,
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...dummyReports];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setDummyReports([...dataDelete]);

                  resolve();
                }, 1000);
              }),
          }}
        />
      </Fragment>
    );
  } else {
    return null;
  }
};

export default CreateReport;
