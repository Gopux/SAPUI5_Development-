sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/BusyIndicator",
    "sap/m/MessageBox",
    "../model/formatter"
  ],
  function (Controller, BusyIndicator, MessageBox, formatter) {
    "use strict";

    return Controller.extend("com.tcs.hr.sahadat.project1.controller.Home", {
      formatter: formatter,
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

     onGoDetail: function(oEvent){
      //let oRouter= sap.ui.core.UIComponent.getRouterFor(this);
      let oRouter=this.getOwnerComponent().getRouter()// Router Object
      oRouter.navTo("RouteDetail")
     },

     onClick: function(oEvent){
      let obj=oEvent.getSource().getBindingContext("SupplierModel").getObject()
      console.log("object",obj)
      let id=obj.ID
      console.log("id",id)
      let oRouter=this.getOwnerComponent().getRouter()// Router Object
      oRouter.navTo("RouteDetail",{
        supplierId:id
      })
    
     }

    });
  }
);
