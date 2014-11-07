Template.gamesList.helpers({
  activeGames: function() {
    return Games.find({end_time: {$gte: new Date}});
  },
})
Template.gamesList.events({
  'click #newGame': function() {
    Meteor.call('newGame', function() {
      alert('new game started');
    });
  }
})