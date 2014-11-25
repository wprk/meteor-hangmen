Template.home.helpers({
  noGamesExist: function() {
    return (Games.find({end_time: {$gte: new Date}}).count() === 0);
  }
})

Template.home.events({
  'click #newGame': function() {
    Meteor.call('newGame', function(error, gameId) {
      if (! error) {
        Router.go('game', {_id: gameId});
      }
    });
  }
})