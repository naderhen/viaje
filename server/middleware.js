"use strict";
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import React from "react";
import Router from 'react-router';
import serialize from "serialize-javascript";
import debug from 'debug';

export default function (options) {
    options = options || {};

    //if(!options.application) {
    //    throw new Error('Application is required for isomorphic middleware.')
    //}

    if(!options.routes) {
        throw new Error('Application routes are required for isomorphic middleware.')
    }

    return function(req, rep) {
        // Create new instance of our instance (per request, no singletons)
        //var instance = new options.application();

        // Challenge, try to capture the title through the instance
        //const redux = createRedux(stores);
        //redux.dispatch(MyActionCreators.doSomething()); // fire action creators to fill the state
        //const state = redux.getState(); // somehow pass this state to the client

        let title = 'static';
        let assets;
        let body;

        if (process.env.NODE_ENV === 'development') {
            assets = fs.readFileSync(path.resolve(__dirname, './../app/webpack-stats.json'));
            assets = JSON.parse(assets);
        }
        else {
            assets = require('./../app/webpack-stats.json');
        }

        rep.view('default', {title, assets});
    };
};

// Use react-router to run the URL that is provided in routes.js
//Router.run(
//    options.routes,
//    req.url.path,
//    (Handler) => {
//        let element = React.createElement(Handler, {flux:alt});
//        let content = React.renderToString(element);
//
//        /*
//         alt.flush() once the view markup has been created.
//         resets your stores so they are ready for the next request.
//         */
//        iso.add(content, alt.flush());
//
//        // I think we need to wait on actions to execute here?
//
//        // Use iso to render, picks back up on the client side and bootstraps the stores.
//
//        //rep.view('default', {body:content});
//    }
//)