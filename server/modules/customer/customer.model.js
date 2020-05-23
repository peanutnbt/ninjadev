const dbContext = require('../../configs/db.context.js');
var _sequelize = dbContext.sequelize;
var Sequelize = dbContext.Sequelize;
var Op = dbContext.Op;
// ------ end db context -----


const Customer = _sequelize.define('"Customer"', {
 
  name: {
    type: Sequelize.STRING,
    defaultValue: '' //default values
  },
  email: {
    type: Sequelize.STRING,
    defaultValue: '' //default values
  }, 
  phone: {
    type: Sequelize.INTEGER,
    defaultValue: 0 //default values
  },
  id_course: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: false, //remove default column (createAt...),
});

Customer.Op = Op;

module.exports = Customer;
