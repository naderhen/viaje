import React from 'react';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import { createDispatcher, createRedux, composeStores, bindActionCreators } from 'redux';
import { thunkMiddleware, loggerMiddleware } from './middleware';
import * as stores from './stores';
import routes from './routes';
import App from './App';

const state = window.appData;

console.log('app data', state);

const dispatcher = createDispatcher(
    composeStores(stores),
        getState => [ thunkMiddleware(getState), loggerMiddleware ]
);

const redux = createRedux(dispatcher, state);

const history = new BrowserHistory();

React.render(<App history={history} routes={routes} redux={redux}/>,
    document.getElementById('app'));