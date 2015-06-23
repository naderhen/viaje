import React from 'react';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import App from './App';

// import stores
//const mountNode = document.getElementById('app');

//const state = window.App;

//const redux = createRedux(stores, state);

//Router.run(routes, (App) => {
//    React.render(<App />, document.getElementById('app'));
//});

const history = new BrowserHistory();

React.render(<App history={history} />, document.getElementById('app'));