import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import { MDBFormInline,MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
import Nabar from './component/Nabar';
import api from "./api";
import { derivative, evaluate } from 'mathjs'
const PlotlyComponent = createPlotlyComponent(Plotly);

class newton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            data: '',
            x: [],
            error: [],
            fx: [],
            fxx: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.sol = this.sol.bind(this);
        this.plot = this.plot.bind(this);
        this.x = this.x.bind(this);
    }
    componentDidMount = async () => {
        await api.getMovieById("5e736e2b01018e1a24635f64").then(db => {
            this.setState({
                data: db.data.data.fx
            });
            this.state.x[0] = parseFloat(db.data.data.xl);
        });
    };

    handleChange({ target: { value } }) {
        this.setState({data: value });
        console.log(this.state.data);
    }
    x({ target: { value } }) {
        this.state.x[0] = parseFloat(value);
        console.log(this.state.x);
    }

    sol=e=> {

        var value = this.state.data;
        var x = parseFloat(this.state.x);
        var xold = 0,
        error = 99, 
        xi = 0,
        i, 
        j = 0, 
        fx = '', 
        sum, 
        gx = '', 
        k = '', 
        fxx = '';
        while (error >= 0.00001){
                let num1 = {
                    x: x,
                }
                fx = evaluate(value, num1);
                fxx = derivative(value, 'x').evaluate({ x: x });
                this.state.fx[j] = parseFloat(fx);
                this.state.fxx[j] = parseFloat(fxx);
                xold = x;
                xi = x - (fx / fxx);
                error = Math.abs((xi - xold) / xi);
                x = xi;
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
                x: xpoint,
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
        let data = this.plot()
        var x = this.state.x;
        var fx = this.state.fx;
        var eq = this.state.data;
        var fxx = this.state.fxx;
        var error = this.state.error;
        return (
            <Router>
              <Nabar />
              <div style={{ float: "left", paddingLeft: "75px", paddingTop: "40px" }}>
                <legend>Newton-Rapshon</legend>
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
                    onChange={this.x}
                    type="text"
                    class="form-control"
                    placeholder="Input X"
                  />
                </div>
                <p></p>
                <button style={{ margin: "10px"  }} type="submit" onClick={this.sol}>Submit</button>
                 <button style={{ margin: "10px"  }} type="submit" onClick={this.sol}>Ex.equation</button>
                <p >this is Fx: {eq}</p>
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
                          {fx.map(
                            fx => (
                              <div>  {fx.toFixed(6)}  </div>
                            ),
                            this
                          )}
                        </td>
                        <td>
                        {fxx.map(
                            fxx => (
                            <div>{fxx.toFixed(6)}</div>
                        ), this)}
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

export default newton;