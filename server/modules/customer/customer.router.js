var express = require('express');
var router = express.Router();
const middlewareCommon = require('../../common/middleware.common');
const controller = require('./customer.controller');

/* GET users listing. */
router.post('/', controller.createCustomer, function(req, res, next){
	 res.json(res.locals.createCustomer);
}); 

module.exports = router;