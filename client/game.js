Template.game.helpers({
  blah: function() {
    console.log(Iron.controller()); // Games.findOne({_id:});
  },
  lettersList: function(letters_guessed) {
  	alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    for(i = 1; i <= alphabet.length; i++) {
      var letters[] = {letter: alphabet[i], value: (alphabet[i] in letters_guessed ? true : false)};
    }
    return letters;
  }
})