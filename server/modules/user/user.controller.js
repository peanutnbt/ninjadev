const User = require('./user.model');
const encrypt = require('../../common/encrypt');
const middlewareCommon = require('../../common/middleware.common');
const errorConfigs = require('../../configs/error.configs');
var controller = {};
const userService = require('./user.service');

function fillUser(req) {
	//update private infor must be admin
	var newInfoUser = {};
	if (req.user.role == 'Admin') {
		if (req.body.confirmEmail)
			newInfoUser.email = req.body.confirmEmail;

		if (req.body.isBan)
			newInfoUser.is_ban = req.body.isBan;

		if (req.body.role)
			newInfoUser.role = req.body.role;

		if (req.body.username)
			newInfoUser.username = req.body.username;

		if (req.body.email)
			newInfoUser.email = req.body.email;
	}

	if (req.body.phone)
		newInfoUser.phone = req.body.phone;

	if (req.body.firstName)
		newInfoUser.first_name = req.body.firstName;

	if (req.body.lastName)
		newInfoUser.last_name = req.body.lastName;

	if (req.body.password)
		newInfoUser.password = encrypt.generateHash(req.body.password);

	if (req.body.linkAvatar)
		newInfoUser.link_avatar = req.body.linkAvatar;

	return newInfoUser;
}

controller.createUser = function(req, res, next) {
	var id = req.body.id;
	var dataUser = fillUser(req);
	var newUser = new User();
	Object.assign(newUser, dataUser);
	newUser.save().then(user => {
		res.locals.newUser = {
			'message': 'create successfuly'
		};
		next();
	}).catch(err => {
		middlewareCommon.error(req, res, next, errorConfigs.QUERY_EXCEPTION);
	})
}

controller.getUserById = function(req, res, next) {
	var id = req.params.id;
	if (req.user.role == 'Admin') {
		User.findOne({
			where: {
				'id': id,
			}
		}).then(user => {
			res.locals.user = user;
			next();
		}).catch(err => {
			middlewareCommon.error(req, res, next, errorConfigs.QUERY_EXCEPTION);
		});
	} else {
		res.locals.user = req.user;
		next();
	}

}

controller.getPublicInfoUserById = async function(req, res, next) {
	var id = req.params.id;
	try{
		res.locals.publicInfoUser = await userService.getPublicInfoUserById(id);
		next();
	}catch(error){
		next(error);
	}
}

controller.getAllUsers = function(req, res, next) {
	User.findAll({
		raw: true
	}).then(users => {
		res.locals.allUsers = users;
		next();
	})
	.catch(err => {
		middlewareCommon.error(req, res, next, errorConfigs.QUERY_EXCEPTION);
	});
}

controller.banUser = function(req, res, next) {
	var id = req.params.id;
	User.update({
		'is_ban': 1
	}, {
		where: {
			'id': id
		}
	}).then(() => {
		res.locals.banUser = {
			'id': id,
			'message': 'ban successfuly'
		};
		next();
	}).catch(err => {
		middlewareCommon.error(req, res, next, errorConfigs.QUERY_EXCEPTION);
	});;
}

controller.updateUser = async function(req, res, next) {
	var id = req.params.id;
	var newInfoUser = fillUser(req);
	console.log(newInfoUser);
	await userService.updateUser(id, newInfoUser);
	res.locals.updateUser = {
		'id': id,
		'message': 'update successfuly'
	}
	next();

}

controller.updateUsername = async function(req, res, next) {
	var id = req.params.id;
	
	try{
		if (!req.body.username) {
			return res.json(errorConfigs.NO_DATA);
		}
		var user = await userService.getUserById(id);

		//fb account just change username 1 time
		if (user.username == user.facebook_id) {
			//check username exist
			var newUsername = await userService.getUser({'username': req.body.username});
			if (newUsername) {
				return res.json(errorConfigs.USER_ALREADY_TAKEN);
			} else {
				// can save new username
				await userService.updateUser(id, {'username': req.body.username});

				res.locals.updateUsername = {
					'id': id,
					'message': 'update successfuly'
				}
				next();
			}
		} else {
			return res.json(errorConfigs.ACCESS_DENIED);
		}
	}
	catch(err){
		console.log(err);
		return res.json(errorConfigs.QUERY_EXCEPTION);
	}

}

controller.updateEmail = async function(req, res, next) {
	var id = req.params.id;

	try{
		if (!req.body.email) {
			return res.json(errorConfigs.NO_DATA);
		}
		var user = await userService.getUserById(id);
		//check email is empty or not
		if (!user.email) {
			//check username exist
			var newEmail = await userService.getUser({'email': req.body.email});
			if (newEmail) {
				return res.json(errorConfigs.EMAIL_ALREADY_EXIST);
			} else {
				// can save new username
				await userService.updateUser(id, {'email': req.body.email});

				res.locals.updateEmail = {
					'id': id,
					'message': 'update successfuly'
				}
				next();
			}
		} else {
			return res.json(errorConfigs.ACCESS_DENIED);
		}
	}
	catch(err){
		console.log(err);
		return res.json(errorConfigs.QUERY_EXCEPTION);
	}

}

controller.changePassword = async function(req, res, next) {
	var user = req.user;
	var oldPassword = req.body.oldPassword;
	var password = req.body.password;

	if (encrypt.validPassword(oldPassword, user.password)) {
		password = encrypt.generateHash(password);
		await userService.updateUser(user.id, {
			'password': password,
		});
		res.locals.changePassword = {
			id: user.id,
			'message': 'password is changed'
		}
		next();
	} else {
		middlewareCommon.error(req, res, next, errorConfigs.ACCESS_DENIED);
	}

}

module.exports = controller;