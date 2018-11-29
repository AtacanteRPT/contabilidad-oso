/**
 * LibroDiario
 *
 * @description :: Server-side logic for managing LibroDiario
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var json2xlsx = require('node-json-xlsx');
var fs = require('fs')

module.exports = {
  index: function (req, res, next) {
    Empresa.find({
      idUsuario: req.user.id
    }).exec(function (err, datoEmpresas) {
      if (err) {
        return res.serverError(err);
      }

      var empresas = []
      sails.log("LibroDiarioController - empresas.length:", datoEmpresas.length)

      async.forEach(datoEmpresas, function (auxEmpresa, cb, i) {

        PlanDeCuenta.find({
          idEmpresa: auxEmpresa.id
        }).exec(function (err, datoPlanDeCuentas) {
          if (err) {
            return res.serverError(err);
          }
          auxEmpresa.plandecuentas = datoPlanDeCuentas
          empresas.push(auxEmpresa);
          sails.log("CONTADOR : " + i)
          cb();
        });

      }, function (error) {
        sails.log("Saliendo del Bucle")
        return res.view('librodiario/index', {
          empresas: empresas,
          cuentas: [],
          idPlanDeCuenta: req.param('id'),
          librosDiario: []
        });

      });

    });
  },
  planCuenta: function (req, res, next) {

    Empresa.find({
      idUsuario: req.user.id
    }).exec(function (err, datoEmpresas) {
      if (err) {
        return res.serverError(err);
      }

      var empresas = []
      sails.log("LibroDiarioController - empresas.length:", datoEmpresas.length)

      async.forEach(datoEmpresas, function (auxEmpresa, cb, i) {

        PlanDeCuenta.find({
          idEmpresa: auxEmpresa.id
        }).exec(function (err, datoPlanDeCuentas) {
          if (err) {
            return res.serverError(err);
          }
          auxEmpresa.plandecuentas = datoPlanDeCuentas
          empresas.push(auxEmpresa);
          sails.log("CONTADOR : " + i)
          cb();
        });

      }, function (error) {
        sails.log("Saliendo del Bucle")
        Cuenta.find({
          idPlanDeCuenta: req.param('id')
        }).populate('idOperacion').exec(function (err, datoCuentas) {
          if (err) {
            return res.serverError(err);
          }

          LibroDiario.find({ idPlanDeCuenta: req.param('id') }).sort('fecha ASC').populate('asientos').exec(function (err, datoLibroDiarios) {

            var listaLibrosDiarios = []
            async.forEach(datoLibroDiarios, function (auxLibroDiario, cb) {

              var listaAsientos = []
              async.forEach(auxLibroDiario.asientos, function (auxAsiento, cb2) {

                Asiento.findOne(auxAsiento.id).populate('idCuenta').exec(function (err, datoPlanDeCuentas) {
                  if (err) return Error('Error');
                  listaAsientos.push(datoPlanDeCuentas)
                  cb2();
                });

              }, function (error) {
                auxLibroDiario.asientos = listaAsientos;
                listaLibrosDiarios.push(auxLibroDiario);
                cb();
              });

            }, function (error) {


              sails.log("DATOS_librosDiario", datoLibroDiarios)
              return res.view('librodiario/index', {
                empresas: empresas,
                cuentas: datoCuentas,
                idPlanDeCuenta: req.param('id'),
                librosDiario: listaLibrosDiarios
              });

            });





          })

          // Asiento.find({ idPlanDeCuenta: req.param('id') }).populate('idCuenta').exec(function (err, datosAsientos) {
          //   sails.log("asientos :", datosAsientos)
          //   return res.view('librodiario/index', {
          //     empresas: empresas,
          //     cuentas: datoCuentas,
          //     idPlanDeCuenta: req.param('id'),
          //     asientos: datosAsientos
          //   });
          // })

        });


      });

    });
  },
  porPlan: function (req, res, next) {

    Empresa.find({
      idUsuario: req.user.id
    }).exec(function (err, datoEmpresas) {
      if (err) {
        return res.serverError(err);
      }

      var empresas = []
      sails.log("LibroDiarioController - empresas.length:", datoEmpresas.length)

      async.forEach(datoEmpresas, function (auxEmpresa, cb, i) {

        PlanDeCuenta.find({
          idEmpresa: auxEmpresa.id
        }).exec(function (err, datoPlanDeCuentas) {
          if (err) {
            return res.serverError(err);
          }
          auxEmpresa.plandecuentas = datoPlanDeCuentas
          empresas.push(auxEmpresa);
          sails.log("CONTADOR : " + i)
          cb();
        });

      }, function (error) {
        sails.log("Saliendo del Bucle")
        Cuenta.find({
          idPlanDeCuenta: req.param('id')
        }).populate('idOperacion').exec(function (err, datoCuentas) {
          if (err) {
            return res.serverError(err);
          }

          LibroDiario.find({ idPlanDeCuenta: req.param('id') }).populate('idCuenta').exec(function (err, datoLibroDiarios) {
            return res.view('librodiario/index', {
              empresas: empresas,
              cuentas: datoCuentas,
              idPlanDeCuenta: req.param('id'),
              librosDiario: datoLibroDiarios
            });
          })

          // Asiento.find({ idPlanDeCuenta: req.param('id') }).populate('idCuenta').exec(function (err, datosAsientos) {
          //   sails.log("asientos :", datosAsientos)
          //   return res.view('librodiario/index', {
          //     empresas: empresas,
          //     cuentas: datoCuentas,
          //     idPlanDeCuenta: req.param('id'),
          //     asientos: datosAsientos
          //   });
          // })

        });


      });

    });
  },
  crear: function (req, res, next) {
    LibroDiario.create(req.body).exec((err, datoLibroDiario) => {
      if (err) {
        return res.serverError(err)
      };
      return res.redirect('/librodiario/planCuenta/' + req.body.idPlanDeCuenta)
    });
  },
  show: function (req, res, next) {
    LibroDiario.findOneById(req.param('id'), function Founded(err, value) {
      if (err) {
        return res.serverError(err)
      };
      res.view({
        element: value
      });
    });
  },

  edit: function (req, res, next) {
    LibroDiario.findOne(req.param('id')).populate('asientos').exec((err, datoLibroDiario) => {
      if (err) {
        return res.serverError(err)
      };
      var listaAsientos = []
      async.forEach(datoLibroDiario.asientos, function (auxAsiento, cb) {

        Asiento.findOne(auxAsiento.id).populate('idCuenta').exec(function (err, datoPlanDeCuentas) {
          if (err) return Error('Error');
          listaAsientos.push(datoPlanDeCuentas)
          cb();
        });

      }, function (error) {

        if (error) return res.negotiate(error);

        Cuenta.find({ idPlanDeCuenta: datoLibroDiario.idPlanDeCuenta }).exec(function (err, datoCuentas) {

          res.view({
            libroDiario: datoLibroDiario,
            cuentas: datoCuentas,
            asientos: listaAsientos
          });
        })
      });


    });
  },

  generarExcel: function (req, res, next) {

    Empresa.find({
      idUsuario: req.user.id
    }).exec(function (err, datoEmpresas) {
      if (err) {
        return res.serverError(err);
      }

      var empresas = []
      sails.log("LibroDiarioController - empresas.length:", datoEmpresas.length)

      async.forEach(datoEmpresas, function (auxEmpresa, cb, i) {

        PlanDeCuenta.find({
          idEmpresa: auxEmpresa.id
        }).exec(function (err, datoPlanDeCuentas) {
          if (err) {
            return res.serverError(err);
          }
          auxEmpresa.plandecuentas = datoPlanDeCuentas
          empresas.push(auxEmpresa);
          sails.log("CONTADOR : " + i)
          cb();
        });

      }, function (error) {
        sails.log("Saliendo del Bucle")
        Cuenta.find({
          idPlanDeCuenta: req.param('id')
        }).populate('idOperacion').exec(function (err, datoCuentas) {
          if (err) {
            return res.serverError(err)
          };

          LibroDiario.find({ idPlanDeCuenta: req.param('id') }).sort('fecha ASC').populate('asientos').exec(function (err, datoLibroDiarios) {

            var listaLibrosDiarios = []
            async.forEach(datoLibroDiarios, function (auxLibroDiario, cb) {

              var listaAsientos = []
              async.forEach(auxLibroDiario.asientos, function (auxAsiento, cb2) {

                Asiento.findOne(auxAsiento.id).populate('idCuenta').exec(function (err, datoPlanDeCuentas) {
                  if (err) {
                    return res.serverError(err)
                  };
                  listaAsientos.push(datoPlanDeCuentas)
                  cb2();
                });

              }, function (error) {
                auxLibroDiario.asientos = listaAsientos;
                listaLibrosDiarios.push(auxLibroDiario);
                cb();
              });

            }, function (error) {

              sails.log("ENtrando al FInal GENERANDO EXCEL")
              var xlsx = json2xlsx(listaLibrosDiarios);

              fs.writeFileSync('libroDiario.xlsx', xlsx, 'binary');
              res.send("ya descargar")
            });





          })

          // Asiento.find({ idPlanDeCuenta: req.param('id') }).populate('idCuenta').exec(function (err, datosAsientos) {
          //   sails.log("asientos :", datosAsientos)
          //   return res.view('librodiario/index', {
          //     empresas: empresas,
          //     cuentas: datoCuentas,
          //     idPlanDeCuenta: req.param('id'),
          //     asientos: datosAsientos
          //   });
          // })

        });


      });

    });
  },
  excel: function (req, res, next) {
    var abc = {
      nombre  : "ricardo",
      paterno : "paucara",
      materno : "torrez"
    }
    sails.log("ENtrando al FInal GENERANDO EXCEL")
    var xlsx = json2xlsx(abc);

    fs.writeFileSync('libroDiario.xlsx', xlsx, 'binary');
    res.send("ya descargar")
  },
  update: function (req, res, next) {
    LibroDiario.update(req.param('id'), req.body, function Update(err, value) {
      if (err) {
        return res.serverError(err)
      };
      return res.redirect('librodiario/show/' + req.param('id'));
    });
  },

  delete: function (req, res, next) {
    LibroDiario.findOne(req.param('id')).exec(function(err,datoLibro){
      LibroDiario.destroy(req.param('id'), function Update(err, value) {
        if (err) {
          return next(err);
        }
        return res.redirect('/librodiario/planCuenta/'+datoLibro.idPlanDeCuenta);
      });

    })
    
  },

};
