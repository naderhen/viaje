import Hapi from 'hapi';
import thinky from 'thinky';
import hapiAuthJWT from 'hapi-auth-jwt2';
import JWT from 'jsonwebtoken';

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

    var secret = 'NeverShareYourSecret';

    var people = { // our "users database"
        1: {
          id: 1,
          name: 'Jen Jones'
        }
    };


    people[1].token = JWT.sign(people[1], secret);

    console.log(`users token ${people[1].token}`)
    
    var validate = function (decoded, request, callback) {
      console.log(" - - - - - - - decoded token:");
      console.log(decoded);
      console.log(" - - - - - - - request info:");
      console.log(request.info);
      console.log(" - - - - - - - user agent:");
      console.log(request.headers['user-agent']);

      if (!people[decoded.id]) {
          return callback(null, false);
        }
        else {
          return callback(null, true);
        }
    };

    server.register(hapiAuthJWT, function (err) {
      if(err){
        console.log(err);
      }
      // see: http://hapijs.com/api#serverauthschemename-scheme
      server.auth.strategy('jwt', 'jwt', true,
      { key: secret,  validateFunc: validate,
        verifyOptions: { ignoreExpiration: true }
      });
    })

    server.register({
      register: require('hapi-io'),
      options: {}
    }, function(err) {
      console.log(err)
    });

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


var io = server.plugins['hapi-io'].io

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('subscribe', function(room_name, cb) {
    console.log('attempting to join ' + room_name)
    socket.join(room_name, function() {
        cb(true)
        console.log("EMITTING")
        Event.run().then(function(result) {
            io.emit('message', {room_name: room_name, initial: true, data: result})
        })
        
    });
  })

  socket.on('unsubscribe', function(room_name, cb) {
    console.log('attempting to leave ' + room_name)
    socket.leave(room_name);
  })

  socket.on('delete_event', function(event_id) {
    console.log(`attempting to delete ${event_id}`)

    Event.get(event_id).run().then(function(event) {
        event.delete().then(function(result) {
            console.log('DELETED')
        });
    });
  })
});

/* MOVE */

import Event from './models/Event';

var event_feed = {
    name: 'events',
    find: Event.changes(),
    room_name: "events" // should be something like events-1234 where 1234 is user-id
}

Event.changes().run().then(function(feed) {
    feed.each(function(err, doc) {
        var data_obj = {old: doc.getOldValue(), new: doc};

        if (!doc.isSaved()) {
            data_obj['old'] = doc;
            data_obj['new'] = undefined;
        }


        io.to(event_feed.room_name).emit('message', {room_name: event_feed.room_name, initial: false, data: data_obj});
    })
})
