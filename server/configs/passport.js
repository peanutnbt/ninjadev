// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var encrypt = require('../common/encrypt');
// load up the user model
var User = require('../modules/user/user.model');
var Op = User.Op;
const passportAuthConfigs = require('./passport.auth.configs');
const errorConfigs = require('./error.configs');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, {
            'id': user.id,
            'facebook_id': user.facebook_id
        });
    });

    // used to deserialize the user
    passport.deserializeUser(function(idKey, done) {
      if(idKey.id){
        User.findOne({
            where: {
              'id': idKey.id,
          },
          raw: true
      }).then(user => {
        done(null, user);
    });
  } else {
    User.findOne({
        where: {
           'facebook_id': idKey.facebook_id
       },
       raw: true
   }).then(user => {
    done(null, user);
});
}

});

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with username
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            // asynchronous
            // User.findOne wont fire unless data is sent back
            var regexInputText = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
            if (!regexInputText.test(username)) {
                return done(errorConfigs.DATA_NOT_VALID);
            }
            var emailReg = req.body.email;
            process.nextTick(function() {
                User.findOne({
                    where: {
                        [Op.or]: [
                        { 'username': username},
                        { 'email': emailReg}
                        ]
                    },
                    raw: true
                }).then(user => {
                    if (user) {
                        if (user.username == username) {
                            return done(errorConfigs.USER_ALREADY_TAKEN);
                        } else if (user.email == emailReg) {
                            return done(errorConfigs.EMAIL_ALREADY_EXIST);
                        }
                    } else {
                        var newUser = User.build({
                            phone: req.body.phone,
                            first_name: req.body.firstName,
                            last_name: req.body.lastName,
                            email: emailReg,
                        });

                        newUser.username = username;
                        newUser.password = encrypt.generateHash(password);
                        // save the user
                        newUser.save().then(newOne => {
                            return done(null, newOne);
                        });
                    }
                }).catch(err => {
                    return done(err);
                });

            });

        }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with username
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function(req, username, password, done) {
            var regexInputText = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
            if (!regexInputText.test(username)) {
                return done(errorConfigs.DATA_NOT_VALID);
            }
            // asynchronous
            process.nextTick(function() {
                User.findOne({
                    where: {
                        'username': username
                    },
                    raw: true
                }).then(user => {
                    // if no user is found, return the message
                    if (!user)
                    {
                        return done(errorConfigs.USER_NOT_EXIST);
                    }

                    if (!encrypt.validPassword(password, user.password)) {
                        return done(errorConfigs.WRONG_PASSWORD);
                    } else {
                        return done(null, user);
                    }
                }).catch(err => {
                    return done(err);
                });
            });

        }));

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy(passportAuthConfigs.facebookAuth,
        function(accessToken, refreshToken, profile, done) {
            var dataUser = profile._json;

            User.findOrCreate({
                where: {
                    facebook_id: dataUser.id
                },
                defaults: {
                    username: dataUser.id,
                    first_name: dataUser.first_name || '',
                    last_name: dataUser.last_name || '',
                    link_avatar: dataUser.picture.data.url,
                    confirm_email: 1
                }
            })
            .spread((user, isCreatedNew) => {
                user = user.get({
                    plain: true
                });
                done(null, user);
            }).catch(err => {
                done(err);
            });
        }
        ));
};
