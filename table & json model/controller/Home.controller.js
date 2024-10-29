sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
function (Controller,MessageToast) {
    "use strict";

    return Controller.extend("com.tcs.hr.sahadat.project1.controller.Home", {
        onInit: function () {
            var oData = {
                items: [
                    { name: "ac", value: 1, description: "electronic", price: 500, release:"jan" },
                    { name: "tv", value: 2, description: "electronic", price: 300, release:"fab" },
                    { name: "radio", value: 3, description: "electronic", price: 100, release:"march" }
                ]
            }
            var oModel = new sap.ui.model.json.JSONModel(oData)
            console.log(oModel)
            this.getView().setModel(oModel)
        
        },
        onLogIn:function(oEvent){
            console.log(oEvent)
            alert("Login successfully")
        },
        onLogOut:function(){
            MessageToast.show("Logout successfully")

        },
        onEmail:function(){
            alert("email accessed successfully")
        },

        })

    }
)
