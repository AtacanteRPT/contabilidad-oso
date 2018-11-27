/**
 * Asiento
 *
 * @description :: Server-side logic for managing Asiento
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
    index: function(req, res, next) {
        Asiento.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },
    crear: function(req, res, next) {
        sails.log("ENTRANDO A CREAR DE ASIENTO")
        Asiento.create(req.body).exec(function(err, list) {
            if (err) {
                return res.serverError(err)
              };

            sails.log("Cuerpo de Asiento",req.body)
            return res.redirect('/LibroDiario/edit/'+req.body.idLibroDiario);
        });
    },
    adicionar: function(req, res, next) {
        sails.log("ENTRANDO A CREAR DE ASIENTO")
        sails.log("Cuerpo de Asiento",req.body)

        Asiento.create(req.body).exec(function(err, list) {
            if (err) {
                return res.serverError(err)
              };

            sails.log("Cuerpo de Asiento",req.body)
            return res.redirect('/LibroDiario/edit/'+req.body.idLibroDiario);
        });
    },

    show: function(req, res, next) {
        Asiento.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Asiento.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {

        Asiento.findOne(req.param('id'), function Founded(err, datoAsiento) {
            if (err) {
                return next(err);
            }
            Asiento.update(req.param('id'), req.body).fetch().exec((err, value) =>{
                if (err) {
                    return next(err);
                }
                return res.redirect('/LibroDiario/planCuenta/'+datoAsiento.idPlanDeCuenta);
            });
        });
        
    },

    delete: function(req, res, next) {

        sails.log("DELETE ASIENTO:")

        Asiento.findOne(req.param('id'), function Founded(err, datoAsiento) {
            if (err) {
                return next(err);
            }
            Asiento.destroy(req.param('id')).fetch().exec((err, value)=> {
                if (err) {
                    return next(err);
                }
                sails.log("DELETE VALUE ASIENTO:",value)
    
                return res.redirect('/LibroDiario/edit/'+ datoAsiento.idLibroDiario);
            })
        });
       
    },

};