// route middleware to ensure user is logged in
const errorConfigs = require('../configs/error.configs');
var common = {};
common.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.json({
		notLogin: true,
	});
}


common.checkPermission = function(req, res, next) {
	if (!req.isAuthenticated()) {
		common.error(req, res, next, errorConfigs.NOT_LOGIN);
	} else {
		var user = req.user;
		//check User banned or not
		if (user.is_ban == 1) {
			// redirect to page infor banned
			common.error(req, res, next, errorConfigs.BANNED);
		}
		//active confirm email
		if (user.confirm_email == 0) {
			// redirect to page comfirm mail
			common.error(req, res, next, errorConfigs.NOT_ACTIVE);
		}

		return next();
	}

}

common.checkOwnerUser = function(req, res, next) {
	var id = req.params.id || req.body.id;
	var user = req.user;
	if (user.id == id || user.role == 'Admin') {
		return next();
	} else {
		common.error(req, res, next, errorConfigs.ACCESS_DENIED);
	}
}

//ADMIN
common.checkAdmin = function(req, res, next) {
	var user = req.user;
	if (user.role == 'Admin') {
		return next();
	} else {
		common.error(req, res, next, errorConfigs.NOT_ADMIN);
	}
}


common.error = function(req, res, next, error) {
	res.status(200);
	next({
		code: error.code,
		message: error.message,
	});
}
module.exports = common;