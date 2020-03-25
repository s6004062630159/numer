import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Router,Route,browserHistory} from 'react-router';
import Bisec from './Bisec';
import newton from './newton';
import onepoint from './onepoint';
import secant from './secant';
import home from './home';
import falseposition from './falseposition';
ReactDOM.render(<Router history={browserHistory}>
    <Route path="/" component={Bisec}/>
        <Route path="/Bisec" component={Bisec}/>
        <Route path="/falseposition" component={falseposition}/>
        <Route exact path="/onepoint" component={onepoint} />
        <Route exact path="/newton" component={newton} />
        <Route exact path="/secant" component={secant} />
    </Router>, document.getElementById('root'));

serviceWorker.unregister();
