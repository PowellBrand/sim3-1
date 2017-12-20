const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const passport = require('passport');
const strategy = require(`./strategy.js`);
const path = require('path');
const app = express();

const authController = require('./controllers/auth_controller.js');
const friend_controller = require('./controllers/friend_controller.js');
const recommended_controller = require('./controllers/recommended_controller.js');
const user_controller = require('./controllers/user_controller.js');

require('dotenv').config();

app.use( express.static( `${__dirname}/../build` ) );

massive( process.env.CONNECTIONSTRING ).then( dbInstance => {
  app.set('db', dbInstance);

  app.get('db').initialize_db().then(response => {
      console.log(response)
  })
})

app.use(session({
  secret: '@f8!l m 0 Rtz',
  resave: false,
  saveUninitialized: false
}));

app.use( bodyParser.json() );
app.use( passport.initialize() );
app.use( passport.session() );
passport.use( strategy );

passport.serializeUser( (user, done) => done(null, { id: user.id, picture: 'https://robohash.org/me', firstName: user.name.givenName || '', lastName: user.name.familyName || '' }) );
passport.deserializeUser( (obj, done) => {
  const db = app.get('db');

  db.users.find_user([ obj.id ]).then( response => {
    if ( response.length === 1 ) {
      // User is in the database
      done(null, response[0]);
    } else if ( response.length === 0 ) {
      // User is not in the database - Add them in
      db.users.add_user([ obj.id, obj.picture, obj.firstName, obj.lastName ]).then( response => {
        done(null, response[0]);
      }).catch( err => console.log( err ) );
    }
  });
});

// AUTH ENDPOINTS
app.get('/api/auth/login', passport.authenticate('auth0', { 
  successRedirect: '/api/auth/setUser', 
  failureRedirect: '/api/auth/login', 
  failureFlash: true 
}));
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


app.listen( process.env.PORT, () => { console.log(`Server listening on port ${ process.env.PORT }`)} );

