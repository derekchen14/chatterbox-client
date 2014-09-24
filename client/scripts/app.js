var app = {
  // server: url
  init: function() {
    app.allMessages = {};
    app.allRooms = {};
    app.allFriends = {};
    app.limit = 50;
    app.activeRoom = 'Lobby';
    app.server = 'https://api.parse.com/1/classes/chatterbox';
    app.fetch();
  },
  fetch: function(update) {
    $.ajax({ // always use this url
      url: app.server,
      data: {order: '-createdAt'},
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        app.processData(data.results);
      },  // developer.mozilla.org/en-US/docs/Web/API/console.error
      error: function (data) {
        console.error('chatterbox: Failed to fetch messages');
      }
      // complete: function() {
      //   console.log('Remove spinner');
      // }
    });
  },
  send: function(message) {
    $.ajax({ // always use this url
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function () {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  },

  // DATA PROCESSING
  processData: function(data) {
    // $('ul#messages').html("");
    for (var i = 0; i < data.length; i++) {
      if (app.isDuplicate(data,i)) continue;
      if (data[i].text === undefined) continue;
      var d = data[i];
      // if this data is not yet stored, then store that data
      if (!app.allMessages[d.objectId]) {
        // should run as a before-hook or middleware on the model
        var text = app.sanitize(d.text, 'text');
        var username = app.sanitize(d.username, 'user');
        var room = app.sanitize(d.roomname, 'room');

        if(!app.allFriends[username]) { // set the flag for isFriend
          app.allFriends[username] = false;
        }
        if(app.allRooms[room] === undefined) { // set the flag for roomActive
          app.allRooms[room] = true;
          app.displayRoomList(room);
        }
        // Make the message instance, store it, and display it
        var message = new Message(text, d.createdAt, d.objectId, username, room);
        message.stringTime = message.timeStringify();
        app.allMessages[d.objectId] = message;
        app.displayMessage(message);
      }
    }
  },
  displayMessage: function(message) {
    $(message.template()).appendTo($('ul#messages'));
    app.displayRoom()
  },
  displayRoom: function() {
    for(var key in app.allMessages) {
      var message = app.allMessages[key];

      if(message.fromFriend()) {
        $('#'+key).addClass('friend');
      }
      if (message.chatroom === app.activeRoom) {
        $('#'+key).removeClass('hidden');
      } else {
        $('#'+key).addClass('hidden');
      }
    }
  },
  displayRoomList: function(roomname) {
    $('.dropdown-menu').append('<li><a class="room-item">'+ roomname +'</a></li>');
  },
  displayFriendList: function() {
    $('.friends').html('');
    for(var friend in app.allFriends) {
      if(app.allFriends[friend]) {
        $('.friends').append('<a class="list-group-item friend-item">' + friend + '</a>');
      }
    }
  },

  // HELPER FUNCTIONS
  isDuplicate: function(data, i) {
    if (i>app.limit) {
      return true;
    }
    if (i<100) {
      var text = data[i].text;
      var nextText = data[i+1].text;
      return (text === nextText)
    }
    return false;
  },
  sanitize: function(text, type) {
    var regex = /^[\w .,!?]+$/;
    if(regex.test(text)) {
      return text;
    } else if (type === 'text') {
      return "[ -- Message removed to prevent possible attack -- ]";
    } else if (type === 'user') {
      var num = Math.floor( Math.random()*10000 ).toString();
      return 'User'+num;
    } else if (type === 'room') {
      return "Room Attack"
    }
  }
}

app.init();