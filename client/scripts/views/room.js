$(function() {
  var createNewRoom = function() {
    var newRoom = $('.makeNewRoom').val();
    if(!app.allRooms[newRoom]) {
      app.displayRoomList(newRoom); // adds new room to rooms list on bottom
      app.allRooms[newRoom] = true; // adding new room to the allrooms array
    }
    makeActive(newRoom); // sets new room to be the activeRoom
    $('.makeNewRoom').val('');
  };
  var makeActive = function(room) {
    room = room || 'Lobby';
    app.activeRoom = room;
    $('#dropRoom:first-child').html(room+'<span class="caret"></span>');
    app.displayRoom(); // updates the messages list to show only the activeEoom
  };

  $('.makeRoomButton').click(function(e) {
    e.preventDefault();
    createNewRoom();
  });
  $('.makeNewRoom').keyup(function(e) {
    e.preventDefault();
    if (e.which === 13) {
      createNewRoom();
    }
  });
  $('roomSelector').on('click', '.room-item', function(e) {
    e.preventDefault();
    makeActive($(this).text());
  });

});
