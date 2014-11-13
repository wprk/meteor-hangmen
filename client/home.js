Template.home.helpers({
  noGamesExist: function() {
    return (Games.find({}).count() === 0);
  }
})

Template.home.events({
  'click #newGame': function() {
    Meteor.call('newGame', function() {
      alert('new game started');
    });
  }
})