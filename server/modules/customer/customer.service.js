const Customer = require('./customer.model');
const dbContext = require('../../configs/db.context.js');
const actionCommon = require('../../common/action.common');
var sequelize = dbContext.sequelize;
var Sequelize = dbContext.Sequelize;
var Op = dbContext.Op;
// ------ end db context -----
var service = {};

service.createCustomer = async function(dataCustomer) {
	var result;
	var newCustomer = new Customer();
	Object.assign(newCustomer, dataCustomer);

	await newCustomer.save().then(customer => {
		result = {
			'newCustomer': customer,
			'message': 'create successfuly'
		};
	}).catch(err => {
		throw err;
	})

	return result;
}
 
module.exports = service;