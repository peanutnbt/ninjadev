
module.exports = function() {
	var express = require('express');
	var router = express.Router();


	// LOGOUT ==============================
	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});


	return router;
};

