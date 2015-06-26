"use strict";
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import React from "react";
import Location from 'react-router/lib/Location';
import {Router} from 'react-router';
import serialize from "serialize-javascript";
import debug from 'debug';

import { Provider } from 'redux/react';
import { createDispatcher, createRedux, composeStores, bindActionCreators } from 'redux';
import * as stores from './../app/stores';

export default function (options) {
    options = options || {};

    if(!options.application) {
        throw new Error('Application is required for isomorphic middleware.')
    }

    if(!options.routes) {
        throw new Error('Application routes are required for isomorphic middleware.')
    }

    return function(req, rep) {
        let title;
        let assets;
        let body;
        let state;
        //let url = req.url.path;
        //let query = req.query;
        //
        //const location = new Location(url, query);
        //const redux = createRedux(stores);
        //
        //Router.run(options.routes, location, (error, initialState) => {
        //    //Promise.all(initialState.components
        //    //    .filter(component => component.fetchData)
        //    //    .map(component => {
        //    //        return component.fetchData(redux.dispatch);
        //    //    }))
        //    //    .then(() => {
        //            state = redux.getState();
        //            console.log('init state', initialState);
        //            console.log('state', state);
        //            console.log('location', location);
        //
        //            var props = Object.assign({}, initialState, state);
        //            console.log('props', props);
        //
        //            //var test = React.createElement(props.components[0], {redux});
        //            //var test = React.createElement(props.components[1], {redux});
        //
        //            //console.log('test', test);
        //
        //            body = React.renderToString(<Provider redux={redux}>
        //                {() => <Router location={location} {...props} />}
        //            </Provider>);

                    //console.log('state', redux.getState());
                    //title = state.HtmlHeaderStore.title;
                    //console.log('server - title', title);

                    if (process.env.NODE_ENV === 'development') {
                        assets = fs.readFileSync(path.resolve(__dirname, options.statsFile));
                        assets = JSON.parse(assets);
                    }
                    else {
                        assets = require(options.statsFile);
                    }

                    //state = JSON.stringify(state);

                    rep.view('default', {title, assets, body, state});
                //});
        //});
    };
};