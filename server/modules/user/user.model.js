const dbContext = require('../../configs/db.context.js');
const actionCommon = require('../../common/action.common');
var _sequelize = dbContext.sequelize;
var Sequelize = dbContext.Sequelize;
var Op = dbContext.Op;
// ------ end db context -----
var userDefault = {
    linkAvatar : '/public/img/avatar-default.jpg',
};
//user default

var today = actionCommon.formatDateDDMMYYY(new Date());

const User = _sequelize.define('"User"', {
 
  username: {
    type: Sequelize.STRING,
    defaultValue: '' //default values
  },
  email: {
    type: Sequelize.STRING,
    defaultValue: '' //default values
  },
  confirm_email:{
    type: Sequelize.INTEGER,
    defaultValue: 0 //default values
  },
  is_ban: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  phone: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  first_name: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  last_name: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  created_time: {
    type: Sequelize.STRING,
    defaultValue: today
  },
  facebook_id: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  link_avatar: {
    type: Sequelize.STRING,
    defaultValue: userDefault.linkAvatar
  },
  password: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  role: {
    type: Sequelize.STRING,
    defaultValue: ''
  }
}, {
  timestamps: false, //remove default column (createAt...),
});

User.Op = Op;

module.exports = User;
