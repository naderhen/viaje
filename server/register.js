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
            //application: require('./../app/Root'),
            routes: require('./../app/routes'),
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