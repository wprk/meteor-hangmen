Meteor.methods({
  newGame: function (phrase, max_players, time_limit) {
    var phrase = 'This is a sentence'.toLowerCase();
    var max_players = (max_players ? max_players : 8);
    var time_limit = (time_limit ? time_limit : 7); // in minutes
    var start = moment();
    var end = moment().add(time_limit, 'minutes');
    var user = Meteor.user();
    var game = {
      host: {_id: user._id},
      players: [{_id: user._id, name: user.profile.name}],
      max_players: max_players,
      time_limit: time_limit,
      start_time: start.toDate(),
      end_time: end.toDate(),
      status: 0,
      hangman_phrase: phrase,
      letters_guessed: {}
    };
    var gameId = Games.insert(game);
    if (gameId) {
      return gameId;
    }
  },
  guessLetter: function (gameId, letter) {
    var game = Games.findOne({_id: gameId});
    var newGuesses = game.letters_guessed;
    
    newGuesses[letter] = 1;
    Games.update(gameId, {$set: { letters_guessed: newGuesses}});
    
    if (letter.match(/^[a-z]+$/)) {
      // is valid lowercase letter
      if (game.hangman_phrase.indexOf(letter) === -1) {
        // is incorrect guess
        Games.update(gameId, { $inc: {status: 1}});
        GameEvents.insert({gameId: gameId, eventTime: moment().toDate(), eventType: 'incorrectGuess', eventDesc: Meteor.user().name + ' guessed letter "' + letter + '" incorrectly'});
      } else {
        // is correct guess
        GameEvents.insert({gameId: gameId, eventTime: moment().toDate(), eventType: 'correctGuess', eventDesc: 'Yeeehaa ' + Meteor.user().username + ' correctly guessed letter "' + letter});
      }
    }
  },
  joinGame: function (gameId) {
    // var user = Meteor.user();
    // var game = Games.findOne({_id: gameId});
    // var userIds = [];
    // for (var i = 0; i < game.players.length; i++) {
    //   var userId = game.players[i]['_id'];
    //   userIds.push(userId);
    // }
    // // if (user._id == game.host._id) {
    // //   return 'host';
    // // } else {
    // //   console.log('not host');
    // //   if (! user._id in userIds) {
    // //     console.log('not already a player');
    // //     if (game.players.length >= game.max_players) {
    // //       console.log('max players reached');
    // //       return 'guest';
    // //     } else {
    // //       console.log('added as player');
    // //       Games.update(gameId, {$push: {players: {_id: user._id, name: user.profile.name}}});
    // //       return 'player';
    // //     }
    // //   }
    // // }
    return 'host';
  }
});