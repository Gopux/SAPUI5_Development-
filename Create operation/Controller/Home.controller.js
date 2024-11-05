sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
function (Controller,MessageBox) {
    "use strict";

    return Controller.extend("com.ey.hr.sahadat.project1.controller.View1", {
        onInit: function () {
            var oProductModel = new sap.ui.model.json.JSONModel()// JSON Model instance created 
            this.getView().setModel(oProductModel, "productModel")// Connected with the view
            this.readData()

        },
        readData:function(){
            let oModel=this.getOwnerComponent().getModel()// OData Model instance created
            var oJsonModel=new sap.ui.model.json.JSONModel()// JSON Model instance created
            oModel.read("/Products",{
                success:function(response){
                    oJsonModel.setData(response)
                    console.log(response)
                    this.getView().setModel(oJsonModel,"ProdModel")

                }.bind(this),
                error(oError){
                    console.log(oError)
                }
            })
        },
       

       

        onSaveRecordUpdate: function(oEvent){
            let editData = this.getView().getModel("productEditModel").getData();
            let prodId = editData.ID;
            let oModel=this.getOwnerComponent().getModel()
            oModel.setUseBatch(false)
            console.log("Before oData call")
            oModel.update("/Products("+prodId+")",editData,{
                success:function(oSuccess){
                    console.log("inside success");
                    MessageBox.success("Product was edited Successfully")
                    this.readData()
                    this.oEditDialog.close();
                }.bind(this),
                error:function(){
                    MessageBox.error("Product edition Failed")
                    this.oEditDialog.close()

                }
            })
            console.log("sahadat")


        },

        onCancelRecordUpdate: function(oEvent){
            this.oEditDialog.close()

        },

        onSaveRecordAdd:function(){
            let oProductData=this.getView().getModel("productModel").getData()
            let oModel=this.getOwnerComponent().getModel()
            oModel.setUseBatch(false)
            oModel.create("/Products",oProductData,{
                success:function(oSuccess){
                    MessageBox.success("Product was created Successfully")
                    this.readData()
                    this.oAddDialog.close();
                }.bind(this),
                error:function(){
                    MessageBox.error("Product creation Failed")
                    this.oAddDialog.close()

                }
            })

        },
        onCancelRecordAdd:function(){
            this.oAddDialog.close()
        },
        onAdd:function(){
            let oAddData={
                "ID" : "",
                "Name" : "",
                "Description" : "",
                "Rating": "",
                "Price" : ""
            }
            this.getView().getModel("productModel").setData(oAddData)
            if(!this.oAddDialog){
                this.loadFragment({
                    name: "com.ey.hr.sahadat.project1.fragments.addDialog"
                }).then(function(oAddDialog){
                    this.oAddDialog = oAddDialog;
                    this.oAddDialog.open();

                }.bind(this));

            }
            else{
                this.oAddDialog.open();
            }
        },
       
    });
});
