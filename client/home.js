Template.home.events({
  'click #newGame': function() {
    Meteor.call('newGame', function() {
      alert('new game started');
    });
  }
})