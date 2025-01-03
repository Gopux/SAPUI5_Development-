sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/BusyIndicator",
    "sap/m/MessageBox",
  ],
  function (Controller, BusyIndicator, MessageBox) {
    "use strict";

    return Controller.extend("com.tcs.hr.sahadat.project1.controller.Home", {
      onInit: function () {
        BusyIndicator.show();
        this.readModel();
      },
      readModel: function () {
        let oModel = this.getOwnerComponent().getModel();
        let oJsonModel = new sap.ui.model.json.JSONModel();
        BusyIndicator.show();
        oModel.read("/Suppliers", {
          success: function (response) {
            //console.log(response)
            oJsonModel.setData(response);
            //console.log("model",oJsonModel)
            this.getView().setModel(oJsonModel, "SupplierModel");
            BusyIndicator.hide();
          }.bind(this),
          error(oError) {
            console.log("Error");
            console.log(oError);
            BusyIndicator.hide();
          },
        });
      },
      onAdd: function (oEvent) {
        let oData = {
          ID: "",
          Name: "",
          Address: {
            Street: "",
            City: "",
            State: "",
            ZipCode: "",
            Country: "",
          },
          Concurrency: "",
        };
        let oJsonAddModel = new sap.ui.model.json.JSONModel(); //JSON Model instance created
        oJsonAddModel.setData(oData);
        this.getView().setModel(oJsonAddModel, "jsonAddModel");
        if (!this.oAddDialog) {
          this.loadFragment({
            name: "com.tcs.hr.sahadat.project1.fragments.addDialog",
          }).then(
            function (oAddDialog) {
              this.oAddDialog = oAddDialog;
              this.oAddDialog.open();
            }.bind(this)
          );
        } else {
          this.oAddDialog.open();
        }
      },
      onSave: function (oEvent) {
        let oCreateModel = this.getOwnerComponent().getModel(); //OData Model instance created
        let jsonData = this.getView().getModel("jsonAddModel").getData();
        console.log("Data", jsonData);
        oCreateModel.setUseBatch(false); // Mandatory for free backen system
        oCreateModel.create("/Suppliers", jsonData, {
          success: function (oSuccess, response) {
            //oSuccess & response are optional parameters to be passed in success function
            console.log("Success", oSuccess);
            console.log("Response", response);
            MessageBox.success("Supplier Info is added successfully");
            this.oAddDialog.close();
            this.readModel();
          }.bind(this),
          error: function (oError) {
            MessageBox.error("Supplier Info is not added due an error");
            this.oAddDialog.close();
            console.log(oError);
          }.bind(this),
        });
      },

      onCancel: function (oEvent) {
        this.oAddDialog.close();
      },

      onDelete: function (oEvent) {
        let deleteData = oEvent
          .getSource()
          .getBindingContext("SupplierModel")
          .getObject();
        console.log("deleteData",deleteData)
        let deleteJsonModel=new sap.ui.model.json.JSONModel()
        deleteJsonModel.setData(deleteData)
        this.getView().setModel(deleteJsonModel,"delJsonModel")
        if (!this.oDeleteDialog) {
          this.loadFragment({
            name: "com.tcs.hr.sahadat.project1.fragments.deleteDialog",
          }).then(
            function (oDeleteDialog) {
              this.oDeleteDialog = oDeleteDialog;
              this.oDeleteDialog.open();
            }.bind(this)
          );
        } else {
          this.oDeleteDialog.open();
        }
        
      
      },

      onYes:function(oEvent){
        let oDeleteModel= this.getOwnerComponent().getModel()
        let jsonObj=this.getView().getModel("delJsonModel").getData()
        let id=jsonObj.ID
        console.log("id",id)
        oDeleteModel.setUseBatch(false)
        oDeleteModel.remove("/Suppliers("+id+")",{
          success:function(){
            MessageBox.success("Record deletion successful")
            this.oDeleteDialog.close()
            this.readModel()
          }.bind(this),
          error:function(oError){
            MessageBox.error("Record deletion unsuccessful")
            console.log(oError)
          }
        })

      },

      onNo:function(oEvent){
        this.oDeleteDialog.close();
      },

      onEdit: function (oEvent) {
        let oData = oEvent
          .getSource()
          .getBindingContext("SupplierModel")
          .getObject();
        console.log("raw data",oData)
        let oUpdateJsonModel = new sap.ui.model.json.JSONModel();
        oUpdateJsonModel.setData(oData);
        console.log("json model",oUpdateJsonModel)
        this.getView().setModel(oUpdateJsonModel, "updateJsonModel");
        if (!this.oEditDialog) {
          this.loadFragment({
            name: "com.tcs.hr.sahadat.project1.fragments.editDialog",
          }).then(
            function (oEditDialog) {
              this.oEditDialog = oEditDialog;
              this.oEditDialog.open();
            }.bind(this)
          );
        } else {
          this.oEditDialog.open();
        }
      },

      onUpdate: function (oEvent) {
        let oUpdateModel = this.getOwnerComponent().getModel();
        let data = this.getView().getModel("updateJsonModel").getData();
        console.log("data", data);
        let supplierId = data.ID;
        oUpdateModel.setUseBatch(false);
        oUpdateModel.update("/Suppliers(" + supplierId + ")", data, {
          success: function (oSuccess, response) {
            console.log("Success", oSuccess);
            console.log("response", response);
            MessageBox.success("Seleted record is updated successfully");
            this.oEditDialog.close();
            this.readModel()
          }.bind(this),
          error: function (oError) {
            MessageBox.error("Record updation is unsuccessful due to an error");
            console.log(oError);
          },
        });
      },

      onUpdateCancel: function (oEvent) {
        this.oEditDialog.close();
      },

     onSearch:function(oEvent){
      let searchValue = oEvent.getSource().getValue()
      console.log(searchValue)
      let searchJsonModel=new sap.ui.model.json.JSONModel();
      let oSearchModel=this.getOwnerComponent().getModel();
      oSearchModel.read("/Suppliers("+searchValue+")",{
        success:function(response){
          searchJsonModel.setData(response)
          this.getView().setModel(searchJsonModel)
        }.bind(this),

        error:function(oError){
          console.log(oError)
        }

      })

     },

     onGoDetail: function(oEvent){
      //let oRouter= sap.ui.core.UIComponent.getRouterFor(this);
      let oRouter=this.getOwnerComponent().getRouter()// Router Object
      oRouter.navTo("RouteDetail")
     }
    });
  }
);
