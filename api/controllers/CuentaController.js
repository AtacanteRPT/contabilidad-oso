/**
 * Cuenta
 *
 * @description :: Server-side logic for managing Cuenta
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

  index: function (req, res, next) {
    Cuenta.find().exec(function (err, list) {
      if (err) return Error('Error');
      return res.view({
        result: list
      });
    });
  },
  crear: function (req, res, next) {
    sails.log("body cuenta", req.body)
    Cuenta.create(req.body).fetch().exec(function (err, datoCuenta) {
      if (err) return Error('Error');
      sails.log("creado", datoCuenta)
      return res.redirect('/PlanDeCuenta/show/' + req.body.idPlanDeCuenta);
    });
  },
  show: function (req, res, next) {
    Cuenta.findOne(req.param('id'), function Founded(err, value) {
      if (err) {
        return next(err);
      }
      res.view({
        element: value
      });
    });
  },

  edit: function (req, res, next) {
    Cuenta.findOne(req.param('id'), function Founded(err, value) {
      if (err) {
        return next(err);
      }
      res.view({
        element: value
      });
    });
  },

  update: function (req, res, next) {
    Cuenta.update(req.param('id'), req.body, function Update(err, value) {
      if (err) {
        return next(err);
      }
      return res.redirect('/plandecuenta/show/'+req.body.idPlanDeCuenta);
    });
  },

  delete: function (req, res, next) {

    Cuenta.findOne(req.param('id')).exec(function (err, datoCuenta) {

      Cuenta.destroy(req.param('id'), function Update(err, value) {
        if (err) {
          return next(err);
        }
        return res.redirect('/PlanDeCuenta/show/'+ datoCuenta.idPlanDeCuenta);
      });
    })
  },
};
