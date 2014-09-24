$(function(){
  // Toggle friendship of a user when username is clicked.
  $('body').on('click', '.username', function(event) {
    event.preventDefault();
    app.allFriends[$(this).text()] = !app.allFriends[$(this).text()];
    app.displayRoom();
    app.displayFriendList();
  });

  // setInterval(function() {
  //   app.fetch.bind(app);
  // }, 2000);

});
