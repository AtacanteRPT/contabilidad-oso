/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  // 'GET /': {
  //   view: 'login/login'
  // },
  'GET /': 'AuthController.loguearse',

  'GET /pet/create': {
    view: 'Pet/create'
  },

  'GET pet/create': {
    view: 'Pet/create'
  },

  // 'GET /login': {
  //   view: 'login/login'
  // },
  'POST /login': 'AuthController.login',
  '/logout': 'AuthController.salir',

  'GET /registro': {
    view: 'login/registro'
  },

  'GET /registro': {
    view: 'login/registro'
  },
  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
  'GET /empresa/edit/:id': 'EmpresaController.edit',
  'GET /empresa/update/:id': 'EmpresaController.update',
  'GET /empresa/delete/:id': 'EmpresaController.delete',
  'GET /empresa/show/:id': 'EmpresaController.show'

  ,
  'GET /operacion/edit/:id': 'OperacionController.edit',
  'GET /operacion/update/:id': 'OperacionController.update',
  'GET /operacion/delete/:id': 'OperacionController.delete',
  'GET /operacion/show/:id': 'OperacionController.show'

  ,
  'GET /cuenta/edit/:id': 'CuentaController.edit',
  'GET /cuenta/update/:id': 'CuentaController.update',
  'GET /cuenta/delete/:id': 'CuentaController.delete',
  'GET /cuenta/show/:id': 'CuentaController.show'
  ,
  'GET /plandecuenta/edit/:id': 'PlanDeCuentaController.edit',
  'GET /plandecuenta/update/:id': 'PlanDeCuentaController.update',
  'GET /plandecuenta/delete/:id': 'PlanDeCuentaController.delete',
  'GET /plandecuenta/show/:id': 'PlanDeCuentaController.show'
  ,
  'GET /librodiario/edit/:id': 'LibrodiarioController.edit',
  'GET /librodiario/update/:id': 'LibrodiarioController.update',
  'GET /librodiario/delete/:id': 'LibrodiarioController.delete',
  'GET /librodiario/show/:id': 'LibrodiarioController.show',
  'GET /librodiario/planCuenta/:id': 'LibrodiarioController.planCuenta',
  'GET /librodiario/generarExcel/:id': 'LibrodiarioController.generarExcel',


  'GET /asiento/edit/:id': 'AsientoController.edit',
  'GET /asiento/update/:id': 'AsientoController.update',
  'GET /asiento/delete/:id': 'AsientoController.delete',
  'GET /asiento/show/:id': 'AsientoController.show'

  ,
  'GET /libromayor/edit/:id': 'LibromayorController.edit',
  'GET /libromayor/update/:id': 'LibromayorController.update',
  'GET /libromayor/delete/:id': 'LibromayorController.delete',
  'GET /libromayor/show/:id': 'LibromayorController.show',
  'GET /libromayor/planCuenta/:id': 'LibromayorController.planCuenta',
  'GET /libromayor/generarExcel/:id': 'LibromayorController.generarExcel',

  'GET /balance/edit/:id': 'BalanceController.edit',
  'GET /balance/update/:id': 'BalanceController.update',
  'GET /balance/delete/:id': 'BalanceController.delete',
  'GET /balance/show/:id': 'BalanceController.show',
  'GET /balance/otra/:id': 'BalanceController.otra',



  'GET /balance/generarPdf/:id': 'BalanceController.generarPdf',
  'GET /balance/mayorReporte/:id': 'BalanceController.mayorReporte',
  'GET /balance/generarPdfMayor/:id': 'BalanceController.generarPdfMayor',

  'GET /balance/planCuenta/:id': 'BalanceController.planCuenta',
  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝



  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
