import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import { MDBFormInline, MDBTable, MDBTableHead, MDBTableBody, MDBInput } from "mdbreact";

import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
import Nabar from './component/Nabar';
import api from "./api";
import { derivative, evaluate } from 'mathjs'
const PlotlyComponent = createPlotlyComponent(Plotly);
class secant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      value: "",
      x0: [],
      x1: [],
      error: [],
      fx0: [],
      fx1: []
    };

    this.sol = this.sol.bind(this);
    this.x0 = this.x0.bind(this);
    this.x1 = this.x1.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = async () => {
    await api.getMovieById("5e736fe901018e1a24635f65").then(db => {
      this.setState({
        data: db.data.data.fx
      });
      this.state.x0[0] = parseFloat(db.data.data.xl);
      this.state.x1[0] = parseFloat(db.data.data.xr);
    });
  };

  handleChange({ target: { value } }) {
    this.setState({ data: value });
  }

  x0({ target: { value } }) {
    this.state.x0[0] = parseFloat(value);
  }

  x1({ target: { value } }) {
    this.state.x1[0] = parseFloat(value);
  }
  sol = e => {
    var value = this.state.data;
    var x0 = parseFloat(this.state.x0);
    var x1 = parseFloat(this.state.x1);
    console.log("this is x0:", x0);
    console.log("this is x1:", x1);
    var x_old = 0,
      error = 99,
      xi = 0,
      i,
      j = 0,
      fx1 = "",
      fx0 = "",
      fxx = "";

      while (error >= 0.00001){
      let num1 = {
        x: x0
      };

      fx0 = evaluate(value, num1);
      this.state.fx0[j] = fx0;

      let num2 = {
        x: x1
      };
      fx1 = evaluate(value, num2);
      this.state.fx1[j] = fx1;
      fxx = (fx0 - fx1) / (x0 - x1);
      x0 = x1;
      x1 = x1 - (fx1 / fxx);
      error = Math.abs((x0 - x1) / x0);
      this.state.error[j] = error;
      j++;

      if (error >= 0.00001) {
        this.state.x0[j] = x0;
        this.state.x1[j] = x1;
      }
    } 
    this.setState({ data: "" });
    e.preventDefault();
  };

  plot() {
    const xpoint = this.state.x0;
    const ypoint = this.state.fx0;
    const x1point = this.state.x1;
    const y1point = this.state.fx1;

    var data = [
      {
        type: "scatter",
        x: xpoint,
        y: ypoint,
        marker: {
          color: "red"
        },
        name: "XL"
      },
      {
        type: "scatter",
        x: x1point,
        y: y1point,
        marker: {
          color: "blue"
        },
        name: "XR"
      }
    ];
    return data;
  }
render() {
  var i = 0;
  let data = this.plot();
  var x0 = this.state.x0;
  var x1 = this.state.x1;
  var fx0 = this.state.fx0;
  var fx1 = this.state.fx1;
  var eq = this.state.data;
  var error = this.state.error;
  return(
    <Router>
<Nabar />
<div style={{ float: "left", paddingLeft: "75px", paddingTop: "40px" }}>
  <legend>Secant</legend>
  <p></p>
  <div>
    <label column sm="5" for="">Enter equation</label>
    <input
      onChange={this.handleChange}
      type="text"
      class="form-control"
      placeholder="Input F(x)"
    />
  </div>

  <div>
    <label for="">X0</label>
    <input
      onChange={this.x0}
      type="text"
      class="form-control"
      placeholder="Input X0"
    />
  </div>

  <div>
    <label for="">X1 </label>
    <input
      onChange={this.x1}
      class="form-control"
      type="text"
      placeholder="X1"
    />
  </div>
  <p></p>
  <button style={{ margin: "10px"  }} type="submit" onClick={this.sol}>Submit</button>
        <button style={{ margin: "10px"  }} type="submit" onClick={this.sol}>Ex.equation</button>
  <p >Ex Fx: {eq}</p>
</div>
<MDBFormInline>
  <div style={{ float: "left", paddingLeft: "90px", paddingTop: "40px" }}>
    <MDBTable bordered>
      <MDBTableHead >
        <th> Iteration </th>
        <th> X0 </th>
        <th> X1 </th>
        <th> Error </th>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td >
            {x0.map(
              x => (
                <div>{++i}</div>
              ),
              this
            )}
          </td>
          <td>
            {x0.map(
              x0 => (
                <div>  {x0.toFixed(6)}  </div>
              ),
              this
            )}
          </td>
          <td>
            {x1.map(
              x1 => (
                <div>  {x1.toFixed(6)}  </div>
              ),
              this
            )}
          </td>
          <td>
            {error.map(
              error => (
                <div>  {error.toFixed(6)}  </div>
              ),
              this
            )}
          </td>
        </tr>
      </MDBTableBody>
    </MDBTable>
  </div>
  <div style={{ width: "60%", height: "45%", float: "center" }}>
    <PlotlyComponent data={data} />
  </div>
</MDBFormInline>
    </Router >
  );
}
  }

export default secant;