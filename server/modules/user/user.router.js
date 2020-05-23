var express = require('express');
var router = express.Router();
const middlewareCommon = require('../../common/middleware.common');
const controller = require('./user.controller');

/* GET users listing. */
//Owner User
router.get('/profile', middlewareCommon.checkPermission, function(req, res, next){
	res.json(req.user);
});

router.get('/:id', middlewareCommon.checkPermission, middlewareCommon.checkOwnerUser, controller.getUserById, function(req, res, next) {
	res.json(res.locals.user);
});

router.put('/:id', middlewareCommon.checkPermission, middlewareCommon.checkOwnerUser, controller.updateUser, function(req, res, next) {
	res.json(res.locals.updateUser);
});

router.put('/updateUsername/:id', middlewareCommon.checkPermission, middlewareCommon.checkOwnerUser, controller.updateUsername, function(req, res, next) {
	res.json(res.locals.updateUsername);
}); 

router.put('/updateEmail/:id', middlewareCommon.checkPermission, middlewareCommon.checkOwnerUser, controller.updateEmail, function(req, res, next) {
	res.json(res.locals.updateEmail);
});

//public API
router.get('/publicInfo/:id', controller.getPublicInfoUserById, function(req, res, next) {
	res.json(res.locals.publicInfoUser);
});

//use for all user
router.post('/change-password', middlewareCommon.checkPermission, controller.changePassword, function(req, res, next) {
	res.json(res.locals.changePassword);
});

//MUST BE ADMIN
router.get('/', middlewareCommon.checkPermission, middlewareCommon.checkAdmin, controller.getAllUsers, function(req, res, next) {
	res.json(res.locals.allUsers);
});

router.post('/', middlewareCommon.checkPermission, middlewareCommon.checkAdmin, controller.createUser, function(req, res, next) {
	res.json(res.locals.newUser);
});


router.delete('/:id', middlewareCommon.checkPermission, middlewareCommon.checkAdmin, controller.banUser, function(req, res, next) {
	res.json(res.locals.banUser);
});


module.exports = router;