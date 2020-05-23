var bcrypt   = require('bcrypt-nodejs');

var encrypt = {

}

encrypt.genSaltSync = function(){
	return bcrypt.genSaltSync(8);
}

encrypt.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// checking if password is valid
encrypt.validPassword = function(passwordCheck, hash) {
    return bcrypt.compareSync(passwordCheck, hash);
};

module.exports = encrypt;