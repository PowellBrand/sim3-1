const passport = require('passport');

module.exports = {
  setUser: ( req, res, next ) => {
    if ( req.user && !req.session.user ) {
      req.session.user = req.user;
    }

    
    let url;

    if ( process.env.ENV === "development" ) {
      url = `${ req.protocol }://${ req.hostname }:3000`;
    } else {
      url = `${ req.protocol }://${ req.hostname }`;
    }

    console.log('Auth redirect url is set to:', url);
    res.redirect( url );
  },

  sendUserToClient: ( req, res, next ) => {
    if ( !req.session.user ) {
      res.status(403).send();
    } else {
      res.status(200).send( req.session.user );
    }
  },

  logout: ( req, res, next ) => {
    req.session.destroy();
    res.status(200).send();
  }
};