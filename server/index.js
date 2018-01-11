const express = require('express')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , massive = require('massive')
  , app = express();
  require('dotenv').config();


const authController = require('./controllers/auth_controller.js');
const friend_controller = require('./controllers/friend_controller.js');
const recommended_controller = require('./controllers/recommended_controller.js');
const user_controller = require('./controllers/user_controller.js');


app.use( express.static( `${__dirname}/../build` ) );

massive( process.env.CONNECTIONSTRING ).then( dbInstance => {
  app.set('db', dbInstance);
  app.get('db').initialize_db().then(response => {
      console.log(response)
  })
})


app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use( bodyParser.json() );


// AUTH ENDPOINTS

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

