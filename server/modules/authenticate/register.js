module.exports = function(passport) {
	var express = require('express');
	var router = express.Router();
	var commonMiddleware = require('../../common/middleware.common');
	const errorConfigs = require('../../configs/error.configs');
	
	router.post('/signup', function(req, res, next) {
		passport.authenticate('local-signup', function(err, user, info) {
			if (err) { 
				return res.json(err); 
			}
			if (!user) { 
				return res.json(errorConfigs.USER_NOT_EXIST);
			}

			req.logIn(user, function(err) {
				if (err) { 
					return next(err); 
				}

				if (req.user.is_ban) {
					commonMiddleware.error(req, res, next, errorConfigs.BANNED);
				}
				res.json(req.user);
			});

			
		})(req, res, next);
	});

	return router;
};