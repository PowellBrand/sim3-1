const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const passport = require('passport');
const strategy = require(`./strategy.js`);
const path = require('path');
const app = express();
require('dotenv').config();

app.use( express.static( `${__dirname}/../public/build` ) );

massive( process.env.CONNECTIONSTRING ).then( dbInstance => {
  app.set('db', dbInstance);
}).catch( err => console.log('Error on connecting to database:', err) );

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

// Routes
app.use(`/api/auth`, require(`./routes/auth_router.js`));
app.use(`/api/user`, require(`./routes/user_router.js`));
app.use(`/api/friend`, require(`./routes/friend_router.js`));
app.use(`/api/recommended`, require(`./routes/recommended_router.js`));

// Re-send front-end
app.get('*', ( req, res, next ) => {
  res.sendFile( path.resolve( `${__dirname}/../public/build/index.html` ) );
});

app.listen( process.env.PORT, () => { console.log(`Server listening on port ${ process.env.PORT }`)} );

