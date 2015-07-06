import Hapi from 'hapi';
import socketio from 'socket.io';
import thinky from 'thinky';

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

var io = socketio(server.listener);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('subscribe', function(room, cb) {
    console.log('attempting to join ' + room)
    socket.join(room, function() {
        cb(true)
        console.log("EMITTING")
        Event.run().then(function(result) {
            io.emit('message', {room: room, initial: true, data: result})
        })
        
    });
  })

  socket.on('unsubscribe', function(room, cb) {
    console.log('attempting to leave ' + room)
    socket.leave(room);
  })
});

/* MOVE */

import Event from './models/Event';

var event_feed = {
    name: 'events',
    find: Event.changes(),
    room: "events"
}

Event.changes().run().then(function(feed) {
    feed.each(function(err, doc) {
        var data_obj = {old: doc.getOldValue(), new: doc};

        if (!doc.isSaved()) {
            data_obj['old'] = doc;
            data_obj['new'] = undefined;
        }


        io.to(event_feed.room).emit('message', {room: event_feed.room, initial: false, data: data_obj});
    })
})
