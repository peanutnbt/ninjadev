// expose our config directly to our application using module.exports
var envConfig = require('./env.configs.js');

module.exports = {

    'facebookAuth' : {
            'clientID': '255899901878103',
            'clientSecret': 'f973bb667d9033d3b606266b3ae4a9f6',
            'callbackURL': envConfig.website_url + "/auth/facebook/callback",
            'profileFields': ['id', 'displayName', 'first_name', 'last_name', 'photos', 'email'],
            'enableProof': true
        },

    // 'twitterAuth' : {
    //     'consumerKey'       : 'your-consumer-key-here',
    //     'consumerSecret'    : 'your-client-secret-here',
    //     'callbackURL'       : 'https://localhost:8000/auth/twitter/callback'
    // },
    //
    // 'googleAuth' : {
    //     'clientID'      : 'your-secret-clientID-here',
    //     'clientSecret'  : 'your-client-secret-here',
    //     'callbackURL'   : 'https://localhost:8000/auth/google/callback'
    // }

};
