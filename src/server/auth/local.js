const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./passport');
const knex = require('../db/connection');
const authHelpers = require('./_helpers');

const options = {};

/// Importiamo la configurazione di passport 
init();

passport.use(new LocalStrategy(options, (username, password, done) => {
  /// Here, we check if the username exists in the database and then pass the appropriate results back to Passport via the callback
  knex('users').where({ username }).first()
  .then((user) => {
    if (!user) return done(null, false);
    /// comparePass è unahelper function scritta da noi usando bcrypt
    if (!authHelpers.comparePass(password, user.password)) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  })
  .catch((err) => { return done(err); });
}));

module.exports = passport;