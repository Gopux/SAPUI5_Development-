sap.ui.define([], () => {
	"use strict";

	return {
		formatId: function(id){
            if(id===0){
               return "Zero"
            }
            else{
                return "One"
            }
        
        }
	};
});
