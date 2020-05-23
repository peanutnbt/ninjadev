const User = require('./user.model');
const dbContext = require('../../configs/db.context.js');
const actionCommon = require('../../common/action.common');
var sequelize = dbContext.sequelize;
var Sequelize = dbContext.Sequelize;
var Op = dbContext.Op;
// ------ end db context -----
var service = {};

service.getUserById = async function(id) {
	var result;
	try {
		await User.findOne({
			where: {
				'id': id,
			},
			raw: true
		}).then(user => {
			result = user;
		});
	} catch (err) {
		throw err;
	};

	return result;
}

service.getPublicInfoUserById = async function(id) {
	var result;
	try {
		await User.findOne({
			where: {
				'id': id,
			},
			attributes: ['username', 'first_name', 'last_name', 'email', 'link_avatar'],
			raw: true
		}).then(user => {
			result = user;
		}).catch(async () => {
			await User.findOne({
				where: {
					'username': id,
				},
				attributes: ['username', 'first_name', 'last_name', 'email', 'link_avatar'],
				raw: true
			}).then(user => {
				result = user;
			})
		})
	} catch (err) {
		throw err;
	};

	return result;
}

service.getUser = async function(where) {
	var result;
	try {
		await User.findOne({
			where: where,
			raw: true
		}).then(user => {
			result = user;
		});
	} catch (err) {
		throw err;
	};

	return result;
}

service.updateUser = async function(id, newInfoUser) {
	var result;

	try {
		await User.update(newInfoUser, {
			where: {
				'id': id
			}
		}).then(() => {
			result = {
				'id': id,
				'message': 'update successfuly'
			};
		})
	} catch (err) {
		throw err;
	}

	return result;
}

service.getAllUsers = async function() {
	var result;

	await User.findAndCountAll({
			raw: true
		}).then(rs => {
			result = rs;
		})
		.catch(err => {
			throw err;
		});

	return result;
}

//2018-04-27 NamND get user lastmonth
service.getAllUsersLastMonth = async function() {
	var result;
	var today = new Date();
	var month = today.getMonth() + 1;
	var query = 'select * from "User" WHERE EXTRACT(MONTH FROM created_time) = ' + month + ' AND EXTRACT(YEAR FROM created_time) = ' + today.getFullYear();
	await sequelize.query(query, {
			type: sequelize.QueryTypes.SELECT
		})
		.then(rs => {
			result = rs;
		}).catch(err => {
			throw err;
		});

	return result;
}

service.createUser = async function(dataUser) {
	var result;
	var newUser = new User();
	Object.assign(newUser, dataUser);
	await newUser.save().then(user => {
		result = {
			'newUser': user,
			'message': 'create successfuly'
		};
	}).catch(err => {
		throw err;
	})

	return result;
}

service.banUserById = async function(id) {
	var result;

	await User.update({
		'is_ban': 1
	}, {
		where: {
			'id': id
		}
	}).then((rs) => {
		if (rs[0] > 0) {
			result = {
				'id': id,
				'message': 'ban successfuly'
			};
		} else {
			throw {"error": true}
		}		
		
	}).catch(err => {
		throw err;
	});

	return result;
}

service.enableUserById = async function(id) {
	var result;

	await User.update({
		'is_ban': 0
	}, {
		where: {
			'id': id
		}
	}).then((rs) => {
		if (rs[0] > 0) {
			result = {
				'id': id,
				'message': 'enable successfuly'
			};
		} else {
			throw {"error": true}
		}	
	}).catch(err => {
		throw err;
	});

	return result;
}

service.getAmountUsers = async function(start, size) {
	var result;

	await User.findAll({
			raw: true,
			order: [
				['id', 'DESC']
			],
			offset: start,
			limit: size
		}).then(users => {
			result = users;
		})
		.catch(err => {
			throw err;
		});

	return result;
}


module.exports = service;