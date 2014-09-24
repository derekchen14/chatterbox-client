var Message = function(text, createdAt, objectId, username, roomname) {
  this._text = text;
  this._createdAt = createdAt;
  this._objectId = objectId;
  this._username = username;
  this.chatroom = roomname || 'Lobby';
  this.stringTime = this.timeStringify();
};

Message.prototype.timeStringify = function() {
  return moment(this._createdAt).fromNow();
};
Message.prototype.template = function() {
  return '<div class="message"> \
  <a class="username" href="#">'+this._username+'</a> \
  <small class="createdAt">'+this.stringTime+'</small> \
  <p class="content friend" %>'+this._text+'</p></div>';
};
Message.prototype.fromFriend = function() {
  return app.allFriends[this._username];
};
