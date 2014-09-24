$(function() {

  var talk = function() {
    var $text = $('#newText').val();
    var username = window.location.search.split('username=')[1].split('&')[0];
    var roomname = app.activeChatRoom;
    var message = {
      username: username,
      text: $text,
      roomname: roomname || 'Lobby'
    };
    app.send(message);
    app.fetch(true);
    $('#newText').val(''); // clear input field
  };

  // Send message if talk button clicked
  $('.talk').click(function(e) { talk(); });
  // Fetch messages if update button clicked
  $('.update').click(function() { app.fetch(); });
  // Send message if Enter key is hit in input field
  $('#newText').keyup(function(e) {
    e.preventDefault();
    if (e.which === 13) talk();
  });
});
