import React, { Component, Fragment } from "react";
import "./style/CreateType.css";
import DrawerFP from "../components/DrawerFP";

class Moja extends Component {
  state = {
    uzorci: [],
  };
  componentDidMount() {
    this.getTipovi();
  }

  async getTipovi() {
    await fetch("http://localhost:3000/tipovi")
      .then((response) => response.json())
      .then((response) => this.setState({ uzorci: response.data }))
      .catch((err) => console.error(err));
  }

  renderUzorak = ({ tipuzorkaid, naziv, opis }) => (
    <div key={tipuzorkaid}>{naziv}</div>
  );

  render() {
    var { uzorci } = this.state;
    return (
      <Fragment>
        <DrawerFP />
        <div>{uzorci.map(this.renderUzorak)}</div>
      </Fragment>
    );
  }
}

export default Moja;
