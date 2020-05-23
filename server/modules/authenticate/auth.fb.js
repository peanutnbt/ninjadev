module.exports = function(passport) {
	var express = require('express');
	var router = express.Router();
	var errorConfigs = require('../../configs/error.configs');
	var commonMiddleware = require('../../common/middleware.common');

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated())
			return next();

		res.redirect('/');
	}

	router.get('/auth/facebook',
		passport.authenticate('facebook', {
			authType: 'rerequest',
			scope: ['email']
		}));

	router.get('/auth/facebook/callback', function(req, res, next) {
		passport.authenticate('facebook', function(err, user, info) {
			if (err) {
				return next(err);
			}

			if (!user) {
				return res.json({'message': 'no user'});
			}

			req.logIn(user, function(err) {
				if (err) {
					return next(err);
				}
				if (req.user.is_ban) {
					return res.json({'message': 'ban'});
				} else if (!req.user.confirm_email) {
					return res.json({'message': 'not confirm'});
				} else {
					return res.redirect('/');
				}
			});


		})(req, res, next);
	});

	return router;
}