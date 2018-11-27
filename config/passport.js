const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt-nodejs');
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function (id, cb) {
  Usuario.findOne(id, function (err, user) {
    cb(err, user);
  });
});
passport.use(new LocalStrategy({
  usernameField: 'username',
  passportField: 'password'
}, function (username, password, cb) {
  Usuario.findOne({
    username: username
  }, function (err, user) {
    if (err) return cb(err);
    if (!user) return cb(null, false, {
      message: 'Username no encontrado'
    });
    bcrypt.compare(password, user.password, function (err, res) {
      if (!res) return cb(null, false, {
        message: 'Password invalido'
      });
      let userDetails = {
        username: user.username,
        id: user.id
      };
      return cb(null, userDetails, {
        message: 'Login correcto'
      });
    });
  });
}));
