Template.game.helpers({
  lettersList: function(letters_guessed) {
  	console.log(letters_guessed);
  	alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  	var letters = [];
    for(i = 0; i < alphabet.length; i++) {
      letters.push({letter: alphabet[i], value: (alphabet[i] in letters_guessed ? 1 : 0)});
    }
    return letters;
  }
})