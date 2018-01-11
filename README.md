# Sim3 

## Setup

* In your .env file you will need to add a CONNECTIONSTRING to your db and a PORT of 4000.

* You will also need to add SESSION_SECRET, AUTH_DOMAIN, AUTH_ID, AUTH_SECRET, AUTH_CALLBACK_URL AND SECRET. Both session_secret and secret can just be keyboard smashing, the callback url needs to be `http://localhost:4000/api/auth/callback` but the other three need to come from your Auth0.com account. Be sure to add your callback url in to the auth0.com allowed callback urls as well. 

* Your frontend is being served up by the backend so you only need to run nodemon after you npm install.

* In the initialize_db.sql file you will need to add to copy the users create table and the friends create table into your sql Tabs to create them in your actual database. 

* You will also need to copy the mock_data.sql file in the db folder into your sql tabs as well. 



## Auth 
*  Install and require passport and passport-auth0

*  Add in passport.initialize and passport.session. Be sure to put them in the correct order and location in your index.js

* Setup your Auth0Strategy with the 5 key value pairs required for auth0 authentication. 

* Give it a callback function with the 5 parameters required. This first take the profile id and use the find_user SQL query and if the user is found then return done invoked and pass on the user. If not then use the add_user SQL query to add the new user. 

* You will need to create a variable call pic that is equal to `https://robohash.org/me` to give the user a random robot picture about the add_user query. 

* Pass in the id from the profile as the first argument to the add_user SQL query. Then the pic variable as the second. profile.name.givenName and profile.name.familyName as the third and fourth arguments. Once it creates the user return done invoked passing in the user. 

* Create your serializeUser. This will just invoke done and pass on the profile.

* Create your deserializeUser. This will just invoke done and pass on the profile.

* Now create two more auth endpoints. First we need to kick off the auth process with and endpoint of `/api/auth/login`.

* Now create your callback endpoint. `/api/auth/callback`. If authentication is successful send them to `/api/auth/setUser` if not send them to `/api/auth/login`.



## Either in the sim3 project or a new project do the following: 

## Database
* Write a subquery
* Write a join
* Alter a table
* Create the one-to-one SQL pattern
* Create the many-to-many SQL pattern

## JS Patterns 
* Pass a function in as a parameter
* Invoke callback function
* Use callback for asyncrohnous process
* Use callback for syncrohnous higher order processes


## Study up and write a paragraph about each of the following: 
* Component based architecture
* Unidirectional dataflow
* Virtual DOM 

## Promises 
* Use a .catch
* Learn how to do promise chaining
* Look into custom promises

## Constuctors
* Class constructor (not React component, class constructor for data structures)
