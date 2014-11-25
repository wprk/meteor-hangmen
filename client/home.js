Template.home.helpers({
  noGamesExist: function() {
    return (Games.find({end_time: {$gte: new Date}}).count() === 0);
  },
  creatingGame: function() {
    if (Session.get('creatingGame')) {
      return true;
    }
    return false;
  }
})

Template.home.events({
  'click #launchGameModal': function() {
    Session.set('creatingGame', true);
  },
  'click .close, click [data-dismiss="modal"]': function() {
    Session.set('creatingGame', false);
  },
  'click #newGame': function() {
    Session.set('creatingGame', false);
    var phrase = $('input#phrase').val();
    var max_players = $('input#maxPlayers').val();
    var time_limit = $('input#timeLimit').val();
    Meteor.call('newGame', phrase, max_players, time_limit, function(error, gameId) {
      if (! error) {
        Router.go('game', {_id: gameId});
      }
    });
  }
})