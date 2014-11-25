Accounts.onCreateUser(function(options, user) {
		
	if (user.services != null) {
		service = _.keys(user.services)[0];
		email = user.services[service].email;
		if (email != null) {
			oldUser = Meteor.users.findOne({
				"emails.address": email
			});
			if (oldUser != null) {
				if (oldUser.services == null) {
					oldUser.services = {};
				}
				oldUser.services[service] = user.services[service];
				Meteor.users.remove(oldUser._id);
				user = oldUser;
			} else {
				if (user.services[service].email != null) {
					user.emails = [{
						address: user.services[service].email,
						verified: true
					}];
				}
			}
		}
	}
	
	if (user.profile == null) {
		user.profile = {};
		if (options.profile != null) {
			user.profile.name = options.profile.name;
		}
	}
	
	return user;
});