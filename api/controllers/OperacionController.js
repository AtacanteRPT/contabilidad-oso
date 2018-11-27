/**
 * Operacion
 *
 * @description :: Server-side logic for managing Operacion
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  index: function (req, res, next) {
    Operacion.find({idUsuario:req.user.id}).exec(function (err, list) {
      if (err) return Error('Error');
      return res.view({
        result: list
      });
    });
  },
  crear: function (req, res, next) {
    Operacion.create(req.body).exec(function (err, list) {
      if (err) return Error('Error');
      res.redirect('/operacion/index')
    });
  },


  show: function (req, res, next) {
    Operacion.findOne(req.param('id'), function Founded(err, value) {
      if (err) {
        return next(err);
      }
      res.view({
        element: value
      });
    });
  },

  edit: function (req, res, next) {
    Operacion.findOne(req.param('id'), function Founded(err, value) {
      if (err) {
        return next(err);
      }
      res.view({
        element: value
      });
    });
  },

  update: function (req, res, next) {
    sails.log("Operación Controller : ",req.body)
    Operacion.update(req.param('id'), req.body, function Update(err, value) {
      if (err) {
        return next(err);
      }
      return res.redirect('/Operacion/index');
    });
  },

  delete: function (req, res, next) {
    Operacion.destroy(req.param('id'), function Update(err, value) {
      if (err) {
        return next(err);
      }
      return res.redirect('/Operacion/index');
    });
  },

};
