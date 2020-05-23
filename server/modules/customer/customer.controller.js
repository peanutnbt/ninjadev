var controller = {};
const customerService = require('./customer.service');

controller.createCustomer = async function(req, res, next) {
	var dataCustomer = {};
	dataCustomer.name = req.body.name;
	dataCustomer.email = req.body.email;
	dataCustomer.phone = req.body.phone;
	dataCustomer.id_course = req.body.idCourse || 0;

	try{
		var processCreateCustomer = customerService.createCustomer(dataCustomer);
		res.locals.createCustomer = await  processCreateCustomer;
		next();
	}catch(error){
		next(error);
	}
}
 
module.exports = controller;