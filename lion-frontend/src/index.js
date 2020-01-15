import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../src/reducers';
import UserApp from "./User";
import AdminApp from "./Admin";
import SignIn from "./User/src/routes/SignIn1/SignIn";
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';

const store = createStore(reducer)

render(
    <BrowserRouter>
        <Provider store={store}>
            <Switch>
                <Route path="/admin" component={AdminApp} />
                <Route path="/sign-in" component={SignIn} />
                <Route component={UserApp} />
            </Switch>
        </Provider>
    </BrowserRouter>, document.getElementById('root')
)