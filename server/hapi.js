import Hapi from 'hapi';

var server = new Hapi.Server();
server.connection({
    host: '0.0.0.0',
    port: process.env.PORT || 8080,
    routes:{
        cors: true,
        payload:{
            timeout: 20000 // 20 seconds
        }
    }});

    server.register([{
        register: require('./register'),
        options: {

        }
    }],{
        // Hapi Options
    },function (err) {
        if (err) {
            // something bad happened loading the plugin
            throw err;
        }

        server.start(function () {
            server.log('info', 'Server running at: ' + server.info.uri);
            console.info("==> ✅  Server is listening");
            console.info("==> 🌎  Go to " + server.info.uri);
        });

        if (process.send) {
            process.send('online');
        }
});