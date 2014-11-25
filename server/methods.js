Meteor.methods({
  newGame: function (phrase, max_players, time_limit) {
    var phrase = phrase.toLowerCase();
    var max_players = (max_players ? max_players : 8);
    var time_limit = (time_limit ? time_limit : 7); // in minutes
    var start = moment();
    var end = moment().add(time_limit, 'minutes');
    var user = Meteor.user();
    var game = {
      host: {_id: user._id, name: user.profile.name },
      players: [],
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
      Meteor.call('joinGame', gameId, 'host');
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
        GameEvents.insert({gameId: gameId, eventTime: moment().toDate(), eventType: 'guessIncorrect', eventDesc: Meteor.user().profile.name + ' guessed letter "' + letter + '" incorrectly'});
      } else {
        // is correct guess
        GameEvents.insert({gameId: gameId, eventTime: moment().toDate(), eventType: 'guessCorrect', eventDesc: Meteor.user().profile.name + ' correctly guessed letter "' + letter});
      }
    }
  },
  joinGame: function (gameId, role) {
    if (Meteor.userId()) {
      var game = Games.findOne(gameId);
      if (! Roles.userIsInRole(Meteor.userId(), ['host'], gameId)) {
        if (role == 'host') { // add as host
          Roles.addUsersToRoles(Meteor.userId(), ['host'], gameId);
          GameEvents.insert({gameId: gameId, eventTime: moment().toDate(), eventType: 'hostJoined', eventDesc: Meteor.user().profile.name + ' is hosting'});
        } else { // add as player
          if (! Roles.userIsInRole(Meteor.userId(), ['player'], gameId)) {
            if (game.players.length < game.max_players) {
              Roles.addUsersToRoles(Meteor.userId(), ['player'], gameId);
              if (game.players.indexOf(Meteor.userId()) === -1) {
                console.log('player added');
                Games.update(gameId, { $push: { 'players': {_id: Meteor.userId()}}});
                GameEvents.insert({gameId: gameId, eventTime: moment().toDate(), eventType: 'playerJoined', eventDesc: Meteor.user().profile.name + ' joined the game'});
              }
            } else {
             console.log('game full');
            }
          }
        }
      }
    } else {
      console.log('not logged in');
    }
  },
  leaveGame: function (user) {
    
    var userId = user._id
    
    activeInGames = Games.find({'players': {$elemMatch: {_id: userId}}});
    
    activeInGames.forEach(function (game) {
      console.log(game);
      var gameId = game._id;
      var gamePlayerList = game.players;
      console.log(gamePlayerList);
      var newPlayerList = gamePlayerList.splice(_.indexOf(gamePlayerList, _.findWhere(gamePlayerList, { _id : userId})), 1);
      console.log(newPlayerList);
      Games.update(gameId, {$set: {'players': newPlayerList}}, function(error) {
        if (error) {
          console.log(error);
        }
      });
      GameEvents.insert({gameId: gameId, eventTime: moment().toDate(), eventType: 'playerLeft', eventDesc: user.profile.name + ' left the game'});
      Roles.removeUsersFromRoles(userId, ['player'], gameId);
    });
  }
});