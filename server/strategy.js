const Auth0Strategy = require('passport-auth0');

module.exports = new Auth0Strategy({
  domain:       process.env.AUTH_DOMAIN,
  clientID:     process.env.AUTH_ID,
  clientSecret: process.env.AUTH_SECRET,
  callbackURL:  '/api/auth/login'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);