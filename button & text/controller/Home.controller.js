sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
function (Controller,MessageToast) {
    "use strict";

    return Controller.extend("com.tcs.hr.sahadat.project1.controller.Home", {
        onInit: function () {

        },
        onLogIn:function(oEvent){
            alert("Login successfully")
        },
        onLogOut:function(){
            MessageToast.show("Logout successfully")

        }
    });
});
