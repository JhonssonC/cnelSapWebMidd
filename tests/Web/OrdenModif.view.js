sap.ui.jsview("ordenes.OrdenModif", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf ordenes.MenuAdminOrdenVer
	*/ 
	getControllerName : function() {
		return "ordenes.OrdenModif";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf ordenes.MenuAdminOrdenVer
	*/ 
	createContent : function(oController) { 
	
		var aControls = [];  
		
		// *********************************
		// EXTENCION DE CLASES
		// *********************************
		
		sap.m.Input.extend('InputWithAttrs', {
			  metadata: {
			    aggregations: {
			      attributes: 'sap.ui.core.CustomData'
			    }
			  },
			  renderer: {},
			  onAfterRendering: function() {
			    if (sap.m.Input.prototype.onAfterRendering) {
			      sap.m.Input.prototype.onAfterRendering.apply(this, arguments);
			    }
			    var input = this.$().find('INPUT');
			    this.getAttributes().forEach(function(attr) {
			      input.attr(attr.getKey(), attr.getValue());
			    });
			  }
			});		
		
		// ========================================================
		// DIALOGO SELECCION HORA
		// ========================================================	
		var oLabelHH		= new sap.m.Label({
			text			: "HH", 
			textAlign		: "Center",
			design			: "Bold"}).addStyleClass("divLabelHora");
		var oLabelMM		= new sap.m.Label({
			text			: "MM",
			textAlign		: "Center",
			design			: "Bold"}).addStyleClass("divLabelHora");
		var oLabelSS		= new sap.m.Label({
			text			: "SS",
			textAlign		: "Center",
			design			: "Bold"}).addStyleClass("divLabelHora");
		
	    var oCBHora =  new sap.m.Select({
	    	id			: "MOHoraSel",
	    	selectedKey : "00",
	    	width		: "31px",
	    	items		: [	new sap.ui.core.Item({key: "00",text: "00"}),
	    	     		   	new sap.ui.core.Item({key: "01",text: "01"}),
	    	     		   	new sap.ui.core.Item({key: "02",text: "02"}),
	    	     		   	new sap.ui.core.Item({key: "03",text: "03"}),
	    	     		   	new sap.ui.core.Item({key: "04",text: "04"}),
	    	     		   	new sap.ui.core.Item({key: "05",text: "05"}),
	    	     		   	new sap.ui.core.Item({key: "06",text: "06"}),
	    	     		   	new sap.ui.core.Item({key: "07",text: "07"}),
	    	     		   	new sap.ui.core.Item({key: "08",text: "08"}),
	    	     		   	new sap.ui.core.Item({key: "09",text: "09"}),
	    	     		   	new sap.ui.core.Item({key: "10",text: "10"}),
	    	     		   	new sap.ui.core.Item({key: "11",text: "11"}),
	    	     		   	new sap.ui.core.Item({key: "12",text: "12"}),
	    	     		   	new sap.ui.core.Item({key: "13",text: "13"}),
	    	     		   	new sap.ui.core.Item({key: "14",text: "14"}),
	    	     		   	new sap.ui.core.Item({key: "15",text: "15"}),
	    	     		   	new sap.ui.core.Item({key: "16",text: "16"}),
	    	     		   	new sap.ui.core.Item({key: "17",text: "17"}),
	    	     		   	new sap.ui.core.Item({key: "18",text: "18"}),
	    	     		   	new sap.ui.core.Item({key: "19",text: "19"}),
	    	     		   	new sap.ui.core.Item({key: "20",text: "20"}),
	    	     		   	new sap.ui.core.Item({key: "21",text: "21"}),
	    	     		   	new sap.ui.core.Item({key: "22",text: "22"}),
	    	     		   	new sap.ui.core.Item({key: "23",text: "23"})],
	    }).addStyleClass("divSelectHora"); 
		
	    var oCBMinu =  new sap.m.Select({
	    	id			: "MOMinuSel",
	    	selectedKey : "00",
	    	width		: "31px",
	    	items		: [	new sap.ui.core.Item({key: "00",text: "00"}), new sap.ui.core.Item({key: "01",text: "01"}), new sap.ui.core.Item({key: "02",text: "02"}), new sap.ui.core.Item({key: "03",text: "03"}), new sap.ui.core.Item({key: "04",text: "04"}), new sap.ui.core.Item({key: "05",text: "05"}), new sap.ui.core.Item({key: "06",text: "06"}), new sap.ui.core.Item({key: "07",text: "07"}), new sap.ui.core.Item({key: "08",text: "08"}), new sap.ui.core.Item({key: "09",text: "09"}), new sap.ui.core.Item({key: "10",text: "10"}), new sap.ui.core.Item({key: "11",text: "11"}), new sap.ui.core.Item({key: "12",text: "12"}), new sap.ui.core.Item({key: "13",text: "13"}), new sap.ui.core.Item({key: "14",text: "14"}), new sap.ui.core.Item({key: "15",text: "15"}), new sap.ui.core.Item({key: "16",text: "16"}), new sap.ui.core.Item({key: "17",text: "17"}), new sap.ui.core.Item({key: "18",text: "18"}), new sap.ui.core.Item({key: "19",text: "19"}), new sap.ui.core.Item({key: "20",text: "20"}), new sap.ui.core.Item({key: "21",text: "21"}), new sap.ui.core.Item({key: "22",text: "22"}), new sap.ui.core.Item({key: "23",text: "23"}), new sap.ui.core.Item({key: "24",text: "24"}), new sap.ui.core.Item({key: "25",text: "25"}), new sap.ui.core.Item({key: "26",text: "26"}), new sap.ui.core.Item({key: "27",text: "27"}), new sap.ui.core.Item({key: "28",text: "28"}), new sap.ui.core.Item({key: "29",text: "29"}), new sap.ui.core.Item({key: "30",text: "30"}), new sap.ui.core.Item({key: "31",text: "31"}), new sap.ui.core.Item({key: "32",text: "32"}), new sap.ui.core.Item({key: "33",text: "33"}), new sap.ui.core.Item({key: "34",text: "34"}), new sap.ui.core.Item({key: "35",text: "35"}), new sap.ui.core.Item({key: "36",text: "36"}), new sap.ui.core.Item({key: "37",text: "37"}), new sap.ui.core.Item({key: "38",text: "38"}), new sap.ui.core.Item({key: "39",text: "39"}), new sap.ui.core.Item({key: "40",text: "40"}), new sap.ui.core.Item({key: "41",text: "41"}), new sap.ui.core.Item({key: "42",text: "42"}), new sap.ui.core.Item({key: "43",text: "43"}), new sap.ui.core.Item({key: "44",text: "44"}), new sap.ui.core.Item({key: "45",text: "45"}), new sap.ui.core.Item({key: "46",text: "46"}), new sap.ui.core.Item({key: "47",text: "47"}), new sap.ui.core.Item({key: "48",text: "48"}), new sap.ui.core.Item({key: "49",text: "49"}), new sap.ui.core.Item({key: "50",text: "50"}), new sap.ui.core.Item({key: "51",text: "51"}), new sap.ui.core.Item({key: "52",text: "52"}), new sap.ui.core.Item({key: "53",text: "53"}), new sap.ui.core.Item({key: "54",text: "54"}), new sap.ui.core.Item({key: "55",text: "55"}), new sap.ui.core.Item({key: "56",text: "56"}), new sap.ui.core.Item({key: "57",text: "57"}), new sap.ui.core.Item({key: "58",text: "58"}), new sap.ui.core.Item({key: "59",text: "59"})],
	    }).addStyleClass("divSelectHora"); 
	    
	    var oCBSegu =  new sap.m.Select({
	    	id			: "MOSeguSel",
	    	selectedKey : "00",
	    	width		: "31px",
	    	items		: [	new sap.ui.core.Item({key: "00",text: "00"}), new sap.ui.core.Item({key: "01",text: "01"}), new sap.ui.core.Item({key: "02",text: "02"}), new sap.ui.core.Item({key: "03",text: "03"}), new sap.ui.core.Item({key: "04",text: "04"}), new sap.ui.core.Item({key: "05",text: "05"}), new sap.ui.core.Item({key: "06",text: "06"}), new sap.ui.core.Item({key: "07",text: "07"}), new sap.ui.core.Item({key: "08",text: "08"}), new sap.ui.core.Item({key: "09",text: "09"}), new sap.ui.core.Item({key: "10",text: "10"}), new sap.ui.core.Item({key: "11",text: "11"}), new sap.ui.core.Item({key: "12",text: "12"}), new sap.ui.core.Item({key: "13",text: "13"}), new sap.ui.core.Item({key: "14",text: "14"}), new sap.ui.core.Item({key: "15",text: "15"}), new sap.ui.core.Item({key: "16",text: "16"}), new sap.ui.core.Item({key: "17",text: "17"}), new sap.ui.core.Item({key: "18",text: "18"}), new sap.ui.core.Item({key: "19",text: "19"}), new sap.ui.core.Item({key: "20",text: "20"}), new sap.ui.core.Item({key: "21",text: "21"}), new sap.ui.core.Item({key: "22",text: "22"}), new sap.ui.core.Item({key: "23",text: "23"}), new sap.ui.core.Item({key: "24",text: "24"}), new sap.ui.core.Item({key: "25",text: "25"}), new sap.ui.core.Item({key: "26",text: "26"}), new sap.ui.core.Item({key: "27",text: "27"}), new sap.ui.core.Item({key: "28",text: "28"}), new sap.ui.core.Item({key: "29",text: "29"}), new sap.ui.core.Item({key: "30",text: "30"}), new sap.ui.core.Item({key: "31",text: "31"}), new sap.ui.core.Item({key: "32",text: "32"}), new sap.ui.core.Item({key: "33",text: "33"}), new sap.ui.core.Item({key: "34",text: "34"}), new sap.ui.core.Item({key: "35",text: "35"}), new sap.ui.core.Item({key: "36",text: "36"}), new sap.ui.core.Item({key: "37",text: "37"}), new sap.ui.core.Item({key: "38",text: "38"}), new sap.ui.core.Item({key: "39",text: "39"}), new sap.ui.core.Item({key: "40",text: "40"}), new sap.ui.core.Item({key: "41",text: "41"}), new sap.ui.core.Item({key: "42",text: "42"}), new sap.ui.core.Item({key: "43",text: "43"}), new sap.ui.core.Item({key: "44",text: "44"}), new sap.ui.core.Item({key: "45",text: "45"}), new sap.ui.core.Item({key: "46",text: "46"}), new sap.ui.core.Item({key: "47",text: "47"}), new sap.ui.core.Item({key: "48",text: "48"}), new sap.ui.core.Item({key: "49",text: "49"}), new sap.ui.core.Item({key: "50",text: "50"}), new sap.ui.core.Item({key: "51",text: "51"}), new sap.ui.core.Item({key: "52",text: "52"}), new sap.ui.core.Item({key: "53",text: "53"}), new sap.ui.core.Item({key: "54",text: "54"}), new sap.ui.core.Item({key: "55",text: "55"}), new sap.ui.core.Item({key: "56",text: "56"}), new sap.ui.core.Item({key: "57",text: "57"}), new sap.ui.core.Item({key: "58",text: "58"}), new sap.ui.core.Item({key: "59",text: "59"})],
	    }).addStyleClass("divSelectHora"); 
	    
		var oButtonHoraOk	= new sap.m.Button({
			text 			: "Ok",
			icon 			: sap.ui.core.IconPool.getIconURI("accept"),
			press			: oController.doOkHora,
			}).addStyleClass("botonHora");
		
		var oButtonHoraCanc	= new sap.m.Button({
			text 			: "Salir",
			icon 			: sap.ui.core.IconPool.getIconURI("decline"),
			press			: oController.doCancHora,
			}).addStyleClass("botonHora");
		
		var oFormElemDHora10 		= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelHH, oLabelMM, oLabelSS ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
	    
		var oFormElemDHora20 		= new sap.ui.layout.form.FormElement({
			fields			: [ oCBHora, oCBMinu, oCBSegu ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		var oFormContDHora	= new sap.ui.layout.form.FormContainer({
			formElements	: [ oFormElemDHora10,
			            	    oFormElemDHora20 ]});
		 
        var oformDHora 		= new sap.ui.layout.form.Form({
        	layout 					: new sap.ui.layout.form.GridLayout(),     	 	
        	formContainers			: [ oFormContDHora ]
        }).addStyleClass("formElementDialogoHora"); 
	    
		var oDialogSelHora = new sap.m.Dialog({
			id				: "MODiaSelHora",
			title 			: "Selecci�n de Hora",
			contentWidth 	: "150px",
			contentHeight 	: "50px",
			buttons			: [ oButtonHoraOk, oButtonHoraCanc ],
			content			: [oformDHora]}).addStyleClass("divDialogHora");
		
		// ========================================================
		// CABECERA
		// ========================================================	
		
		// LINEA BOTONES
		var oButtonPdf			= new sap.m.Button({
			text 			: "PDF",
			layoutData		: new sap.ui.core.VariantLayoutData({
									multipleLayoutData: [	new sap.ui.layout.ResponsiveFlowLayoutData({weight: 2}),
									                     	new sap.ui.layout.form.GridElementData({hCells: "2"})]
							  		}),
			icon 			: sap.ui.core.IconPool.getIconURI("pdf-attachment"),
			press			: oController.doPresionaBoton,
			}).addStyleClass("botonPdf");
		
		var oButtonMapa			= new sap.m.Button({
			text 			: "Mapa",
			layoutData		: new sap.ui.core.VariantLayoutData({
									multipleLayoutData: [	new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4}),
									                     	new sap.ui.layout.form.GridElementData({hCells: "3"})]
									}),			
			icon 			: sap.ui.core.IconPool.getIconURI("map"),
			press			: oController.doViewMaps,
			}).addStyleClass("botonPdf");
		
		// elemento botones
		var oFormElemCabBot		= new sap.ui.layout.form.FormElement({
			fields			: [ oButtonPdf, oButtonMapa ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false, width: "300px"})
		});
		
		// LINEA BOTONES 2
		var oButtonGuardar		= new sap.m.Button({
			id				: "MOBtnGuardar",
			text 			: "Guardar",
			layoutData		: new sap.ui.core.VariantLayoutData({
									multipleLayoutData: [	new sap.ui.layout.ResponsiveFlowLayoutData({weight: 2}),
									                     	new sap.ui.layout.form.GridElementData({hCells: "2"})]
							  		}),
			icon 			: sap.ui.core.IconPool.getIconURI("save"),
			press			: oController.doGuardar,
			}).addStyleClass("botonPdf");
		
		var oButtonCierre		= new sap.m.Button({
			id				: "MOBtnCierre",
			text 			: "Cierre Tec.",
			layoutData		: new sap.ui.core.VariantLayoutData({
									multipleLayoutData: [	new sap.ui.layout.ResponsiveFlowLayoutData({weight: 4}),
									                     	new sap.ui.layout.form.GridElementData({hCells: "3"})]
									}),			
			icon 			: sap.ui.core.IconPool.getIconURI("flag"),
			press			: oController.doCierreTecnico,
			}).addStyleClass("botonPdf");
		
		// elemento botones
		var oFormElemCabBot2	= new sap.ui.layout.form.FormElement({
			fields			: [ oButtonGuardar, oButtonCierre ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false, width: "300px"})
		});		
		
		
		// LINEA 1
		// Numero de orden
		var oLabelAufnr			= new sap.m.Label({
			text			: "N�mero de Orden",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");	
		
		var oInputAufnr			= new sap.m.Input({
			id				: "MOAufnr",			
			//value			: { path:"/Aufnr" },
			editable: false}).addStyleClass("divInputOrden");
		
		// Clase de Orden
		var oLabelAufart		= new sap.m.Label({
			text			: "Clase de Orden",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputAufart		= new sap.m.Input({ 
			id				: "MOAufart",
			//value			: { path:"/Clase" },
			editable		: false}).addStyleClass("divInputOrden");
		
		var oFormElemCabL10 = new sap.ui.layout.form.FormElement({
			fields			: [ oLabelAufnr, oInputAufnr, oLabelAufart, oInputAufart],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});
		
		// LINEA 2
		// Cl.act.PM
		var oLabelIlart			= new sap.m.Label({
			text			:"Clase Actividad PM",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputIlart			= new sap.m.Input({
			id				: "MOIlatx",
			//value			: { path:"/Ilatx" }, 
			editable		: false}).addStyleClass("divInputOrden");
		
		// CUEN
		var oLabelCuen			= new sap.m.Label({
			text			: "CUEN",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputCuen 			= new sap.m.Input({ 
			id				: "MOCuen",			
			//value			: { path:"/Cuen" }, 
			editable: false}).addStyleClass("divInputOrden");							
		
		var oFormElemCabL20		= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelIlart, oInputIlart, oLabelCuen, oInputCuen],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});
		
		// LINEA 3
		// estados del sistema
		var oLabelSysStatus		= new sap.m.Label({
			text			:"Estados del sistema",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputSysStatus		= new sap.m.Input({
			id				: "MOSysStatus",		
			value			: { path:"/SysStatus" }, 
			editable		: false}).addStyleClass("divInputOrden");
		
		
		//Estado de usuario con num. de clasificaci�n
		var oLabelUsrStCclaTxt		= new sap.m.Label({
			text			:"Estado de Usr. Con Num. Clasif.",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputUsrStCclaTxt			= new sap.m.Input({
			id					: "MOUsrStCclaTxt",
	    	width				: "95%",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Estado de usuario C/num. Clasificaci�n',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");	
		
		 //AYUDA estado de usuario con numero de clasificacion
	    new sap.m.SelectDialog("UsrStCclaDia", {  
        	title		: "Estado Usuario Con Num. Clasif.",   
        	items		: {     
    			path		: "/usrstcclaSet",  
    			template	: new sap.m.StandardListItem({  
    							title: "{UsrstCcla}",
        	    				info : "{UsrstCclaTxt}",
    							active: true
    			
    			})},
    			templateShareable: true,
        	confirm		: oController.handleCloseUsrStCcla,  
        	cancel		: oController.handleCloseUsrStCcla}).addStyleClass("diaNoBusq");
		
		var oFormElemCabL30	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelSysStatus, oInputSysStatus, oLabelUsrStCclaTxt, oInputUsrStCclaTxt ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// LINEA 4
		//Estado de usuario sin num. de clasificaci�n
		var oLabelUsrStSclaTxt		= new sap.m.Label({
			text			:"Estado de Usr. Sin Num. Clasif.",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputUsrStSclaTxt			= new sap.m.Input({
			id					: "MOUsrStSclaTxt",
	    	width				: "95%",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Estado de usuario S/num. Clasificaci�n',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");	
		
		 //AYUDA estado de usuario sin numero de clasificacion
	    new sap.m.SelectDialog("UsrStSclaDia", {  
        	title		: "Estado Usuario Sin Num. Clasif.",  
        	items		: {     
    			path		: "/usrstsclaSet",  
    			template	: new sap.m.StandardListItem({  
    							title: "{UsrstScla}",
        	    				info : "{UsrstSclaTxt}",
    							active: true
    			
    			})},
    			templateShareable: true,
        	confirm		: oController.handleCloseUsrStScla,  
        	cancel		: oController.handleCloseUsrStScla}).addStyleClass("diaNoBusq");
		
		var oFormElemCabL40	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelUsrStSclaTxt, oInputUsrStSclaTxt, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});			
		
		
		// CONTENEDOR CABECERA
		var oFormContCabecera	= new sap.ui.layout.form.FormContainer({
			formElements	: [ oFormElemCabBot,
			            	    oFormElemCabBot2,
			            	    oFormElemCabL10,
			            	    oFormElemCabL20,
			            	    oFormElemCabL30,
			            	    oFormElemCabL40 ]
		});
		 
		// FORM CABECERA
        var oformCabecera 		= new sap.ui.layout.form.Form({
        	width 					: "100%",
        	layout 					: new sap.ui.layout.form.GridLayout(),     	 	
        	formContainers			: [ oFormContCabecera ]
        }).addStyleClass("formElementVerOrden"); 
		
        
		// ========================================================
		// DATOS PRINCIPALES
		// ========================================================	 
        
    	// DATOS PRINCIPALES - LINEA 1
		var oLabelSolic			= new sap.m.Label({
			text			:"Nombre / Raz�n Social",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputSolic			= new sap.m.Input({
			id				: "MOSolic",
			value			: { path:"/Solic" }, 
			editable		: false}).addStyleClass("divInputOrden");	        
        
		var oLabelIdEtiqueta	= new sap.m.Label({
			text			:{ path:"/IdEtiqueta" },
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputCedula		= new sap.m.Input({
			id				: "MOCedula",
			value			: { path:"/Cedula" }, 
			editable		: false}).addStyleClass("divInputOrden");	
		
		var oFormElemDpL10 = new sap.ui.layout.form.FormElement({
			fields			: [ oLabelSolic, oInputSolic, oLabelIdEtiqueta, oInputCedula],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});
		
    	// DATOS PRINCIPALES - LINEA 2
		var oLabelEmail			= new sap.m.Label({
			text			:"Correo Electronico",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputEmail			= new sap.m.Input({
			id				: "MOEmail",
			value			: { path:"/Email" }, 
			editable		: false}).addStyleClass("divInputOrden");	        
        
		var oLabelCalleNro	= new sap.m.Label({
			text			:"Calle Principal / N�",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputCalleNro		= new sap.m.Input({
			id				: "MOCalleNro",			
			value			: { path:"/CalleNro" }, 
			editable		: false}).addStyleClass("divInputOrden");	
		
		var oFormElemDpL20 = new sap.ui.layout.form.FormElement({
			fields			: [ oLabelEmail, oInputEmail, oLabelCalleNro, oInputCalleNro],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});
		
    	// DATOS PRINCIPALES - LINEA 3
		var oLabelCalleSec			= new sap.m.Label({
			text			:"Calle Secundaria",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputCalleSec			= new sap.m.Input({
			id				: "MOCalleSec",					
			value			: { path:"/CalleSec" }, 
			editable		: false}).addStyleClass("divInputOrden");	        
        
		var oLabelTabTorre	= new sap.m.Label({
			text			:"Tablero Torre / Bloque",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTabTorre		= new sap.m.Input({
			id				: "MOTabTorre",		
			value			: { path:"/TabTorre" }, 
			editable		: false}).addStyleClass("divInputOrden");	
		
		var oFormElemDpL30 = new sap.ui.layout.form.FormElement({
			fields			: [ oLabelCalleSec, oInputCalleSec, oLabelTabTorre, oInputTabTorre],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});		
		
    	// DATOS PRINCIPALES - LINEA 4
		var oLabelZona			= new sap.m.Label({
			text			:"Zona",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputZona			= new sap.m.Input({
			id				: "MOZona",		
			value			: { path:"/Zona" }, 
			editable		: false}).addStyleClass("divInputOrden");	        
        
		var oLabelParroquia	= new sap.m.Label({
			text			:"Parroquia",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputParroquia		= new sap.m.Input({
			id				: "MOParroquia",		
			value			: { path:"/Parroquia" }, 
			editable		: false}).addStyleClass("divInputOrden");	
		
		var oFormElemDpL40 = new sap.ui.layout.form.FormElement({
			fields			: [ oLabelZona, oInputZona, oLabelParroquia, oInputParroquia],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
    	// DATOS PRINCIPALES - LINEA 5
		var oLabelBarrio			= new sap.m.Label({
			text			:"Barrio / Urb. / Edificio:",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputBarrio			= new sap.m.Input({
			id				: "MOBarrio",		
			value			: { path:"/Barrio" }, 
			editable		: false}).addStyleClass("divInputOrden");	        
        
		var oLabelTarifAplic	= new sap.m.Label({
			text			:"Tarifa Aplicada",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTarifAplic		= new sap.m.Input({
			id				: "MOTarifAplic",					
			//value			: { path:"/TarifAplic" }, 
			editable		: false}).addStyleClass("divInputOrden");	
		
		var oFormElemDpL50 = new sap.ui.layout.form.FormElement({
			fields			: [ oLabelBarrio, oInputBarrio, oLabelTarifAplic, oInputTarifAplic],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});		
		
		//*****************************************************************************
		// Rama Economica 
		
/*
 * var oLabelRamaEcon = new sap.m.Label({ text :"Código CIIU", textAlign :
 * "Begin", design : "Bold"}).addStyleClass("divLabelOrden");
 * 
 * var oInputRamaEcon = new sap.m.Input({ id : "MORamaEcon", width : "150px",
 * type : sap.m.InputType.Text, placeholder : 'Rama Econom...', showValueHelp :
 * true, valueHelpOnly : true, valueHelpRequest : oController.doAyudaBusqueda
 * }).addStyleClass("divInput");
 * 
 * 
 * //AYUDA Rama Economica new sap.m.SelectDialog("RamaEconDia", { title : "Tipo
 * Rama", items : { path : "/TipoRamaEconSet", template : new
 * sap.m.StandardListItem({ title: "{IND_SECTOR}", info : "{TEXT}", active: true
 * 
 * })}, templateShareable: true, liveChange : oController.handleSearchRamaEcon,
 * search : oController.handleSearchRamaEcon, confirm :
 * oController.handleCloseRamaEcon, cancel : oController.handleCloseRamaEcon});
 * 
 * 
 * var oFormElemDpL4095 = new sap.ui.layout.form.FormElement({ fields : [
 * oLabelRamaEcon, oInputRamaEcon, new sap.m.Label(), new sap.m.Label() ],
 * layoutData : new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true,
 * margin: false}) });
 * 
 * //***************************************************************************
 */		
    	// DATOS PRINCIPALES - LINEA 6
		var oLabelTarifVerif			= new sap.m.Label({
			text			:"Tarifa Verificada",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");	
		
		var oInputTarifVerif			= new sap.m.Input({
				id					: "MOTarifVerif",
		    	width				: "150px",
		    	type				: sap.m.InputType.Text,  
	            placeholder			: 'Tipo Tarifa...',  
	            showValueHelp		: true,
	            valueHelpOnly		: true,
	            valueHelpRequest	: oController.doAyudaBusqueda      
		    }).addStyleClass("divInput");		
		

		
		 //AYUDA Tarifa Verificada
	    new sap.m.SelectDialog("TariVerifDia", {  
        	title		: "Tipo Tarifa",  
        	items		: {     
    			path		: "/tipoTarifaSet",  
    			template	: new sap.m.StandardListItem({  
    							title: "{Tariftyp}",
        	    				info : "{Ttypbez}",
    							active: true
    			
    			})},
    			templateShareable: true,
            liveChange	: oController.handleSearchTariVerif,
			search		: oController.handleSearchTariVerif,
        	confirm		: oController.handleCloseTariVerif,  
        	cancel		: oController.handleCloseTariVerif});
	
		var oLabelGridName	= new sap.m.Label({
			text			:"N� Trafo Distribuci�n",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputGridName		= new sap.m.Input({
			id				: "MOGridName",		
			value			: { path:"/GridName" }, 
			editable		: false}).addStyleClass("divInputOrden");	
		
		var oFormElemDpL60 = new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTarifVerif, oInputTarifVerif, oLabelGridName, oInputGridName],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});		
		
    	
		
		
    	// DATOS PRINCIPALES - LINEA 8
		var oLabelErdat			= new sap.m.Label({
			text			:"Fecha Creaci�n",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");

		var oDateErdat  		= new sap.ui.commons.DatePicker({
			id				: "MOErdat",					
				value: {
					path: "/Erdat",
					type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy", strictParsing: true})
				},
				editable: false
			}).addStyleClass("divInputFecOrden");
		
		var oLabelGltrp	= new sap.m.Label({
			text			:"Fecha Fin Deseada",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oDateGltrp  		= new sap.ui.commons.DatePicker({
			id				: "MOGltrp",		
			value: {
				path: "/Gltrp",
				type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy", strictParsing: true})
			},
			editable: false
		}).addStyleClass("divInputFecOrden");
		
		var oFormElemDpL80 = new sap.ui.layout.form.FormElement({
			fields			: [ oLabelErdat, oDateErdat, oLabelGltrp, oDateGltrp],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
    	// DATOS PRINCIPALES - LINEA 9
		var oLabelTelfijoCel			= new sap.m.Label({
			text			:"Tel. Fijo / Cel.",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTelfijoCel			= new sap.m.Input({
			id				: "MOTelfijoCel",		
			value			: { path:"/TelfijoCel" }, 
			editable		: false}).addStyleClass("divInputOrden");	        
        
		var oLabelAgencia	= new sap.m.Label({
			text			:"Agencia",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputAgencia		= new sap.m.Input({
			id				: "MOAgencia",					
			value			: { path:"/Agencia" }, 
			editable		: false}).addStyleClass("divInputOrden");	
		
		var oFormElemDpL90 		= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTelfijoCel, oInputTelfijoCel, oLabelAgencia, oInputAgencia],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
    	// DATOS PRINCIPALES - LINEA 10
		var oLabelArtxt			= new sap.m.Label({
			text			:"Puesto de trabajo",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputArtxt			= new sap.m.Input({
			id				: "MOArtxt",		
			//value			: { path:"/Artxt" }, 
			editable		: false}).addStyleClass("divInputOrden");	        
        
		var oLabelReferencia	= new sap.m.Label({
			text			:"Referencia",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputReferencia		= new sap.m.Input({
			id				: "MOReferencia",		
			//value			: { path:"/Referencia" }, 
			editable		: false}).addStyleClass("divInputOrden");	
		
		var oFormElemDpL100 		= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelArtxt, oInputArtxt, oLabelReferencia, oInputReferencia],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
    	// DATOS PRINCIPALES - LINEA 11
		var oLabelCasTabx			= new sap.m.Label({
			text			:"Secuencia / Casillero",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputCasTabx			= new sap.m.Input({
			id				: "MOCasTab",		
			//value			: { path:"/CasTab" }, 
			editable		: false}).addStyleClass("divInputOrden");	        
        
		var oLabelSector	= new sap.m.Label({
			text			:"Sector",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputSector		= new sap.m.Input({
			id				: "MOSector",		
			//value			: { path:"/Sector" }, 
			editable		: false}).addStyleClass("divInputOrden");	
		
		var oFormElemDpL110 		= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelCasTabx, oInputCasTabx, oLabelSector, oInputSector ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});		
		
    	// DATOS PRINCIPALES - LINEA 12
		var oLabelCanton			= new sap.m.Label({
			text			:"Cant�n",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputCanton			= new sap.m.Input({
			id				: "MOCanton",		
			//value			: { path:"/Canton" }, 
			editable		: false}).addStyleClass("divInputOrden");	        
        
		var oLabelProvincia	= new sap.m.Label({
			text			:"Provincia",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputProvincia		= new sap.m.Input({
			id				: "MOProvincia",		
			//value			: { path:"/Provincia" }, 
			editable		: false}).addStyleClass("divInputOrden");	
		
		var oFormElemDpL120 		= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelCanton, oInputCanton, oLabelProvincia, oInputProvincia ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});		
		
    	// DATOS PRINCIPALES - LINEA 13
		var oLabelQktextgr	= new sap.m.Label({
			text			:"C�digo Grupo",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");	

		var oInputQktextgr			= new sap.m.Input({
			id					: "MOQktextgr",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'C�digo Grupo...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");		
	
		//AYUDA C�digo de grupo
		new sap.m.SelectDialog("QmgrpDia", {  
			title		: "C�digo Grupo",  
			items		: {     
				path		: "/qmgrpSet",  
				template	: new sap.m.StandardListItem({  
							title: "{Codegruppe}",
    	    				info : "{Kurztext}",
							active: true
			
			})},
			templateShareable: true,
    	confirm		: oController.handleCloseQmgrp,  
    	cancel		: oController.handleCloseQmgrp}).addStyleClass("diaNoBusq");
		
		var oLabelKurztext			= new sap.m.Label({
			text			:"C�digo Cierre",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");        
        
		var oInputKurztext			= new sap.m.Input({
			id					: "MOKurztext",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'C�digo Cierre...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");		
	
		//AYUDA C�digo de cierre
		new sap.m.SelectDialog("QmcodDia", {  
			title		: "C�digo Cierre",  
			items		: {     
				path		: "/qmcodSet",  
				template	: new sap.m.StandardListItem({  
							title: "{Code}",
    	    				info : "{Kurztext}",
							active: true
			
			})},
			templateShareable: true,
    	confirm		: oController.handleCloseQmcod,  
    	cancel		: oController.handleCloseQmcod}).addStyleClass("diaNoBusq");		
    	
		var oFormElemDpL130 		= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelQktextgr, oInputQktextgr, oLabelKurztext, oInputKurztext ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
    	// DATOS PRINCIPALES - LINEA 14
		var oLabelObservaciones	= new sap.m.Label({
			text			:"Observaciones",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputObservaciones		= new sap.m.TextArea({
			id				: "MOObservaciones",		
			//value			: { path:"/Observaciones" }, 
			rows			: 3,
			editable		: true}).addStyleClass("divInputOrden");
		
		var oFormElemDpL140 		= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelObservaciones, oInputObservaciones, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
    
		// CONTENEDOR DATOS PRINCIPALES
		var oFormContDatPrin	= new sap.ui.layout.form.FormContainer({
			formElements	: [ oFormElemDpL10,
			            	    oFormElemDpL20,
			            	    oFormElemDpL30,
			            	    oFormElemDpL40,
			            	    oFormElemDpL50,
			            	    oFormElemDpL60,
			            	    oFormElemDpL80,
			            	    oFormElemDpL90,
			            	    oFormElemDpL100,
			            	    oFormElemDpL110,
			            	    oFormElemDpL120,
			            	    oFormElemDpL130,
//			            	    oFormElemDpL4095,
			            	    oFormElemDpL140 ]
		});
		 
		// FORM DATOS PRINCIPALES
        var oformDatPrin 		= new sap.ui.layout.form.Form({
        	id						: "MOFormDatPrin",
        	width 					: "100%",
        	layout 					: new sap.ui.layout.form.GridLayout(),     	 	
        	formContainers			: [ oFormContDatPrin ]
        }).addStyleClass("formElementVerOrden"); 
		
        // ========================================================
		// RESPONSABLES
		// ========================================================	 
        
    	// RESPONSABLES - LINEA 1
		var oLabelFecImpre			= new sap.m.Label({
			text			:"Fecha Impresi�n",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oDateFecImpre  		= new sap.ui.commons.DatePicker({
			id				: "MOFecImpre",					
			value: {
				path: "/FecImpre",
				//type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy", strictParsing: true})
			},
			editable: false
		}).addStyleClass("divInputFecOrden");	          
        
		var oLabelHoraImpre	= new sap.m.Label({
			text			: "Hora Impresi�n",
			textAlign		: "Begin", 
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputHoraImpre		= new sap.m.Input({
			id				: "MOHoraImpre",
			value			: { path:"/HoraImpre" }, 
            showValueHelp	: false,
            valueHelpOnly	: false,
            editable		: false }).addStyleClass("divInputOrdenHora");
		
		var oFormElemReL10 = new sap.ui.layout.form.FormElement({
			fields			: [ oLabelFecImpre, oDateFecImpre, oLabelHoraImpre, oInputHoraImpre ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});
		
    	// RESPONSABLES - LINEA 2
		var oLabelEjecutadoPor			= new sap.m.Label({
			text			:"Ejecutado por",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputEjecutadoPor		= new sap.m.Input({
			id				: "MOEjecutadoPor",
			value			: { path:"/EjecutadoPor" }, 
			editable		: false}).addStyleClass("divInputOrden");	         
        
		var oLabelHoraIniTrab	= new sap.m.Label({
			text			: "Hora Inicio de Trabajo",
			textAlign		: "Begin", 
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputHoraIniTrab		= new sap.m.Input({
			id				: "MOHoraIniTrab",			
			value			: { path:"/HoraIniTrab" }, 
            showValueHelp	: true,
            valueHelpOnly	: true,
            editable		: true,
            valueHelpRequest: oController.doSelHora }).addStyleClass("divInputOrdenHoraAct");	
		
		var oFormElemReL20 = new sap.ui.layout.form.FormElement({
			fields			: [ oLabelEjecutadoPor, oInputEjecutadoPor, oLabelHoraIniTrab, oInputHoraIniTrab],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});
		
    	// RESPONSABLES - LINEA 3
		var oLabelFecEjecTrab			= new sap.m.Label({
			text			:"Fecha Ejecuci�n Trabajo",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oDateFecEjecTrab  		= new sap.ui.commons.DatePicker({
			id				: "MOFecEjecTrab",	
			value: {
				path: "/FecEjecTrab",
				type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy", strictParsing: true}),				
//				type:  new sap.ui.model.type.Date({
//				     source: {pattern: "yyyyMMdd"}, 
//					pattern: "dd.MM.yyyy"})
/*	            formatter : function(oValue) {
	                if (oValue != undefined) {        
	                    var dd   = (oValue.getDate()+1).toString();                                   
	                    var mm   = (oValue.getMonth()+1).toString();
	                    var yyyy = oValue.getFullYear().toString(); 
	                    return (dd[1]?dd:"0"+dd[0]) + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + yyyy;
	                } else return "";
	            }	*/		
			},
			editable: true,
			blocked: true,
			//change	: oController.doDate }).addStyleClass("divInputFecOrden");	
		    }).addStyleClass("divInputFecOrden");			
        
		var oLabelHoraFinTrab	= new sap.m.Label({
			text			: "Hora fin de Trabajo",
			textAlign		: "Begin", 
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputHoraFinTrab		= new sap.m.Input({			
			id				: "MOHoraFinTrab",		
			value			: { path:"/HoraFinTrab" }, 
            showValueHelp	: true,
            valueHelpOnly	: true,
            editable		: true,
            valueHelpRequest: oController.doSelHora }).addStyleClass("divInputOrdenHoraAct");
		
		var oFormElemReL30 = new sap.ui.layout.form.FormElement({
			fields			: [ oLabelFecEjecTrab, oDateFecEjecTrab, oLabelHoraFinTrab, oInputHoraFinTrab],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});
		
    	// RESPONSABLES - LINEA 4
		var oLabelRevisadoPor			= new sap.m.Label({
			text			:"Supervisor",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputRevisadoPor			= new sap.m.Input({			
			id				: "MORevisadoPor",		
			value			: { path:"/RevisadoPor" }, 
			editable		: false}).addStyleClass("divInputOrden");	        
        
		var oLabelIngresadoPor	= new sap.m.Label({
			text			:"Ingresado por",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputIngresadoPor		= new sap.m.Input({			
			id				: "MOIngresadoPor",		
			value			: { path:"/IngresadoPor" }, 
			editable		: false}).addStyleClass("divInputOrden");	
		
		var oFormElemReL40 		= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelRevisadoPor, oInputRevisadoPor, oLabelIngresadoPor, oInputIngresadoPor ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});			
	
    	// RESPONSABLES - LINEA 5
		var oLabelFechaIngreso			= new sap.m.Label({
			text			:"Fecha de Ingreso",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oDateFechaIngreso 		= new sap.ui.commons.DatePicker({
			id				: "MOFechaIngreso",	
			value: {
				path: "/FechaIngreso",
				type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy", strictParsing: true})
			},
			editable: false
		}).addStyleClass("divInputFecOrden");	          
        
		var oLabelHoraIngreso	= new sap.m.Label({
			text			: "Hora de Ingreso",
			textAlign		: "Begin", 
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputHoraIngreso		= new sap.m.Input({			
			id				: "MOHoraIngreso",		
			value			: { path:"/HoraIngreso" }, 
			editable		: false}).addStyleClass("divInputOrden");	
		
		var oFormElemReL50 = new sap.ui.layout.form.FormElement({
			fields			: [ oLabelFechaIngreso, oDateFechaIngreso, oLabelHoraIngreso, oInputHoraIngreso],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});
		
		// CONTENEDOR RESPONSABLES
		var oFormContRe	= new sap.ui.layout.form.FormContainer({
			formElements	: [ oFormElemReL10,
			            	    oFormElemReL20,
			            	    oFormElemReL30,
			            	    oFormElemReL40,
			            	    oFormElemReL50 ]
		});
		 
		// FORM RESPONSABLES
        var oformRe 		= new sap.ui.layout.form.Form({
        	width 					: "100%",
        	layout 					: new sap.ui.layout.form.GridLayout(),     	 	
        	formContainers			: [ oFormContRe ]
        }).addStyleClass("formElementVerOrden"); 

        // ========================================================
		// DATOS DE CONEXI�N / CARGA INSTALADA
		// ========================================================	 
        
        // DATOS DE CONEXI�N - TITULO
		var oLabelTitDc			= new sap.m.Label({
			text			:"DATOS DE CONEXI�N",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oFormElemDpL00 		= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTitDc, new sap.m.Label(), new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	    
         
        // DATOS DE CONEXI�N - LINEA 1 
		var oLabelZutmy			= new sap.m.Label({
			text			: "Grado. Lon. Ubic. Geo.",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputZutmy			= new sap.m.Input({
			id				: "MOZutmy",		
			maxLength 		: 18,
			value			: { path:"/Zutmy" }, 
			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]*(\.)?([0-9]*)?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},			
			editable		: false}).addStyleClass("divInputOrden");	        
        
		var oLabelZutmx	= new sap.m.Label({
			text			:"Grado. Lat. Ubic. Geo.",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputZutmx		= new sap.m.Input({			
			id				: "MOZutmx",	
			maxLength 		: 18,
			value			: { path:"/Zutmx" }, 
			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]*(\.)?([0-9]*)?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},			
			editable		: false}).addStyleClass("divInputOrden");	
		
		var oFormElemDpL10 		= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelZutmx, oInputZutmx, oLabelZutmy, oInputZutmy, ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
        
        // DATOS DE CONEXI�N - LINEA 2 
		var oLabelZzposte	= new sap.m.Label({
			text			:"Poste",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputZzposte	= new sap.m.Input({
			id				: "MOZzposte",		
			maxLength 		: 10,			
			value			: { path:"/Zzposte" }, 
			editable		: false}).addStyleClass("divInputOrden");	        
        
		var oLabelGridName2	= new sap.m.Label({
			text			:"Punto de Red",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");

/*		var oInputGridName2	= new sap.m.Input({
			id				: "MOGridName2",	
			maxLength 		: 40,
			value			: { path:"/GridName" }, 
			editable		: true}).addStyleClass("divInputOrden");	*/
		
		var oInputGridName2			= new sap.m.Input({
			id					: "MOGridName2",
	    	width				: "40px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Punto de Red...',  
            showValueHelp		: false,
            valueHelpOnly		: true,
            editable			: false,
            valueHelpRequest	: oController.doAyudaBusqueda      	
		}).addStyleClass("divInputOrdenSh");
	
		//AYUDA Punto de red
		new sap.m.SelectDialog("MOGridName2Dia", {  
			title		: "Punto de Red",  
			items		: {     
				path		: "/ptoRedSet",  
				template	: new sap.m.StandardListItem({  
							title: "{GridId}",
    	    				info : "{GridName}",
							active: true
			
			})},
			templateShareable: true,
    	confirm		: oController.handleClosePtoRed,  
    	cancel		: oController.handleClosePtoRed}).addStyleClass("diaNoBusq");		
		
		var oFormElemDpL20 		= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelZzposte, oInputZzposte, oLabelGridName2, oInputGridName2 ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
        // DATOS DE CONEXI�N - LINEA 3		
		var oLabelGridLevel	= new sap.m.Label({
			text			:"Nivel de Red",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
/*		var oInputGridLevel	= new sap.m.Input({			
			id				: "MOGridLevel",	
			maxLength 		: 10,
			value			: { path:"/GridLevel" }, 
			editable		: true}).addStyleClass("divInputOrden");	*/   

		var oInputGridLevel			= new sap.m.Input({
			id					: "MOGridLevel",
	    	width				: "40px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Nivel de red...',  
            showValueHelp		: false,
            valueHelpOnly		: true,
            editable			: false,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInputOrdenSh");//.addStyleClass("divInputOrden");		
	
		//AYUDA Nivel de red
		new sap.m.SelectDialog("MOGridLevelDia", {  
			title		: "Nivel de Red",  
			items		: {     
				path		: "/nivelRedSet",  
				template	: new sap.m.StandardListItem({  
							title: "{GridLevelSap}",
    	    				info : "{Text30}",
							active: true
			
			})},
			templateShareable: true,
    	confirm		: oController.handleCloseNivRed,  
    	cancel		: oController.handleCloseNivRed}).addStyleClass("diaNoBusq");		
		
		var oFormElemDpL30 		= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelGridLevel, oInputGridLevel, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// CONTENEDOR DATOS DE CONEXI�N
		var oFormContDc	= new sap.ui.layout.form.FormContainer({
			formElements	: [ oFormElemDpL00,
			            	    oFormElemDpL10,
			            	    oFormElemDpL20,
			            	    oFormElemDpL30 ]
		});
		 
		// FORM DATOS DE CONEXI�N
        var oformDc 		= new sap.ui.layout.form.Form({
        	width 					: "100%",
        	layout 					: new sap.ui.layout.form.GridLayout(),     	 	
        	formContainers			: [ oFormContDc ]
        }).addStyleClass("formElementVerOrden"); 
        
        // CARGA INSTALADA - TITULO
		var oLabelTitCi			= new sap.m.Label({
			text			:"CARGA INSTALADA",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oFormElemCiL00 		= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTitCi, new sap.m.Label(), new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	  
        
		// CARGA INSTALADA - LINEA 1
		var oLabelCargaNormDec	= new sap.m.Label({
			text			:"Carga Normal Declarada kW",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputCargaNormDec	= new sap.m.Input({			
			id				: "MOCargaNormDec",		
			value			: { path:"/CargaNormDec" }, 
			editable		: false}).addStyleClass("divInputOrden");	        
        
		var oLabelCargaFlucDec	= new sap.m.Label({
			text			:"Carga Fluctuante Declarada kW",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputCargaFlucDec	= new sap.m.Input({
			id				: "MOCargaFlucDec",		
			value			: { path:"/CargaFlucDec" }, 
			editable		: false}).addStyleClass("divInputOrden");	
		
		var oFormElemCiL10 		= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelCargaNormDec, oInputCargaNormDec, oLabelCargaFlucDec, oInputCargaFlucDec ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	  
		
		// CARGA INSTALADA - LINEA 2
		var oLabelCargaNormVer	= new sap.m.Label({
			text			:"Carga Normal Verificada kW",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputCargaNormVer	= new sap.m.Input({			
			id				: "MOCargaNormVer",		
			value			: { path:"/CargaNormVer" },
			liveChange 		: function(oEvent){	
								var val 	= this.getValue();
								var regex 	= /^[0-9]{0,11}(\.)?([0-9]{1,2})?$/;
								if(sap.ui.getCore().byId("MOSecDcCi").getCollapsed()){ 
									if(!val.match(regex)) {
										this.setValue(this._lastValue);
									}else{
										this._lastValue = val;	
									}	
								}
							},
			editable		: true}).addStyleClass("divInputOrden");	        
        
		var oLabelCargaFlucVer	= new sap.m.Label({
			text			:"Carga Fluctuante Verificada kW",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputCargaFlucVer	= new sap.m.Input({			
			id				: "MOCargaFlucVer",			
			value			: { path:"/CargaFlucVer" }, 
			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,11}(\.)?([0-9]{1,2})?$/;
				if(sap.ui.getCore().byId("MOSecDcCi").getCollapsed()){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},			
			editable		: true}).addStyleClass("divInputOrden");			
		
		var oFormElemCiL20 		= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelCargaNormVer, oInputCargaNormVer, oLabelCargaFlucVer, oInputCargaFlucVer ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	  
		
		// CARGA INSTALADA - LINEA 3
		var oLabelCargaTotaDec	= new sap.m.Label({
			text			:"Carga Total Verificada kW",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputCargaTotaDec	= new sap.m.Input({			
			id				: "MOCargaTotaDec",		
			value			: { path:"/CargaTotaDec" }, 
			editable		: false}).addStyleClass("divInputOrden");	        		
		
		var oFormElemCiL30 		= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelCargaTotaDec, oInputCargaTotaDec, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	  
		
		
		// CONTENEDOR CARGA INSTALADA
		var oFormContCi	= new sap.ui.layout.form.FormContainer({
			formElements	: [ oFormElemCiL00,
			            	    oFormElemCiL10,
			            	    oFormElemCiL20,
			            	    oFormElemCiL30 ]
		});
		 
		// FORM CARGA INSTALADA
        var oformCi 		= new sap.ui.layout.form.Form({
        	width 					: "100%",
        	layout 					: new sap.ui.layout.form.GridLayout(),     	 	
        	formContainers			: [ oFormContCi ]
        }).addStyleClass("formElementVerOrden");         

        // ========================================================
		// DIRECCI�N DE ORDEN
		// ========================================================	 
        
		// DIRECCI�N DE ORDEN - LINEA 1
		var oLabelPaLandx	= new sap.m.Label({
			text			:"Pa�s",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputPaLandx	= new sap.m.Input({			
			id				: "MOPaLandx",		
			value			: { path:"/PaLandx" }, 
			editable		: false}).addStyleClass("divInputOrden");	        
        
		var oLabelPaBezei	= new sap.m.Label({
			text			:"Provincia",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputPaBezei	= new sap.m.Input({			
			id					: "MOPaBezei",		
	    	width				: "95%",	
	    	type				: sap.m.InputType.Text, 
            placeholder			: 'Provincia...',  	    	
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda 
		}).addStyleClass("divInput");

	    new sap.m.SelectDialog("PaBezeiDia", {  
        	title		: "Provincia",  
        	items		: {     
    			path		: "/provinciaSet",  
    			template	: new sap.m.StandardListItem({  
    							title: "{Region}",
        	    				info : "{Bezei}",
    							active: true
    			
    			})},
    			templateShareable: true,
            liveChange	: oController.handleSearchPaBezei,
			search		: oController.handleSearchPaBezei,
        	confirm		: oController.handleClosePaBezei,  
        	cancel		: oController.handleClosePaBezei});		
        
		var oFormElemDoL10 		= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelPaLandx, oInputPaLandx, oLabelPaBezei, oInputPaBezei ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	       
        
		// DIRECCI�N DE ORDEN - LINEA 2
		var oLabelPaCity1	= new sap.m.Label({
			text			:"Cant�n",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputPaCity1	= new sap.m.Input({			
			id					: "MOPaCity1",		
	    	width				: "95%",	
	    	type				: sap.m.InputType.Text, 
            placeholder			: 'Cant�n...',  	    	
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda 
		}).addStyleClass("divInput");	   
		
	    new sap.m.SelectDialog("PaCity1Dia", {  
        	title		: "Cant�n",  
        	items		: {     
    			path		: "/cantonSet",  
    			template	: new sap.m.StandardListItem({  
    							title: "{CityCode}",
        	    				info : "{CityName}",
    							active: true
    			
    			})},
    			templateShareable: true,
            liveChange	: oController.handleSearchPaCity1,
			search		: oController.handleSearchPaCity1,
        	confirm		: oController.handleClosePaCity1,  
        	cancel		: oController.handleClosePaCity1});		
        
		var oLabelPaCity2	= new sap.m.Label({
			text			:"Parroqu�a",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputPaCity2	= new sap.m.Input({			
			id					: "MOPaCity2",		
	    	width				: "95%",	
	    	type				: sap.m.InputType.Text, 
            placeholder			: 'Parroqu�a...',  	    	
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda 
		}).addStyleClass("divInput");
		

	    new sap.m.SelectDialog("PaCity2Dia", {  
        	title		: "Parroquia",  
        	items		: {     
    			path		: "/parroquiaSet",  
    			template	: new sap.m.StandardListItem({  
    							title: "{CitypCode}",
        	    				info : "{CityPart}",
    							active: true
    			})},
    		templateShareable: true,
            liveChange	: oController.handleSearchPaCity2,
			search		: oController.handleSearchPaCity2,
        	confirm		: oController.handleClosePaCity2,  
        	cancel		: oController.handleClosePaCity2});				
		
		var oFormElemDoL20 		= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelPaCity1, oInputPaCity1, oLabelPaCity2, oInputPaCity2 ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	  
		
		// DIRECCI�N DE ORDEN - LINEA 3
		var oLabelPaStreet	= new sap.m.Label({
			text			:"Calle",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputPaStreet	= new sap.m.Input({			
			id					: "MOPaStreet",	
	    	width				: "95%",	
	    	type				: sap.m.InputType.Text, 
            placeholder			: 'Calle...',  	    	
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda 
		}).addStyleClass("divInput");
		
	    new sap.m.SelectDialog("PaStreetDia", {  
        	title		: "Calle",  
        	items		: {     
    			path		: "/calleSet",  
    			template	: new sap.m.StandardListItem({  
    							title: "{StrtCode}",
        	    				info : "{Street}",
    							active: true
    			
    			})},
    		templateShareable: true,
            liveChange	: oController.handleSearchPaStreet,
			search		: oController.handleSearchPaStreet,
        	confirm		: oController.handleClosePaStreet,  
        	cancel		: oController.handleClosePaStreet});
		
		var oLabelPaHouseNum1	= new sap.m.Label({
			text			:"N�mero",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputPaHouseNum1	= new sap.m.Input({			
			id				: "MOPaHouseNum1",		
			maxLength 		: 10,			
			value			: { path:"/PaHouseNum1" }, 
			editable		: true}).addStyleClass("divInputOrden");
		
		var oFormElemDoL30 		= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelPaStreet, oInputPaStreet, oLabelPaHouseNum1, oInputPaHouseNum1 ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	  
		
		// DIRECCI�N DE ORDEN - LINEA 4
		var oLabelPaStrSuppl3	= new sap.m.Label({
			text			:"Nombre Intersecci�n",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputPaStrSuppl3	= new sap.m.Input({			
			id				: "MOPaStrSuppl3",
			maxLength 		: 40,
			value			: { path:"/PaStrSuppl3" }, 
			editable		: true}).addStyleClass("divInputOrden");		
		
		var oLabelPaLocation	= new sap.m.Label({
			text			:"Referencia Direcci�n",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputPaLocation	= new sap.m.Input({			
			id				: "MOPaLocation",
			maxLength 		: 40,
			value			: { path:"/PaLocation" }, 
			editable		: true}).addStyleClass("divInputOrden");			       
		
		var oFormElemDoL40 		= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelPaStrSuppl3, oInputPaStrSuppl3, oLabelPaLocation, oInputPaLocation ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	  
		
		// DIRECCI�N DE ORDEN - LINEA 5
		var oLabelPaStrSuppl1	= new sap.m.Label({
			text			:"Nombre del Edificio",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputPaStrSuppl1	= new sap.m.Input({			
			id				: "MOPaStrSuppl1",	
			maxLength 		: 40,
			value			: { path:"/PaStrSuppl1" }, 
			editable		: true}).addStyleClass("divInputOrden");		
		
		var oLabelPaBuilding	= new sap.m.Label({
			text			:"C�digo de Edificio",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputPaBuilding	= new sap.m.Input({			
			id				: "MOPaBuilding",	
			maxLength 		: 20,
			value			: { path:"/PaBuilding" }, 
			editable		: true}).addStyleClass("divInputOrden");	 		
		
		var oFormElemDoL50 		= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelPaStrSuppl1, oInputPaStrSuppl1, oLabelPaBuilding, oInputPaBuilding ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	  
		
		// DIRECCI�N DE ORDEN - LINEA 6
		var oLabelPaStrSuppl2	= new sap.m.Label({
			text			:"Nombre de la Torre o Bloque",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputPaStrSuppl2	= new sap.m.Input({			
			id				: "MOPaStrSuppl2",	
			maxLength 		: 40,
			value			: { path:"/PaStrSuppl2" }, 
			editable		: true}).addStyleClass("divInputOrden");	       
 
		var oLabelPaFloor	= new sap.m.Label({
			text			:"Piso",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputPaFloor	= new sap.m.Input({			
			id				: "MOPaFloor",
			maxLength 		: 10,	
			value			: { path:"/PaFloor" }, 
			editable		: true}).addStyleClass("divInputOrden");	 		
		
		
		var oFormElemDoL60 		= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelPaStrSuppl2, oInputPaStrSuppl2, oLabelPaFloor, oInputPaFloor ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	  
		
		// DIRECCI�N DE ORDEN - LINEA 7  
		var oLabelPaRoomnumber	= new sap.m.Label({
			text			:"Departamento",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputPaRoomnumber	= new sap.m.Input({			
			id				: "MOPaRoomnumber",		
			maxLength 		: 10,	
			value			: { path:"/PaRoomnumber" }, 
			editable		: true}).addStyleClass("divInputOrden");
		
		var oLabelPaHomeCity	= new sap.m.Label({
			text			:"Residencia Alternativa",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputPaHomeCity	= new sap.m.Input({			
			id				: "MOPaHomeCity",
			maxLength 		: 40,	
			value			: { path:"/PaHomeCity" }, 
			editable		: true}).addStyleClass("divInputOrden");	  
		
		var oFormElemDoL70 		= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelPaRoomnumber, oInputPaRoomnumber, oLabelPaHomeCity, oInputPaHomeCity ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	  
		
		// DIRECCI�N DE ORDEN - LINEA 8
		var oLabelPaHouseNum2	= new sap.m.Label({
			text			:"Complemento",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputPaHouseNum2	= new sap.m.Input({			
			id				: "MOPaHouseNum2",
			maxLength 		: 10,	
			value			: { path:"/PaHouseNum2" }, 
			editable		: true}).addStyleClass("divInputOrden");  
        
		var oLabelPaRemark	= new sap.m.Label({
			text			:"Comentarios",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputPaRemark	= new sap.m.TextArea({			
			id				: "MOPaRemark",		
			value			: { path:"/PaRemark" }, 
			rows			: 3,
			maxLength 		: 50,
			editable		: true}).addStyleClass("divInputOrden");
		
		var oFormElemDoL80 		= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelPaHouseNum2, oInputPaHouseNum2, oLabelPaRemark, oInputPaRemark ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	  		
		
		// CONTENEDOR DIRECCI�N DE ORDEN
		var oFormContDo	= new sap.ui.layout.form.FormContainer({
			formElements	: [ oFormElemDoL10,
			            	    oFormElemDoL20,
			            	    oFormElemDoL30,
			            	    oFormElemDoL40,
			            	    oFormElemDoL50,
			            	    oFormElemDoL60,
			            	    oFormElemDoL70,
			            	    oFormElemDoL80 ]
		});
		 
		// FORM DIRECCI�N DE ORDEN
        var oformDo 		= new sap.ui.layout.form.Form({
        	width 					: "100%",
        	layout 					: new sap.ui.layout.form.GridLayout(),     	 	
        	formContainers			: [ oFormContDo ]
        }).addStyleClass("formElementVerOrden");     
        
        // ========================================================
		// ACOMETIDA - TABLERO
		// ========================================================	  
		//AYUDA Caracteristicas	
		new sap.m.SelectDialog("CaracteristicaDia", {  
			items		: {     
				path		: "/tipo_acomSet",  
				template	: new sap.m.StandardListItem({  
							title: "{CharValue}",
    	    				info : "{DescrCval}",
							active: true
			
			})},
		templateShareable: true,
        liveChange	: oController.handleSearchCaracteristica,
		search		: oController.handleSearchCaracteristica,
    	confirm		: oController.handleCloseCaracteristica,  
    	cancel		: oController.handleCloseCaracteristica});	
        
        // ACOMETIDA - TITULO
		var oLabelTitAcom	= new sap.m.Label({
			text			:"DATOS ACOMETIDA INSTALADA", 
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oFormElemAcomL00	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTitAcom, new sap.m.Label(), new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	    
         
        // ACOMETIDA - LINEA 1
		var oLabelTipoAcomx	= new sap.m.Label({
			text			:"Tipo de Acometida",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");        
        
		var oInputTipoAcomx			= new sap.m.Input({
			id					: "MOTipoAcomx",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Tipo Acometida...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");		

		var oLabelCalAcomx	= new sap.m.Label({
			text			:"Calibre de Acometida",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputCalAcomx			= new sap.m.Input({
			id					: "MOCalAcomx",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Calibre Acometida...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");			
		
		var oFormElemAcomL10 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTipoAcomx, oInputTipoAcomx, oLabelCalAcomx, oInputCalAcomx ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
        // ACOMETIDA - LINEA 2
		var oLabelLongAcom	= new sap.m.Label({
			text			:"Longitud de Acometida",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputLongAcom	= new sap.m.Input({			
			id				: "MOLongAcom",		
			value			: { path:"/LongAcom" }, 
			type			: sap.m.InputType.Text,
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,4}\.([0-9]{1,2})?$/;  
				if(sap.ui.getCore().byId("MOSecAcom").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},*/
			editable		: true,
			change			: oController.doExpresionReg}).addStyleClass("divInputOrden");	        		
		
		var oLabelLongFachada	= new sap.m.Label({
			text			:"Longitud Fachada",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputLongFachada	= new sap.m.Input({			
			id				: "MOLongFachada",		
			value			: { path:"/LongFachada" }, 
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,3}\.([0-9]{1,2})?$/;  
				if(sap.ui.getCore().byId("MOSecAcom").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	*/			
			editable		: true,
			change			: oController.doExpresionReg}).addStyleClass("divInputOrden");
		
		var oFormElemAcomL20 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelLongAcom, oInputLongAcom, oLabelLongFachada, oInputLongFachada ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
        // ACOMETIDA - LINEA 3
		var oLabelFasesAcomx	= new sap.m.Label({
			text			:"Fases de Acometida",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");    
		
		var oInputFasesAcomx			= new sap.m.Input({
			id					: "MOFasesAcomx",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Fases Acometida...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");					
        
		var oLabelMatAcomx	= new sap.m.Label({
			text			:"Material de Acometida",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputMatAcomx			= new sap.m.Input({
			id					: "MOMatAcomx",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Material Acometida...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");		 		
		
		var oFormElemAcomL30 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelFasesAcomx, oInputFasesAcomx, oLabelMatAcomx, oInputMatAcomx ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
        // ACOMETIDA - LINEA 4
		var oLabelDemAcom	= new sap.m.Label({
			text			:"Demanda de Acometida",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputDemAcom	= new sap.m.Input({			
			id				: "MODemAcom",		
			value			: { path:"/DemAcom" }, 
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,3}\.([0-9]{1,2})?$/  
				if(sap.ui.getCore().byId("MOSecAcom").getCollapsed() == false){	
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},*/				
			editable		: true,
			change			: oController.doExpresionReg}).addStyleClass("divInputOrden");	        
        
		var oLabelFactDiver	= new sap.m.Label({
			text			:"Factor de Diversificaci�n",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputFactDiver	= new sap.m.Input({			
			id				: "MOFactDiver",		
			value			: { path:"/FactDiver" }, 
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,1}\.([0-9]{1,2})?$/;  
				if(sap.ui.getCore().byId("MOSecAcom").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},*/					
			editable		: true,
			change			: oController.doExpresionReg}).addStyleClass("divInputOrden");
		
		var oFormElemAcomL40 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelDemAcom, oInputDemAcom, oLabelFactDiver, oInputFactDiver ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
        // ACOMETIDA - LINEA 5
		var oLabelCalAcomRetx	= new sap.m.Label({
			text			:"Calibre de Acometida Retirada",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputCalAcomRetx			= new sap.m.Input({
			id					: "MOCalAcomRetx",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Calibre Acometida Retirada...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");			
        
		var oLabelTipoAcomRetx	= new sap.m.Label({
			text			:"Tipo de Acometida Retirada",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTipoAcomRetx			= new sap.m.Input({
			id					: "MOTipoAcomRetx",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Tipo Acometida Retirada...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");				
		
		var oFormElemAcomL50 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelCalAcomRetx, oInputCalAcomRetx, oLabelTipoAcomRetx, oInputTipoAcomRetx ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// ACOMETIDA - LINEA 6
		var oLabelLongAcomRet	= new sap.m.Label({
			text			:"Longitud de Acometida Retirada",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputLongAcomRet	= new sap.m.Input({			
			id				: "MOLongAcomRet",		
			value			: { path:"/LongAcomRet" }, 
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,4}\.([0-9]{1,2})?$/;
				if(sap.ui.getCore().byId("MOSecAcom").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	*/			
			editable		: true,
			change			: oController.doExpresionReg}).addStyleClass("divInputOrden");	
        
		var oLabelClaseRedx	= new sap.m.Label({
			text			:"Clase de Red",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputClaseRedx			= new sap.m.Input({
			id					: "MOClaseRedx",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Clase de Red...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");				
		
		var oFormElemAcomL60 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelLongAcomRet, oInputLongAcomRet, oLabelClaseRedx, oInputClaseRedx ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// ACOMETIDA - LINEA 7
		var oLabelTipoRedx	= new sap.m.Label({
			text			:"Tipo de Red",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTipoRedx			= new sap.m.Input({
			id					: "MOTipoRedx",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Tipo de Red...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");			
        
		var oLabelNroProyectox	= new sap.m.Label({
			text			:"N�mero de Proyecto",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputNroProyectox	= new sap.m.Input({			
			id				: "MONroProyectox",		
			value			: { path:"/NroProyectox" }, 
			maxLength 		: 10,
			editable		: true}).addStyleClass("divInputOrden");
		
		var oFormElemAcomL70 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTipoRedx, oInputTipoRedx, oLabelNroProyectox, oInputNroProyectox ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// ACOMETIDA - LINEA 8
		var oLabelOrigFinax	= new sap.m.Label({
			text			:"Origen de Financiamiento",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputOrigFinax			= new sap.m.Input({
			id					: "MOOrigFinax",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Origen de Financiamiento...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");				
        
		var oLabelSecFasesAcomx	= new sap.m.Label({
			text			:"Secuencia de Fases Acometida",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputSecFasesAcomx			= new sap.m.Input({
			id					: "MOSecFasesAcomx",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Secuencia fases acometida...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");			
		
		var oFormElemAcomL80 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelOrigFinax, oInputOrigFinax, oLabelSecFasesAcomx, oInputSecFasesAcomx ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// CONTENEDOR ACOMETIDA 
		var oFormContAcom	= new sap.ui.layout.form.FormContainer({
			formElements	: [ oFormElemAcomL00,
			            	    oFormElemAcomL10,
			            	    oFormElemAcomL20,
			            	    oFormElemAcomL30,
			            	    oFormElemAcomL40,
			            	    oFormElemAcomL50,
			            	    oFormElemAcomL60,
			            	    oFormElemAcomL70,
			            	    oFormElemAcomL80 ]
		});
		 
		// FORM ACOMETIDA 
        var oformAcom 		= new sap.ui.layout.form.Form({
        	width 					: "100%",
        	layout 					: new sap.ui.layout.form.GridLayout(),     	 	
        	formContainers			: [ oFormContAcom ]
        }).addStyleClass("formElementVerOrden");          
        
        // TABLERO - TITULO
		var oLabelTitTab	= new sap.m.Label({
			text			:"TABLERO",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oFormElemTabL00	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTitTab, new sap.m.Label(), new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	 
		
		// TABLERO - LINEA 1
		var oLabelUbicTabx	= new sap.m.Label({
			text			:"Ubicaci�n de Tablero",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputUbicTabx			= new sap.m.Input({
			id					: "MOUbicTabx",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Ubicaci�n de Tablero...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");			
        
		var oLabelNroTab	= new sap.m.Label({
			text			:"N�mero de Tablero",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputNroTab	= new sap.m.Input({			
			id				: "MONroTab",		
			value			: { path:"/NroTab" }, 
			maxLength 		: 6,
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}$/; 
				if(sap.ui.getCore().byId("MOSecAcom").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	*/			
			editable		: true,
			change			: oController.doExpresionReg}).addStyleClass("divInputOrden");
		
		var oFormElemTabL10 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelUbicTabx, oInputUbicTabx, oLabelNroTab, oInputNroTab ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// TABLERO - LINEA 2
		var oLabelDenTab	= new sap.m.Label({
			text			:"Denominaci�n del Tablero",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputDenTab	= new sap.m.Input({			
			id				: "MODenTab",		
			value			: { path:"/DenTab" }, 
			maxLength 		: 30,	
			editable		: true}).addStyleClass("divInputOrden");	        
        
		var oLabelConstTabx	= new sap.m.Label({
			text			:"Constructor del Tablero",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputConstTabx			= new sap.m.Input({
			id					: "MOConstTabx",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Constructor de Tablero...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");				
		
		var oFormElemTabL20 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelDenTab, oInputDenTab, oLabelConstTabx, oInputConstTabx ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// TABLERO - LINEA 3
		var oLabelProtPpalTabx	= new sap.m.Label({
			text			:"Protecci�n Principal del Tablero",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden"); 
		
		var oInputProtPpalTabx			= new sap.m.Input({
			id					: "MOProtPpalTabx",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Protecci�n Ppal. de Tablero...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");			
        
		var oLabelCargaProtx	= new sap.m.Label({
			text			:"Tipo de Protecci�n de Tablero",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputCargaProtx			= new sap.m.Input({
			id					: "MOCargaProtx",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Tipo Protecci�n Ppal. de Tablero...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");				
		
		var oFormElemTabL30 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelProtPpalTabx, oInputProtPpalTabx, oLabelCargaProtx, oInputCargaProtx ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// TABLERO - LINEA 4
		var oLabelCasTabx2	= new sap.m.Label({
			text			:"Casillero Tablero",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputCasTabx2 = new sap.m.Input({			
			id				: "MOCasTabx",		
			value			: { path:"/CasTab" },  
			maxLength 		: 10,
			editable		: true}).addStyleClass("divInputOrden");	        
        
		var oLabelProtInd	= new sap.m.Label({
			text			:"Protecci�n Individual",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");	
		
		var oInputProtInd			= new sap.m.Input({
			id					: "MOProtInd",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Protecci�n Individual...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");		
			
		
		var oFormElemTabL40 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelCasTabx2, oInputCasTabx2, oLabelProtInd, oInputProtInd ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// TABLERO - LINEA 5
		var oLabelTipoProtx	= new sap.m.Label({
			text			:"Tipo de Protecci�n Individual",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTipoProtx			= new sap.m.Input({
			id					: "MOTipoProtx",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Tipo Protecci�n Individual...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");				
        
		var oLabelFasesMedx	= new sap.m.Label({
			text			:"Fases Medidor",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputFasesMedx			= new sap.m.Input({
			id					: "MOFasesMedx",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Fases Medidor...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");			
		
		var oFormElemTabL50 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTipoProtx, oInputTipoProtx, oLabelFasesMedx, oInputFasesMedx ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// TABLERO - LINEA 6
		var oLabelSecFasesx	= new sap.m.Label({
			text			:"Secuencia Fases Medidor",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");	
		
		var oInputSecFasesx			= new sap.m.Input({
			id					: "MOSecFasesx",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Secuencia Fases Medidor...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");			
		
		var oFormElemTabL60 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelSecFasesx, oInputSecFasesx, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});			
        
		// CONTENEDOR TABLERO 
		var oFormContTab	= new sap.ui.layout.form.FormContainer({
			formElements	: [ oFormElemTabL00,
			            	    oFormElemTabL10, 
			            	    oFormElemTabL20,
			            	    oFormElemTabL30, 
			            	    oFormElemTabL40,
			            	    oFormElemTabL50,
			            	    oFormElemTabL60 ]
		});
		 
		// FORM TABLERO 
        var oformTab 		= new sap.ui.layout.form.Form({
        	width 					: "100%",
        	layout 					: new sap.ui.layout.form.GridLayout(),     	 	
        	formContainers			: [ oFormContTab ]
        }).addStyleClass("formElementVerOrden");   
        
        // ========================================================
		// EQUIPO
		// ========================================================	         

		//AYUDA Equipos
		new sap.m.SelectDialog("EquipoDia", {  
			items		: {     
				path		: "/equnrSet",  
				template	: new sap.m.StandardListItem({  
							title: "{Equnr}",
    	    				info : "{Sernr}",
							active: true,
			
			})},
		templateShareable: true,
        liveChange	: oController.handleSearchEquipo,
		search		: oController.handleSearchEquipo,
    	confirm		: oController.handleCloseEquipo,  
    	cancel		: oController.handleCloseEquipo});	  
		
		//AYUDA Equipos
		new sap.m.SelectDialog("EquipoDiaRet", {  
			items		: {     
				path		: "/equnrRetSet",  
				template	: new sap.m.StandardListItem({  
							title: "{Equnr}",
    	    				info : "{Sernr}",
							active: true,
			
			})},
		templateShareable: true,
        liveChange	: oController.handleSearchEquipo,
		search		: oController.handleSearchEquipo,
    	confirm		: oController.handleCloseEquipo,  
    	cancel		: oController.handleCloseEquipo});			
        
        // EQUIPO - DATOS DE EQUIPO - TITULO
		var oLabelTitDatEqui	= new sap.m.Label({
			text			:"DATOS DE EQUIPOS",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");		
		
		var oFormElemDatEquiL00	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTitDatEqui, new sap.m.Label(), new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	 
		
		// EQUIPO - DATOS DE EQUIPO - LINEA 1
		var oLabelAccionMedidor	= new sap.m.Label({
			text			:"Acci�n sobre Medidor",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputAccionMedidor			= new sap.m.Input({
			id					: "MOAccionMedidor", 
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Acci�n Medidor...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");		
	
		//AYUDA Accion Medidor
		new sap.m.SelectDialog("AccionMedDia", {  
			title		: "Acci�n Medidor",  
			items		: {     
				path		: "/accionmedSet",  
				template	: new sap.m.StandardListItem({  
							title: "{ZcodCred}",
    	    				info : "{ZdescCred}",
							active: true
			
			})},
		templateShareable: true,
        liveChange	: oController.handleSearchAccionMed,
		search		: oController.handleSearchAccionMed,
    	confirm		: oController.handleCloseAccionMed,  
    	cancel		: oController.handleCloseAccionMed});
        
		var oLabelUbicMedidor	= new sap.m.Label({
			text			:"Ubicaci�n del Medidor",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputUbicMedidor			= new sap.m.Input({
			id					: "MOUbicMedidor",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Ubicaci�n Medidor...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");			
		
		var oFormElemDatEquiL10 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelAccionMedidor, oInputAccionMedidor, oLabelUbicMedidor, oInputUbicMedidor ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});			
		
		// EQUIPO - DATOS DE EQUIPO - LINEA 2
		var oLabelMediAnt	= new sap.m.Label({
			text			:"Medidor Anterior",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden"); 
		
		var oInputMediAnt			= new sap.m.Input({
			id					: "MOMediAnt",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Medidor Anterior...',  
            showValueHelp		: true,
            valueHelpOnly		: false,
            editable			: true,
            valueHelpRequest	: oController.doAyudaBusqueda,  
            change				: oController.doChangeEquipo
	    }).addStyleClass("divInput");			
        
		var oLabelMediPost	= new sap.m.Label({
			text			:"Medidor Posterior",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputMediPost			= new sap.m.Input({
			id					: "MOMediPost", 
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Medidor Posterior...',  
            showValueHelp		: true,
            valueHelpOnly		: false,
            editable			: true,
            valueHelpRequest	: oController.doAyudaBusqueda,  
            change				: oController.doChangeEquipo
	    }).addStyleClass("divInput");			
		
		var oFormElemDatEquiL20 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelMediAnt, oInputMediAnt, oLabelMediPost, oInputMediPost ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});
		
		// EQUIPO - DATOS DE EQUIPO - LINEA 3
		var oLabelPerdTrans	= new sap.m.Label({
			text			:"P�rdida por transformaci�n 2%",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oCheckPerdTrans 	= new sap.m.CheckBox({
			id				: "MOPerdTrans",
			selected		: { path: "/PerdTrans",
			        	  		formatter: function(selec){ if (selec == "X"){ return true; } else{ return false; } } },
			editable		: true }).addStyleClass("divCheckOrden");    	

		var oLabelTabCentral	= new sap.m.Label({
			text			:"Medidor Centralizado",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTabCentral			= new sap.m.Input({
			id					: "MOTabCentral",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Medidor Centralizado...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");		
	
		//AYUDA Medidor	Centralizado
		new sap.m.SelectDialog("TabCentralDia", {  
			title		: "Medidor Centralizado",  
			items		: {     
				path		: "/dominioSet",  
				template	: new sap.m.StandardListItem({  
					title: "{DomvalueL}",
					info : "{Ddtext}",
					active: true

				})},
				templateShareable: true,
				confirm		: oController.handleCloseTabCentral,  
				cancel		: oController.handleCloseTabCentral}).addStyleClass("diaNoBusq");	
		
		var oFormElemDatEquiL30 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelPerdTrans, oCheckPerdTrans, oLabelTabCentral, oInputTabCentral ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});		
		
		// CONTENEDOR EQUIPO - DATOS DE EQUIPO
		var oFormContDatEqui	= new sap.ui.layout.form.FormContainer({
			formElements	: [ oFormElemDatEquiL00,
			            	    oFormElemDatEquiL10,
			            	    oFormElemDatEquiL20,
			            	    oFormElemDatEquiL30]
		});
		
		// FORM EQUIPO - DATOS DE EQUIPO 
        var oformDatEqui 		= new sap.ui.layout.form.Form({
        	id						: "MOFormDatEqui",
        	width 					: "100%",
        	layout 					: new sap.ui.layout.form.GridLayout(),     	 	
        	formContainers			: [ oFormContDatEqui ]
        }).addStyleClass("formElementVerOrden");
        
        // EQUIPO - MEDIDOR EXISTENTE - TITULO
		var oLabelTitMedExi	= new sap.m.Label({
			text			:"MEDIDOR EXISTENTE",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oFormElemMedExiL00	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTitMedExi, new sap.m.Label(), new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	 
        
		// EQUIPO - MEDIDOR EXISTENTE - LINEA 1
		var oLabelNroEquipoE	= new sap.m.Label({
			text			:"N�mero de Equipo",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputNroEquipoE	= new sap.m.Input({			
			id				: "MONroEquipoE",		
			value			: { path:"/NroEquipoEx" }, 
			editable		: false}).addStyleClass("divInputOrden");	        
        
		var oLabelLecEnerActE	= new sap.m.Label({
			text			:"Lectura de Energ�a Activa kWh",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputLecEnerActE	= new sap.m.Input({			
			id				: "MOLecEnerActE",		
			value			: { path:"/LecEnerActE" },  
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	*/			
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");
		
		var oFormElemMedExiL10 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelNroEquipoE, oInputNroEquipoE, oLabelLecEnerActE, oInputLecEnerActE ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});
		
		// EQUIPO - MEDIDOR EXISTENTE - LINEA 2
		var oLabelLecEnerActTaraE	= new sap.m.Label({
			text			:"Lectura de Energ�a Activa kWh Tarifa A",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputLecEnerActTaraE	= new sap.m.Input({			
			id				: "MOLecEnerActTaraE",		
			value			: { path:"/LecEnerActTaraE" },
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},*/				
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");	        
        
		var oLabelLecEnerActTarbE	= new sap.m.Label({
			text			:"Lectura de Energ�a Activa kWh Tarifa B", 
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputLecEnerActTarbE	= new sap.m.Input({			
			id				: "MOLecEnerActTarbE",		
			value			: { path:"/LecEnerActTarbE" }, 
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	*/			
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");
		
		var oFormElemMedExiL20 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelLecEnerActTaraE, oInputLecEnerActTaraE, oLabelLecEnerActTarbE, oInputLecEnerActTarbE ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// EQUIPO - MEDIDOR EXISTENTE - LINEA 3
		var oLabelLecEnerActTarcE	= new sap.m.Label({
			text			:"Lectura de Energ�a Activa kWh Tarifa C",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputLecEnerActTarcE	= new sap.m.Input({			
			id				: "MOLecEnerActTarcE",		
			value			: { path:"/LecEnerActTarcE" }, 
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	*/			
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");	        
        
		var oLabelLecEnerActTardE	= new sap.m.Label({
			text			:"Lectura de Energ�a Activa kWh Tarifa D",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputLecEnerActTardE	= new sap.m.Input({			
			id				: "MOLecEnerActTardE",		
			value			: { path:"/LecEnerActTardE" },
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	*/			
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");
		
		var oFormElemMedExiL30 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelLecEnerActTarcE, oInputLecEnerActTarcE, oLabelLecEnerActTardE, oInputLecEnerActTardE ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// EQUIPO - MEDIDOR EXISTENTE - LINEA 4
		var oLabelDemMaxTaraE	= new sap.m.Label({
			text			:"Demanda M�xima kW Tarifa A",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputDemMaxTaraE	= new sap.m.Input({			
			id				: "MODemMaxTaraE",		
			value			: { path:"/DemMaxTaraE" }, 
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}(\.)?([0-9]{1,2})?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	*/			
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");	        
        
		var oLabelDemMaxTarbE	= new sap.m.Label({
			text			:"Demanda M�xima kW Tarifa B",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputDemMaxTarbE	= new sap.m.Input({			
			id				: "MODemMaxTarbE",		
			value			: { path:"/DemMaxTarbE" }, 
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}(\.)?([0-9]{1,2})?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	*/			
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");
		
		var oFormElemMedExiL40 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelDemMaxTaraE, oInputDemMaxTaraE, oLabelDemMaxTarbE, oInputDemMaxTarbE ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// EQUIPO - MEDIDOR EXISTENTE - LINEA 5
		var oLabelDemMaxTarcE	= new sap.m.Label({
			text			:"Demanda M�xima kW Tarifa C",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputDemMaxTarcE	= new sap.m.Input({			
			id				: "MODemMaxTarcE",		
			value			: { path:"/DemMaxTarcE" },
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}(\.)?([0-9]{1,2})?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	*/			
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");	        
        
		var oLabelDemMaxTardE	= new sap.m.Label({
			text			:"Demanda M�xima kW Tarifa D",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputDemMaxTardE	= new sap.m.Input({			
			id				: "MODemMaxTardE",		
			value			: { path:"/DemMaxTardE" }, 
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}(\.)?([0-9]{1,2})?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	*/			
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");
		
		var oFormElemMedExiL50 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelDemMaxTarcE, oInputDemMaxTarcE, oLabelDemMaxTardE, oInputDemMaxTardE ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// EQUIPO - MEDIDOR EXISTENTE - LINEA 6
		var oLabelLecEnerReaE	= new sap.m.Label({
			text			:"Lect. Energ�a Reactiva kVArh",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputLecEnerReaE	= new sap.m.Input({			
			id				: "MOLecEnerReaE",		
			value			: { path:"/LecEnerReaE" }, 
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	*/			
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");	        
		
		var oFormElemMedExiL60 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelLecEnerReaE, oInputLecEnerReaE, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// CONTENEDOR EQUIPO - MEDIDOR EXISTENTE
		var oFormContMedExi	= new sap.ui.layout.form.FormContainer({
			formElements	: [ oFormElemMedExiL00,
			            	    oFormElemMedExiL10,
			            	    oFormElemMedExiL20,
			            	    oFormElemMedExiL30,
			            	    oFormElemMedExiL40,
			            	    oFormElemMedExiL50,
			            	    oFormElemMedExiL60]
		});
		
		// FORM EQUIPO - MEDIDOR EXISTENTE
        var oformMedExi 		= new sap.ui.layout.form.Form({
        	id						: "MOFormMedExi",
        	width 					: "100%",
        	layout 					: new sap.ui.layout.form.GridLayout(),     	 	
        	formContainers			: [ oFormContMedExi ]
        }).addStyleClass("formElementVerOrden");     
        
        // EQUIPO - MEDIDOR INSTALADO - TITULO
		var oLabelTitMedIns	= new sap.m.Label({
			text			:"MEDIDOR INSTALADO",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oFormElemMedInsL00	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTitMedIns, new sap.m.Label(), new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	 
		
		// EQUIPO - MEDIDOR INSTALADO - LINEA 1
		var oLabelNroEquipoI	= new sap.m.Label({
			text			:"N�mero de Equipo",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputNroEquipoI			= new sap.m.Input({
			id					: "MONroEquipoI",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
	        placeholder			: 'Nro. de Equipo...',  
	        showValueHelp		: true,
	        valueHelpOnly		: false,
	        editable			: true,
	        valueHelpRequest	: oController.doAyudaBusqueda, 
	        change				: oController.doChangeEquipo
	    }).addStyleClass("divInput");		
        
		var oLabelLecEnerActI	= new sap.m.Label({
			text			:"Lectura de Energ�a Activa kWh",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputLecEnerActI	= new sap.m.Input({			
			id				: "MOLecEnerActI",		
			value			: { path:"/LecEnerActI" }, 
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	*/			
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");
		
		var oFormElemMedInsL10 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelNroEquipoI, oInputNroEquipoI, oLabelLecEnerActI, oInputLecEnerActI ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});		
        
		// EQUIPO - MEDIDOR INSTALADO - LINEA 2
		var oLabelLecEnerActTaraI	= new sap.m.Label({
			text			:"Lectura de Energ�a Activa kWh Tarifa A",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputLecEnerActTaraI	= new sap.m.Input({			
			id				: "MOLecEnerActTaraI",		
			value			: { path:"/LecEnerActTaraI" },
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},		*/		
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");	        
        
		var oLabelLecEnerActTarbI	= new sap.m.Label({
			text			:"Lectura de Energ�a Activa kWh Tarifa B",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputLecEnerActTarbI	= new sap.m.Input({			
			id				: "MOLecEnerActTarbI",		
			value			: { path:"/LecEnerActTarbI" },
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	*/
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");
		
		var oFormElemMedInsL20 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelLecEnerActTaraI, oInputLecEnerActTaraI, oLabelLecEnerActTarbI, oInputLecEnerActTarbI ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});		
		
		// EQUIPO - MEDIDOR INSTALADO - LINEA 3
		var oLabelLecEnerActTarcI	= new sap.m.Label({
			text			:"Lectura de Energ�a Activa kWh Tarifa C",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputLecEnerActTarcI	= new sap.m.Input({			
			id				: "MOLecEnerActTarcI",		
			value			: { path:"/LecEnerActTarcI" },
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	*/
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");	        
        
		var oLabelLecEnerActTardI	= new sap.m.Label({
			text			:"Lectura de Energ�a Activa kWh Tarifa D",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputLecEnerActTardI	= new sap.m.Input({			
			id				: "MOLecEnerActTardI",		
			value			: { path:"/LecEnerActTardI" },
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	*/
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");
		
		var oFormElemMedInsL30 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelLecEnerActTarcI, oInputLecEnerActTarcI, oLabelLecEnerActTardI, oInputLecEnerActTardI ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});		
		
		// EQUIPO - MEDIDOR INSTALADO - LINEA 4
		var oLabelDemMaxTaraI	= new sap.m.Label({
			text			:"Demanda M�xima kW Tarifa A",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputDemMaxTaraI	= new sap.m.Input({			
			id				: "MODemMaxTaraI",		
			value			: { path:"/DemMaxTaraI" },
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}(\.)?([0-9]{1,2})?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},*/
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");	        
        
		var oLabelDemMaxTarbI	= new sap.m.Label({
			text			:"Demanda M�xima kW Tarifa B",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputDemMaxTarbI	= new sap.m.Input({			
			id				: "MODemMaxTarbI",		
			value			: { path:"/DemMaxTarbI" }, 
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}(\.)?([0-9]{1,2})?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},*/
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");
		
		var oFormElemMedInsL40 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelDemMaxTaraI, oInputDemMaxTaraI, oLabelDemMaxTarbI, oInputDemMaxTarbI ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});		
		
		// EQUIPO - MEDIDOR INSTALADO - LINEA 5
		var oLabelDemMaxTarcI	= new sap.m.Label({
			text			:"Demanda M�xima kW Tarifa C",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputDemMaxTarcI	= new sap.m.Input({			
			id				: "MODemMaxTarcI",		
			value			: { path:"/DemMaxTarcI" },
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}(\.)?([0-9]{1,2})?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},*/			
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");	        
        
		var oLabelDemMaxTardI	= new sap.m.Label({
			text			:"Demanda M�xima kW Tarifa D",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputDemMaxTardI	= new sap.m.Input({			
			id				: "MODemMaxTardI",		
			value			: { path:"/DemMaxTardI" },
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}(\.)?([0-9]{1,2})?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},*/
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");
		
		var oFormElemMedInsL50 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelDemMaxTarcI, oInputDemMaxTarcI, oLabelDemMaxTardI, oInputDemMaxTardI ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});		
		
		// EQUIPO - MEDIDOR INSTALADO - LINEA 6
		var oLabelLecEnerReaI	= new sap.m.Label({
			text			:"Lect. Energ�a Reactiva kVArh",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputLecEnerReaI	= new sap.m.Input({			
			id				: "MOLecEnerReaI",		
			value			: { path:"/LecEnerReaI" },
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	*/			
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");	        
		
		var oFormElemMedInsL60 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelLecEnerReaI, oInputLecEnerReaI, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});		
		// CONTENEDOR EQUIPO - MEDIDOR INSTALADO
		var oFormContMedIns	= new sap.ui.layout.form.FormContainer({
			formElements	: [ oFormElemMedInsL00, 
			            	    oFormElemMedInsL10,
			            	    oFormElemMedInsL20,
			            	    oFormElemMedInsL30,
			            	    oFormElemMedInsL40,
			            	    oFormElemMedInsL50,
			            	    oFormElemMedInsL60]
		});
		
		// FORM EQUIPO - MEDIDOR INSTALADO
        var oformMedIns 		= new sap.ui.layout.form.Form({
        	id						: "MOFormMedIns",
        	width 					: "100%",
        	layout 					: new sap.ui.layout.form.GridLayout(),     	 	
        	formContainers			: [ oFormContMedIns ]
        }).addStyleClass("formElementVerOrden");                
        
        // EQUIPO - MEDIDOR RETIRADO - TITULO
		var oLabelTitMedRet	= new sap.m.Label({
			text			:"MEDIDOR RETIRADO",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oFormElemMedRetL00	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTitMedRet, new sap.m.Label(), new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});
		
		// EQUIPO - MEDIDOR RETIRADO - LINEA 1
		var oLabelNroEquipoR	= new sap.m.Label({
			text			:"N�mero de Equipo",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputNroEquipoR			= new sap.m.Input({
			id					: "MONroEquipoR",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
	        placeholder			: 'Nro. de Equipo...',  
	        showValueHelp		: true,
	        valueHelpOnly		: false,
	        editable			: true,
	        valueHelpRequest	: oController.doAyudaBusqueda, 
	        change				: oController.doChangeEquipo
	    }).addStyleClass("divInput");				
        
		var oLabelLecEnerActR	= new sap.m.Label({
			text			:"Lectura de Energ�a Activa kWh",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputLecEnerActR	= new sap.m.Input({			
			id				: "MOLecEnerActR",		
			value			: { path:"/LecEnerActR" }, 
/*			type				: sap.m.InputType.Number, 
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}?$/;
				if(!val.match(regex)) {
					this.setValue(this._lastValue);
				}else{
					this._lastValue = val;	
				}	
			},	*/			
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");
		
		var oFormElemMedRetL10 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelNroEquipoR, oInputNroEquipoR, oLabelLecEnerActR, oInputLecEnerActR ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// EQUIPO - MEDIDOR RETIRADO - LINEA 2
		var oLabelLecEnerActTaraR	= new sap.m.Label({
			text			:"Lectura de Energ�a Activa kWh Tarifa A",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputLecEnerActTaraR	= new sap.m.Input({			
			id				: "MOLecEnerActTaraR",		
			value			: { path:"/LecEnerActTaraR" },
			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");	        
        
		var oLabelLecEnerActTarbR	= new sap.m.Label({
			text			:"Lectura de Energ�a Activa kWh Tarifa B",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputLecEnerActTarbR	= new sap.m.Input({			
			id				: "MOLecEnerActTarbR",		
			value			: { path:"/LecEnerActTarbR" }, 
			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");
		
		var oFormElemMedRetL20 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelLecEnerActTaraR, oInputLecEnerActTaraR, oLabelLecEnerActTarbR, oInputLecEnerActTarbR ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// EQUIPO - MEDIDOR RETIRADO - LINEA 3
		var oLabelLecEnerActTarcR	= new sap.m.Label({
			text			:"Lectura de Energ�a Activa kWh Tarifa C",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputLecEnerActTarcR	= new sap.m.Input({			
			id				: "MOLecEnerActTarcR",		
			value			: { path:"/LecEnerActTarcR" },
			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");	        
        
		var oLabelLecEnerActTardR	= new sap.m.Label({
			text			:"Lectura de Energ�a Activa kWh Tarifa D",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputLecEnerActTardR	= new sap.m.Input({			
			id				: "MOLecEnerActTardR",		
			value			: { path:"/LecEnerActTardR" },
			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");
		
		var oFormElemMedRetL30 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelLecEnerActTarcR, oInputLecEnerActTarcR, oLabelLecEnerActTardR, oInputLecEnerActTardR ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// EQUIPO - MEDIDOR RETIRADO - LINEA 4
		var oLabelDemMaxTaraR	= new sap.m.Label({
			text			:"Demanda M�xima kW Tarifa A",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputDemMaxTaraR	= new sap.m.Input({			
			id				: "MODemMaxTaraR",		
			value			: { path:"/DemMaxTaraR" }, 
/*			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}(\.)?([0-9]{1,2})?$/;
				if(!val.match(regex)) {
					this.setValue(this._lastValue);
				}else{
					this._lastValue = val;	
				}	
			},*/	
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");	        
        
		var oLabelDemMaxTarbR	= new sap.m.Label({
			text			:"Demanda M�xima kW Tarifa B",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputDemMaxTarbR	= new sap.m.Input({			
			id				: "MODemMaxTarbR",		
			value			: { path:"/DemMaxTarbR" },
			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}(\.)?([0-9]{1,2})?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");
		
		var oFormElemMedRetL40 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelDemMaxTaraR, oInputDemMaxTaraR, oLabelDemMaxTarbR, oInputDemMaxTarbR ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// EQUIPO - MEDIDOR RETIRADO - LINEA 5
		var oLabelDemMaxTarcR	= new sap.m.Label({
			text			:"Demanda M�xima kW Tarifa C",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputDemMaxTarcR	= new sap.m.Input({			
			id				: "MODemMaxTarcR",		
			value			: { path:"/DemMaxTarcR" },
			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}(\.)?([0-9]{1,2})?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");	        
        
		var oLabelDemMaxTardR	= new sap.m.Label({
			text			:"Demanda M�xima kW Tarifa D",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputDemMaxTardR	= new sap.m.Input({			
			id				: "MODemMaxTardR",		
			value			: { path:"/DemMaxTardR" },
			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,6}(\.)?([0-9]{1,2})?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");
		
		var oFormElemMedRetL50 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelDemMaxTarcR, oInputDemMaxTarcR, oLabelDemMaxTardR, oInputDemMaxTardR ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// EQUIPO - MEDIDOR RETIRADO - LINEA 6
		var oLabelLecEnerReaR	= new sap.m.Label({
			text			:"Lect. Energ�a Reactiva kVArh",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputLecEnerReaR	= new sap.m.Input({			
			id				: "MOLecEnerReaR",		
			value			: { path:"/LecEnerReaR" }, 
			editable		: false,
			change			: oController.doValidaLecturas}).addStyleClass("divInputOrden");	        
		
		var oFormElemMedRetL60 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelLecEnerReaR, oInputLecEnerReaR, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});			
        
		// CONTENEDOR EQUIPO - MEDIDOR RETIRADO
		var oFormContMedRet	= new sap.ui.layout.form.FormContainer({
			formElements	: [ oFormElemMedRetL00,
			            	    oFormElemMedRetL10,
			            	    oFormElemMedRetL20,
			            	    oFormElemMedRetL30,
			            	    oFormElemMedRetL40, 
			            	    oFormElemMedRetL50, 
			            	    oFormElemMedRetL60 ]
		});
		
		// FORM EQUIPO - MEDIDOR RETIRADO
        var oformMedRet 		= new sap.ui.layout.form.Form({
        	id						: "MOFormMedRet",        	
        	width 					: "100%",
        	layout 					: new sap.ui.layout.form.GridLayout(),     	 	
        	formContainers			: [ oFormContMedRet ]
        }).addStyleClass("formElementVerOrden");
        
        // EQUIPO - TRANSFORMADOR DE MEDIDA EXISTENTE - TITULO
		var oLabelTitTraExi	= new sap.m.Label({
			text			:"TRANSFORMADOR DE MEDIDA EXISTENTE",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oFormElemTraExiL00	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTitTraExi, new sap.m.Label(), new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	 
        
		// EQUIPO - TRANSFORMADOR DE MEDIDA EXISTENTE - LINEA 1
		var oLabelTc1E	= new sap.m.Label({
			text			:"TC1",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTc1E	= new sap.m.Input({			
			id				: "MOTc1E",		
			value			: { path:"/Tc1E" }, 
			maxLength 		: 18,
			editable		: false}).addStyleClass("divInputOrden");	        
        
		var oLabelTc2E	= new sap.m.Label({
			text			:"TC2",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTc2E	= new sap.m.Input({			
			id				: "MOTc2E",		
			value			: { path:"/Tc2E" }, 
			maxLength 		: 18,
			editable		: false}).addStyleClass("divInputOrden");
		
		var oFormElemTraExiL10 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTc1E, oInputTc1E, oLabelTc2E, oInputTc2E ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});
		
		// EQUIPO - TRANSFORMADOR DE MEDIDA EXISTENTE - LINEA 2
		var oLabelTc3E	= new sap.m.Label({
			text			:"TC3",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTc3E	= new sap.m.Input({			
			id				: "MOTc3E",		
			value			: { path:"/Tc3E" }, 
			maxLength 		: 18,
			editable		: false}).addStyleClass("divInputOrden");	        
        
		var oLabelTp1E	= new sap.m.Label({
			text			:"TP1",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTp1E	= new sap.m.Input({			
			id				: "MOTp1E",		
			value			: { path:"/Tp1E" }, 
			maxLength 		: 18,
			editable		: false}).addStyleClass("divInputOrden");
		
		var oFormElemTraExiL20 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTc3E, oInputTc3E, oLabelTp1E, oInputTp1E ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// EQUIPO - TRANSFORMADOR DE MEDIDA EXISTENTE - LINEA 3
		var oLabelTp2E	= new sap.m.Label({
			text			:"TP2",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTp2E	= new sap.m.Input({			
			id				: "MOTp2E",		
			value			: { path:"/Tp2E" }, 
			maxLength 		: 18,
			editable		: false}).addStyleClass("divInputOrden");	        
        
		var oLabelTp3E	= new sap.m.Label({
			text			:"TP3",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTp3E	= new sap.m.Input({			
			id				: "MOTp3E",		
			value			: { path:"/Tp3E" }, 
			maxLength 		: 18,
			editable		: false}).addStyleClass("divInputOrden");
		
		var oFormElemTraExiL30 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTp2E, oInputTp2E, oLabelTp3E, oInputTp3E ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// EQUIPO - TRANSFORMADOR DE MEDIDA EXISTENTE - LINEA 4
		var oLabelTmixE	= new sap.m.Label({
			text			:"TMIX",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTmixE	= new sap.m.Input({			
			id				: "MOTmixE",		
			value			: { path:"/TmixE" }, 
			maxLength 		: 18,
			editable		: false}).addStyleClass("divInputOrden");	        
		
		var oFormElemTraExiL40 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTmixE, oInputTmixE, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
    	// EQUIPO - TRANSFORMADOR DE MEDIDA EXISTENTE - LINEA 5
		var oLabelTc1flagE			= new sap.m.Label({
			text			:"Cambio TC1",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oCheckTc1flagE 	= new sap.m.CheckBox({
			id				: "MOTc1flagE",
			selected		: { path: "/Tc1flagE",
			        	  		formatter: function(selec){ if (selec == "X"){ return true; } else{ return false; } } },
			editable		: false }).addStyleClass("divCheckOrden");        
        
		var oLabelTc2flagE	= new sap.m.Label({
			text			:"Cambio TC2",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oCheckTc2flagE 	= new sap.m.CheckBox({
			id				: "MOTc2flagE",		
			selected	: { path: "/Tc2flagE",
			        	  	formatter: function(selec){ if (selec == "X"){ return true; } else{ return false; } } },
			editable	: false }).addStyleClass("divCheckOrden"); 
		
		var oFormElemTraExiL50 = new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTc1flagE, oCheckTc1flagE, oLabelTc2flagE, oCheckTc2flagE],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
    	// EQUIPO - TRANSFORMADOR DE MEDIDA EXISTENTE - LINEA 6
		var oLabelTc3flagE			= new sap.m.Label({
			text			:"Cambio TC3",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oCheckTc3flagE 	= new sap.m.CheckBox({
			id				: "MOTc3flagE",				
			selected	: { path: "/Tc3flagE",
			        	  	formatter: function(selec){ if (selec == "X"){ return true; } else{ return false; } } },
			editable	: false }).addStyleClass("divCheckOrden");        
        
		var oLabelTp1flagE	= new sap.m.Label({
			text			:"Cambio TP1",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oCheckTp1flagE 	= new sap.m.CheckBox({
			id				: "MOTp1flagE",					
			selected	: { path: "/Tp1flagE",
			        	  	formatter: function(selec){ if (selec == "X"){ return true; } else{ return false; } } },
			editable	: false }).addStyleClass("divCheckOrden"); 
		
		var oFormElemTraExiL60 = new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTc3flagE, oCheckTc3flagE, oLabelTp1flagE, oCheckTp1flagE],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
    	// EQUIPO - TRANSFORMADOR DE MEDIDA EXISTENTE - LINEA 7
		var oLabelTp2flagE			= new sap.m.Label({
			text			:"Cambio TP2",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oCheckTp2flagE 	= new sap.m.CheckBox({
			id				: "MOTp2flagE",	
			selected	: { path: "/Tp2flagE",
			        	  	formatter: function(selec){ if (selec == "X"){ return true; } else{ return false; } } },
			editable	: false }).addStyleClass("divCheckOrden");        
        
		var oLabelTp3flagE	= new sap.m.Label({
			text			:"Cambio TP3",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oCheckTp3flagE 	= new sap.m.CheckBox({
			id				: "MOTp3flagE",
			selected	: { path: "/Tp3flagE",
			        	  	formatter: function(selec){ if (selec == "X"){ return true; } else{ return false; } } },
			editable	: false }).addStyleClass("divCheckOrden"); 
		
		var oFormElemTraExiL70 = new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTp2flagE, oCheckTp2flagE, oLabelTp3flagE, oCheckTp3flagE],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
    	// EQUIPO - TRANSFORMADOR DE MEDIDA EXISTENTE - LINEA 8
		var oLabelTmixflagE			= new sap.m.Label({
			text			:"Cambio TMIX",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oCheckTmixflagE 	= new sap.m.CheckBox({
			id				: "MOTmixflagE",
			selected	: { path: "/TmixflagE",
			        	  	formatter: function(selec){ if (selec == "X"){ return true; } else{ return false; } } },
			editable	: false }).addStyleClass("divCheckOrden");        
		
		var oFormElemTraExiL80 = new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTmixflagE, oCheckTmixflagE, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});			
		
		// CONTENEDOR EQUIPO - TRANSFORMADOR DE MEDIDA EXISTENTE
		var oFormContTraExi	= new sap.ui.layout.form.FormContainer({
			formElements	: [ oFormElemTraExiL00,
			            	    oFormElemTraExiL10,
			            	    oFormElemTraExiL20,
			            	    oFormElemTraExiL30,
			            	    oFormElemTraExiL40,
			            	    oFormElemTraExiL50,
			            	    oFormElemTraExiL60,
			            	    oFormElemTraExiL70,
			            	    oFormElemTraExiL80 ]
		});
		
		// FORM EQUIPO - TRANSFORMADOR DE MEDIDA EXISTENTE
        var oformTraExi 		= new sap.ui.layout.form.Form({
        	id						: "MOFormTraExi",        	
        	width 					: "100%",
        	layout 					: new sap.ui.layout.form.GridLayout(),     	 	
        	formContainers			: [ oFormContTraExi ]
        }).addStyleClass("formElementVerOrden");
        
        // EQUIPO - TRANSFORMADOR DE MEDIDA INSTALADOS - TITULO
		var oLabelTitTraIns	= new sap.m.Label({
			text			:"TRANSFORMADOR DE MEDIDA INSTALADOS",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oFormElemTraInsL00	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTitTraIns, new sap.m.Label(), new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// EQUIPO - TRANSFORMADOR DE MEDIDA INSTALADOS - LINEA 1
		var oLabelTc1I	= new sap.m.Label({
			text			:"TC1",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
/*		var oInputTc1I	= new sap.m.Input({			
			id				: "MOTc1I",		
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
	        placeholder			: 'Nro. de Equipo...',  
	        showValueHelp		: true,
	        valueHelpOnly		: true,
	        editable			: false,
	        valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInputOrden");	*/	
		
		var oInputTc1I			= new sap.m.Input({
			id					: "MOTc1I",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
	        placeholder			: 'Nro. de Transformador...',  
	        showValueHelp		: true,
	        valueHelpOnly		: false,
	        editable			: false,
	        valueHelpRequest	: oController.doAyudaBusqueda, 
	        change				: oController.doChangeEquipo
	    }).addStyleClass("divInputOrden");			
        
		var oLabelTc2I	= new sap.m.Label({
			text			:"TC2",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTc2I	= new sap.m.Input({			
			id					: "MOTc2I",		
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
	        placeholder			: 'Nro. de Transformador...',  
	        showValueHelp		: true,
	        valueHelpOnly		: false,
	        editable			: false,
	        valueHelpRequest	: oController.doAyudaBusqueda,  
	        change				: oController.doChangeEquipo
	    }).addStyleClass("divInputOrden");			
		
		var oFormElemTraInsL10 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTc1I, oInputTc1I, oLabelTc2I, oInputTc2I ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// EQUIPO - TRANSFORMADOR DE MEDIDA INSTALADOS - LINEA 2
		var oLabelTc3I	= new sap.m.Label({
			text			:"TC3",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTc3I	= new sap.m.Input({			
			id				: "MOTc3I",		
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
	        placeholder			: 'Nro. de Transformador...',  
	        showValueHelp		: true,
	        valueHelpOnly		: false,
	        editable			: false,
	        valueHelpRequest	: oController.doAyudaBusqueda,   
	        change				: oController.doChangeEquipo
	    }).addStyleClass("divInputOrden");		        
        
		var oLabelTp1I	= new sap.m.Label({
			text			:"TP1",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTp1I	= new sap.m.Input({			
			id				: "MOTp1I",		
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
	        placeholder			: 'Nro. de Transformador...',  
	        showValueHelp		: true,
	        valueHelpOnly		: false,
	        editable			: false,
	        valueHelpRequest	: oController.doAyudaBusqueda,
	        change				: oController.doChangeEquipo
	    }).addStyleClass("divInputOrden");	
		
		var oFormElemTraInsL20 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTc3I, oInputTc3I, oLabelTp1I, oInputTp1I ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// EQUIPO - TRANSFORMADOR DE MEDIDA INSTALADOS - LINEA 3
		var oLabelTp2I	= new sap.m.Label({
			text			:"TP2",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTp2I	= new sap.m.Input({			
			id				: "MOTp2I",		
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
	        placeholder			: 'Nro. de Transformador...',  
	        showValueHelp		: true,
	        valueHelpOnly		: false,
	        editable			: false,
	        valueHelpRequest	: oController.doAyudaBusqueda,
	        change				: oController.doChangeEquipo
	    }).addStyleClass("divInputOrden");			        
        
		var oLabelTp3I	= new sap.m.Label({
			text			:"TP3",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTp3I	= new sap.m.Input({			
			id				: "MOTp3I",		
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
	        placeholder			: 'Nro. de Transformador...',  
	        showValueHelp		: true,
	        valueHelpOnly		: false,
	        editable			: false,
	        valueHelpRequest	: oController.doAyudaBusqueda,
	        change				: oController.doChangeEquipo	        
	    }).addStyleClass("divInputOrden");	
		
		var oFormElemTraInsL30 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTp2I, oInputTp2I, oLabelTp3I, oInputTp3I ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// EQUIPO - TRANSFORMADOR DE MEDIDA INSTALADOS - LINEA 4
		var oLabelTmixI	= new sap.m.Label({
			text			:"TMIX",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTmixI	= new sap.m.Input({			
			id				: "MOTmixI",		
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
	        placeholder			: 'Nro. de Transformador...',  
	        showValueHelp		: true,
	        valueHelpOnly		: false,
	        editable			: false,
	        valueHelpRequest	: oController.doAyudaBusqueda,
	        change				: oController.doChangeEquipo
	    }).addStyleClass("divInputOrden");		      
		
		var oFormElemTraInsL40 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTmixI, oInputTmixI, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});			
        
		// CONTENEDOR EQUIPO - TRANSFORMADOR DE MEDIDA INSTALADOS
		var oFormContTraIns	= new sap.ui.layout.form.FormContainer({
			formElements	: [ oFormElemTraInsL00,
			            	    oFormElemTraInsL10,
			            	    oFormElemTraInsL20,
			            	    oFormElemTraInsL30,
			            	    oFormElemTraInsL40 ]
		});
		
		// FORM EQUIPO - TRANSFORMADOR DE MEDIDA INSTALADOS
        var oformTraIns 		= new sap.ui.layout.form.Form({
        	id						: "MOFormTraIns",           	
        	width 					: "100%",
        	layout 					: new sap.ui.layout.form.GridLayout(),     	 	
        	formContainers			: [ oFormContTraIns ]
        }).addStyleClass("formElementVerOrden");  
        
        // EQUIPO - TRANSFORMADOR DE MEDIDA RETIRADOS - TITULO
		var oLabelTitTraRet	= new sap.m.Label({
			text			:"TRANSFORMADOR DE MEDIDA RETIRADOS",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oFormElemTraRetL00	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTitTraRet, new sap.m.Label(), new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	 
		
		// EQUIPO - TRANSFORMADOR DE MEDIDA RETIRADOS - LINEA 1
		var oLabelTc1R	= new sap.m.Label({
			text			:"TC1",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTc1R	= new sap.m.Input({			
			id				: "MOTc1R",		
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
	        placeholder			: 'Nro. de Transformador...',  
	        showValueHelp		: true,
	        valueHelpOnly		: false,
	        editable			: false,
	        valueHelpRequest	: oController.doAyudaBusqueda,
	        change				: oController.doChangeEquipo
	    }).addStyleClass("divInputOrden");		        
        
		var oLabelTc2R	= new sap.m.Label({
			text			:"TC2",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTc2R	= new sap.m.Input({			
			id				: "MOTc2R",		
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
	        placeholder			: 'Nro. de Transformador...',  
	        showValueHelp		: true,
	        valueHelpOnly		: false,
	        editable			: false,
	        valueHelpRequest	: oController.doAyudaBusqueda,
	        change				: oController.doChangeEquipo	        
	    }).addStyleClass("divInputOrden");		 
		
		var oFormElemTraRetL10 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTc1R, oInputTc1R, oLabelTc2R, oInputTc2R ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// EQUIPO - TRANSFORMADOR DE MEDIDA RETIRADOS - LINEA 2
		var oLabelTc3R	= new sap.m.Label({
			text			:"TC3",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTc3R	= new sap.m.Input({			
			id				: "MOTc3R",		
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
	        placeholder			: 'Nro. de Transformador...',  
	        showValueHelp		: true,
	        valueHelpOnly		: false,
	        editable			: false,
	        valueHelpRequest	: oController.doAyudaBusqueda,
	        change				: oController.doChangeEquipo	        
	    }).addStyleClass("divInputOrden");				        
        
		var oLabelTp1R	= new sap.m.Label({
			text			:"TP1",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTp1R	= new sap.m.Input({			
			id				: "MOTp1R",		
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
	        placeholder			: 'Nro. de Transformador...',  
	        showValueHelp		: true,
	        valueHelpOnly		: false,
	        editable			: false,
	        valueHelpRequest	: oController.doAyudaBusqueda,
	        change				: oController.doChangeEquipo	        
	    }).addStyleClass("divInputOrden");			
		
		var oFormElemTraRetL20 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTc3R, oInputTc3R, oLabelTp1R, oInputTp1R ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});		
		
		// EQUIPO - TRANSFORMADOR DE MEDIDA RETIRADOS - LINEA 3
		var oLabelTp2R	= new sap.m.Label({
			text			:"TP2",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTp2R	= new sap.m.Input({			
			id				: "MOTp2R",		
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
	        placeholder			: 'Nro. de Transformador...',  
	        showValueHelp		: true,
	        valueHelpOnly		: false,
	        editable			: false,
	        valueHelpRequest	: oController.doAyudaBusqueda,
	        change				: oController.doChangeEquipo	        
	    }).addStyleClass("divInputOrden");			        
        
		var oLabelTp3R	= new sap.m.Label({
			text			:"TP3",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTp3R	= new sap.m.Input({			
			id				: "MOTp3R",		
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
	        placeholder			: 'Nro. de Transformador...',  
	        showValueHelp		: true,
	        valueHelpOnly		: false,
	        editable			: false,
	        valueHelpRequest	: oController.doAyudaBusqueda,
	        change				: oController.doChangeEquipo	        
	    }).addStyleClass("divInputOrden");		
		
		var oFormElemTraRetL30 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTp2R, oInputTp2R, oLabelTp3R, oInputTp3R ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});		
		
		// EQUIPO - TRANSFORMADOR DE MEDIDA RETIRADOS - LINEA 4
		var oLabelTmixR	= new sap.m.Label({
			text			:"TMIX",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTmixR	= new sap.m.Input({			
			id				: "MOTmixR",		
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,   
	        placeholder			: 'Nro. de Transformador...',  
	        showValueHelp		: true,
	        valueHelpOnly		: false,
	        editable			: false,
	        valueHelpRequest	: oController.doAyudaBusqueda,
	        change				: oController.doChangeEquipo	        
	    }).addStyleClass("divInputOrden");		        
		
		var oFormElemTraRetL40 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTmixR, oInputTmixR, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});				
        
		// CONTENEDOR EQUIPO - TRANSFORMADOR DE MEDIDA RETIRADOS
		var oFormContTraRet	= new sap.ui.layout.form.FormContainer({
			formElements	: [ oFormElemTraRetL00,
			            	    oFormElemTraRetL10,
			            	    oFormElemTraRetL20,
			            	    oFormElemTraRetL30,
			            	    oFormElemTraRetL40 ]
		});
		
		// FORM EQUIPO - TRANSFORMADOR DE MEDIDA RETIRADOS
        var oformTraRet 		= new sap.ui.layout.form.Form({
        	id						: "MOFormTraRet",        	
        	width 					: "100%",
        	layout 					: new sap.ui.layout.form.GridLayout(),     	 	
        	formContainers			: [ oFormContTraRet ]
        }).addStyleClass("formElementVerOrden");           
        
        // ========================================================
		// SELLOS
		// ========================================================
        
        // ICONOS PARA ADICIONAR O QUITAR FILAS EN TABLA SELLOS
		var oIconAddSello = new sap.ui.core.Icon({  
	          src : sap.ui.core.IconPool.getIconURI("add"),  
	          size : "12px",  
	          color : "#333333",  
	          activeColor : "white",  
	          activeBackgroundColor : "#333333",  
	          width : "12px",  
	          press: oController.doAgregaSellos  
		});
		var oIconLessSello = new sap.ui.core.Icon({  
	          src : sap.ui.core.IconPool.getIconURI("less"),  
	          size : "12px",  
	          color : "#333333",  
	          activeColor : "white",  
	          activeBackgroundColor : "#333333",  
	          width : "12px",  
	          press: oController.doQuitaSellos  
		});	
		
		//Se crea toolbar
		var oToolbarSello = new sap.m.Toolbar("MOToolBarSello",{
			height 			: "25px"
		});
		
		//se adicionan iconos a toolbar
		oToolbarSello.addContent(oIconAddSello);
		oToolbarSello.addContent(oIconLessSello);	
		
		//Tipo de sellos
		var inTipoSello  = new sap.m.Input("MOTipoSelloIn",{
		      width   			: "70px",
		      type   			: sap.m.InputType.Text,  
		      placeholder  		: 'Tipo Sello...',  
		      showValueHelp   : true,
		      valueHelpRequest   : oController.doTipoSelloAyudaBusqueda  
		     }).addStyleClass("divInput");	
		
		//Tipo de sellos Nuevo
		var inTipoSelloNew  = new sap.m.Input("MOTipoSelloNewIn",{
		      width   			: "70px",
		      type   			: sap.m.InputType.Text,  
		      placeholder  		: 'Tipo Sello...',  
		      showValueHelp   : true,
		      valueHelpRequest   : oController.doTipoSelloNewAyudaBusqueda  
		     }).addStyleClass("divInput");	
		//
		var inRemove  = new sap.m.Input("MORemoveIn",{
		      width   			: "70px",
		      type   			: sap.m.InputType.Text,  
		      placeholder  		: 'Raz�n para Remover...',  
		      showValueHelp   : true,
		      valueHelpRequest   : oController.doRemoveSelloAyudaBusqueda  
		     }).addStyleClass("divInput");			
		
		//Ubicaci�n de sellos
		var inUbicaSello  = new sap.m.Input({
			  id				: "MOUbicaSelloIn",
		      width   			: "70px",
		      type   			: sap.m.InputType.Text,  
		      placeholder  		: 'Ubicaci�n Sello...',  
		      showValueHelp   : true,
		      valueHelpRequest   : oController.doUbicaSelloAyudaBusqueda  
		     }).addStyleClass("divInput");			
		
		var oCBSelloIn = new sap.m.CheckBox({
			id				: "MOSelloIn",
			selected		: { formatter: function(selec){ if (selec == "X"){ return true; } else{ return false; } } },
			select	: oController.doSelectedSello
		})
		var oCBSelloRe = new sap.m.CheckBox({
			id				: "MOSelloRe",
			selected		: { formatter: function(selec){ if (selec == "X"){ return true; } else{ return false; } } },
			select	: oController.doSelectedSello		
		})
		var oCBSelloPe = new sap.m.CheckBox({
			id				: "MOSelloPe",
			selected		: { formatter: function(selec){ if (selec == "X"){ return true; } else{ return false; } } },
			select	: oController.doSelectedSello			
		})
		var oCBSelloRp = new sap.m.CheckBox({
			id				: "MOSelloRp",
			selected		: { formatter: function(selec){ if (selec == "X"){ return true; } else{ return false; } } },
	        select	: oController.doSelectedSello			
		})
		
        // TABLA SELLOS
		var oIconAddSello = new sap.ui.core.Icon({  
	          src : sap.ui.core.IconPool.getIconURI("add"),  
	          size : "12px",  
	          color : "#333333",  
	          activeColor : "white",  
	          activeBackgroundColor : "#333333",  
	          width : "12px",  
	          press: oController.doAgregaSellos  
		});
		var oIconLessSello = new sap.ui.core.Icon({  
	          src : sap.ui.core.IconPool.getIconURI("less"),  
	          size : "12px",  
	          color : "#333333",  
	          activeColor : "white",  
	          activeBackgroundColor : "#333333",  
	          width : "12px",  
	          press: oController.doQuitaSellos  
		});		
		
		var oToolbarSello = new sap.m.Toolbar("supOrdenModTb",{
			height 			: "25px"
		});
		
		//se adicionan botones
		oToolbarSello.addContent(oIconAddSello);
		oToolbarSello.addContent(oIconLessSello);
				
		var oTableSe = new sap.ui.table.Table({
			id					: "MOTablaSe",
			width 				: "100%",
			rowHeight 			: 18,
			columnHeaderHeight  : 18,
			//selectionMode		: sap.ui.table.SelectionMode.Single,
			selectionMode		: sap.ui.table.SelectionMode.None,
			fixedLayout			: false,
			editable			: true,
			navigationMode		: sap.ui.table.NavigationMode.Paginator,
			toolbar				: oToolbarSello
			}
		);
		oTableSe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Nro. de Sello"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				editable		: true,
				change    		: oController.doChangeNroSello,
			}).bindProperty("value","NroSello"),//.addStyleClass("divInputOrden"),
			sortProperty 	: "NroSello",
			width 		: '136px'
			}			
		));
		oTableSe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Tipo Sello"}).addStyleClass("divLabelTabla"),
			template 		: inTipoSello.bindProperty("value","Tipo"),//.addStyleClass("divInputOrden"),
			editable		: false,
			sortProperty 	: "Tipo",
			width 			: '80px'
			}
		));		
		oTableSe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Color"}).addStyleClass("divLabelTabla"),
			template        : new sap.ui.commons.TextField({
			editable		: false,
			}).bindProperty("value","Color"),//.addStyleClass("divInputOrden"),
			sortProperty 	: "Color",
			width 			: '60px'
			}
		));	
		oTableSe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Ubicaci�n"}).addStyleClass("divLabelTabla"),
			template 		: inUbicaSello.bindProperty("value", "Ubicacion"),//.addStyleClass("divInputOrden"),
			editable		: false,
			sortProperty 	: "Ubicacion",
			width 			: '80px'
			}
		));
		oTableSe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Instalado"}).addStyleClass("divLabelTabla"),
			template 		: oCBSelloIn.bindProperty("selected", "Instalado"), 
			autoResizable	: true,
			editable		: true,
			sortProperty 	: "Instalado",
			hAlign			: "Center",
			width 			: '50px'
			}
		));
		oTableSe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Removido"}).addStyleClass("divLabelTabla"),
			template 		: oCBSelloRe.bindProperty("selected", "Removido"),
			autoResizable	: true,
			editable		: true,
			sortProperty 	: "Removido",
			hAlign			: "Center",
			width 			: '50px'
			}
		));		
		oTableSe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Perdido"}).addStyleClass("divLabelTabla"),
			template 		: oCBSelloPe.bindProperty("selected" ,"Perdido"), 
			autoResizable	: true,
			editable		: true,
			sortProperty 	: "Perdido",
			hAlign			: "Center",
			width 			: '50px'
			}
		));		
		oTableSe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Reemplazado"}).addStyleClass("divLabelTabla"),
			template 		: oCBSelloRp.bindProperty("selected", "Reemplazado"), 
			autoResizable	: true,
			editable		: true,
			sortProperty 	: "Reemplazado",
			hAlign			: "Center",
			width 			: '50px'
			}
		));		
		oTableSe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Tipo Sello Nuevo"}).addStyleClass("divLabelTabla"),
			template 		: inTipoSelloNew.bindProperty("value","TipoInstal"),//.addStyleClass("divInputOrden"),
			editable		: false,
			sortProperty 	: "TipoInstal",
			hAlign			: "Center",
			width 			: '90px'
			}
		));				
		oTableSe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Nro. Serie Sello Nuevo"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				editable	: true,
			}).bindProperty("value","NroSerinstal"),//.addStyleClass("divInputOrden"),
			sortProperty 	: "NroSerinstal",
			width 			: '136px'
			}
		));	
		oTableSe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Raz�n para Remover"}).addStyleClass("divLabelTabla"),
			template 		: inRemove.bindProperty("value","Remreason"),//.addStyleClass("divInputOrden"),
				editable	: false,
			sortProperty 	: "Remreason",
			width 			: '100px'
			}
		));			
		
        // ========================================================
		// PEC
		// ========================================================	
		
		// PEC - CABECERA - LINEA 1
		var oLabelNomBenefPec	= new sap.m.Label({
			text			:"Nombre Beneficiario PEC",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputNomBenefPec	= new sap.m.Input({			
			id				: "MONomBenefPec",		
			value			: { path:"/NomBenefPec" }, 
			editable		: false}).addStyleClass("divInputOrden");	        
        
		var oLabelTelBenefPec	= new sap.m.Label({
			text			:"Tel�fono Beneficiario PEC",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTelBenefPec	= new sap.m.Input({			
			id				: "MOTelBenefPec",		
			value			: { path:"/TelBenefPec" }, 
			editable		: false}).addStyleClass("divInputOrden");
		
		var oFormElemPecCabL00 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelNomBenefPec, oInputNomBenefPec, oLabelTelBenefPec, oInputTelBenefPec ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});			

		// CONTENEDOR PEC - CABECERA
		var oFormContPecCab	= new sap.ui.layout.form.FormContainer({
			formElements	: [ oFormElemPecCabL00 ]
		});
		
		// FORM PEC - CABECERA
        var oformPecCab 		= new sap.ui.layout.form.Form({
        	width 					: "100%",
        	layout 					: new sap.ui.layout.form.GridLayout(),     	 	
        	formContainers			: [ oFormContPecCab ]
        }).addStyleClass("formElementVerOrden");       
		
        
		// PEC - COCCI�N - TITULO
		var oLabelTitPecCoc	= new sap.m.Label({
			text			:"COCCI�N",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oFormElemPecCocL00	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTitPecCoc, new sap.m.Label(), new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// PEC - COCCI�N - LINEA 1
		var oLabelTipoEquipoCo	= new sap.m.Label({
			text			:"Tipo de Equipo",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTipoEquipoCo	= new sap.m.Input({			
			id				: "MOTipoEquipoCo",		
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Tipo de Equipo...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");
		
		new sap.m.SelectDialog("TipoEquipoCoDia", {  
			title		: "Tipo de Equipo",  
			items		: {     
				path		: "/pecTipEqSet",  
				template	: new sap.m.StandardListItem({  
							title: "{Spart}",
    	    				info : "{Vtext}",
							active: true
			
			})},
		templateShareable: true,
    	confirm		: oController.handleCloseTipoEquipoCo,  
    	cancel		: oController.handleCloseTipoEquipoCo}).addStyleClass("diaNoBusq");	
        
		var oLabelMarcaCo	= new sap.m.Label({
			text			:"Marca",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputMarcaCo	= new sap.m.Input({			
			id				: "MOMarcaCo",		
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Marca...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");
		
		new sap.m.SelectDialog("MarcaCoDia", {  
			title		: "Marca",  
			items		: {     
				path		: "/marcas_pecSet",  
				template	: new sap.m.StandardListItem({  
							title: "{CodEquipo}",
    	    				info : "{MarEquipo}",
							active: true
			
			})},
		templateShareable: true,
    	confirm		: oController.handleCloseMarcaCo,  
    	cancel		: oController.handleCloseMarcaCo}).addStyleClass("diaNoBusq");		
		
		var oFormElemPecCocL10 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTipoEquipoCo, oInputTipoEquipoCo, oLabelMarcaCo, oInputMarcaCo ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
        // PEC - COCCI�N - LINEA 2
		var oLabelModeloCo	= new sap.m.Label({
			text			:"Modelo",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputModeloCo	= new sap.m.Input({			
			id				: "MOModeloCo",		
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Modelo...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");
		
		new sap.m.SelectDialog("ModeloCoDia", {  
			title		: "Modelo",  
			items		: {     
				path		: "/modelos_pecSet",  
				template	: new sap.m.StandardListItem({  
							title: "{CodEquipo}",
    	    				info : "{ModEquipo}",
							active: true
			
			})},
		templateShareable: true,
    	confirm		: oController.handleCloseModeloCo,  
    	cancel		: oController.handleCloseModeloCo}).addStyleClass("diaNoBusq");		        
        
		var oLabelPotenciaCo	= new sap.m.Label({
			text			:"Potencia",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputPotenciaCo	= new sap.m.Input({			
			id				: "MOPotenciaCo",		
			value			: { path:"/PotenciaCo" },
			liveChange 		: function(oEvent){	
				var val 	= this.getValue(); 
				var regex 	= /^[0-9]{0,10}?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},				
			editable		: true}).addStyleClass("divInputOrden");
		
		var oFormElemPecCocL20 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelModeloCo, oInputModeloCo, oLabelPotenciaCo, oInputPotenciaCo ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
        // PEC - COCCI�N - LINEA 3
		var oLabelNroSerieCo	= new sap.m.Label({
			text			:"N�mero de Serie",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputNroSerieCo	= new sap.m.Input({			
			id				: "MONroSerieCo",
			maxLength 		: 30,
			value			: { path:"/NroSerieCo" }, 
			editable		: true}).addStyleClass("divInputOrden");	        
		
		var oFormElemPecCocL30 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelNroSerieCo, oInputNroSerieCo, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
        
		// CONTENEDOR PEC - COCCI�N
		var oFormContPecCoc	= new sap.ui.layout.form.FormContainer({
			formElements	: [ oFormElemPecCocL00,
			            	    oFormElemPecCocL10,
			            	    oFormElemPecCocL20,
			            	    oFormElemPecCocL30]
		});
		
		// FORM PEC - COCCI�N
        var oformPecCoc 		= new sap.ui.layout.form.Form({
        	width 					: "100%",
        	layout 					: new sap.ui.layout.form.GridLayout(),     	 	
        	formContainers			: [ oFormContPecCoc ]
        }).addStyleClass("formElementVerOrden");           
        
        
		// PEC - CALENTAMIENTO DE AGUA - TITULO
		var oLabelTitPecCal	= new sap.m.Label({
			text			:"CALENTAMIENTO DE AGUA",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oFormElemPecCalL00	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTitPecCal, new sap.m.Label(), new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// PEC - CALENTAMIENTO DE AGUA - LINEA 1
		var oLabelTipoEquipoCa	= new sap.m.Label({
			text			:"Tipo de Equipo",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTipoEquipoCa	= new sap.m.Input({			
			id				: "MOTipoEquipoCa",		
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Tipo de Equipo...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");	   
		
	    new sap.m.SelectDialog("TipoEquipoCaDia", {  
        	title		: "Tipo de Equipo",  
        	items		: {      
    			path		: "/pecTipEqSet",  
    			template	: new sap.m.StandardListItem({  
    							title: "{Spart}",
        	    				info : "{Vtext}",
    							active: true
    			
    			})},
    			templateShareable: true,
    	    	confirm		: oController.handleCloseTipoEquipoCa,  
    	    	cancel		: oController.handleCloseTipoEquipoCa}).addStyleClass("diaNoBusq");			
		
		var oLabelMarcaCa	= new sap.m.Label({
			text			:"Marca",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputMarcaCa	= new sap.m.Input({			
			id				: "MOMarcaCa",		
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Marca...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");
		
		new sap.m.SelectDialog("MarcaCaDia", {  
			title		: "Marca",  
			items		: {     
				path		: "/marcas_pecSet",  
				template	: new sap.m.StandardListItem({  
							title: "{CodEquipo}",
    	    				info : "{MarEquipo}",
							active: true
			
			})},
			templateShareable: true,
	    	confirm		: oController.handleCloseMarcaCa,  
	    	cancel		: oController.handleCloseMarcaCa}).addStyleClass("diaNoBusq");	
		
		var oFormElemPecCalL10 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTipoEquipoCa, oInputTipoEquipoCa, oLabelMarcaCa, oInputMarcaCa ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
        // PEC - CALENTAMIENTO DE AGUA - LINEA 2
		var oLabelModeloCa	= new sap.m.Label({
			text			:"Modelo",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputModeloCa	= new sap.m.Input({			
			id				: "MOModeloCa",		
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Modelo...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");
		
		new sap.m.SelectDialog("ModeloCaDia", {  
			title		: "Modelo",  
			items		: {     
				path		: "/modelos_pecSet",  
				template	: new sap.m.StandardListItem({  
							title: "{CodEquipo}",
    	    				info : "{ModEquipo}", 
							active: true
			
			})},
			templateShareable: true,
    	confirm		: oController.handleCloseModeloCa,  
    	cancel		: oController.handleCloseModeloCa}).addStyleClass("diaNoBusq");	        
        
		var oLabelPotenciaCa	= new sap.m.Label({
			text			:"Potencia",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputPotenciaCa	= new sap.m.Input({			
			id				: "MOPotenciaCa",		
			value			: { path:"/PotenciaCa" }, 
			liveChange 		: function(oEvent){	
				var val 	= this.getValue(); 
				var regex 	= /^[0-9]{0,10}?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},				
			editable		: true}).addStyleClass("divInputOrden");
		
		var oFormElemPecCalL20 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelModeloCa, oInputModeloCa, oLabelPotenciaCa, oInputPotenciaCa ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
        // PEC - CALENTAMIENTO DE AGUA - LINEA 3
		var oLabelNroSerieCa	= new sap.m.Label({
			text			:"N�mero de Serie",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputNroSerieCa	= new sap.m.Input({			
			id				: "MONroSerieCa",		
			value			: { path:"/NroSerieCa" }, 
			maxLength 		: 30,			
			editable		: true}).addStyleClass("divInputOrden");	        
		
		var oFormElemPecCalL30 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelNroSerieCa, oInputNroSerieCa, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
        
		// CONTENEDOR PEC - CALENTAMIENTO DE AGUA
		var oFormContPecCal	= new sap.ui.layout.form.FormContainer({
			formElements	: [ oFormElemPecCalL00,
			            	    oFormElemPecCalL10,
			            	    oFormElemPecCalL20,
			            	    oFormElemPecCalL30]
		});
		
		// FORM PEC - CALENTAMIENTO DE AGUA
        var oformPecCal 		= new sap.ui.layout.form.Form({
        	width 					: "100%",
        	layout 					: new sap.ui.layout.form.GridLayout(),     	 	
        	formContainers			: [ oFormContPecCal ]
        }).addStyleClass("formElementVerOrden");  		
		
		// PEC - CIRCUITO EXPRESO - TITULO
		var oLabelTitPecCie	= new sap.m.Label({
			text			:"CIRCUITO EXPRESO",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oFormElemPecCieL00	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTitPecCie, new sap.m.Label(), new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// PEC - CIRCUITO EXPRESO - LINEA 1
		var oLabelTipoConductor	= new sap.m.Label({
			text			:"Tipo de Conductor",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTipoConductor	= new sap.m.Input({			
			id					: "MOTipoConductor",		
			width				: "150px",
	    	type				: sap.m.InputType.Text,  
	        placeholder			: 'Tipo Conductor...',  
	        showValueHelp		: true,
	        valueHelpOnly		: true,
	        valueHelpRequest	: oController.doAyudaBusqueda      
    }).addStyleClass("divInput");		

		new sap.m.SelectDialog("TipoConductorDia", {  
			title		: "Tipo Conductor",  
			items		: {     
				path		: "/tipo_conductorSet",  
				template	: new sap.m.StandardListItem({  
							title: "{ZcodCred}",
		    				info : "{ZdescCred}",
							active: true
			
			})},
			templateShareable: true,
		    liveChange	: oController.handleSearchTipoConductor,
			search		: oController.handleSearchTipoConductor,
			confirm		: oController.handleCloseTipoConductor,  
			cancel		: oController.handleCloseTipoConductor});
		
		var oLabelTomacoriente	= new sap.m.Label({
			text			:"Toma de Corriente",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputTomacoriente	= new sap.m.Input({			
			id				: "MOTomaCorriente",		
			width				: "150px",
	    	type				: sap.m.InputType.Text,  
	        placeholder			: 'Toma de Corriente...',  
	        showValueHelp		: true,
	        valueHelpOnly		: true,
	        valueHelpRequest	: oController.doAyudaBusqueda      
    }).addStyleClass("divInput");		

		new sap.m.SelectDialog("TomaCorrienteDia", {  
			title		: "Toma de Corriente",  
			items		: {     
				path		: "/tomacorrienteSet",  
				template	: new sap.m.StandardListItem({  
							title: "{ZcodCred}",
		    				info : "{ZdescCred}",
							active: true
			
			})},
			templateShareable: true,
		    liveChange	: oController.handleSearchTomaCorriente,
			search		: oController.handleSearchTomaCorriente,
			confirm		: oController.handleCloseTomaCorriente,  
			cancel		: oController.handleCloseTomaCorriente});
		
		var oFormElemPecCieL10 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTipoConductor, oInputTipoConductor, oLabelTomacoriente, oInputTomacoriente ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// PEC - CIRCUITO EXPRESO - LINEA 2
		var oLabelProteccion	= new sap.m.Label({
			text			:"Protecci�n",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputProteccion	= new sap.m.Input({			
			id				: "MOProteccion",		
			width				: "150px",
	    	type				: sap.m.InputType.Text,  
	        placeholder			: 'Protecci�n...',  
	        showValueHelp		: true,
	        valueHelpOnly		: true,
	        valueHelpRequest	: oController.doAyudaBusqueda      
    }).addStyleClass("divInput");		

		new sap.m.SelectDialog("ProteccionDia", {  
			title		: "Protecci�n",  
			items		: {     
				path		: "/proteccion_pecSet",  
				template	: new sap.m.StandardListItem({  
							title: "{ZcodCred}",
		    				info : "{ZdescCred}",
							active: true
			
			})},
			templateShareable: true,
		    liveChange	: oController.handleSearchProteccion,
			search		: oController.handleSearchProteccion,
			confirm		: oController.handleCloseProteccion,  
			cancel		: oController.handleCloseProteccion});	        
        
		var oLabelLongitud	= new sap.m.Label({
			text			:"Longitud",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputLongitud	= new sap.m.Input({			
			id				: "MOLongitud",		
			value			: { path:"/Longitud" }, 
			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,4}(\.)?([0-9]{0,3})?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	
			editable		: true}).addStyleClass("divInputOrden");	
		
		var oFormElemPecCieL20 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelProteccion, oInputProteccion, oLabelLongitud, oInputLongitud ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// PEC - CIRCUITO EXPRESO - LINEA 3
		var oLabelCredMesplazoCi	= new sap.m.Label({
			text			:"Cr�dito/Meses Plazo",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputCredMesplazoCi	= new sap.m.Input({			
			id					: "MOCredMesplazoCi",		
			width				: "150px",
	    	type				: sap.m.InputType.Text,  
	        placeholder			: 'Cr�dito/Meses Plazo...',  
	        showValueHelp		: true,
	        valueHelpOnly		: true,
	        valueHelpRequest	: oController.doAyudaBusqueda      
    }).addStyleClass("divInput");		

		new sap.m.SelectDialog("CredMesplazoCiDia", {  
			title		: "Cr�dito/Meses Plazo",  
			items		: {     
				path		: "/credMesesSet",  
				template	: new sap.m.StandardListItem({  
							title: "{ZcodCred}",
		    				info : "{ZdescCred}",
							active: true
			
			})},
			templateShareable: true,
		    liveChange	: oController.handleSearchCredMesplazoCi,
			search		: oController.handleSearchCredMesplazoCi,
			confirm		: oController.handleCloseCredMesplazoCi,  
			cancel		: oController.handleCloseCredMesplazoCi});	         
        
		var oLabelMontoCi	= new sap.m.Label({
			text			:"Monto",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputMontoCi	= new sap.m.Input({			
			id				: "MOMontoCi",		
			value			: { path:"/MontoCi" }, 
			liveChange 		: function(oEvent){	
				var val 	= this.getValue();
				var regex 	= /^[0-9]{0,12}(\.)?([0-9]{0,3})?$/;
				if(sap.ui.getCore().byId("MOSecEquipo").getCollapsed() == false){
					if(!val.match(regex)) {
						this.setValue(this._lastValue);
					}else{
						this._lastValue = val;	
					}	
				}
			},	
			editable		: true}).addStyleClass("divInputOrden");	
		
		var oFormElemPecCieL30 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelCredMesplazoCi, oInputCredMesplazoCi, oLabelMontoCi, oInputMontoCi ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// PEC - CIRCUITO EXPRESO - LINEA 4
		var oLabelNroInscrip	= new sap.m.Label({
			text			:"N�mero de Inscripci�n",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputNroInscrip	= new sap.m.Input({			
			id				: "MONroInscrip",		
			value			: { path:"/NroInscrip" }, 
			editable		: false}).addStyleClass("divInputOrden");	        
        
		var oLabelFecIniInsCir	= new sap.m.Label({
			text			:"Fecha Instalaci�n CIR int",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
				
		var oDateFecIniInsCir  		= new sap.ui.commons.DatePicker({
			id				: "MOFecIniInsCir",
			value: {
				path: "/FecIniInsCir",
				type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy", strictParsing: true})
			},
			editable: true,
			}).addStyleClass("divInputFecOrden");
		
		var oFormElemPecCieL40 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelNroInscrip, oInputNroInscrip, oLabelFecIniInsCir, oDateFecIniInsCir ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// PEC - CIRCUITO EXPRESO - LINEA 5
		var oLabelFecFinInsCir	= new sap.m.Label({
			text			: "Fecha Fin Instalaci�n CIR int",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oDateFecFinInsCir  		= new sap.ui.commons.DatePicker({
			id				: "MOFecFinInsCir",
			value: {
				path: "/FecFinInsCir",
				type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy", strictParsing: true})
			},
			editable: true,
			}).addStyleClass("divInputFecOrden");		        
        
		var oLabelCircInstClte	= new sap.m.Label({
			text			: "Circuito Instalaci�n Cliente",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oCheckCircInstClte 	= new sap.m.CheckBox({
			id				: "MOCircInstClte",			
			selected	: { path: "/CircInstClte",
			        	  	formatter: function(selec){ if (selec == "X"){ return true; } else{ return false; } } },
			editable	: true,
			select	: oController.doSelectedPec}).addStyleClass("CircInstClte");  
		
		var oFormElemPecCieL50 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelFecFinInsCir, oDateFecFinInsCir, oLabelCircInstClte, oCheckCircInstClte ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// PEC - CIRCUITO EXPRESO - LINEA 6
		var oLabelEstInstInt	= new sap.m.Label({
			text			:"Estado Instalaci�n Interna",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputEstInstInt	= new sap.m.Input({			
			id				: "MOEstInstInt",		
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Estado Instalaci�n Interna...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");
		
		new sap.m.SelectDialog("EstInstIntDia", {  
			title		: "Estado Instalaci�n Interna",  
			items		: {     
				path		: "/medCentralSet",  
				template	: new sap.m.StandardListItem({  
							title: "{TabCentral}",
    	    				info : "{TabCentralx}",
							active: true
			
			})},
			templateShareable: true,
    	confirm		: oController.handleCloseEstInstInt,  
    	cancel		: oController.handleCloseEstInstInt}).addStyleClass("diaNoBusq");	       
		
		var oFormElemPecCieL60 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelEstInstInt, oInputEstInstInt, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});			
		
		// CONTENEDOR PEC - CIRCUITO EXPRESO
		var oFormContPecCie	= new sap.ui.layout.form.FormContainer({
			formElements	: [ oFormElemPecCieL00,
			            	    oFormElemPecCieL10,
			            	    oFormElemPecCieL20,
			            	    oFormElemPecCieL30,
			            	    oFormElemPecCieL40,
			            	    oFormElemPecCieL50,
			            	    oFormElemPecCieL60]
		});
		
		// FORM PEC - CIRCUITO EXPRESO
        var oformPecCie 		= new sap.ui.layout.form.Form({
        	width 					: "100%",
        	layout 					: new sap.ui.layout.form.GridLayout(),     	 	
        	formContainers			: [ oFormContPecCie ]
        }).addStyleClass("formElementVerOrden");  
        
        // ========================================================
		// DA�O EQUIPOS
		// ========================================================		
		
		// DA�O EQUIPOS - LINEA 1
		var oLabelDescCausaDan	= new sap.m.Label({
			text			:"Descripci�n de la causa del da�o",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputDescCausaDan	= new sap.m.Input({			
			id				: "MODescCausaDan",		
			value			: { path:"/DescCausaDan" }, 
			editable		: false}).addStyleClass("divInputOrden");	        
        
		var oLabelFecOcurrInc	= new sap.m.Label({
			text			:"Fecha de Ocurrencia del Incidente",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oDateFecOcurrInc  		= new sap.ui.commons.DatePicker({
			id				: "MOFecOcurrInc",				
			value: {
				path: "/FecOcurrInc",
				type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy", strictParsing: true})
			},
			editable: false
		}).addStyleClass("divInputFecOrden");
		
		var oFormElemDanEquL10 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelDescCausaDan, oInputDescCausaDan, oLabelFecOcurrInc, oDateFecOcurrInc ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
        // DA�O EQUIPOS - LINEA 2
		var oLabelHorOcurrInc	= new sap.m.Label({
			text			:"Hora de Ocurrencia del Incidente",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");  
		
		var oInputHorOcurrInc		= new sap.m.Input({			
			id				: "MOHorOcurrInc",		
			value			: { path:"/HorOcurrInc" }, 
			editable		: false}).addStyleClass("divInputOrden");	
        
		var oLabelFecRestServ	= new sap.m.Label({
			text			:"Fecha de Restituci�n del Servicio",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oDateFecRestServ  		= new sap.ui.commons.DatePicker({
			id				: "MOFecRestServ",	
			value: {
				path: "/FecRestServ",
				type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy", strictParsing: true})
			},
			editable: true
		}).addStyleClass("divInputFecOrden");
		
		var oFormElemDanEquL20 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelHorOcurrInc, oInputHorOcurrInc, oLabelFecRestServ, oDateFecRestServ ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
        // DA�O EQUIPOS - LINEA 3
		var oLabelHorRestServ	= new sap.m.Label({
			text			:"Hora de Restituci�n del Servicio",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden"); 
		
		var oInputHorRestServ		= new sap.m.Input({			
			id				: "MOHorRestServ",		
			value			: { path:"/HorRestServ" }, 
            showValueHelp	: true,
            valueHelpOnly	: true,
            editable		: true,
            valueHelpRequest: oController.doSelHora }).addStyleClass("divInputOrdenHoraAct");
		
		var oFormElemDanEquL30 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelHorRestServ, oInputHorRestServ, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
        
		// CONTENEDOR DA�O EQUIPOS
		var oFormContDanEqu	= new sap.ui.layout.form.FormContainer({
			formElements	: [ oFormElemDanEquL10,
			            	    oFormElemDanEquL20,
			            	    oFormElemDanEquL30]
		});
		
		// FORM DA�O EQUIPOS
        var oformDanEqu 		= new sap.ui.layout.form.Form({
        	width 					: "100%",
        	layout 					: new sap.ui.layout.form.GridLayout(),     	 	
        	formContainers			: [ oFormContDanEqu ]
        }).addStyleClass("formElementVerOrden");  
        
        //Campos para Da�o de Equipos
		var inDEProp  = new sap.m.Input("MODEPropIn",{
		      width   			: "150px",
		      type   			: sap.m.InputType.Text,  
		      placeholder  		: 'Propiedad...',  
		      showSuggestion	: true,
		      suggestionItems 	: { 
		          path   			: "/dominioSet",  
		          template  		: new sap.ui.core.Item({  
		          key  				: "{DomvalueL}",
		          text 				: "{Ddtext}" 
		      })},
		      showValueHelp   : true,
		      valueHelpRequest   : oController.doDEPropAyudaBusqueda  
		     }).addStyleClass("divInput");	
		
		var oIconAddDE = new sap.ui.core.Icon({  
	          src : sap.ui.core.IconPool.getIconURI("add"),  
	          size : "12px",  
	          color : "#333333",  
	          activeColor : "white",  
	          activeBackgroundColor : "#333333",  
	          width : "12px",  
	          press: oController.doAgregaDE  
		});
		var oIconLessDE = new sap.ui.core.Icon({  
	          src : sap.ui.core.IconPool.getIconURI("less"),  
	          size : "12px",  
	          color : "#333333",  
	          activeColor : "white",  
	          activeBackgroundColor : "#333333",  
	          width : "12px",  
	          press: oController.doQuitaDE
		});		
		
		var oToolbarDE = new sap.m.Toolbar("MODETb",{
			height 			: "25px"
		});
		
		//se adicionan botones
		oToolbarDE.addContent(oIconAddDE);
		oToolbarDE.addContent(oIconLessDE);
		
        // TABLA DA�O EQUIPOS 
		var oTableDe = new sap.ui.table.Table({
			id					: "MOTablaDe",
			width 				: "100%",
			rowHeight 			: 18,
			columnHeaderHeight  : 18,
			selectionMode		: sap.ui.table.SelectionMode.Single,
			editable			: false,
			navigationMode		: sap.ui.table.NavigationMode.Paginator,
			enableGrouping 		: false,
			visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Interactive,
			toolbar				: oToolbarDE,
			showNoData			: false,
			enableSelectAll 	: false,
			}
		);
		oTableDe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Artefacto"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				editable	: true
			}).bindProperty("value","Artefacto").addStyleClass("divInputOrden"),
			sortProperty 	: "Artefacto"
			}
		));
		oTableDe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Marca"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				editable	: true
			}).bindProperty("value","Marca").addStyleClass("divInputOrden"),
			sortProperty 	: "Marca"
			}
		));		
		oTableDe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Modelo"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				editable	: true
			}).bindProperty("value","Modelo").addStyleClass("divInputOrden"),
			sortProperty 	: "Modelo"
			}
		));	
		oTableDe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Nro. de Serie"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				editable	: true
			}).bindProperty("value","NroSerie").addStyleClass("divInputOrden"),
			sortProperty 	: "NroSerie"
			}
		));
		oTableDe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Propiedad"}).addStyleClass("divLabelTabla"),
			template 		: inDEProp.bindProperty("value","Propiedad"),
				editable	: false,
			}
		));         
        
        // ========================================================
		// MATERIALES RETIRADOS
		// ========================================================
		
		var inRetMatnr  = new sap.m.Input("MORetMatnrIn",{
		      width   			: "150px",
		      type   			: sap.m.InputType.Text,  
		      placeholder  		: 'Material Retirado...',  
		      showValueHelp   	: true,
		     // valueHelpOnly		: false,
		      editable			: true,
		      valueHelpRequest  : oController.doRetMatnrAyudaBusqueda, 
		     }).addStyleClass("divInput");		
		
		var inRetDesMat  = new sap.m.Input("MORetDesMatnrIn",{
		      width   			: "280px",
		      type   			: sap.m.InputType.Text,   
		      editable			: false,
		     }).addStyleClass("divInput");			

		var inRetEstMatnr  = new sap.m.Input("MORetEstMatnrIn",{
		      width   			: "150px",
		      type   			: sap.m.InputType.Text,  
		      placeholder  		: 'Estado de Material...',  
		      showValueHelp   : true,
		      valueHelpRequest   : oController.doRetEstMatnrAyudaBusqueda  
		     }).addStyleClass("divInput");	
		
		var oIconAddMatRet = new sap.ui.core.Icon({  
	          src : sap.ui.core.IconPool.getIconURI("add"),  
	          size : "12px",  
	          color : "#333333",  
	          activeColor : "white",  
	          activeBackgroundColor : "#333333",  
	          width : "12px",  
	          press: oController.doAgregaMatRet  
		});
		var oIconLessMatRet = new sap.ui.core.Icon({  
	          src : sap.ui.core.IconPool.getIconURI("less"),  
	          size : "12px",  
	          color : "#333333",  
	          activeColor : "white",  
	          activeBackgroundColor : "#333333",  
	          width : "12px",  
	          press: oController.doQuitaMatRet
		});		
		
		var oToolbarMatRet = new sap.m.Toolbar("MOMatRetTb",{
			height 			: "25px"
		});
		
		//se adicionan botones
		oToolbarMatRet.addContent(oIconAddMatRet);
		oToolbarMatRet.addContent(oIconLessMatRet);
		
		
		// TABLA MATERIALES RETIRADOS
		var oTableMr = new sap.ui.table.Table({
			id					: "MOTablaMr",
			width 				: "100%",
			rowHeight 			: 18,
			columnHeaderHeight  : 18,
			selectionMode		: sap.ui.table.SelectionMode.Single,
			editable			: false,
			navigationMode		: sap.ui.table.NavigationMode.Paginator,
			toolbar				: oToolbarMatRet,
			enableGrouping 		: false,
			visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Interactive,
			showNoData			: false,
			enableSelectAll 	: false,
			}
		);
		oTableMr.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Material"}).addStyleClass("divLabelTabla"),
			template 		: inRetMatnr.bindProperty("value","Matnr"),
				editable	: false
			}
		));	
		oTableMr.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Descripci�n"}).addStyleClass("divLabelTabla"),
			template 		: inRetDesMat.bindProperty("value","Descripcion"),//new sap.ui.commons.TextField({
				editable	: false
			//}).bindProperty("value","Descripcion")
			}
		));			
		oTableMr.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Cantidad"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				editable	: true
			}).bindProperty("value","Cantidad")
			}
		));		
		oTableMr.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Est.Mat"}).addStyleClass("divLabelTabla"),
			template 		: inRetEstMatnr.bindProperty("value","EstadoMatx"),
				editable	: false
			}
		));			
        
        // ========================================================
		// CNR
		// ========================================================	 
        
    	// CNR - METODO
		var oLabelMetodo			= new sap.m.Label({
			text			:"M�todo",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");	
		
		var oInputMetodo			= new sap.m.Input({
			id					: "MOMetodo",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'M�todo...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");		
	
		//AYUDA M�todo
		new sap.m.SelectDialog("MOMetodoDia", {  
			title		: "M�todo",  
			items		: {     
				path		: "/dominioSet",  
				template	: new sap.m.StandardListItem({  
					title: "{DomvalueL}",
					info : "{Ddtext}",
					active: true

				})},
				templateShareable: true,
				confirm		: oController.handleCloseMetodo,  
				cancel		: oController.handleCloseMetodo}).addStyleClass("diaNoBusq");			

		var oFormElemCnrMetL00 = new sap.ui.layout.form.FormElement({
			fields			: [ oLabelMetodo, oInputMetodo , new sap.m.Label(), new sap.m.Label()],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});
		
		// CONTENEDOR CNR - METODO
		var oFormContCnrMet	= new sap.ui.layout.form.FormContainer({
			formElements	: [ oFormElemCnrMetL00 ]
		});
		
		// FORM CNR - CABECERA
        var oformCnrMet 		= new sap.ui.layout.form.Form({
        	width 					: "100%",
        	layout 					: new sap.ui.layout.form.GridLayout(),     	 	
        	formContainers			: [ oFormContCnrMet ]
        }).addStyleClass("formElementVerOrden");  
		
        // CNR - CENSO - TITULO
        var oLabelTitCnrCen	= new sap.m.Label({
			text			:"CENSO DE CARGA",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oFormElemCnrCenL00	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTitCnrCen, new sap.m.Label(), new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	

        // CNR - CENSO - LINEA 1		
		var oLabelDemandaKw			= new sap.m.Label({
			text			:"Demanda (kW)",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
/*		var oInputDemandaKw		= new sap.m.Input({
			id				: "MODemandaKw",
			value			: { path:"/DemandaKw" }, 
			editable		: true}).addStyleClass("divInputOrden");*/	
		
		var oInputDemandaKw			= new InputWithAttrs({
			id				: "MODemandaKw",	
			placeholder		: 'Demanda...',  
			attributes		: [	new sap.ui.core.CustomData({
			    					key: 'type',
			    					value: 'numeric'
			  					})],
			liveChange			: oController.doValDec,
			editable		: true}).addStyleClass("divInputOrden");		
		
		var oFormElemCnrCenL10 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelDemandaKw, oInputDemandaKw, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});			
        
        // CNR - CENSO - LINEA 2			
		var oLabelMeobde	= new sap.m.Label({
			text			: "M�todo obtenci�n de demanda",
			textAlign		: "Begin", 
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputMeobde			= new sap.m.Input({
			id					: "MOMeobde",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'M�todo obtenci�n demanda...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");		
	
		//AYUDA M�todo
		new sap.m.SelectDialog("MOMeobdeDia", {  
			title		: "M�todo obtenci�n demanda",  
			items		: {     
				path		: "/dominioSet",  
				template	: new sap.m.StandardListItem({  
					title: "{DomvalueL}",
					info : "{Ddtext}",
					active: true

				})},
				templateShareable: true,
				confirm		: oController.handleCloseMeobde,  
				cancel		: oController.handleCloseMeobde}).addStyleClass("diaNoBusq");			
		
		var oFormElemCnrCenL20 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelMeobde, oInputMeobde, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});			
		
        // CNR - CENSO - LINEA 3		
		var oLabelFechaMedicion	= new sap.m.Label({
			text			: "Fecha Medici�n",
			textAlign		: "Begin", 
			design			: "Bold"}).addStyleClass("divLabelOrden");	
		
		var oDateFechaMedicion  		= new sap.ui.commons.DatePicker({
			id				: "MOFechaMedicion",	
			value: {
				path: "/FechaMedicion",
				type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy", strictParsing: true})
			},
			editable: true
		}).addStyleClass("divInputFecOrden");			
		
		var oFormElemCnrCenL30 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelFechaMedicion, oDateFechaMedicion, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});			
		
        // CNR - CENSO - LINEA 4
		var oLabelHoraMedicion	= new sap.m.Label({
			text			: "Hora Medici�n",
			textAlign		: "Begin", 
			design			: "Bold"}).addStyleClass("divLabelOrden");	
		
		var oInputHoraMedicion		= new sap.m.Input({
			id				: "MOHoraMedicion",			
			value			: { path:"/HoraMedicion" }, 
            showValueHelp	: true,
            valueHelpOnly	: true,
            editable		: true,
            valueHelpRequest: oController.doSelHora }).addStyleClass("divInputOrdenHoraAct");		
		
		var oFormElemCnrCenL40 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelHoraMedicion, oInputHoraMedicion, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});			
		
        // CNR - CENSO - LINEA 5		
		var oLabelCodipr	= new sap.m.Label({
			text			: "Consumo Diario Promedio (kWh)",
			textAlign		: "Begin", 
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
/*		var oInputCodipr		= new sap.m.Input({
			id				: "MOCodipr",			
			value			: { path:"/Codipr" }, 
			editable		: true}).addStyleClass("divInputOrden");*/	
		
		var oInputCodipr			= new InputWithAttrs({
			id				: "MOCodipr",	
			placeholder		: 'CPD...',  
			attributes		: [	new sap.ui.core.CustomData({
			    					key: 'type',
			    					value: 'numeric'
			  					})],
			liveChange			: oController.doValDec,
			editable		: true}).addStyleClass("divInputOrden");		
			
		var oFormElemCnrCenL50 	= new sap.ui.layout.form.FormElement({
			id				:	"MOElemCnrCenL50",
			fields			: [ oLabelCodipr, oInputCodipr, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});		
		
        // CNR - CENSO - LINEA 6		
		var oLabelCetode	= new sap.m.Label({
			text			: "Censo Total o Adicionar Valor",
			textAlign		: "Begin", 
			design			: "Bold"}).addStyleClass("divLabelOrden");	
		
	var oInputCetode			= new sap.m.Input({
			id					: "MOCetode",
	    	width				: "150px",
	    	type				: sap.m.InputType.Text,  
            placeholder			: 'Censo Total o Adicionar Valor...',  
            showValueHelp		: true,
            valueHelpOnly		: true,
            valueHelpRequest	: oController.doAyudaBusqueda      
	    }).addStyleClass("divInput");		
	
		//AYUDA Censo Total o Adicionar Valor
		new sap.m.SelectDialog("MOCetodeDia", {  
			title		: "Censo Total o Adicionar Valor",  
			items		: {     
				path		: "/dominioSet",  
				template	: new sap.m.StandardListItem({  
					title: "{DomvalueL}",
					info : "{Ddtext}",
					active: true

				})},
				templateShareable: true,
				confirm		: oController.handleCloseCetode,  
				cancel		: oController.handleCloseCetode}).addStyleClass("diaNoBusq");				
		
		var oFormElemCnrCenL60 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelCetode, oInputCetode, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	

		// CONTENEDOR CNR - CENSO
		var oFormContCnrCen	= new sap.ui.layout.form.FormContainer({
			formElements	: [ oFormElemCnrCenL00,
			            	    oFormElemCnrCenL10,
			            	    oFormElemCnrCenL20,
			            	    oFormElemCnrCenL30,
			            	    oFormElemCnrCenL40,
			            	    oFormElemCnrCenL50,
			            	    oFormElemCnrCenL60]
		});
		
		// FORM CNR - CENSO
        var oformCnrCen 		= new sap.ui.layout.form.Form({
        	id						: "MOFormCnrCen",
        	width 					: "100%",
        	layout 					: new sap.ui.layout.form.GridLayout(),     	 	
        	formContainers			: [ oFormContCnrCen ]
        }).addStyleClass("formElementVerOrden");  
		
     	// CNR - PORCENTAJE - TITULO
        var oLabelTitCnrPor	= new sap.m.Label({
			text			:"PORCENTAJE DE ERROR",
			textAlign		: "Begin",
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oFormElemCnrPorL00	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTitCnrPor, new sap.m.Label(), new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	   
		
     	// CNR - PORCENTAJE - LINEA 1		
		var oLabelPorcAct			= new sap.m.Label({
			id				: "MOLblPorcAct",
			text			: "Energ�a Activa (%)",
			textAlign		: "Begin",
			visible			: false,
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputPorcAct		= new sap.m.Input({
			id				: "MOPorcAct",			
			value			: { path:"/PorcAct" }, 
			editable		: true,
			visible			: false,			
			change			: oController.doValidaEnergia}).addStyleClass("divInputOrden");          
		
		var oFormElemCnrPorL10 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelPorcAct, oInputPorcAct, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
     	// CNR - PORCENTAJE - LINEA 2		
		var oLabelPorcDem			= new sap.m.Label({
			id				: "MOLblPorcDem",
			text			: "Energ�a en Demanda (%)",
			textAlign		: "Begin",
			visible			: false,
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputPorcDem		= new sap.m.Input({
			id				: "MOPorcDem",			
			value			: { path:"/PorcDem" }, 
			editable		: true,
			visible			: false,
			change			: oController.doValidaEnergia}).addStyleClass("divInputOrden");  	
		
		var oFormElemCnrPorL20 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelPorcDem, oInputPorcDem, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
     	// CNR - PORCENTAJE - LINEA 3		
		var oLabelPorcRea			= new sap.m.Label({
			id				: "MOLblPorcRea",
			text			: "Energ�a Reactiva (KVR)",
			textAlign		: "Begin",
			visible			: false,
			design			: "Bold"}).addStyleClass("divLabelOrden");
		
		var oInputPorcRea		= new sap.m.Input({
			id				: "MOPorcRea",			
			value			: { path:"/PorcRea" }, 
			editable		: true,
			visible			: false,
			change			: oController.doValidaEnergia}).addStyleClass("divInputOrden");  			
		
		var oFormElemCnrPorL30 	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelPorcRea, oInputPorcRea, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});	
		
		// CONTENEDOR CNR - PORCENTAJE
		var oFormContCnrPor	= new sap.ui.layout.form.FormContainer({
			formElements	: [ oFormElemCnrPorL00,
			            	    oFormElemCnrPorL10,
			            	    oFormElemCnrPorL20,
			            	    oFormElemCnrPorL30]
		});
		
		// FORM CNR - PORCENTAJE
        var oformCnrPor 		= new sap.ui.layout.form.Form({
        	id						: "MOFormCnrPor",
        	width 					: "100%",
        	layout 					: new sap.ui.layout.form.GridLayout(),     	 	
        	formContainers			: [ oFormContCnrPor ]
        }).addStyleClass("formElementVerOrden");  
        
        //TABLA DE CENSO DE CARGA
		var oButtonPaste			= new sap.m.Button({
			text 			: "Mover C�lculo",
			icon 			: sap.ui.core.IconPool.getIconURI("paste"),
			press			: oController.doMoveValCen,
			}).addStyleClass("botonPdf");
		
		var oToolbarCe = new sap.m.Toolbar("MOTbCnrCen",{
			height 			: "25px"
		});
		oToolbarCe.addContent(oButtonPaste);
		
		var oICantCc  = new sap.m.Input({
			id 		: "MOCnrCant",
			change	: oController.doCnrChangeVal,
			editable: true
		}).addStyleClass("divInputOrden");
		
		var oICantCdp  = new sap.m.Input({
			id 		: "MOCnrCdp",
			change	: oController.doCnrChangeVal,
			editable: true
		}).addStyleClass("divInputOrden");			
		
		var oTableCe = new sap.ui.table.Table({
			id					: "MOTablaCe",
			width 				: "100%",
			visibleRowCount		: 85,
			rowHeight 			: 18,
			columnHeaderHeight  : 18,
			//selectionMode		: sap.ui.table.SelectionMode.Single,
			toolbar				: oToolbarCe,
			//editable			: false,
			//navigationMode 		: sap.ui.table.NavigationMode.Scrollbar,
			//enableGrouping 		: false,
			visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Fixed,
			//showNoData			: false,
			enableSelectAll 	: false,
			}
		);
		oTableCe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "C�digo"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				id			: "MOCnrCod",
				editable	: false,
			}).bindProperty("value","ZzcodCc")
			}
		));   
		oTableCe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Potencia [W]"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				id			: "MOCnrPotencia",
				editable	: false
			}).bindProperty("value","ZzpotCc")
			}
		));   
		oTableCe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Promedio horas / d�a"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				editable	: false
			}).bindProperty("value","ZzproCc")
			}
		));   
		oTableCe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Consumo [Wh/d�a]"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				editable	: false
			}).bindProperty("value","ZzconCc")
			}
		));   		
/*		oTableCe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "CDP [kWh/d�a]"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				id			: "MOCnrCdp",
				editable	: false
			}).bindProperty("value","ZzcdpCc")
			}
		));*/  
		oTableCe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "CDP [kWh/d�a]"}).addStyleClass("divLabelTabla"),
			template 		: oICantCdp.bindProperty("value","ZzcdpCc"),
				editable	: false
			}
		));			
		oTableCe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Denominaci�n"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				editable	: false
			}).bindProperty("value","ZztexCc")
			}
		));   
/*		oTableCe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Cantidad"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				id			: "MOCnrCant",
				editable	: true
			}).bindProperty("value","ZzcanCc")
			}
		)); */ 
		oTableCe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Cantidad"}).addStyleClass("divLabelTabla"),
			template 		: oICantCc.bindProperty("value","ZzcanCc"),
				editable	: false
			}
		));			
		oTableCe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Consumo Calculado [kWh]"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				id			: "MOCnrCon",
				editable	: false
			}).bindProperty("value","ZzconCalCc")
			}
		));  
		oTableCe.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Potencia Calculada [kW]"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				id			: "MOCnrPot",
				editable	: false
			}).bindProperty("value","ZzpotCalCc")
			}
		));  	
		
		// ========================================================
		// COMPONENTES
		// ========================================================
		
		//Iconos para adicionar y quitar filas
		var oIconAddCo = new sap.ui.core.Icon({  
	          src : sap.ui.core.IconPool.getIconURI("add"),  
	          size : "12px",  
	          color : "#333333",  
	          activeColor : "white",  
	          activeBackgroundColor : "#333333",  
	          width : "12px",  
	          press: oController.doAgregaCo  
		});
		var oIconLessCo = new sap.ui.core.Icon({  
	          src : sap.ui.core.IconPool.getIconURI("less"),  
	          size : "12px",  
	          color : "#333333",  
	          activeColor : "white",  
	          activeBackgroundColor : "#333333",  
	          width : "12px",  
	          press: oController.doQuitaCo  
		});		
		
		//Toolbar para tabla componentes
		var oToolbarCo = new sap.m.Toolbar("MOToolbarCo",{
			height 			: "25px"
		});
		
		//se adiciona iconos a toolbar
		oToolbarCo.addContent(oIconAddCo);
		oToolbarCo.addContent(oIconLessCo);	
		
		//se crean campos con ayudas de b�squeda para componentes
		var inCompoMatnr  = new sap.m.Input("MOCompoMatnrIn",{
		      width   			: "100px",
		      type   			: sap.m.InputType.Text,  
		      placeholder  		: 'Material...',  
		      showValueHelp     : true,
		      valueHelpRequest   : oController.doCompoMatnrAyudaBusqueda  
		     }).addStyleClass("divInput");	
		
		var inCompoLote  = new sap.m.Input({
			  id				: "MOCompoLoteIn",
		      width   			: "100px",
		      type   			: sap.m.InputType.Text,  
		      placeholder  		: 'Lote...',  
		      showSuggestion	: true,
		      showValueHelp   : true,
		      valueHelpRequest   : oController.doCompoLoteBusqueda  
		     }).addStyleClass("divInput");				
		
		// TABLA COMPONENTES
		var oTableCo = new sap.ui.table.Table({
			id					: "MOTablaCo",
			width 				: "100%",
			rowHeight 			: 18,
			columnHeaderHeight  : 18,
			//selectionMode		: sap.ui.table.SelectionMode.Single,
			selectionMode		: sap.ui.table.SelectionMode.None,
			fixedLayout			: false,
			toolbar				: oToolbarCo,
			editable			: false,
			navigationMode		: sap.ui.table.NavigationMode.Paginator,
			enableGrouping 		: false,
			visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Interactive,
			showNoData			: false,
			enableSelectAll 	: false,
			busyStateChanged	: oController.doChangeTableCNR,
			}
		);
		oTableCo.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Posici�n"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				editable	: false,
			}).bindProperty("value","Posnr"),
			width			: "50px"
			}
		));
		oTableCo.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Componente"}).addStyleClass("divLabelTabla"),
			template 		: inCompoMatnr.bindProperty("value","Matnr"),
				editable	: false,
				width 		: '93px'
			}
		));	
		oTableCo.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Descripci�n"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				editable	: false
			}).bindProperty("value","Matxt"),
			width			: "300px"
			}
		));		
		oTableCo.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Cantidad"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				editable	: true,
				change		: oController.doChangeCantCompo
			}).bindProperty("value","Menge"),
			width			: "50px"
			}
		));		
		oTableCo.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Unidad de Medida"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				editable	: true	
			}).bindProperty("value","Einheit"),
			width			: "50px"
			}
		));		
		oTableCo.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Tipo de Posici�n"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({			
				editable	: false		
			}).bindProperty("value","Postp"),
			width			: "50px"
			}
		));
		oTableCo.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Centro"}).addStyleClass("divLabelTabla"),
			template 		:  new sap.ui.commons.TextField({
				editable	: false
			}).bindProperty("value","Werks"),
			width			: "50px"
			}
		));	
		oTableCo.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Operaci�n"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				editable	: true
			}).bindProperty("value","Vornr"),
			width			: "50px"
			}
		));		
		oTableCo.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Lote"}).addStyleClass("divLabelTabla"),
			template 		: inCompoLote.bindProperty("value","Charg"),
				editable	: false,
				width	    : "93px"
			}
		));				
		
		
        // ========================================================
		// OPERACIONES
		// ========================================================	
/*		//Acreedor
		var inOperaAcreedor  = new sap.m.Input("MOOperaAcreedorIn",{
		      width   			: "100px",
		      type   			: sap.m.InputType.Text,  
		      placeholder  		: 'Acreedor...',  
		      showSuggestion	: true,
		      suggestionItems 	: { 
		          path   			: "/acreedorSet",  
		          template  		: new sap.ui.core.Item({  
		          key  				: "{Lifnr}",
		          text 				: "{Name1}" 
		      })},
		      showValueHelp   : true,
		      valueHelpRequest   : oController.doOperaAcreedorAyudaBusqueda  
		     }).addStyleClass("divInput");*/
		//Contrato
		var inOperaContrato  = new sap.m.Input("MOOperaContratoIn",{
		      width   			: "100px",
		      type   			: sap.m.InputType.Text,  
		      placeholder  		: 'Contrato...',  
		      showValueHelp     : true,
		      valueHelpRequest  : oController.doOperaContratoAyudaBusqueda,
		     }).addStyleClass("divInput");		
		//Posici�n
		var inOperaPos  = new sap.m.Input("MOOperaPosIn",{
		      width   			: "100px",
		      type   			: sap.m.InputType.Text,  
		      placeholder  		: 'Posici�n...',  
		      showValueHelp   : true,
		      valueHelpRequest   : oController.doOperaPosAyudaBusqueda,	      
		     }).addStyleClass("divInput");	
		
		// TABLA OPERACIONES
		var oTableOp = new sap.ui.table.Table({
			id					: "MOTablaOp",
			width 				: "100%",
			rowHeight 			: 1,
			columnHeaderHeight  : 10,
			selectionMode		: sap.ui.table.SelectionMode.Single,
			editable			: false,
			navigationMode		: sap.ui.table.NavigationMode.Paginator,
			enableGrouping 		: false,
			visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Interactive,
			showNoData			: false,
			enableSelectAll 	: false,			
			}
		);
		oTableOp.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Acreedor"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				editable	: false
			}).bindProperty("value","Lifnr")
			}
		));
		oTableOp.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Contrato"}).addStyleClass("divLabelTabla"),
			template 		: inOperaContrato.bindProperty("value","Konnr"),//new sap.ui.commons.TextField({
				editable	: true
			//}).bindProperty("value","Konnr")
			}
		));		
		oTableOp.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Posici�n"}).addStyleClass("divLabelTabla"),
			template 		: inOperaPos.bindProperty("value","Ktpnr"),//new sap.ui.commons.TextField({
				editable	: true
			//}).bindProperty("value","Ktpnr")
			}
		));		
		
        // ========================================================
		// SERVICIOS
		// ========================================================			
		//Servicios - Celdas
		//Servicios - Tabla
		var oIconAddServ = new sap.ui.core.Icon({  
	          src : sap.ui.core.IconPool.getIconURI("add"),  
	          size : "12px",  
	          color : "#333333",  
	          activeColor : "white",  
	          activeBackgroundColor : "#333333",  
	          width : "12px",  
	          press: oController.doAgregaServ  
		});
		var oIconLessServ = new sap.ui.core.Icon({  
	          src : sap.ui.core.IconPool.getIconURI("less"),  
	          size : "12px",  
	          color : "#333333",  
	          activeColor : "white",  
	          activeBackgroundColor : "#333333",  
	          width : "12px",  
	          press: oController.doQuitaServ  
		});		
		
		var oToolbarServ = new sap.m.Toolbar("MOToolbarServ",{
			height 			: "25px"
		});
		
		//se adicionan botones
		oToolbarServ.addContent(oIconAddServ);
		oToolbarServ.addContent(oIconLessServ);		
		
		//Nro. de Servicio
		var inServNroSer  = new sap.m.Input("MOServNroSerIn",{
		      width   			: "100px",
		      type   			: sap.m.InputType.Text,  
		      placeholder  		: 'Nro. Servicio...',  
		      showSuggestion	: true,
		      showValueHelp   : true,
		      valueHelpRequest   : oController.doNroSerAyudaBusqueda  
		     }).addStyleClass("divInput");
		
		//Unidad de medida
/*		var inServUnMed  = new sap.m.Input("MOServUnMedIn",{
		      width   			: "100px",
		      type   			: sap.m.InputType.Text,  
		      placeholder  		: 'Unidad de Medida...',  
		      showSuggestion	: true,
		      showValueHelp   : true,
		      valueHelpRequest   : oController.doServUnMedAyudaBusqueda  
		     }).addStyleClass("divInput");*/
		
		var oTableServ = new sap.ui.table.Table({
			id					: "MOTablaServ",
			width 				: "100%",
			rowHeight 			: 18,
			columnHeaderHeight  : 18,
			selectionMode		: sap.ui.table.SelectionMode.Multi,
			toolbar				: oToolbarServ,
			editable			: false,
			navigationMode		: sap.ui.table.NavigationMode.Paginator,
			enableGrouping 		: false,
			visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Interactive,
			showNoData			: false,
			enableSelectAll 	: false,
		});
		oTableServ.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "L�nea"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				editable	: false
			}).bindProperty("value","Extrow")
		}
		));
		oTableServ.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "No.Servicio"}).addStyleClass("divLabelTabla"),
			template 		: inServNroSer.bindProperty("value","Srvpos"),
			editable	: false,					
		}			
		
		));		
		oTableServ.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Descripci�n"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				editable	: false
			}).bindProperty("value","Ktext1")
		}
		));			
		oTableServ.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Cantidad"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				editable	: true
			}).bindProperty("value","Menge")
		}
		));		
		oTableServ.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Unidad de Medida"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({//inServUnMed.bindProperty("value","Meins"),
				editable	: false
			}).bindProperty("value","Meins")				
		}
		));		
		oTableServ.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Precio"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				editable	: false
			}).bindProperty("value","Tbtwr"),
			visible       : false
		}
		));	
		oTableServ.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Moneda"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				editable	: false
			}).bindProperty("value","Waers"),
			visible       : false
		}
		));			
		
        // ========================================================
		// ACORDEON
		// ========================================================			
		// Seccion datos principales
		var oSeccionDatPrin = new sap.ui.commons.AccordionSection("MOSecDatPrin",{
			collapsed	: false,
			title		: "CABECERA",
			content 	: [oformDatPrin]
		});
		// Seccion responsables
		var oSeccionRespon 	= new sap.ui.commons.AccordionSection("MOSecRespon",{
			collapsed	: true,
			title		: "RESPONSABLES",
			content 	: [oformRe]				
		});	
		// Seccion datos de conexi�n - carga instalada
		var oSeccionDcCi 	= new sap.ui.commons.AccordionSection("MOSecDcCi",{
			collapsed	: true,
			title		: "DATOS DE CONEXI�N - CARGA INSTALADA",
			content 	: [oformDc,
			        	   oformCi]			
		});	
		// Seccion direcci�n de orden
		var oSeccionDireccion = new sap.ui.commons.AccordionSection("MOSecDireccion",{
			collapsed	: true,
			title		: "DIRECCI�N DE ORDEN",
			content 	: [oformDo]			
		});			
		// Seccion acometida - tablero
		var oSeccionAcom = new sap.ui.commons.AccordionSection("MOSecAcom",{
			collapsed	: true,
			title		: "ACOMETIDA - TABLERO",
			content 	: [oformAcom,
			        	   oformTab]			
		});	
		// Seccion equipo
		var oSeccionEquipo = new sap.ui.commons.AccordionSection("MOSecEquipo",{
			collapsed	: true,
			title		: "EQUIPO",
			content 	: [oformDatEqui,
			        	   oformMedExi,
			        	   oformMedIns,
			        	   oformMedRet,
			        	   oformTraExi,
			        	   oformTraIns,
			        	   oformTraRet]			
		});			
		// Seccion sellos
		var oSeccionSellos = new sap.ui.commons.AccordionSection("MOSecSellos",{
			collapsed	: true,
			title		: "SELLOS",
			content 	: [oTableSe,
			        	   oTableEqui]			
		});			
		// Seccion PEC
		var oSeccionPec = new sap.ui.commons.AccordionSection("MOSecPec",{
			collapsed	: true,
			title		: "PEC",
			content 	: [oformPecCab,
			        	   oformPecCoc,
			        	   oformPecCal,
			        	   oformPecCie]			
		});
		// Seccion da�o equipos
		var oSeccionDanoequi = new sap.ui.commons.AccordionSection("MOSecDanoequi",{
			collapsed	: true,
			title		: "DA�O EQUIPOS",
			content 	: [oformDanEqu,
			        	   oTableDe]			
		});		
		// Seccion materiales retirados
		var oSeccionMatret = new sap.ui.commons.AccordionSection("MOSecMatret",{
			collapsed	: true,
			title		: "MATERIALES RETIRADOS",
			content 	: [oTableMr]			
		});
		// Seccion CNR	
		var oSeccionCnr = new sap.ui.commons.AccordionSection("MOSecCnr",{
			collapsed	: true,
			title		: "CNR",
			content 	: [oformCnrMet,
			        	   oformCnrCen,
			        	   oformCnrPor,
			        	   oTableCe]			
		});			
		// Seccion componentes
		var oSeccionCompo = new sap.ui.commons.AccordionSection("MOSecCompo",{
			collapsed	: true,
			title		: "COMPONENTES",
			content 	: [oTableCo]			
		});	
		// Seccion operaciones
		var oSeccionOper = new sap.ui.commons.AccordionSection("MOSecOper",{
			collapsed	: true,
			title		: "OPERACIONES",
			content 	: [oTableOp]			
		});	
		
		// Seccion servicios
		var oSeccionServ = new sap.ui.commons.AccordionSection("MOSecServ",{
			collapsed	: true,
			title		: "SERVICIOS",
			content 	: [oTableServ]			
		});	oTableServ		
		
		
		// Acordion de opciones
		var oAccordion = new sap.ui.commons.Accordion("MOAcordion",{
			width		: "100%",
			height	: "100%",
			sections 	: [oSeccionDatPrin,
			         	   oSeccionRespon,
			         	   oSeccionDcCi,
			         	   oSeccionDireccion,
			         	   oSeccionAcom,
			         	   oSeccionEquipo,
			         	   oSeccionSellos,
			         	   oSeccionPec,
			         	   oSeccionDanoequi,
			         	   oSeccionMatret,
			         	   oSeccionCnr,
			         	   oSeccionCompo,
			         	   oSeccionOper,
			         	   oSeccionServ ] 
		});
        
        
		// Elemento de form datos fijos
		oFormElemDatFij 		= new sap.ui.layout.form.FormElement({
			fields: [ oformCabecera ]
		});
		
		// Contenedor para datos fijos
		oFormContDatFij			= new sap.ui.layout.form.FormContainer({
			formElements: [ oFormElemDatFij ]
		});
		
		// Elemento de form acordeon
		oFormElemAcordeon 		= new sap.ui.layout.form.FormElement({
			fields: [ oAccordion ]
		});
		
		// Contenedor para acordeon 
		oFormContAcordeon		= new sap.ui.layout.form.FormContainer({
			formElements: [ oFormElemAcordeon ]
		});
		
		// Form para visualizacion de orden
        var oFormVerOrden 		= new sap.ui.layout.form.Form({
        	id						: "MOForm",
        	width 					: "100%",
        	layout 					: new sap.ui.layout.form.GridLayout(),     	
        	title					: new sap.ui.core.Title({text: "MODIFICAR ORDEN"}),   	
        	formContainers			: [ oFormContDatFij,
        	              			    oFormContAcordeon
        	              			     ]
        }); 

        // ========================================================        
        // DESPLIEGUE DE PDF
        // ========================================================        
		var oTableForms = new sap.ui.table.Table({
			id					: "MOTablaOrdenForm",
			width 				: "100%",
			title				: "Formularios de la orden",
			rowHeight 			: 18,
			columnHeaderHeight  : 18,
			selectionMode		: sap.ui.table.SelectionMode.Single,
			editable			: false,
			navigationMode		: sap.ui.table.NavigationMode.Paginator,
			enableGrouping 		: false,
			visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Interactive,
			showNoData			: false,
			enableSelectAll 	: false
			}
		);
		
		var oIconPdf = new sap.ui.core.Icon({  
	          src 					: sap.ui.core.IconPool.getIconURI("pdf-attachment"),  
	          size 					: "12px",  
	          color 				: "#333333",  
	          activeColor 			: "white",  
	          activeBackgroundColor : "#333333",   
	          width 				: "12px",  
	          press					: oController.doTraerPdf  
		}); 
		
		oTableForms.addColumn(new sap.ui.table.Column({
			id				: "AdminTablaOrdenFormAufnr",
			label 			: new sap.ui.commons.Label({text : "Orden"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.Label({text : "{Aufnr}"}),
			width  			: "95%",
			sortProperty 	: "Aufnr"
			}
		));
		
		oTableForms.addColumn(new sap.ui.table.Column({
			id				: "AdminTablaOrdenFormDoctyp",
			label 			: new sap.ui.commons.Label({text : "Clase"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.Label({text : "{Doctyp}"}),
			width  			: "95%",
			sortProperty 	: "Doctyp"
			}
		));
		
		oTableForms.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Formulario"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
								editable		: false
							}).bindProperty("value","Workpaper"),
			width  			: "95%",
			sortProperty 	: "Workpaper"
			}
		));		
		
		oTableForms.addColumn(new sap.ui.table.Column({
			label 			: new sap.ui.commons.Label({text : "Denominaci�n"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.TextField({
				editable	: false
			}).bindProperty("value","Papertext"),
			width  			: "95%",
			sortProperty 	: "Papertext"
			}
		));		
		
		oTableForms.addColumn(new sap.ui.table.Column({ 
			label 			: new sap.ui.commons.Label({text : "PDF"}).addStyleClass("divLabelTabla"),
			template 		: oIconPdf,
			width  			: "95%",
			hAlign			: "Center"
			}
		));		
		
		var oOverlayContainer = new sap.ui.ux3.OverlayContainer("MOContformularios");
		oOverlayContainer.addContent(oTableForms);
		
        // ========================================================        
        // DESPLIEGUE DE EQUIPOS
        // ========================================================        
		var oTableEqui = new sap.ui.table.Table({
			id					: "MOTablaEqui",
			width 				: "100%",
			title				: "Equipos",
			rowHeight 			: 20,
			columnHeaderHeight  : 10,
			selectionMode		: sap.ui.table.SelectionMode.Single,
			editable			: false,
			navigationMode		: sap.ui.table.NavigationMode.Paginator,
			enableGrouping 		: false,
			visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Interactive,
			showNoData			: false,
			enableSelectAll 	: false,
			rowSelectionChange	: oController.doRowSelectionTbEqui
			}
		);
		
		oTableEqui.addColumn(new sap.ui.table.Column({
			id				: "NroEqui",
			label 			: new sap.ui.commons.Label({text : "Equipo"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.Label({text : "{Equnr}"}),
			width  			: "10%",
			sortProperty 	: "Aufnr"
			}
		));		
		oTableEqui.addColumn(new sap.ui.table.Column({
			id				: "SerieEqui",
			label 			: new sap.ui.commons.Label({text : "Serie"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.Label({text : "{Sernr}"}),
			width  			: "10%",
			sortProperty 	: "Sernr"
			}
		));		
		oTableEqui.addColumn(new sap.ui.table.Column({
			id				: "DescmatEqui",
			label 			: new sap.ui.commons.Label({text : "Descripci�n"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.Label({text : "{Maktx}"}),
			width  			: "25%",
			sortProperty 	: "Maktx"
			}
		));		
		
		var oOverlayContEqui = new sap.ui.ux3.OverlayContainer("MOContFormEqui");
		oOverlayContEqui.addContent(oTableEqui);	
		
        // ========================================================        
        // DESPLIEGUE DE MATERILES
        // ========================================================        
		var oTableMatnr = new sap.ui.table.Table({
			id					: "MOTablaMatnr",
			width 				: "100%",
			title				: "Materiales",
			rowHeight 			: 20,
			columnHeaderHeight  : 10,
			selectionMode		: sap.ui.table.SelectionMode.Single,
			editable			: false,
			navigationMode		: sap.ui.table.NavigationMode.Paginator,
			enableGrouping 		: false,
			visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Interactive,
			showNoData			: false,
			enableSelectAll 	: false,
			rowSelectionChange	: oController.doRowSelectionTbMatnr
			}
		);
		
		oTableMatnr.addColumn(new sap.ui.table.Column({
			id				: "NroMatnr",
			label 			: new sap.ui.commons.Label({text : "Material"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.Label({text : "{Matnr}"}),
			width  			: "10%",
			sortProperty 	: "Matnr"
			}
		));		
		oTableMatnr.addColumn(new sap.ui.table.Column({
			id				: "DescMatnr",
			label 			: new sap.ui.commons.Label({text : "Descripci�n Material"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.Label({text : "{Maktx}"}),
			width  			: "10%",
			sortProperty 	: "Maktx"
			}
		));		
		oTableMatnr.addColumn(new sap.ui.table.Column({
			id				: "CenMatnr",
			label 			: new sap.ui.commons.Label({text : "Centro"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.Label({text : "{Werks}"}),
			width  			: "10%",
			sortProperty 	: "Werks"
			}
		));	
		oTableMatnr.addColumn(new sap.ui.table.Column({
			id				: "CenMatnr",
			label 			: new sap.ui.commons.Label({text : "Descripci�n Centro"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.Label({text : "{Name1}"}),
			width  			: "15%",
			sortProperty 	: "Name1"
			}
		));			
		oTableMatnr.addColumn(new sap.ui.table.Column({
			id				: "CantMatnr",
			label 			: new sap.ui.commons.Label({text : "Cantidad Disponible"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.Label({text : "{Lblab}"}),
			width  			: "10%",
			sortProperty 	: "Lblab"
			}
		));			
		
		var oOverlayContMatnr = new sap.ui.ux3.OverlayContainer("MOContFormMatnr");
		oOverlayContMatnr.addContent(oTableMatnr);	
		
        // ========================================================        
        // DESPLIEGUE DE SERVICIOS
        // ========================================================        
		var oTableServicio = new sap.ui.table.Table({
			id					: "MOTablaServicio",
			width 				: "100%",
			title				: "Servicios",
			rowHeight 			: 20,
			columnHeaderHeight  : 10,
			selectionMode		: sap.ui.table.SelectionMode.Single,
			editable			: false,
			navigationMode		: sap.ui.table.NavigationMode.Paginator,
			enableGrouping 		: false,
			visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Interactive,
			showNoData			: false,
			enableSelectAll 	: false,
			rowSelectionChange	: oController.doRowSelectionTbServicio
			}
		);
		
		oTableServicio.addColumn(new sap.ui.table.Column({
			id				: "NroServicio",
			label 			: new sap.ui.commons.Label({text : "C�d.Servicio"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.Label({text : "{Srvpos}"}),
			width  			: "10%",
			sortProperty 	: "Srvpos",
			filterProperty	: "Srvpos",
			}
		));		
		oTableServicio.addColumn(new sap.ui.table.Column({
			id				: "DescServicio",
			label 			: new sap.ui.commons.Label({text : "Descripci�n Servicio"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.Label({text : "{Ktext1}"}),
			width  			: "10%",
			sortProperty 	: "Ktext1"
			}
		));		

		var oOverlayContServicio = new sap.ui.ux3.OverlayContainer("MOContFormServicio");
		oOverlayContServicio.addContent(oTableServicio);	
		
        // ========================================================        
        // DESPLIEGUE DE INGRESO PARA BUSCAR MATERIAL RETIRADO
        // ========================================================  
	
		// LINEA 1
		//Tipo Material
		var oLabelTipMR 		= new sap.m.Label({
			id			: this.createId("MOLblTipMR"),
			text 		: "Tipo Material:",
			textAlign	: "Begin",
			design		: "Bold"}).addStyleClass("divLabelOrdenMR");
		
		var oInputTipMR 		= new sap.m.Input({
			id 					: "MOInTipMR",
			width				: "95%",
			//value				: "", 
			type				: sap.m.InputType.Text, 
            placeholder			: 'Tipo Material...',  
            showValueHelp		: true,
            valueHelpOnly		: true,  
            valueHelpRequest	: oController.doAyudaBusqueda              
		}).addStyleClass("divInputMR");	
	
		 //AYUDA Tipo de material
	    new sap.m.SelectDialog("MOInTipMRDia", {  
	    	title		: "Tipo Material",  
	    	items		: {     
				path		: "/materialRetSet",  
				template	: new sap.m.StandardListItem({  
								title: "{Mtart}",
	    	    				info : "{Mtbez}",
								active: true
				
				})},
				templateShareable: true,
        liveChange	: oController.handleSearchTipoMR,
		search		: oController.handleSearchTipoMR,
    	confirm		: oController.handleCloseTipoMR,  
    	cancel		: oController.handleCloseTipoMR});	
	    
		var oFormElemMR10	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelTipMR, oInputTipMR, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});		    
		
	    //LINEA 2
		//Descrici�n Material
		var oLabelDesMR 		= new sap.ui.commons.Label({
			id			: this.createId("MOLblDesMR"),
			text 		: "Descripci�n Material:", 
			textAlign	: "Begin",
			design		: "Bold"}).addStyleClass("divLabelOrdenMR");
		
		
		var oInputDesMR 	= new sap.m.Input ({
			id 			: "MOInDesMR",
			width		: "95%",
			type		: sap.m.InputType.Text,
			//value		: "",
			maxLength	: 25,
		}).addStyleClass("divInputOrdenMR");
		
		var oFormElemMR20	= new sap.ui.layout.form.FormElement({
			fields			: [ oLabelDesMR, oInputDesMR, new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});			
		
		//LINEA 3
		//Boton buscar
	    var oButtonMr = new sap.m.Button({
	         id 		: this.createId("Buscar"),
	         text 		: "Buscar",
	         press		: oController.doBuscaMR
	       }).addStyleClass("botonPdf");	
	    
		var oFormElemMR30	= new sap.ui.layout.form.FormElement({
			fields			: [ oButtonMr, new sap.m.Label(), new sap.m.Label(), new sap.m.Label() ],
			layoutData		: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		});		   
		
		// CONTENEDOR AYUDA DE BUSQUEDA MATERIAL RETIRADO
		var oFormContMR	= new sap.ui.layout.form.FormContainer({
			formElements	: [ oFormElemMR10,
			            	    oFormElemMR20,
			            	    oFormElemMR30 ]
		});		
		
		// FORM AYUDA DE BUSQUEDA MATERIAL RETIRADO
        var oformMR 		= new sap.ui.layout.form.Form({
        	width 					: "100%",
        	layout 					: new sap.ui.layout.form.GridLayout(),     	 	
        	formContainers			: [ oFormContMR ]
        }).addStyleClass("formElementVerOrdenMR"); 			    
		
		
		var oOverlayContAyudaMR = new sap.ui.ux3.OverlayContainer("MOContFormAyudaMR").addStyleClass("divAyudaCustomMR");
		oOverlayContAyudaMR.addContent(oformMR);	
		
        // ========================================================        
        // DESPLIEGUE DE MATERIALES RETIRADOS
        // ========================================================        
		var oTableAyudaMR = new sap.ui.table.Table({
			id					: "MOTablaAyudaMR",
			width 				: "100%",
			title				: "Servicios",
			rowHeight 			: 20,
			columnHeaderHeight  : 10,
			selectionMode		: sap.ui.table.SelectionMode.Single,
			editable			: false,
			navigationMode		: sap.ui.table.NavigationMode.Paginator,
			enableGrouping 		: false,
			visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Interactive,
			showNoData			: false,
			enableSelectAll 	: false,
			rowSelectionChange	: oController.doRowSelectionAyudaMR
			}
		);
		
		oTableAyudaMR.addColumn(new sap.ui.table.Column({
			id				: "MOMatMR",
			label 			: new sap.ui.commons.Label({text : "Material"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.Label({text : "{Matnr}"}),
			width  			: "10%",
			sortProperty 	: "Matnr"
			}
		));		
		oTableAyudaMR.addColumn(new sap.ui.table.Column({
			id				: "MODesMR",
			label 			: new sap.ui.commons.Label({text : "Descripci�n Material"}).addStyleClass("divLabelTabla"),
			template 		: new sap.ui.commons.Label({text : "{Maktxt}"}),
			width  			: "10%",
			sortProperty 	: "Maktxt"
			}
		));		

		var oOverlayContTableMR = new sap.ui.ux3.OverlayContainer("MOContFormTableMR");
		oOverlayContTableMR.addContent(oTableAyudaMR);		
		
		oFormVerOrden.addStyleClass('FormVisualizar');
       
		aControls.push(oFormVerOrden);
		
		return aControls;	
	
		
	}

});
//# sourceURL=https://sapgw.redenergia.gob.ec:8200/sap/bc/ui5_ui5/sap/zord/ordenes/OrdenModif.view.js