Template.game.helpers({
  lettersList: function(letters_guessed) {
  	alphabet = ARRAY_ALPHABET;
  	var letters = [];
    for(i = 0; i < alphabet.length; i++) {
      letters.push({letter: alphabet[i], value: (letters_guessed[alphabet[i]] ? 1 : 0)});
    }
    return letters;
  },
  printPhrase: function(phrase, letters_guessed) {
    letters = phrase.split('');
    console.log(letters);
    var words = [];
    var word = [];
    for(i = 0; i < letters.length; i++) {
      if (letters[i] == ' ') {
        words.push({letters: word});
        var word = [];
      } else {
        if (letters[i] in letters_guessed) {
          word.push({value: letters[i], class: 'guessed'});
        } else {
          word.push({value: '&nbsp;', class: 'unguessed'});
        }
      }
    }
    words.push({letters: word});
    console.log(words);
    return words;
  },
  guessStatus: function(value) {
    if (value) {
      return 'guessed';
    } else {
      return 'unguessed';
    }
  },
  gameEvents: function(gameId) {
    return GameEvents.find({gameId: gameId});
  }
})

Template.game.events({
  'click .unguessed': function(e) {
    var letter = e.currentTarget.innerHTML;
    var gameId = Session.get('gameId');
    Meteor.call('guessLetter', gameId, letter);
  }
})