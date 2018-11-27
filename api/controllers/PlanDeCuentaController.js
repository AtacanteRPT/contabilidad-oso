/**
 * PlanDeCuenta
 *
 * @description :: Server-side logic for managing PlanDeCuenta
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  index: function (req, res, next) {
    Empresa.find({
      idUsuario: req.user.id
    }).exec(function (err, datoEmpresas) {
      if (err) return Error('Error');

      var empresas = []
      async.forEach(datoEmpresas, function (auxEmpresa, cb) {

        PlanDeCuenta.find({
          idEmpresa: auxEmpresa.id
        }).exec(function (err, datoPlanDeCuentas) {
          if (err) return Error('Error');
          auxEmpresa.plandecuentas = datoPlanDeCuentas
          empresas.push(auxEmpresa);
          cb();
        });

      }, function (error) {

        if (error) return res.negotiate(error);
        sails.log("empresas : ", empresas)
        return res.view({
          empresas: empresas
        })
      });


    })
  },
  crear: function (req, res, next) {

    var auxPlandecuenta = req.body;

    PlanDeCuenta.create(req.body).exec(function (err, list) {
      if (err) return Error('Error');
      return res.redirect('/plandecuenta/index')
    });
  },

  show: function (req, res, next) {
    PlanDeCuenta.findOne(req.param('id'), function Founded(err, datoPlanDeCuenta) {
      if (err) {return next(err);}

      Cuenta.find({idPlanDeCuenta:req.param('id')}).populate('idOperacion').exec(function (err, datoCuentas) {
        if (err) {return res.serverError(err);}


            Operacion.find({idUsuario:req.user.id}).populate('cuenta').exec(function(err,datoOperaciones){
                var listaOperaciones = []
                datoOperaciones.some(function(auxOperacion) {
                    var listaCuentas = []
                    datoCuentas.some(function(auxCuenta) {
                        sails.log("CUENTA :",auxCuenta)
                        if (auxOperacion.id == auxCuenta.idOperacion.id) {
                            listaCuentas.push(auxCuenta)

                            // return true;
                        }
    
                    }, this);
                    auxOperacion.listaCuentas = listaCuentas;
                    listaOperaciones.push(auxOperacion)
                }, this);

                if (err) {return res.serverError(err);}
                datoPlanDeCuenta.cuentas = datoCuentas;
                datoPlanDeCuenta.operaciones = datoOperaciones;
                datoPlanDeCuenta.listaOperaciones = listaOperaciones;


                sails.log("planCuenta SHOW", datoPlanDeCuenta.listaOperaciones)
                res.view({
                    planCuenta: datoPlanDeCuenta
                  });
            });
       

      })

    });
  },

  edit: function (req, res, next) {
    PlanDeCuenta.findOne(req.param('id'), function Founded(err, value) {
      if (err) {
        return next(err);
      }
      res.view({
        element: value
      });
    });
  },

  update: function (req, res, next) {
    PlanDeCuenta.update(req.param('id'), req.body, function Update(err, value) {
      if (err) {
        return next(err);
      }
      return res.redirect('/PlanDeCuenta/index');
    });
  },

  delete: function (req, res, next) {
    PlanDeCuenta.destroy(req.param('id'), function Update(err, value) {
      if (err) {
        return next(err);
      }
      return res.redirect('/PlanDeCuenta/index');
    });
  },

};
