/**
 * UsuarioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


  crear: function (req, res) {
    sails.log("ENTRANDO A CREAR DE ASIENTO")
    Usuario.create(req.body).exec(function (err, list) {
      if (err) {
        return res.serverError(err)
      };

      sails.log("Cuerpo de Asiento", req.body)
      return res.redirect('/');
    });
  }

};

