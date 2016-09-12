/**
 * Created by blues on 11-09-2016.
 */
var db = require('../app').db;

module.exports = {

    verifyRut: function(rut){
      //query to verify if rut is registered
    },

    verifyMail: function(email){
        //query to verify if mail is registered
    },

    createUser: function(rut, name, email, password){
        //query to insert user;
    },

    assignProfile: function(rut){
        //query to assign a profile according to test results
    },

    updateInfo: function(field, new_info){
        //updates info on field to new info
    }
};