Template.gamesList.helpers({
  activeGames: function() {
    return Games.find({end_time: {$gte: new Date}});
  }
})