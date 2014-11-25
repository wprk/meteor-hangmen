Router.configure({
  layoutTemplate: 'defaultLayout'
});

Router.route('/', {
  name: 'home',
  waitOn: function() {
    return Meteor.subscribe('gamesList');
  },
  action: function() {
    this.render('home');
  }
});

Router.route('/games', {
  name: 'gamesList',
  waitOn: function() {
    return Meteor.subscribe('gamesList');
  },
  data: function() {
    return {
      activeGames: Games.find({end_time: {$gte: new Date}})
    }
  }
});

Router.route('/game/:_id', {
  name: 'game',
  waitOn: function() {
    return [Meteor.subscribe('game', this.params._id), Meteor.subscribe('gameEvents', this.params._id)];
  },
  data: function() {
    return Games.findOne({_id: this.params._id});
  },
  action: function() {
    Session.set('gameId', this.params._id);
    this.render('game');
  },
  onBeforeAction: function () {
    var gameId = this.params._id;
    Meteor.call('joinGame', gameId, 'player');
    this.next();
  }
});