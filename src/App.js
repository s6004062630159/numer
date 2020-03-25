import React, { Component } from 'react';
import home from './home.js';
import Nabar from './component/Nabar';
import Bisec from './Bisec';
import falseposition from './falseposition';
import onepoint from './onepoint';
import newton from './newton';
import secant from './secant';
import { BrowserRouter, Route, Switch,  } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Nabar/>
        <div className="container">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/Bisec" component={Bisec} />
              <Route exact path="/falseposition" component={falseposition} />
              <Route exact path="/onepoint" component={onepoint} />
              <Route exact path="/newton" component={newton} />
              <Route exact path="/secant" component={secant} />
            </Switch>
          </BrowserRouter>
        </div>
      </React.Fragment>

    );
  }
}

export default App;

