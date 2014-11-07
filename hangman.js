Games = new Meteor.Collection('games');

if (Meteor.isClient) {
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
}

if (Meteor.isServer) {
  Meteor.methods({
    newGame: function () {
      var start = moment();
      var end = moment().add(7, 'minutes');
      var phrase = 'This is the phrase';
      var words = [ {length: 4}, {length: 2}, {length: 3}, {length: 8} ];
      var hangman_phrase = {
        phrase: 'This is the sentence',
        words: words
      };
      var game = {
        host: Meteor.userId,
        hangman_phrase: hangman_phrase,
        players: 1,
        start_time: start.toDate(),
        end_time: end.toDate(),
        status: 0
      };
      Games.insert(game, function(error) {
        if (error) {
          console.log(error);
          return false;
        } else {
          return true;
        }
      });
    }
  })
}
