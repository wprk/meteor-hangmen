Meteor.users.find({ "status.online": true }).observe({
  removed: function(userId) {
    Meteor.call('leaveGame', userId)
  }
});