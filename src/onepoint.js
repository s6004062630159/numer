import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import { MDBFormInline, MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
import Nabar from './component/Nabar';
import api from "./api";
import { evaluate } from 'mathjs'
const PlotlyComponent = createPlotlyComponent(Plotly);
class onepoint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            data: '',
            x: [],
            fx: [],
            error: [], 
        };
        this.handleChange = this.handleChange.bind(this);
        this.sol = this.sol.bind(this);
        this.plot = this.plot.bind(this);
        this.x = this.x.bind(this);

    }
    componentDidMount = async () => {
        await api.getMovieById("5e736b4201018e1a24635f63").then(db => {
            this.setState({
                data: db.data.data.fx
            });
            this.state.x[0] = parseFloat(db.data.data.xl);
        });
    };
    handleChange({ target: { value } }) {
        this.setState({data: value });
    }
    x({ target: { value } }) {
        this.state.x[0] = parseFloat(value);
    }

    sol=e=> {
        var value = this.state.data;
        var x = parseFloat(this.state.x);
        var xold = 0, error = 99, fxi = 0;
        var i, j = 0, fx = '', sum;
        while (error >= 0.00001){
                let num1 = {
                    x: x,
                }
                sum = evaluate(value, num1);
                fx = ''
                fxi = 0;
                fxi = parseFloat(sum)
                this.state.fx[j] = fxi;
                sum = 0
                xold = x;
                x = fxi;
                error = Math.abs((x - xold) / x)
                this.state.error[j] = error;
                j++;
                if (error >= 0.00001) {
                    this.state.x[j] = x;
                }

            } 
            this.setState({ data: '' })
            this.plot();
    }
    plot() {
        const xpoint = this.state.x;
        const ypoint = this.state.fx;
        var data = [
            {
                type: 'scatter',
                y: ypoint,
                marker: {
                    color: 'red'
                }
            },

        ];
        return data
    }
    render() {
        var i = 0;      
        var x = this.state.x;
        var fx = this.state.fx;
        var eq = this.state.data;
        var error = this.state.error;
        let data = this.plot()
        return (
            <Router>
              <Nabar />
              <div style={{ float: "left", paddingLeft: "75px", paddingTop: "40px" }}>
                <legend>One-point Iteration</legend>
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
                  <label for="">X</label>
                  <input
                    onChange={this.x}
                    type="text"
                    class="form-control"
                    placeholder="Input X"
                  />
                </div>
                <p></p>
                <button style={{ margin: "10px"  }} type="submit" onClick={this.sol}>Submit</button>
                <button style={{ margin: "10px"  }} type="submit" onClick={this.sol}>Ex.equation</button>
                <div>
                <p >Ex F(x): {this.state.data}</p>

                </div>
              </div>
              <MDBFormInline>
                <div style={{ float: "left", paddingLeft: "90px", paddingTop: "40px" }}>
                  <MDBTable bordered>
                    <MDBTableHead >
                      <th> Iteration </th>
                      <th> Xi </th>
                      <th> f(Xi) </th>
                      <th> Error </th>
                    </MDBTableHead>
                    <MDBTableBody>
                      <tr>
                        <td >
                          {x.map(
                            x => (
                              <div>{++i}</div>
                            ),
                            this
                          )}
                        </td>
                        <td>
                          {x.map(
                            x => (
                            <div>  {x.toFixed(6)}  </div>
                            ),
                            this
                          )}
                        </td>
                        <td>
                          {fx.map(
                            fx => (
                              <div>  {fx.toFixed(6)}  </div>
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

export default onepoint;