Template.gamesList.helpers({
  playerCount: function(players) {
    return players.length;
  },
  readableStatus: function(status) {
    switch(status) {
      case 0:
        return 'Not Started';
      case 1:
        return 'Base in place';
      case 2:
        return 'Going Up';
      case 3:
        return 'Bottom and Side';
      case 4:
        return 'Going over the top';
      case 5:
        return 'There\'s the nousse';
      case 6:
        return 'Head';
      case 7:
        return 'Legs';
      case 8:
        return 'Arms';
      case 9:
        return 'DEAD';
    }
  }
})