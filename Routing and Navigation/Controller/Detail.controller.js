sap.ui.define(
    [
      "sap/ui/core/mvc/Controller",
      "sap/ui/core/BusyIndicator",
      "sap/m/MessageBox",
    ],
    function (Controller, BusyIndicator, MessageBox) {
      "use strict";
  
      return Controller.extend("com.tcs.hr.sahadat.project1.controller.Detail", {
        onInit: function () {
          
        },
        onNavProduct: function(oEvent){
          let oRouter=this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteProduct")
        },
        onBackHome: function(oEvent){
          let oRouter=this.getOwnerComponent().getRouter();// Router Object
          oRouter.navTo("RouteHome")
        }
        

      });
    }
  );
  
