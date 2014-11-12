Router.configure({
  layoutTemplate: 'defaultLayout'
});

Router.route('/', function () {
  this.render('home');
});

Router.route('/games', {
  name: 'gamesList',
  waitOn: function() {
    return Meteor.subscribe('gamesList');
  },
  data: function() {
    return {
      activeGames: Games.find()
    }
  }
});

Router.route('/game/:_id', {
  name: 'game',
  waitOn: function() {
    return Meteor.subscribe('game', this.params._id);
  },
  data: function() {
    return Games.findOne({_id: this.params._id});
  }
});