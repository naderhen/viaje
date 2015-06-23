import debug from 'debug';

// TODO Alter caching, disable for dev and enable for prod.

export default [
    {
        method: '*',
        path: '/assets/{param*}',
        config:{
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