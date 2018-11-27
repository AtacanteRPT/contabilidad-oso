/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const passport = require('passport');
module.exports = {
  loguearse: function (req, res) {

    if(req.isAuthenticated()){
        return res.redirect("/principal/index")
    }
    return res.view("login/login")
  },
  login: function (req, res) {
    passport.authenticate('local', function (err, user, info) {
      if ((err) || (!user)) {
        // return res.send({
        //   message: info.message,
        //   user
        // });
        console.log("no logueado")

        return res.redirect("auth/loguearse");
      }

      req.logIn(user, function (err) {
        if (err) {
          console.log(err)
        }
        res.send(err);
        // return res.send({
        //     message: info.message,
        //     user
        // });
        console.log("PREGUNTANDPO logueado")


        if (req.isAuthenticated()) {
          console.log("Redireccionando a /principal/index")
          res.redirect("/principal/index");
        } else {

          res.view("login/login");
        }

      });
    })(req, res);
  },
  salir: function (req, res) {
    req.logout();
    res.redirect("/");
  },
  autentificacion: function (req, res) {
    var usuario = {
      usuario: req.user,
      autentificacion: req.isAuthenticated()
    }
    res.send(usuario)
  }

};
