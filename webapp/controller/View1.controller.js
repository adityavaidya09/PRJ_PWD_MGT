sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller,MsgBox,MsgToast) {
	"use strict";

	return Controller.extend("PRAJ.COMZSAP_PWD_MGT.controller.View1", {
	 	  onInit : function(){
			 //var style = "sapUiSizeCompact";
			 //this.getView().addStyleClass(style);	 	  	
	 	  },
	 	  onUserPress : function(){
	 	  	var oModel = this.getOwnerComponent().getModel();
	 	  	var vUser = this.getView().byId("idUser").getValue();
	 	  	var oPath = "/UserSet('" + vUser + "')",
	 	  	that = this;
	 	  	 that.getView().setBusy(true);
			oModel.read(oPath, {
			success: function(oSResponse) {
			that.getView().setBusy(false);
			// that.getView().byId("idUser").setDescription(oSResponse.UFLAG);
			that.getView().byId("idUsStat").setText(oSResponse.UFLAG);
			if (oSResponse.STATUS == 0){
				that.getView().byId("idUnlock").setVisible(false);
			}else{
				that.getView().byId("idUnlock").setVisible(true);
			}
			},
			error: function(oEResponse) {
			that.getView().setBusy(false);
			}
			}); 	  	
	
	 	  },
	 	  
	 	  onUnlock : function(){
	 	  	var that = this;
            MsgBox.confirm("Do you want to unlock SAP User?",{
                title: "Confirm Unlocking?",
                onClose: function(value){
                    //console.log(value);
                    if(value === "OK"){
				 	  	// var oModel = this.getOwnerComponent().getModel();
				 	  	// var oModel = this.getView().getModel();
				 	  	var oPath = "/UserSet";
				 	  	// var that = this;
				 	  	var oModel = that.getOwnerComponent().getModel();
				 	  	var vUser = that.getView().byId("idUser").getValue();
				 	  	var vReq = that.getView().byId("idReq").getValue();
				 	  	var vRea = that.getView().byId("idRea").getSelectedItem().getText();				 	  	
				 	  	// var vUser = this.getView().byId("idUser").getValue();
				 	  	// var vReq = this.getView().byId("idReq").getValue();
				 	  	// var vRea = this.getView().byId("idRea").getSelectedItem().getText();
				 	  	var oData = {
					        "BNAME": vUser,
					        "UFLAG": "",
					        "UNLOCK": "X",
					        "RESET": "",
					        "REMARK": vRea,
					        "REQ_NO": vReq,
					        "REQ_NM": "",
					        "RET_MSG": "",
					        "STATUS": ""	 	  		
				 	  	};
				 	  	oModel.create(oPath,oData, {
						success: function(oSResponse) {
						that.getView().setBusy(false);
						that.getView().byId("idUser").setDescription(oSResponse.UFLAG);
						MsgToast.show("Your User is unlocked,kindly try after some time");
						if (oSResponse.STATUS == 0){
							that.getView().byId("idUnlock").setVisible(false);
							that.getView().byId("idReset").setVisible(false);
						}else{
							that.getView().byId("idUnlock").setVisible(true);
							that.getView().byId("idReset").setVisible(true);
						}
						},
						error: function(oEResponse) {
						that.getView().setBusy(false);
						}
					   	
						});                    	
                        
                    }else{
                        MsgBox.error("Unlocking action cancelled");
                    }
                }
            });	 	  	

	 	  },
	 	  onReset : function(){
	 	  	var that = this;
            MsgBox.confirm("Are you sure you want to RESET password?",{
                title: "Reset Password?",
                onClose: function(value){
                    //console.log(value);
                    if(value === "OK"){
				 	  	// var oModel = this.getOwnerComponent().getModel();
				 	  	var oModel = that.getView().getModel();
				 	  	var oPath = "/UserSet";
				 	  	// var that = this;
				 	  	var vUser = that.getView().byId("idUser").getValue();
				 	  	var vReq = that.getView().byId("idReq").getValue();
				 	  	var vRea = that.getView().byId("idRea").getSelectedItem().getText();
				 	  	var oData = {
					        "BNAME": vUser,
					        "UFLAG": "",
					        "UNLOCK": "",
					        "RESET": "X",
					        "REMARK": vRea,
					        "REQ_NO": vReq,
					        "REQ_NM": "",
					        "RET_MSG": "",
					        "STATUS": ""	 	  		
				 	  	};
				 	  	oModel.create(oPath,oData, {
						success: function(oSResponse) {
						that.getView().setBusy(false);
						that.getView().byId("idUser").setDescription(oSResponse.UFLAG);
						if (oSResponse.STATUS == 0){
							that.getView().byId("idUnlock").setVisible(false);
							that.getView().byId("idReset").setVisible(false);				
						}else{
							that.getView().byId("idUnlock").setVisible(true);
							that.getView().byId("idReset").setVisible(true);
						}
						},
						error: function(oEResponse) {
						that.getView().setBusy(false);
						}
						});	                     	
                        MsgToast.show("Your password reset to test@test, kindly try with new check");
                    }else{
                        MsgBox.error("Password Reset cancelled");
                    }
                }
            });	 	  	
	  	
	 	  }
	});
});