Meteor.methods({
  newGame: function () {
    var max_players = 8;
    var time_limit = 7; // in minutes
    var start = moment();
    var end = moment().add(time_limit, 'minutes');
    var phrase = 'This is the phrase';
    var words = [ {length: 4}, {length: 2}, {length: 3}, {length: 8} ];
    var hangman_phrase = {
      phrase: 'This is the sentence',
      words: words
    };
    var game = {
      host: {name: 'Testing User'},
      players: 1,
      max_players: max_players,
      time_limit: time_limit,
      start_time: start.toDate(),
      end_time: end.toDate(),
      status: 0,
      hangman_phrase: hangman_phrase,
      letters_guessed: []
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
});