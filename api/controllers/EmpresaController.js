/**
 * Empresa
 *
 * @description :: Server-side logic for managing Empresa
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

  index: function (req, res, next) {
    console.log("usuario : ", req.user)
    Empresa.find({
      idUsuario: req.user.id
    }).exec(function (err, list) {
      if (err) return Error('Error');
      return res.view({
        result: list
      });
    });
  },
  crear: function (req, res, next) {
    sails.log("body", req.body);
    var auxEmpresa = req.body;
    auxEmpresa.idUsuario = req.user.id;
    Empresa.create(req.body).fetch().exec(function (err, datoEmpresa) {
      if (err) return Error('Error');
      sails.log("creado", datoEmpresa)
      return res.redirect('/empresa/index')
    });
  },
  show: function (req, res, next) {
    Empresa.findOne(req.param('id'), function Founded(err, value) {
      if (err) {
        return next(err);
      }
      res.view({
        element: value
      });
    });
  },

  edit: function (req, res, next) {
    Empresa.findOne(req.param('id'), function Founded(err, value) {
      if (err) {
        return next(err);
      }
      res.view({
        element: value
      });
    });
  },

  update: function (req, res, next) {
    Empresa.update(req.param('id'), req.body, function Update(err, value) {
      if (err) {
        return next(err);
      }
      return res.redirect('/Empresa/index');
    });
  },

  delete: function (req, res, next) {
    Empresa.destroy(req.param('id'), function Update(err, value) {
      if (err) {
        return next(err);
      }
      return res.redirect('/Empresa/index');
    });
  },
};
