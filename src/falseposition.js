import React from "react";
import "./App.css";
import { evaluate, parse } from "mathjs";
import api from "./api";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MDBFormInline, MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";
import createPlotlyComponent from "react-plotlyjs";
import Plotly from "plotly.js/dist/plotly-cartesian";
import Nabar from './component/Nabar';
const PlotlyComponent = createPlotlyComponent(Plotly);

class Bisec extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      value: "",
      xl: [],
      xr: [],
      xm: [],
      error: [],
      fxr: [],
      fxl: [],
      fxm: [],
      movie: ""
    };

    this.sol = this.sol.bind(this);
    this.xl = this.xl.bind(this);
    this.xr = this.xr.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.plot = this.plot.bind(this);
  }

  componentDidMount = async () => {
    await api.getMovieById("5e6a63784060b42aa88735f4").then(db => {
      this.setState({
        data: db.data.data.fx
      });
      this.state.xl[0] = parseFloat(db.data.data.xl);
      this.state.xr[0] = parseFloat(db.data.data.xr);
    });
  };

  handleChange({ target: { value } }) {
    this.setState({ data: value });
  }

  xl({ target: { value } }) {
    this.state.xl[0] = parseFloat(value);
  }
  xr({ target: { value } }) {
    this.state.xr[0] = parseFloat(value);
  }

  sol = e => {
    var value = this.state.data;
    var xl = parseFloat(this.state.xl);
    var xr = parseFloat(this.state.xr);
    var xm = 0, 
    xmold = 0, 
    error = 99, 
    fxl = 0, 
    fxr = 0, 
    fxm = 0,
    i, 
    j = 0, 
    fx = '', 
    sum;
    while (error >= 0.00001){

            let num1 = {
                x: xl,
            }
            sum = evaluate(value, num1);
            fx = ''
            fxl = 0;
            fxl = parseFloat(sum)
            this.state.fxl[j] = fxl;
            sum = 0

            let num2 = {
                x: xr,
            }
            sum = evaluate(value, num2);
            fx = ''
            fxr = 0;
            fxr = parseFloat(sum)
            this.state.fxr[j] = fxr;
            sum = 0
            xm = ((xr * fxl) - (xl * fxr)) / (fxl - fxr);
            let num3 = {
                x: xm,
            }
            sum = evaluate(value, num3);
            fx = ''
            fxm = 0;
            fxm = parseFloat(sum)
            this.state.fxm[j] = fxm;
            sum = 0
            this.state.xm[j] = xm;
            error = Math.abs((xm - xmold) / xm)
            this.state.error[j] = error;
            xmold = xm;
            j++;
            if (error >= 0.00001) {
                if ((fxm * fxr) < 0) {
                    this.state.xl[j] = xm;
                    this.state.xr[j] = xr;
                    xl = xm;
                }
                else {
                    this.state.xr[j] = xm;
                    this.state.xl[j] = xl;
                    xr = xm;
                }
            }
        } 
        this.setState({ data: '' })
        this.plot();
    e.preventDefault();
  };

  plot() {
    const xl_plot = this.state.xl;
    const yl_plot = this.state.fxl;
    const xr_plot = this.state.xr;
    const yr_plot = this.state.fxr;

    var data = [
      {
        type: "scatter",
        x: xl_plot,
        y: yl_plot,
        marker: {
          color: "red"
        },
        name: "XL"
      },
      {
        type: "scatter",
        x: xr_plot,
        y: yr_plot,
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
    var xl = this.state.xl;
    var xr = this.state.xr;
    var xm = this.state.xm;
    var fxl = this.state.fxl;
    var fxr = this.state.fxr;
    var fxm = this.state.fxm;
    var error = this.state.error;
    var eq = this.state.data;
    return (
      <Router>
        <Nabar />
        <div style={{ float: "left", paddingLeft: "75px", paddingTop: "40px" }}>
          <legend>False-position</legend>
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
            <label for="">Xl</label>
            <input
              onChange={this.xl}
              type="text"
              class="form-control"
              placeholder="Input Xl"
            />
          </div>

          <div>
            <label for="">Xr </label>
            <input
              onChange={this.xr}
              class="form-control"
              type="text"
              placeholder="xr"
            />
          </div>
          <p></p>
          <button style={{ margin: "10px"  }} type="submit" onClick={this.sol}>Submit</button>
          <button style={{ margin: "10px"  }} type="submit" onClick={this.sol}>Ex.equation</button>
          <p >EX Fx: {eq}</p>

        </div>
        <MDBFormInline>
          <div style={{ float: "left", paddingLeft: "90px", paddingTop: "40px" }}>
            <MDBTable bordered>
              <MDBTableHead >
                <th> Iteration </th>
                <th> XL </th>
                <th> XR </th>
                <th> XM </th>
                <th> f(Xl) </th>
                <th> f(Xr) </th>
                <th> f(Xm) </th>
                <th> Error </th>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <td >
                    {error.map(
                      x => (
                        <div>{++i}</div>
                      ),
                      this
                    )}
                  </td>
                  <td>
                    {xl.map(
                      xl => (
                      <div>  {xl.toFixed(6)}  </div>
                      ),
                      this
                    )}
                  </td>
                  <td>
                    {xr.map(
                      xr => (
                        <div>  {xr.toFixed(6)}  </div>
                      ),
                      this
                    )}
                  </td>
                  <td>
                    {xm.map(
                      xm => (
                        <div>  {xm.toFixed(6)}  </div>
                      ),
                      this
                    )}
                  </td>
                  <td>
                    {fxl.map(
                      fxl => (
                        <div>  {fxl.toFixed(6)}  </div>
                      ),
                      this
                    )}
                  </td>
                  <td>
                    {fxr.map(
                      fxr => (
                        <div>  {fxr.toFixed(6)}  </div>
                      ),
                      this
                    )}
                  </td>
                  <td>
                    {fxm.map(
                      fxm => (
                        <div>  {fxm.toFixed(6)}  </div>
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

export default Bisec;
