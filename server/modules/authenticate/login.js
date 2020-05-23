module.exports = function(passport) {
	var express = require('express');
	var router = express.Router();
	var errorConfigs = require('../../configs/error.configs');
	var commonMiddleware = require('../../common/middleware.common');

	router.post('/login', function(req, res, next) {
		passport.authenticate('local-login', function(err, user, info) {
			if (err) {
				if (err.code) {
					return res.json(err);
				} else {
					return res.json(errorConfigs.SERVER_EXCEPTION);
				}
			}

			if (!user) {
				return res.json(errorConfigs.ACCOUNT_NOT_MATCH);
			}

			req.logIn(user, function(err) {
				if (err) {
					return next(err);
				}
 
				if (req.user.is_ban) {
					commonMiddleware.error(req, res, next, errorConfigs.BANNED);
				} else if (!req.user.confirm_email) {
					commonMiddleware.error(req, res, next, errorConfigs.NOT_ACTIVE);
				} else {
					return res.json(req.user);
				}
			});


		})(req, res, next);
	});

	return router;
}