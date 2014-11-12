Template.game.helpers({
  lettersList: function(letters_guessed) {
  	alphabet = ARRAY_ALPHABET;
  	var letters = [];
    for(i = 0; i < alphabet.length; i++) {
      letters.push({letter: alphabet[i], value: (letters_guessed[alphabet[i]] ? 1 : 0)});
    }
    return letters;
  }
})