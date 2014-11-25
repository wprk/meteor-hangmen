Meteor.startup(function () {
  if (Roles.getAllRoles().count() === 0) {
    Roles.createRole('player');
    Roles.createRole('host');
  }
});