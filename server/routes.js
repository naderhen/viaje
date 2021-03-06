import debug from 'debug';
import User from './models/User';
import Event from './models/Event';
// TODO Alter caching, disable for dev and enable for prod.

export default [
    {
        method: '*',
        path: '/assets/{param*}',
        config:{
            auth: false,
            handler: {
                directory: {
                    path: __dirname + './../../dist'
                }
            }
        }
    },
    {
        method: '*',
        path: '/',
        config: {
            auth: false,
            handler: function (req, rep){
                debug('dev')('real server request');
                const data = {sample:'data'};
                rep()
            }
        }
    },
    {
        method: '*',
        path: '/api/{route*}',
        config:{
            auth: false,
            handler: {
                proxy: {
                    passThrough: true,
                    xforward: true,
                    mapUri: function (req, cb){
                        let baseUrl = 'http://localhost:9090';
                        baseUrl += '/' + req.params.route;
                        console.log('proxy api route', baseUrl);
                        cb(null, baseUrl);
                    }
                }
            }
        }
    }
];
