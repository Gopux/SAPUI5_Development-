sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/BusyIndicator",
    "sap/m/MessageBox"
],
function (Controller,BusyIndicator,MessageBox) {
    "use strict";

    return Controller.extend("com.tcs.hr.sahadat.project1.controller.Home", {
        onInit: function () {
            BusyIndicator.show()
            this.readModel()
        },
        readModel:function(){
            let oModel=this.getOwnerComponent().getModel()
            let oJsonModel=new sap.ui.model.json.JSONModel()
            BusyIndicator.show()
            oModel.read("/Suppliers",{
                success:function(response){
                    //console.log(response)
                    oJsonModel.setData(response)
                    //console.log("model",oJsonModel)
                    this.getView().setModel(oJsonModel,"SupplierModel")
                    BusyIndicator.hide()
                }.bind(this),
                error(oError){
                    console.log("Error")
                    console.log(oError)
                    BusyIndicator.hide()
                }
            })
            
        },

        onDelete:function(oEvent){
            let id=oEvent.getSource().getBindingContext("SupplierModel").getProperty("ID")
            console.log("ID",id)
            console.log(typeof(id))
            let oDeleteModel=this.getOwnerComponent().getModel()
            oDeleteModel.setUseBatch(false)// Mandatory for free backen system
            oDeleteModel.remove("/Suppliers"+"(" +id +")",{
                success:function(){
                    MessageBox.success("Supplier is deleted successfully")
                    this.readModel()

                }.bind(this),
                error:function(oError){
                    MessageBox.error("Supplier is not deleted due to an error")
                    console.log(oError)
                }
            })
        }

    });
});
