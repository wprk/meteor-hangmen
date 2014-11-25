Meteor.startup(function () {
  if (Roles.getAllRoles().count() === 0) {
    Roles.createRole('player');
    Roles.createRole('host');
  }
  
  // Remove configuration entries in case service is already configured
  ServiceConfiguration.configurations.remove({
    $or: [{
      service: "facebook"
    }, {
      service: "google"
    }, {
      service: "github"
    }]
  });
  
  try {
    enviroment = process.env.NODE_ENV;
    if (enviroment == 'production') {
      ServiceConfiguration.configurations.insert({
        "service" : "facebook",
        "appId" : "1508243372795857",
        "secret" : "1875de48c5d932918e7f5affaa3db720"
      });
      ServiceConfiguration.configurations.insert({
        "service" : "google",
        "clientId" : "794125023120-l2eln02uhtlqlpbbq5lhpv9bjlhip3a6.apps.googleusercontent.com",
        "secret" : "UAaQXJv4Gy8QkRvyJDlXbIcw"
      });
      // ServiceConfiguration.configurations.insert({
      //   "service" : "github",
      //   "clientId" : "a07fce39de76f96a1024",
      //   "secret" : "e6f87bc5ef3e9fe259859c3f59e80b8053eae25f"
      // });
    } else {
      ServiceConfiguration.configurations.insert({
        "service" : "facebook",
        "appId" : "1508244652795729",
        "secret" : "bd2d7021dc46310eebfe6c3642d7039e"
      });
      ServiceConfiguration.configurations.insert({
        "service" : "google",
        "clientId" : "181059737409-4ljduubsrrimbifgcbhj1ti93l6600ai.apps.googleusercontent.com",
        "secret" : "7W5D5pbsh7euajSJRaw3mWhM"
      });
      // ServiceConfiguration.configurations.insert({
      //   "service" : "github",
      //   "clientId" : "18eca7f55e5118c8c2c0",
      //   "secret" : "fd7e6626512861b84979ff99794da1fdf3ca3f41"
      // });
    }
  } catch(error) {
    console.log(error.message);
  }
});