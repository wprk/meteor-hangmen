Meteor.publish('gamesList', function() {
  return Games.find({});
    return Games.find({end_time: {$gte: new Date}});
});

Meteor.publish('game', function(gameId) {
  return Games.find({_id: gameId}); 
});

Meteor.publish('gameEvents', function(gameId) {
  return GameEvents.find({gameId: gameId}); 
});