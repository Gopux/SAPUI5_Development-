sap.ui.define(
    [
      "sap/ui/core/mvc/Controller",
      "sap/ui/core/BusyIndicator",
      "sap/m/MessageBox",
    ],
    function (Controller, BusyIndicator, MessageBox) {
      "use strict";
  
      return Controller.extend("com.tcs.hr.sahadat.project1.controller.Product", {
        onInit: function () {
          
        },
        onBackDetail: function(oEvent){
            let oRouter= this.getOwnerComponent().getRouter()
            oRouter.navTo("RouteDetail")
        }
        

      });
    }
  );
  
