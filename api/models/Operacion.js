/**
 * Operacion.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombre: {
      type: 'string',
    },
    cuenta:{
      collection : 'cuenta',
      via : 'idOperacion'
    },
    idUsuario:{
      model : 'usuario'
    }
  }

};
