Meteor.methods({
  newGame: function (phrase, max_players, time_limit) {
    var phrase = 'This is a sentence'.toLowerCase();
    var max_players = (max_players ? max_players : 8);
    var time_limit = (time_limit ? time_limit : 7); // in minutes
    var start = moment();
    var end = moment().add(time_limit, 'minutes');
    var user = {name: 'Testing User'};
    var game = {
      host: user,
      players: [user],
      max_players: max_players,
      time_limit: time_limit,
      start_time: start.toDate(),
      end_time: end.toDate(),
      status: 0,
      hangman_phrase: phrase,
      letters_guessed: {},
      eventLog: []
    };
    var gameId = Games.insert(game, function(error) {
      if (error) {
        console.log(error);
        return false;
      } else {
        return true;
      }
    });
  },
  guessLetter: function (gameId, letter) {
    game = Games.findOne({_id: gameId});
    newEventLog = game.eventLog;
    newGuesses = game.letters_guessed;
    newGuesses[letter] = 1;
    Games.update(gameId, {$set: { letters_guessed: newGuesses}});
    if (letter.match(/^[a-z]+$/)) { // is valid lowercase letter
      if (game.hangman_phrase.indexOf(letter) === -1) { // is incorrect guess
        Games.update(gameId, { $inc: {status: 1}});
        newEventLog.push({eventTime: moment().toDate(), eventDesc: 'Testing User guessed letter "' + letter + '" incorrectly'});
      } else {  // is correct guess
        newEventLog.push({eventTime: moment().toDate(), eventDesc: 'Yeeehaa Testing User correctly guessed letter "' + letter});
      }
    }
    Games.update(gameId, {$set: {eventLog: newEventLog}});
  }
});