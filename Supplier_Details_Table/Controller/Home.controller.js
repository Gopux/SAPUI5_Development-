sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("com.tcs.hr.sahadat.project1.controller.Home", {
        onInit: function () {
           this.readModel()
        },
        readModel:function(){
            let oModel=this.getOwnerComponent().getModel()
            let oJsonModel=new sap.ui.model.json.JSONModel()
            oModel.read("/Suppliers",{
                success:function(response){
                    console.log(response)
                    oJsonModel.setData(response)
                    this.getView().setModel(oJsonModel,"SupplierModel")
                }.bind(this),
                error(oError){
                    console.log("Error")
                    console.log(oError)
                }
            })
            
        }
    });
});
