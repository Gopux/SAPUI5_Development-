sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
function (Controller,MessageToast) {
    "use strict";

    return Controller.extend("com.tcs.hr.sahadat.project1.controller.Home", {
        onInit: function () {
        this.readAll()
        
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
        readAll:function(){
            let oModel=this.getOwnerComponent().getModel()// OData Model instance
            let oJsonModel=new sap.ui.model.json.JSONModel()
            oModel.read("/Products",{
                success:function(response){
                    oJsonModel.setData(response.results)
                    this.getView().setModel(oJsonModel,"ProdModel")
                }.bind(this),
                error:function(oError){
                    console.log(oError)
                }
            })


        }

        })

    }
)
