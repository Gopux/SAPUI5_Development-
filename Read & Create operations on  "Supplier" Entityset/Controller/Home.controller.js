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
        onAdd:function(oEvent){
            let oData={
                "ID":"",
                "Name":"",
                "Address":
                {
                    "Street":"",
                    "City":"",
                    "State":"",
                    "ZipCode":"",
                    "Country":""
                },
                "Concurrency":""
            }
            let oJsonAddModel=new sap.ui.model.json.JSONModel() //JSON Model instance created
            oJsonAddModel.setData(oData)
            this.getView().setModel(oJsonAddModel,"jsonAddModel")
            if(!this.oAddDialog){
                this.loadFragment({
                    name: "com.tcs.hr.sahadat.project1.fragments.addDialog"
                }).then(function(oAddDialog){
                    this.oAddDialog = oAddDialog;
                    this.oAddDialog.open();


                }.bind(this));

            }
            else{
                this.oAddDialog.open();
            }
            

        },
        onSave:function(oEvent){
            let oCreateModel=this.getOwnerComponent().getModel()//OData Model instance created
            let jsonData=this.getView().getModel("jsonAddModel").getData()
            console.log("Data",jsonData)
            oCreateModel.setUseBatch(false)// Mandatory for free backen system
            oCreateModel.create("/Suppliers",jsonData,{
                success:function(oSuccess,response){//oSuccess & response are optional parameters to be passed in success function 
                    console.log("Success",oSuccess)
                    console.log("Response",response)
                    MessageBox.success("Supplier Info is added successfully")
                    this.oAddDialog.close();
                    this.readModel()
                }.bind(this),
                error:function(oError){
                    MessageBox.error("Supplier Info is not added due an error")
                    console.log(oError)
                }
            })
        },


        onCancel:function(oEvent){
            this.oAddDialog.close();
        }

    });
});
