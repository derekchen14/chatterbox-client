var app = {
  // server: url
  init: function() {
    app.fetch();
  },
  fetch: function() {
    $.ajax({ // always use this url
      url: 'https://api.parse.com/1/classes/chatterbox?order=-score',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        app.displayMessages(data.results);
      },  // developer.mozilla.org/en-US/docs/Web/API/console.error
      error: function (data) {
        console.error('chatterbox: Failed to fetch messages');
      }
    });
  },
  send: function(message, username) {
    var fullMessage = {
      'username': username,
      'text': message,
      'roomname': 'made up'
    };
    $.ajax({ // always use this url
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(fullMessage),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
    // fullData = {"username":username, "message":message}
    // $.ajax({ // always use this url
    //   url: 'https://api.parse.com/1/classes/chatterbox',
    //   type: 'POST',
    //   data: JSON.stringify(message),
    //   contentType: 'application/json',
    //   success: function (data) {
    //     console.log('chatterbox: Message sent');
    //   },
    //   error: function (data) {
    //     console.error('chatterbox: Failed to send message');
    //   }
    // });
  },
  sanitizeMessage: function(text) {
    var regex = /^[\w .,!?]+$/;
    if(regex.test(text)) {
      return text;
    } else {
      return "[ -- Message removed to prevent possible attack -- ]";
    }
  },
  sanitizeUsername: function(text) {
    var regex = /^[A-Za-z ]+$/
    if(regex.test(text)) {
      return text;
    } else {
      var num = Math.floor( Math.random()*10000 ).toString();
      return "User"+num;
    }
  },
  displayMessages: function(data) {
    for (var i = 0; i < data.length; i++) {
      if (i < 28) {
        var text = data[i].text;
        var nextText = data[i+1].text;
        var user = data[i].username;
        if (text && user && (text!==nextText)) {
          app.appendToPage(text, user);
        }
      }
    }
  },
  appendToPage: function(text, user) {
    console.log(user+" - "+text);
    var message = app.sanitizeMessage(text);
    var username = app.sanitizeUsername(user);
    var fullMessage = "<span class='use'>"+username+"</span>: "+message;
    $('<li/>').addClass('message').html(fullMessage).appendTo('ul#messages');
  }
}

app.init();

$(function() {
  $('.talk').click(function(){
    var text = $('#newText').val();
    var user = $('#newUser').val();
    app.send(text, user);
    $('#newText').val("");
    $('#newUser').val("");
  })
  $('.update').click(app.fetch);
});

var anything = function() {
  console.log("pppp");
}