import React, { useState } from "react";
import "./style/CreateType.css";
import { Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getMedicalRecords } from "../graphql/queries";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { FormControl, InputLabel, Button } from "@material-ui/core";

const Card = () => {
  const [cards] = React.useState([]);
  const [kartoni, setKartoni] = React.useState([]);
  const [getRedirect, setRedirect] = useState();
  const [getOption, setOption] = useState();
  const {} = useQuery(getMedicalRecords, {
    onCompleted: setKartoni,
  });

  // const getCards = () => {
  //   fetch("http://localhost:9000/kartoni")
  //     .then((response) => response.json())
  //     .then((response) => setCards(response))
  //     .catch((err) => console.error(err));
  // };

  if (getRedirect) {
    return (
      <Redirect
        to={{
          pathname: getRedirect,
          state: { from: { id: getOption } },
        }}
      />
    );
  }
  // sta ako nema izvestaja, kartona ili bilo cega? handling
  const renderCards = () => {
    if (kartoni.getMedicalRecords) {
      return kartoni.getMedicalRecords.map((karton, index) => {
        return (
          <MenuItem key={index + "|"} value={karton.id}>
            {karton.ime + " " + karton.prezime}
          </MenuItem>
        );
      });
    } else {
      return <option>test</option>;
    }
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(getOption);
    setRedirect(`/report`);
  };

  const test = (event) => {
    setOption(event.target.value);
  };
  console.log(cards);

  return (
    <div>
      <form className="form-create-type">
        <div className="div-form1">
          <FormControl>
            <InputLabel id="demo-simple-select-helper-label">
              Ime i prezime
            </InputLabel>
            <Select onChange={test} placeholder="Pick">
              {renderCards()}
            </Select>
          </FormControl>
          <Button
            onClick={submit}
            className="myButton"
            variant="contained"
            color="primary"
          >
            Dalje
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Card;
