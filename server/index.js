const express = require('express')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , massive = require('massive')
  , passport = require('passport')
  , Auth0Strategy = require('passport-auth0')
  //This is usually done lower in the code.
  , app = express();
//-------------------------------------//
require('dotenv').config();

//Bring in all the controllers that will be used.
const authController = require('./controllers/auth_controller.js');
const friend_controller = require('./controllers/friend_controller.js');
const recommended_controller = require('./controllers/recommended_controller.js');
const user_controller = require('./controllers/user_controller.js');
//---------------------------------------//


app.use(express.static(`${__dirname}/../build`));
app.use(bodyParser.json());

//connect to database.
massive(process.env.CONNECTION_STRING).then(dbInstance => {
  app.set('db', dbInstance);
  app.get('db').initialize_db().then(response => {
    console.log(response)
  })
})

//set up session and passport. It must be done in this order.
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//setup auth0 strategy
passport.use(new Auth0Strategy({
  domain: process.env.AUTH_DOMAIN,
  clientID: process.env.AUTH_ID,
  clientSecret: process.env.AUTH_SECRET,
  callbackURL: process.env.AUTH_CALLBACK_URL,
  scope: 'openid profile'
}, function(accessToken, refreshToken, extraParams, profile, done) {

  const db = app.get('db');
  
  db.users.find_user([profile.id]).then((profile) => {
    console.log(profile)
    let pic = 'https://robohash.org/me';
    if (!profile[0]) {
      db.users.add_user([
        profile.id,
        pic,
        profile.name.givenName,
        profile.name.familyName
      ]).then(user => {
        return done(null, user[0].id)
      })
    } else {
      return done(null, profile[0].id)
    }
  })

}))
//serialize the user
passport.serializeUser((profile, done) => {
  return done(null, profile)
})

//deserialize the user
passport.deserializeUser((profile, done) => {
  return done(null, profile)
})

// AUTH ENDPOINTS
app.get('/api/auth/login', passport.authenticate('auth0'))
app.get('/api/auth/callback', passport.authenticate('auth0',{
  successRedirect: '/api/auth/setUser',
  failureRedirect: '/api/auth/login'
}))

app.get('/api/auth/setUser', authController.setUser);
app.get('/api/auth/authenticated', authController.sendUserToClient);
app.post('/api/auth/logout', authController.logout);

// USER ENDPOINTS 
app.patch('/api/user/patch/:id', user_controller.patch);
app.get('/api/user/list', user_controller.list);
app.get('/api/user/search', user_controller.search);

// FRIEND ENDPOINTS 
app.get('/api/friend/list', friend_controller.list);
app.post('/api/friend/add', friend_controller.add);
app.post('/api/friend/remove', friend_controller.remove);

// RECOMMENDED ENDPOINTS 
app.post('/api/recommended', recommended_controller.find);
app.post('/api/recommended/add', recommended_controller.add);

//have server listening on a port.
app.listen(process.env.PORT, () => { console.log(`Server listening on port ${process.env.PORT}`) });

