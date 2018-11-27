/**
 * PlanDeCuenta.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombre: {
      type: 'string',
    },
    codigo: {
      type: 'number',
    },
    idEmpresa: {
      model: 'empresa',
      unique: true
    },
    idLibroDiario: {
      collection: 'librodiario',
      via:'idPlanDeCuenta'
    }
  }

};
