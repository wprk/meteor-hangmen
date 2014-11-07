Router.configure({
  layoutTemplate: 'defaultLayout'
});

Router.route('/', function () {
  this.render('home');
});

Router.route('/games', function () {
  this.render('gamesList');
});

Router.route('/game/:_id', {
  name: 'game',
  data: function() {
    return Games.findOne({_id: this.params._id})
  },
  waitOn: function() {
    // return Meteor.subscribe('game', this.params._id);
  }
});