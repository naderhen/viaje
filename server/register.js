'use strict';
import handlebars from 'handlebars';
import middleware from './middleware';
import routes from './routes';
import viewOptions from './viewOptions';

function register(server, options, next){
    server.views(viewOptions);
    server.route(routes);

    // TODO Export this into separate plugin when mature
    server.ext('onPostHandler', middleware(
        {
            application: require('./../app/App'),
            routes: require('./../app/routes_iso'),
            statsFile: './../app/webpack-stats.json'
        }
    ));

    next();
}

register.attributes = {
    name: 'app',
    version: '1.0.0'
};

export default register;