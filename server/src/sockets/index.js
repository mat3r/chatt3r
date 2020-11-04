// external dependencies
const socketio = require('socket.io');

// local dependencies
const formatMessage = require('./messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./users');

// constants declaration
const botName = 'Admin';

exports.socketServer = (app, server) => {
  // instantiate Socket.IO
  const io = socketio.listen(server);
  io.set('origins', '*:*');

  io.on('connection', socket => {
    console.log('Socket Connection Established with ID :'+ socket.id);

    // new user joining chat room
    socket.on('join', async ({ username, room }) => {
      // join user to chat room
      const user = userJoin (socket.id, username, room);
      socket
        .join (user.room);
      // Welcome the user joining the chat room
      socket
        .emit('server', await formatMessage(botName, `Hi, ${username }. Welcome to Chatt3r. You joined ${user.room} chat room.`, user.room));
      // Broadcast name of user to chat room
      socket
        .broadcast
        .to(user.room)
        .emit('server', await formatMessage (botName, `${username} has joined the chat.`, user.room));
      // send users in the chat room to everyone in the chat room
      const users = getRoomUsers(user.room);
      io
        .to(user.room)
        .emit('USERS', users);
    });

    // listen for new chat and broadcast chat
    socket.on('user', async (mesg) => {
      const user = getCurrentUser(socket.id);
      io
        .to(user.room)
        .emit('server', await formatMessage (user.username, mesg, user.room));
    });

    // user left the chat room
    socket.on('leave', async () => {
      const user = userLeave (socket.id);
      if (user) {
        // notifying the users in the cat room, that user left
        io
          .to(user.room)
          .emit('server', await formatMessage (botName, `${user.username} has left the chat.`, user.room));
        // update users and room info for all
        io
          .to(user.room)
          .emit('USERS', {
            room  : user.room,
            users : getRoomUsers(user.room)
          });
      }
    });

    // Broadcast a user has left 
    socket.on('disconnect', async () => {
      const user = userLeave (socket.id);
      if (user) {
        // notifying the users in the cat room, that user left
        io
          .to(user.room)
          .emit('server', await formatMessage (botName, `${user.username} has left the chat.`, user.room));
        // update users and room info for all
        io
          .to(user.room)
          .emit('users', {
            room  : user.room,
            users : getRoomUsers(user.room)
          });
      }
    });
  });

};
