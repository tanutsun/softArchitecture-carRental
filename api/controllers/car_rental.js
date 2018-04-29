'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');
var Store = require('../mocks/store.js');

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
    getCarDisplay: getCarDisplay,
    getCarOne: getCarOne,
    rentCar: rentCar,
    addCar: addCar,
    deleteCar: deleteCar
};


function getCarDisplay(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var name = req.swagger.params.from.value || "";

  if(name.length < 1 ){
    res.status(400).json( 'Enter Request Api From');
    return
  }

  res.json( Store.car );
}


function getCarOne(req, res) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    var id = req.swagger.params.id.value || "";
    if(id.length < 1 ){
      res.status(400).json( 'Enter Resource id');
      return
    }

    res.json( {message: Store.car[parseInt(id)]} );
}

function rentCar(req, res) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    var id = req.swagger.params.id.value || "";
    var data = req.swagger.params.data.value || {};
    
    if(id.length < 1 || (Object.keys(data).length === 0 && data.constructor === Object) ){
      res.status(400).json( 'Request Resource id and Data Update');
      return
    }

    res.status(200).json( "Update success" );
}

function addCar(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var data = req.swagger.params.data.value || {};
  
  if((Object.keys(data).length === 0 && data.constructor === Object) ){
    res.status(400).json( 'Request Data Insert');
    return
  }

  res.status(200).json( "Insert success" );
}

function deleteCar(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var id = req.swagger.params.id.value || "";
  
  if( id.length < 1 ){
    res.status(400).json( 'Request Resource id');
    return
  }

  res.status(200).json( "Delete success" );
}
