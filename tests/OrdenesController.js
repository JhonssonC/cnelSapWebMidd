sap.ui.controller("ordenes.OrdenModif", {

    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf ordenes.MenuAdminOrdenVer
     */
    onInit: function() {
  
      if (sap.ui.getCore().byId("idInicio")) {
        sap.ui.getCore().byId("idInicio").destroy();
      }
  
      var oController = sap.ui.getCore().byId("idOrdenMod").getController();
  
  
      // se obtiene la orden a consultar desde el modelo local
      var orden      = sap.ui.getCore().getModel("oModelModOrd").getProperty("/orden");
      var clase      = sap.ui.getCore().getModel("oModelModOrd").getProperty("/clase");
      var errShell   = sap.ui.getCore().getModel("oModelModOrd").getProperty("/errShell");
      var errIdBack    = sap.ui.getCore().getModel("oModelModOrd").getProperty("/errIdBack");
      var errNavVis01  = sap.ui.getCore().getModel("oModelModOrd").getProperty("/errNavVis01");
      var errNavVis02  = sap.ui.getCore().getModel("oModelModOrd").getProperty("/errNavVis02");
  
      // Se define la ruta del modelo
      var sServiceUrlPdf = "/sap/opu/odata/SAP/ZWMGS_ORDEN_OTF_SRV/";
  
      // Crear instancia del modelo OData
      var oModelPdf = new sap.ui.model.odata.ODataModel(sServiceUrlPdf, true, "WMWEBCON", "Q1p0w2o9");
  
      // Se define el modelo como global
      sap.ui.getCore().setModel(oModelPdf,"oModelPDF");
  
      // Lectura incorrecta
      var lecturaIncorrecta = function(oError){
        sap.m.MessageToast.show(JSON.parse(oError.response.body).error.message.value, {
          width: "300px",                  
          my: "center center",         
          at: "center center",          
          of: window,                  
          offset: "0 0",               
          collision: "fit fit",         
          onClose: null,             
          autoClose: true,             
          animationTimingFunction: "ease", 
          animationDuration: 100,    
          closeOnBrowserNavigation: true   
        });
        sap.ui.getCore().byId(errShell).setContent(sap.ui.getCore().byId(errIdBack));
        sap.ui.getCore().byId(errNavVis01).setVisible(false);
        sap.ui.getCore().byId(errNavVis02).setVisible(false);
        sap.ui.getCore().byId("idOrdenMod").destroy();
        return;
      }
  
      // se lee el usuario actual
      var user = MYSAP.SessionManager.getUser('user');
      if (user.usuario == null ) {
        return;
      } 
  
      var lecturaCorrecta = function(oData, oResponse){
        var oModelJsonTotal   =  new sap.ui.model.json.JSONModel();
        var oModelJsonCabecera  =  new sap.ui.model.json.JSONModel();
        var oModelJsonMatRet  =  new sap.ui.model.json.JSONModel();
        var oModelJsonDanEqu  =  new sap.ui.model.json.JSONModel();
        var oModelJsonCenso   =  new sap.ui.model.json.JSONModel();
        var oModelJsonSellos  =  new sap.ui.model.json.JSONModel();
        var oModelJsonCompo   =  new sap.ui.model.json.JSONModel();
        var oModelJsonOpera   =  new sap.ui.model.json.JSONModel();
        var oModelJsonServi   =  new sap.ui.model.json.JSONModel();
  
        oModelJsonTotal.setData(oData);
  
        var resultadoCabecera   =  oModelJsonTotal.getProperty("/results/0")
        var resultadoMatRet   =  oModelJsonTotal.getProperty("/results/0/NavMatRet/results")
        var resultadoDanEqu   =  oModelJsonTotal.getProperty("/results/0/NavDanEqu/results")
        var resultadoCenso    =  oModelJsonTotal.getProperty("/results/0/NavCenso/results")
        var resultadoSellos   =  oModelJsonTotal.getProperty("/results/0/NavSellos/results")
        var resultadoCompo    =  oModelJsonTotal.getProperty("/results/0/NavCompo/results")
        var resultadoOpera    =  oModelJsonTotal.getProperty("/results/0/NavOpera/results")
        var resultadoServi    =  oModelJsonTotal.getProperty("/results/0/NavServi/results")
  
        oModelJsonCabecera.setData(resultadoCabecera);
        oModelJsonMatRet.setData(resultadoMatRet);
        oModelJsonDanEqu.setData(resultadoDanEqu);
        oModelJsonCenso.setData(resultadoCenso);
        oModelJsonSellos.setData(resultadoSellos);
        oModelJsonCompo.setData(resultadoCompo);
        oModelJsonOpera.setData(resultadoOpera);
        oModelJsonServi.setData(resultadoServi);
        sap.ui.getCore().byId("MOForm").setModel(oModelJsonCabecera); 
  
        var Censos    = oModelJsonCenso.getProperty("/");
        oModelJsonCenso.setSizeLimit(Censos.length);
        //sap.ui.getCore().byId("MOTablaCe").setVisibleRowCount = 20;
  
        // CABECERA
        // Formato - Nro. de Orden
        sap.ui.getCore().byId("MOAufnr").setValue(oModelJsonCabecera.getProperty("/Aufnr"));
        // Formato - Clase
        sap.ui.getCore().byId("MOAufart").setName(oModelJsonCabecera.getProperty("/Clase"));
        if(oModelJsonCabecera.getProperty("/Clase") != ""){ sap.ui.getCore().byId("MOAufart").setValue(oModelJsonCabecera.getProperty("/Clase") + " | " + oModelJsonCabecera.getProperty("/Auftext")); }
  
        // Formato - Cl.act.PM
        if(oModelJsonCabecera.getProperty("/Ilart") != ""){ sap.ui.getCore().byId("MOIlatx").setValue(oModelJsonCabecera.getProperty("/Ilart") + " | " + oModelJsonCabecera.getProperty("/Ilatx")); }
        // Formato - Cuen
        sap.ui.getCore().byId("MOCuen").setValue(oModelJsonCabecera.getProperty("/Cuen"));
  
        // Dialogo - estado de usuario con numero de clasificacion
        sap.ui.getCore().byId("UsrStCclaDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        sap.ui.getCore().byId("MOUsrStCclaTxt").setName(oModelJsonCabecera.getProperty("/UsrStCcla"));
        sap.ui.getCore().byId("MOUsrStCclaTxt").setValue(oModelJsonCabecera.getProperty("/UsrStCclaTxt"));
        // Dialogo - estado de usuario sin numero de clasificacion
        sap.ui.getCore().byId("UsrStSclaDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        sap.ui.getCore().byId("MOUsrStSclaTxt").setName(oModelJsonCabecera.getProperty("/UsrStScla"));
        sap.ui.getCore().byId("MOUsrStSclaTxt").setValue(oModelJsonCabecera.getProperty("/UsrStSclaTxt"));
  
            //Fecha Ejecuci�n de trabajo
            if(oModelJsonCabecera.getProperty("/FecEjecTrab") != "" && oModelJsonCabecera.getProperty("/FecEjecTrab") != null){ 
              var fecEjecTrab = oController.doConvFecha(oModelJsonCabecera.getProperty("/FecEjecTrab"));
               sap.ui.getCore().byId("MOFecEjecTrab").setValue(fecEjecTrab);
               sap.ui.getCore().byId("MOFecEjecTrab").setName(fecEjecTrab);
            }
            
            //Fecha de Ingreso
            if(oModelJsonCabecera.getProperty("/FechaIngreso") != "" && oModelJsonCabecera.getProperty("/FechaIngreso") != null){ 
              var fecIngreso = oController.doConvFecha(oModelJsonCabecera.getProperty("/FechaIngreso"));
               sap.ui.getCore().byId("MOFechaIngreso").setValue(fecIngreso);
               sap.ui.getCore().byId("MOFechaIngreso").setName(fecIngreso);
            } 
            
        //Dialogo - centralizado compartido
        //sap.ui.getCore().byId("MOTabCentrDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
  
        // DATOS PRINCIPALES
        // Formato - Tarifa Aplicada
        if(oModelJsonCabecera.getProperty("/TarifAplic") != ""){ sap.ui.getCore().byId("MOTarifAplic").setValue(oModelJsonCabecera.getProperty("/TarifAplic") + " | " + oModelJsonCabecera.getProperty("/TarifAplicx")); } 
        // Formato - Tarifa Verificada
        sap.ui.getCore().byId("MOTarifVerif").setName(oModelJsonCabecera.getProperty("/TarifVerif"));
        if(oModelJsonCabecera.getProperty("/TarifVerif") != ""){ sap.ui.getCore().byId("MOTarifVerif").setValue(oModelJsonCabecera.getProperty("/TarifVerif") + " | " + oModelJsonCabecera.getProperty("/TarifVerifx")); }
  
        // Formato - Rama Economica
  //      sap.ui.getCore().byId("MORamaEcon").setName(oModelJsonCabecera.getProperty("/Rama"));
  //      if(oModelJsonCabecera.getProperty("/Rama") != ""){ sap.ui.getCore().byId("MORamaEcon").setValue(oModelJsonCabecera.getProperty("/Rama")); }
  
        // Formato - Puesto de trabajo
        sap.ui.getCore().byId("MOArtxt").setName(oModelJsonCabecera.getProperty("/Arbpl"));
        if(oModelJsonCabecera.getProperty("/Arbpl") != ""){ sap.ui.getCore().byId("MOArtxt").setValue(oModelJsonCabecera.getProperty("/Arbpl") + " | " + oModelJsonCabecera.getProperty("/Vaplztxt")); }
        //Formato - Referencia
        sap.ui.getCore().byId("MOReferencia").setValue(oModelJsonCabecera.getProperty("/Referencia"));
        //Formato - Casillero tablero
        sap.ui.getCore().byId("MOCasTab").setValue(oModelJsonCabecera.getProperty("/CasTab"));
        //Formato - Sector
        sap.ui.getCore().byId("MOSector").setValue(oModelJsonCabecera.getProperty("/Sector"));
        //Formato - Canton
        sap.ui.getCore().byId("MOCanton").setValue(oModelJsonCabecera.getProperty("/Canton"));
        //Formato - Provincia
        sap.ui.getCore().byId("MOProvincia").setValue(oModelJsonCabecera.getProperty("/Provincia"));
        //Ingresado Por
        sap.ui.getCore().byId("MOIngresadoPor").setValue(user.usuario.toUpperCase());
  
        //**
        // Formato - Medidor centralizado
        //if(oModelJsonCabecera.getProperty("/TabCentr") != ""){ sap.ui.getCore().byId("MOTabCentr").setValue(oModelJsonCabecera.getProperty("/TabCentr") + " | " + oModelJsonCabecera.getProperty("/TabCentralx")); }
        //**
        // Formato - C�digo Grupo
        sap.ui.getCore().byId("MOQktextgr").setName(oModelJsonCabecera.getProperty("/Qmgrp"));
        if(oModelJsonCabecera.getProperty("/Qmgrp") != ""){ sap.ui.getCore().byId("MOQktextgr").setValue(oModelJsonCabecera.getProperty("/Qmgrp") + " | " + oModelJsonCabecera.getProperty("/Qktextgr")); }
        // Formato - C�digo Cierre
        sap.ui.getCore().byId("MOKurztext").setName(oModelJsonCabecera.getProperty("/Qmcod"));
        if(oModelJsonCabecera.getProperty("/Qmcod") != ""){ sap.ui.getCore().byId("MOKurztext").setValue(oModelJsonCabecera.getProperty("/Qmcod") + " | " + oModelJsonCabecera.getProperty("/Kurztext")); }
  
        sap.ui.getCore().byId("MOObservaciones").setValue(oModelJsonCabecera.getProperty("/Observaciones"));
        // Dialogo - Tarifa Verificada
        sap.ui.getCore().byId("TariVerifDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        // Dialogo - Rama Economica
  //      sap.ui.getCore().byId("RamaEconDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
  
        // Dialogo - C�digo de grupo
        sap.ui.getCore().byId("QmgrpDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        // Dialogo - C�digo de cierre
        sap.ui.getCore().byId("QmcodDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        //Punto de Red
        sap.ui.getCore().byId("MOGridName2Dia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        sap.ui.getCore().byId("MOGridName2").setName(oModelJsonCabecera.getProperty("/GridName"));
        if(oModelJsonCabecera.getProperty("/GridName") != ""){ sap.ui.getCore().byId("MOGridName2").setValue(oModelJsonCabecera.getProperty("/GridName") + " | " + oModelJsonCabecera.getProperty("/GridId")); }
        //Nivel de Red
        sap.ui.getCore().byId("MOGridLevelDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        sap.ui.getCore().byId("MOGridLevel").setName(oModelJsonCabecera.getProperty("/GridLevel"));
        if(oModelJsonCabecera.getProperty("/GridLevel") != ""){ sap.ui.getCore().byId("MOGridLevel").setValue(oModelJsonCabecera.getProperty("/GridLevel"));}// + " | " + oModelJsonCabecera.getProperty("/Kurztext")); }
        //Provincia cabecera
        sap.ui.getCore().byId("MOProvincia").setName(oModelJsonCabecera.getProperty("/Provincia"));
        if(oModelJsonCabecera.getProperty("/Provincia") != ""){ sap.ui.getCore().byId("MOProvincia").setValue(oModelJsonCabecera.getProperty("/Provincia") + " | " + oModelJsonCabecera.getProperty("/Provinciax")); }
  
        // Dialogo - Tipo de Material
        sap.ui.getCore().byId("MOInTipMRDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
  
        // DATOS DE CONEXION
        if(oModelJsonCabecera.getProperty("/CargaNormVer") != ""){
          sap.ui.getCore().byId("MOCargaNormVer").setValue(oModelJsonCabecera.getProperty("/CargaNormVer"));
        }
        if(oModelJsonCabecera.getProperty("/CargaFlucVer") != ""){
          sap.ui.getCore().byId("MOCargaFlucVer").setValue(oModelJsonCabecera.getProperty("/CargaFlucVer"));
        }
  
        // DIRECCION DE ORDEN
        // Formato - Provincia
        sap.ui.getCore().byId("MOPaBezei").setName(oModelJsonCabecera.getProperty("/PaRegion"));
        sap.ui.getCore().byId("MOPaBezei").setValue(oModelJsonCabecera.getProperty("/PaBezei"));
        // Formato - Canton
        sap.ui.getCore().byId("MOPaCity1").setName(oModelJsonCabecera.getProperty("/PaCityCode"));
        sap.ui.getCore().byId("MOPaCity1").setValue(oModelJsonCabecera.getProperty("/PaCity1"));
        // Formato - Parroquia
        sap.ui.getCore().byId("MOPaCity2").setName(oModelJsonCabecera.getProperty("/PaCitypCode"));
        sap.ui.getCore().byId("MOPaCity2").setValue(oModelJsonCabecera.getProperty("/PaCity2"));
        // Formato - Calle
        sap.ui.getCore().byId("MOPaStreet").setName(oModelJsonCabecera.getProperty("/PaStrtCode"));
        sap.ui.getCore().byId("MOPaStreet").setValue(oModelJsonCabecera.getProperty("/PaStreet"));
        // Dialogo - Provincia
        sap.ui.getCore().byId("PaBezeiDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        // Dialogo - Canton
        sap.ui.getCore().byId("PaCity1Dia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        // Dialogo - Parroquia
        sap.ui.getCore().byId("PaCity2Dia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        // Dialogo - Calle
        sap.ui.getCore().byId("PaStreetDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
  
        // ACOMETIDA - TABLERO
        // Formato - Longitud de acometida
        if(oModelJsonCabecera.getProperty("/LongAcom") != ""){
          sap.ui.getCore().byId("MOLongAcom").setValue(oModelJsonCabecera.getProperty("/LongAcom"));
        }
        if(oModelJsonCabecera.getProperty("/LongFachada") != ""){
          sap.ui.getCore().byId("MOLongFachada").setValue(oModelJsonCabecera.getProperty("/LongFachada"));
        }
        if(oModelJsonCabecera.getProperty("/LongFachada") != ""){
          sap.ui.getCore().byId("MOLongFachada").setValue(oModelJsonCabecera.getProperty("/LongFachada"));
        }
        if(oModelJsonCabecera.getProperty("/DemAcom") != ""){
          sap.ui.getCore().byId("MODemAcom").setValue(oModelJsonCabecera.getProperty("/DemAcom"));
        }
        if(oModelJsonCabecera.getProperty("/FactDiver") != ""){
          sap.ui.getCore().byId("MOFactDiver").setValue(oModelJsonCabecera.getProperty("/FactDiver"));
        }
        if(oModelJsonCabecera.getProperty("/LongAcomRet") != ""){
          sap.ui.getCore().byId("MOLongAcomRet").setValue(oModelJsonCabecera.getProperty("/LongAcomRet"));
        }
        if(oModelJsonCabecera.getProperty("/LongAcomRet") != ""){
          sap.ui.getCore().byId("MOLongAcomRet").setValue(oModelJsonCabecera.getProperty("/LongAcomRet"));
        }
  
        // Formato - Tipo de acometida
        if(oModelJsonCabecera.getProperty("/TipoAcom") != ""){ sap.ui.getCore().byId("MOTipoAcomx").setValue(oModelJsonCabecera.getProperty("/TipoAcom") + " | " + oModelJsonCabecera.getProperty("/TipoAcomx")); }
        sap.ui.getCore().byId("MOTipoAcomx").setName(oModelJsonCabecera.getProperty("/TipoAcom"));
        // Formato - Calibre de acometida
        if(oModelJsonCabecera.getProperty("/CalAcom") != ""){ sap.ui.getCore().byId("MOCalAcomx").setValue(oModelJsonCabecera.getProperty("/CalAcom") + " | " + oModelJsonCabecera.getProperty("/CalAcomx")); }
        sap.ui.getCore().byId("MOCalAcomx").setName(oModelJsonCabecera.getProperty("/CalAcom"));
        // Formato - Fases de acometida
        if(oModelJsonCabecera.getProperty("/FasesAcom") != ""){ sap.ui.getCore().byId("MOFasesAcomx").setValue(oModelJsonCabecera.getProperty("/FasesAcom") + " | " + oModelJsonCabecera.getProperty("/FasesAcomx")); }
        sap.ui.getCore().byId("MOFasesAcomx").setName(oModelJsonCabecera.getProperty("/FasesAcom"));
        // Formato - Material de acometida
        if(oModelJsonCabecera.getProperty("/MatAcom") != ""){ sap.ui.getCore().byId("MOMatAcomx").setValue(oModelJsonCabecera.getProperty("/MatAcom") + " | " + oModelJsonCabecera.getProperty("/MatAcomx")); }
        sap.ui.getCore().byId("MOMatAcomx").setName(oModelJsonCabecera.getProperty("/MatAcom"));
        // Formato - Calibre de acometida retirada
        if(oModelJsonCabecera.getProperty("/CalAcomRet") != ""){ sap.ui.getCore().byId("MOCalAcomRetx").setValue(oModelJsonCabecera.getProperty("/CalAcomRet") + " | " + oModelJsonCabecera.getProperty("/CalAcomRetx")); }
        sap.ui.getCore().byId("MOCalAcomRetx").setName(oModelJsonCabecera.getProperty("/CalAcomRet"));
        // Formato - Tipo de acometida retirada
        if(oModelJsonCabecera.getProperty("/TipoAcomRet") != ""){ sap.ui.getCore().byId("MOTipoAcomRetx").setValue(oModelJsonCabecera.getProperty("/TipoAcomRet") + " | " + oModelJsonCabecera.getProperty("/TipoAcomRetx")); }
        sap.ui.getCore().byId("MOTipoAcomRetx").setName(oModelJsonCabecera.getProperty("/TipoAcomRet"));
        // Formato - Clase de Red
        if(oModelJsonCabecera.getProperty("/ClaseRed") != ""){ sap.ui.getCore().byId("MOClaseRedx").setValue(oModelJsonCabecera.getProperty("/ClaseRed") + " | " + oModelJsonCabecera.getProperty("/ClaseRedx")); }
        sap.ui.getCore().byId("MOClaseRedx").setName(oModelJsonCabecera.getProperty("/ClaseRed"));
        // Formato - Tipo de Red
        if(oModelJsonCabecera.getProperty("/TipoRed") != ""){ sap.ui.getCore().byId("MOTipoRedx").setValue(oModelJsonCabecera.getProperty("/TipoRed") + " | " + oModelJsonCabecera.getProperty("/TipoRedx")); }
        sap.ui.getCore().byId("MOTipoRedx").setName(oModelJsonCabecera.getProperty("/TipoRed"));
        // Formato - N�mero de proyecto
        if(oModelJsonCabecera.getProperty("/NroProyecto") != ""){  sap.ui.getCore().byId("MONroProyectox").setValue(oModelJsonCabecera.getProperty("/NroProyecto")); }
        // Formato - Origen de Financiamiento
        if(oModelJsonCabecera.getProperty("/OrigFina") != ""){ sap.ui.getCore().byId("MOOrigFinax").setValue(oModelJsonCabecera.getProperty("/OrigFina") + " | " + oModelJsonCabecera.getProperty("/OrigFinax")); }
        sap.ui.getCore().byId("MOOrigFinax").setName(oModelJsonCabecera.getProperty("/OrigFina"));
        // Formato - Secuencia de Fases de acometida
        if(oModelJsonCabecera.getProperty("/SecFasesAcom") != ""){ sap.ui.getCore().byId("MOSecFasesAcomx").setValue(oModelJsonCabecera.getProperty("/SecFasesAcom") + " | " + oModelJsonCabecera.getProperty("/SecFasesAcomx")); }
        sap.ui.getCore().byId("MOSecFasesAcomx").setName(oModelJsonCabecera.getProperty("/SecFasesAcom"));
        // Formato - Ubicaci�n de tablero
        if(oModelJsonCabecera.getProperty("/UbicTab") != ""){ sap.ui.getCore().byId("MOUbicTabx").setValue(oModelJsonCabecera.getProperty("/UbicTab") + " | " + oModelJsonCabecera.getProperty("/UbicTabx")); }
        sap.ui.getCore().byId("MOUbicTabx").setName(oModelJsonCabecera.getProperty("/UbicTab"));
        if(oModelJsonCabecera.getProperty("/NroTab") != ""){ sap.ui.getCore().byId("MONroTab").setValue(oModelJsonCabecera.getProperty("/NroTab")); }
        // Formato - Constructor del tablero
        if(oModelJsonCabecera.getProperty("/ConstTab") != ""){ sap.ui.getCore().byId("MOConstTabx").setValue(oModelJsonCabecera.getProperty("/ConstTab") + " | " + oModelJsonCabecera.getProperty("/ConstTabx")); }
        sap.ui.getCore().byId("MOConstTabx").setName(oModelJsonCabecera.getProperty("/ConstTab"));
        // Formato - Protecci�n principal del tablero
        if(oModelJsonCabecera.getProperty("/ProtPpalTab") != ""){ sap.ui.getCore().byId("MOProtPpalTabx").setValue(oModelJsonCabecera.getProperty("/ProtPpalTab") + " | " + oModelJsonCabecera.getProperty("/ProtPpalTabx")); }
        sap.ui.getCore().byId("MOProtPpalTabx").setName(oModelJsonCabecera.getProperty("/ProtPpalTab"));
        // Formato - Tipo de Protecci�n principal del tablero
        if(oModelJsonCabecera.getProperty("/CargaProt") != ""){ sap.ui.getCore().byId("MOCargaProtx").setValue(oModelJsonCabecera.getProperty("/CargaProt") + " | " + oModelJsonCabecera.getProperty("/CargaProtx")); }
        sap.ui.getCore().byId("MOCargaProtx").setName(oModelJsonCabecera.getProperty("/CargaProt"));
        if(oModelJsonCabecera.getProperty("/ProtInd") != ""){ sap.ui.getCore().byId("MOProtInd").setValue(oModelJsonCabecera.getProperty("/ProtInd") + " | " + oModelJsonCabecera.getProperty("/ProtIndx")); }
        sap.ui.getCore().byId("MOProtInd").setName(oModelJsonCabecera.getProperty("/TipoProt"));
        // Formato - Tipo Protecci�n individual del tablero
        if(oModelJsonCabecera.getProperty("/TipoProt") != ""){ sap.ui.getCore().byId("MOTipoProtx").setValue(oModelJsonCabecera.getProperty("/TipoProt") + " | " + oModelJsonCabecera.getProperty("/TipoProtx")); }
        sap.ui.getCore().byId("MOTipoProtx").setName(oModelJsonCabecera.getProperty("/TipoProt"));
        // Formato - Fases de Medidor
        if(oModelJsonCabecera.getProperty("/FasesMed") != ""){ sap.ui.getCore().byId("MOFasesMedx").setValue(oModelJsonCabecera.getProperty("/FasesMed") + " | " + oModelJsonCabecera.getProperty("/FasesMedx")); }
        sap.ui.getCore().byId("MOFasesMedx").setName(oModelJsonCabecera.getProperty("/FasesMed"));
        // Formato - Secuencia Fases de Medidor
        if(oModelJsonCabecera.getProperty("/SecFases") != ""){ sap.ui.getCore().byId("MOSecFasesx").setValue(oModelJsonCabecera.getProperty("/SecFases") + " | " + oModelJsonCabecera.getProperty("/SecFasesx")); }
        sap.ui.getCore().byId("MOSecFasesx").setName(oModelJsonCabecera.getProperty("/SecFases"));
        // Dialogo - Caracteristicas
        sap.ui.getCore().byId("CaracteristicaDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        if(oModelJsonCabecera.getProperty("/NroTab") == "000000"){
          sap.ui.getCore().byId("MONroTab").setValue("");
        }
  
        // Formato - Acci�n sobre Medidor
        if(oModelJsonCabecera.getProperty("/AccionMedidor") != ""){ 
          sap.ui.getCore().byId("MOAccionMedidor").setValue(oModelJsonCabecera.getProperty("/AccionMedidor") + " | " + oModelJsonCabecera.getProperty("/AccionMedidorx")); 
        }
        sap.ui.getCore().byId("MOAccionMedidor").setName(oModelJsonCabecera.getProperty("/AccionMedidor"));
  
        // Formato - Ubicaci�n del Medidor
        if(oModelJsonCabecera.getProperty("/UbicMedidor") != ""){ sap.ui.getCore().byId("MOUbicMedidor").setValue(oModelJsonCabecera.getProperty("/UbicMedidor") + " | " + oModelJsonCabecera.getProperty("/UbicMedidorx")); }
        sap.ui.getCore().byId("MOUbicMedidor").setName(oModelJsonCabecera.getProperty("/UbicMedidor"));
        // Formato - Medidor Centralizado
        if(oModelJsonCabecera.getProperty("/TabCentral") != ""){ sap.ui.getCore().byId("MOTabCentral").setValue(oModelJsonCabecera.getProperty("/TabCentral") + " | " + oModelJsonCabecera.getProperty("/TabCentralx")); }
        sap.ui.getCore().byId("MOTabCentral").setName(oModelJsonCabecera.getProperty("/TabCentral"));
  
  
  
        // Dialogo - Accion sobre medidor
        sap.ui.getCore().byId("AccionMedDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        // Dialogo - Medidor Centralizado
        sap.ui.getCore().byId("TabCentralDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        // Dialogo - Equipos
        sap.ui.getCore().byId("EquipoDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        sap.ui.getCore().byId("EquipoDiaRet").setModel(sap.ui.getCore().getModel("oModelSAP"));
        // PEC
        // Formato - Tipo de Equipo (Cocci�n)
        if(oModelJsonCabecera.getProperty("/TipoEquipoCo") != ""){ sap.ui.getCore().byId("MOTipoEquipoCo").setValue(oModelJsonCabecera.getProperty("/TipoEquipoCo") + " | " + oModelJsonCabecera.getProperty("/TipoEquipoCox")); }
        sap.ui.getCore().byId("MOTipoEquipoCo").setName(oModelJsonCabecera.getProperty("/TipoEquipoCo"));
        // Formato - Marca (Cocci�n)
        if(oModelJsonCabecera.getProperty("/MarcaCo") != ""){ sap.ui.getCore().byId("MOMarcaCo").setValue(oModelJsonCabecera.getProperty("/MarcaCo") + " | " + oModelJsonCabecera.getProperty("/MarcaCox")); }
        sap.ui.getCore().byId("MOMarcaCo").setName(oModelJsonCabecera.getProperty("/MarcaCo"));
        // Formato - Modelo (Cocci�n)
        if(oModelJsonCabecera.getProperty("/ModeloCo") != ""){ sap.ui.getCore().byId("MOModeloCo").setValue(oModelJsonCabecera.getProperty("/ModeloCo") + " | " + oModelJsonCabecera.getProperty("/ModeloCox")); }
        sap.ui.getCore().byId("MOModeloCo").setName(oModelJsonCabecera.getProperty("/ModeloCo"));
        // Formato - Potencia (Cocci�n)
        sap.ui.getCore().byId("MOPotenciaCo").setValue(parseInt(oModelJsonCabecera.getProperty("/PotenciaCo")));
        // Formato - Tipo de Equipo (Calentamiento)
        if(oModelJsonCabecera.getProperty("/TipoEquipoCa") != ""){ sap.ui.getCore().byId("MOTipoEquipoCa").setValue(oModelJsonCabecera.getProperty("/TipoEquipoCa") + " | " + oModelJsonCabecera.getProperty("/TipoEquipoCax")); }
        sap.ui.getCore().byId("MOTipoEquipoCa").setName(oModelJsonCabecera.getProperty("/TipoEquipoCa"));
        // Formato - Marca (Calentamiento)
        if(oModelJsonCabecera.getProperty("/MarcaCa") != ""){ sap.ui.getCore().byId("MOMarcaCa").setValue(oModelJsonCabecera.getProperty("/MarcaCa") + " | " + oModelJsonCabecera.getProperty("/MarcaCax")); }
        sap.ui.getCore().byId("MOMarcaCa").setName(oModelJsonCabecera.getProperty("/MarcaCa"));
        // Formato - Modelo (Calentamiento)
        if(oModelJsonCabecera.getProperty("/ModeloCa") != ""){ sap.ui.getCore().byId("MOModeloCa").setValue(oModelJsonCabecera.getProperty("/ModeloCa") + " | " + oModelJsonCabecera.getProperty("/ModeloCax")); }
        sap.ui.getCore().byId("MOModeloCa").setName(oModelJsonCabecera.getProperty("/ModeloCa"));
        // Formato - Potencia (Calentamiento)
        sap.ui.getCore().byId("MOPotenciaCa").setValue(parseInt(oModelJsonCabecera.getProperty("/PotenciaCa")));
        // Formato - Tipo Conductor
        if(oModelJsonCabecera.getProperty("/TipoConductor") != ""){ sap.ui.getCore().byId("MOTipoConductor").setValue(oModelJsonCabecera.getProperty("/TipoConductor") + " | " + oModelJsonCabecera.getProperty("/TipoConductorx")); }
        sap.ui.getCore().byId("MOTipoConductor").setName(oModelJsonCabecera.getProperty("/TipoConductor"));
        // Formato - Toma de Corriente
        if(oModelJsonCabecera.getProperty("/Tomacoriente") != ""){ sap.ui.getCore().byId("MOTomaCorriente").setValue(oModelJsonCabecera.getProperty("/Tomacoriente") + " | " + oModelJsonCabecera.getProperty("/Tomacorientex")); }
        sap.ui.getCore().byId("MOTomaCorriente").setName(oModelJsonCabecera.getProperty("/Tomacoriente"));
        // Formato - Protecci�n
        if(oModelJsonCabecera.getProperty("/Proteccion") != ""){ sap.ui.getCore().byId("MOProteccion").setValue(oModelJsonCabecera.getProperty("/Proteccion") + " | " + oModelJsonCabecera.getProperty("/Proteccionx")); }
        sap.ui.getCore().byId("MOProteccion").setName(oModelJsonCabecera.getProperty("/Proteccion"));
        // Formato - Credito Meses Plazo
        if(oModelJsonCabecera.getProperty("/CredMesplazoCi") != ""){ sap.ui.getCore().byId("MOCredMesplazoCi").setValue(oModelJsonCabecera.getProperty("/CredMesplazoCi") + " | " + oModelJsonCabecera.getProperty("/CredMesplazoCix")); }
        sap.ui.getCore().byId("MOCredMesplazoCi").setName(oModelJsonCabecera.getProperty("/CredMesplazoCi"));
        // Formato - Estado Instalaci�n Interna
        if(oModelJsonCabecera.getProperty("/EstInstInt") != ""){ sap.ui.getCore().byId("MOEstInstInt").setValue(oModelJsonCabecera.getProperty("/EstInstInt") + " | " + oModelJsonCabecera.getProperty("/EstInstIntx")); }
        sap.ui.getCore().byId("MOEstInstInt").setName(oModelJsonCabecera.getProperty("/EstInstInt"));
        // Dialogo - Tipo de Equipo (Cocci�n)
        sap.ui.getCore().byId("TipoEquipoCoDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        // Dialogo - Marca (Cocci�n)
        sap.ui.getCore().byId("MarcaCoDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        // Dialogo - Modelo (Cocci�n)
        sap.ui.getCore().byId("ModeloCoDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        // Dialogo - Tipo de Equipo (Calentamiento)
        sap.ui.getCore().byId("TipoEquipoCaDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        // Dialogo - Marca (Calentamiento)
        sap.ui.getCore().byId("MarcaCaDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        // Dialogo - Modelo (Calentamiento)
        sap.ui.getCore().byId("ModeloCaDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        // Dialogo - Tipo Conductor
        sap.ui.getCore().byId("TipoConductorDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        // Dialogo - Toma de Corriente 
        sap.ui.getCore().byId("TomaCorrienteDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        // Dialogo - Proteccion
        sap.ui.getCore().byId("ProteccionDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        // Dialogo - Credito Meses Plazo
        sap.ui.getCore().byId("CredMesplazoCiDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        // Dialogo - Estado Instalaci�n Interna
        sap.ui.getCore().byId("EstInstIntDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
  
        //se asocia modelo de Medidor Anterior
        if(oModelJsonCabecera.getProperty("/MediAnt") != ""){
          sap.ui.getCore().byId("MOMediAnt").setValue(oModelJsonCabecera.getProperty("/MediAntx") );
          sap.ui.getCore().byId("MOMediAnt").setName(oModelJsonCabecera.getProperty("/MediAnt"));
        }
        //se asocia modelo de Medidor Posterior
        if(oModelJsonCabecera.getProperty("/MediPost") != ""){
          sap.ui.getCore().byId("MOMediPost").setValue(oModelJsonCabecera.getProperty("/MediPostx") );
          sap.ui.getCore().byId("MOMediPost").setName(oModelJsonCabecera.getProperty("/MediPost"));
        }
        //Equipos
        if(oModelJsonCabecera.getProperty("/NroEquipoE") != ""){
          sap.ui.getCore().byId("MONroEquipoE").setValue(oModelJsonCabecera.getProperty("/NroEquipoEx") );
          sap.ui.getCore().byId("MONroEquipoE").setName(oModelJsonCabecera.getProperty("/NroEquipoE"));
          //se llama al cierre de la ayuda de busqueda
          var dialogo = "EquipoDia";
          sap.ui.getCore().byId(dialogo).setTooltip("MONroEquipoE");
          sap.ui.getCore().byId("idOrdenMod").getController().handleCloseEquipo();
        }
        if(oModelJsonCabecera.getProperty("/NroEquipoI") != ""){
          sap.ui.getCore().byId("MONroEquipoI").setValue(oModelJsonCabecera.getProperty("/NroEquipoIx") );
          sap.ui.getCore().byId("MONroEquipoI").setName(oModelJsonCabecera.getProperty("/NroEquipoI"));
          //se llama al cierre de la ayuda de busqueda
          var dialogo = "EquipoDia";
          sap.ui.getCore().byId(dialogo).setTooltip("MONroEquipoI");
          sap.ui.getCore().byId("idOrdenMod").getController().handleCloseEquipo();
        }
        if(oModelJsonCabecera.getProperty("/NroEquipoR") != ""){
          sap.ui.getCore().byId("MONroEquipoR").setValue(oModelJsonCabecera.getProperty("/NroEquipoRx") );
          sap.ui.getCore().byId("MONroEquipoR").setName(oModelJsonCabecera.getProperty("/NroEquipoR"));
          //se llama al cierre de la ayuda de busqueda
          var dialogo = "EquipoDia";
          sap.ui.getCore().byId(dialogo).setTooltip("MONroEquipoR");
          sap.ui.getCore().byId("idOrdenMod").getController().handleCloseEquipo();
        }
        //Transformadores instalados
        if(oModelJsonCabecera.getProperty("/Tc1E") != ""){
          sap.ui.getCore().byId("MOTc1E").setValue(oModelJsonCabecera.getProperty("/Tc1E") );
          sap.ui.getCore().byId("MOTc1E").setName(oModelJsonCabecera.getProperty("/Tc1E"));
        }              
        if(oModelJsonCabecera.getProperty("/Tc2E") != ""){
          sap.ui.getCore().byId("MOTc2E").setValue(oModelJsonCabecera.getProperty("/Tc2E") );
          sap.ui.getCore().byId("MOTc2E").setName(oModelJsonCabecera.getProperty("/Tc2E"));
        }
        if(oModelJsonCabecera.getProperty("/Tc3E") != ""){
          sap.ui.getCore().byId("MOTc3E").setValue(oModelJsonCabecera.getProperty("/Tc3E") );
          sap.ui.getCore().byId("MOTc3E").setName(oModelJsonCabecera.getProperty("/Tc3E"));
        }
        if(oModelJsonCabecera.getProperty("/Tp1E") != ""){
          sap.ui.getCore().byId("MOTp1E").setValue(oModelJsonCabecera.getProperty("/Tp1E") );
          sap.ui.getCore().byId("MOTp1E").setName(oModelJsonCabecera.getProperty("/Tp1E"));
        }
        if(oModelJsonCabecera.getProperty("/Tp2E") != ""){
          sap.ui.getCore().byId("MOTp2E").setValue(oModelJsonCabecera.getProperty("/Tp2E") );
          sap.ui.getCore().byId("MOTp2E").setName(oModelJsonCabecera.getProperty("/Tp2E"));
        }
        if(oModelJsonCabecera.getProperty("/Tp3E") != ""){
          sap.ui.getCore().byId("MOTp3E").setValue(oModelJsonCabecera.getProperty("/Tp3E") );
          sap.ui.getCore().byId("MOTp3E").setName(oModelJsonCabecera.getProperty("/Tp3E"));
        }
        if(oModelJsonCabecera.getProperty("/TmixE") != ""){
          sap.ui.getCore().byId("MOTmixE").setValue(oModelJsonCabecera.getProperty("/TmixE") );
          sap.ui.getCore().byId("MOTmixE").setName(oModelJsonCabecera.getProperty("/TmixE"));
        }
  
        //Transformadores instalados
        if(oModelJsonCabecera.getProperty("/Tc1I") != ""){
          sap.ui.getCore().byId("MOTc1I").setValue(oModelJsonCabecera.getProperty("/Tc1Ix") );
          sap.ui.getCore().byId("MOTc1I").setName(oModelJsonCabecera.getProperty("/Tc1I"));
        }              
        if(oModelJsonCabecera.getProperty("/Tc2I") != ""){
          sap.ui.getCore().byId("MOTc2I").setValue(oModelJsonCabecera.getProperty("/Tc2Ix") );
          sap.ui.getCore().byId("MOTc2I").setName(oModelJsonCabecera.getProperty("/Tc2I"));
        }
        if(oModelJsonCabecera.getProperty("/Tc3I") != ""){
          sap.ui.getCore().byId("MOTc3I").setValue(oModelJsonCabecera.getProperty("/Tc3Ix") );
          sap.ui.getCore().byId("MOTc3I").setName(oModelJsonCabecera.getProperty("/Tc3I"));
        }
        if(oModelJsonCabecera.getProperty("/Tp1I") != ""){
          sap.ui.getCore().byId("MOTp1I").setValue(oModelJsonCabecera.getProperty("/Tp1Ix") );
          sap.ui.getCore().byId("MOTp1I").setName(oModelJsonCabecera.getProperty("/Tp1I"));
        }
        if(oModelJsonCabecera.getProperty("/Tp2I") != ""){
          sap.ui.getCore().byId("MOTp2I").setValue(oModelJsonCabecera.getProperty("/Tp2Ix") );
          sap.ui.getCore().byId("MOTp2I").setName(oModelJsonCabecera.getProperty("/Tp2I"));
        }
        if(oModelJsonCabecera.getProperty("/Tp3I") != ""){
          sap.ui.getCore().byId("MOTp3I").setValue(oModelJsonCabecera.getProperty("/Tp3Ix") );
          sap.ui.getCore().byId("MOTp3I").setName(oModelJsonCabecera.getProperty("/Tp3I"));
        }
        if(oModelJsonCabecera.getProperty("/TmixI") != ""){
          sap.ui.getCore().byId("MOTmixI").setValue(oModelJsonCabecera.getProperty("/TmixIx") );
          sap.ui.getCore().byId("MOTmixI").setName(oModelJsonCabecera.getProperty("/TmixI"));
        }
        //Transformadores retirados
        if(oModelJsonCabecera.getProperty("/Tc1R") != ""){
          alert();
          sap.ui.getCore().byId("MOTc1R").setValue(oModelJsonCabecera.getProperty("/Tc1Rx") );
          sap.ui.getCore().byId("MOTc1R").setName(oModelJsonCabecera.getProperty("/Tc1R"));
        }
        if(oModelJsonCabecera.getProperty("/Tc2R") != ""){
          sap.ui.getCore().byId("MOTc2R").setValue(oModelJsonCabecera.getProperty("/Tc2Rx") );
          sap.ui.getCore().byId("MOTc2R").setName(oModelJsonCabecera.getProperty("/Tc2R"));
        }
        if(oModelJsonCabecera.getProperty("/Tc3R") != ""){
          sap.ui.getCore().byId("MOTc3R").setValue(oModelJsonCabecera.getProperty("/Tc3Rx") );
          sap.ui.getCore().byId("MOTc3R").setName(oModelJsonCabecera.getProperty("/Tc3R"));
        }
        if(oModelJsonCabecera.getProperty("/Tp1R") != ""){
          sap.ui.getCore().byId("MOTp1R").setValue(oModelJsonCabecera.getProperty("/Tp1Rx") );
          sap.ui.getCore().byId("MOTp1R").setName(oModelJsonCabecera.getProperty("/Tp1R"));
        }
        if(oModelJsonCabecera.getProperty("/Tp2R") != ""){
          sap.ui.getCore().byId("MOTp2R").setValue(oModelJsonCabecera.getProperty("/Tp2Rx") );
          sap.ui.getCore().byId("MOTp2R").setName(oModelJsonCabecera.getProperty("/Tp2R"));
        }
        if(oModelJsonCabecera.getProperty("/Tp3R") != ""){
          sap.ui.getCore().byId("MOTp3R").setValue(oModelJsonCabecera.getProperty("/Tp3Rx") );
          sap.ui.getCore().byId("MOTp3R").setName(oModelJsonCabecera.getProperty("/Tp3R"));
        }
        if(oModelJsonCabecera.getProperty("/TmixR") != ""){
          sap.ui.getCore().byId("MOTmixR").setValue(oModelJsonCabecera.getProperty("/TmixRx") );
          sap.ui.getCore().byId("MOTmixR").setName(oModelJsonCabecera.getProperty("/TmixR"));
        }
  
  
        //CNR
        // Dialogo - M�todo
        sap.ui.getCore().byId("MOMetodoDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        // Dialogo - M�todo obtenci�n de la demanda
        sap.ui.getCore().byId("MOMeobdeDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
        // Dialogo - Censo Total o Adicionar Valor
        sap.ui.getCore().byId("MOCetodeDia").setModel(sap.ui.getCore().getModel("oModelSAP"));
  
        //M�todo
        var cnrMetodo = oModelJsonCabecera.getProperty("/Metodo");
        if(oModelJsonCabecera.getProperty("/Metodo") != ""){ 
          sap.ui.getCore().byId("MOMetodo").setValue(oModelJsonCabecera.getProperty("/Metodo") + " | " + oModelJsonCabecera.getProperty("/Metodotxt"));
          sap.ui.getCore().byId("MOMetodo").setName(oModelJsonCabecera.getProperty("/Metodo"));
          if(oModelJsonCabecera.getProperty("/Metodo") == "03"){          //censo
            //Demanda
            if(oModelJsonCabecera.getProperty("/DemandaKw") != ""){ 
              sap.ui.getCore().byId("MODemandaKw").setValue(oModelJsonCabecera.getProperty("/DemandaKw"));
              sap.ui.getCore().byId("MODemandaKw").setName(oModelJsonCabecera.getProperty("/DemandaKw"));
            }
            //M�todo obtenci�n de demanda
            if(oModelJsonCabecera.getProperty("/Meobde") != ""){ 
              sap.ui.getCore().byId("MOMeobde").setValue(oModelJsonCabecera.getProperty("/Meobde") + " | " + oModelJsonCabecera.getProperty("/Meobdetxt"));
              sap.ui.getCore().byId("MOMeobde").setName(oModelJsonCabecera.getProperty("/Meobde"));
              if(oModelJsonCabecera.getProperty("/Meobde") == "02"){ //censo
                sap.ui.getCore().byId("MODemandaKw").setEditable(false);
                sap.ui.getCore().byId("MOCodipr").setEditable(false);
              } else{ //medici�n
                sap.ui.getCore().byId("MOTablaCe").setVisible(false);
              }
            }
            //Fecha Medici�n
            if(oModelJsonCabecera.getProperty("/FechaMedicion") != "" && oModelJsonCabecera.getProperty("/FechaMedicion") != null){ 
              var fecMedStr = oController.doConvFecha(oModelJsonCabecera.getProperty("/FechaMedicion"));
              sap.ui.getCore().byId("MOFechaMedicion").setValue(fecMedStr);
              sap.ui.getCore().byId("MOFechaMedicion").setName(fecMedStr);
            }
            //Hora Medici�n
            if(oModelJsonCabecera.getProperty("/HoraMedicion") != ""){ 
              sap.ui.getCore().byId("MOHoraMedicion").setValue(oModelJsonCabecera.getProperty("/HoraMedicion"));
              sap.ui.getCore().byId("MOHoraMedicion").setName(oModelJsonCabecera.getProperty("/HoraMedicion"));
            }
            //Consumo promedio diario
            if(oModelJsonCabecera.getProperty("/Codipr") != ""){ 
              sap.ui.getCore().byId("MOCodipr").setValue(oModelJsonCabecera.getProperty("/Codipr"));
              sap.ui.getCore().byId("MOCodipr").setName(oModelJsonCabecera.getProperty("/Codipr"));
            }
            //Censo Total o Adicionar Valor:
            if(oModelJsonCabecera.getProperty("/Cetode") != ""){ 
              sap.ui.getCore().byId("MOCetode").setValue(oModelJsonCabecera.getProperty("/Cetode")+ " | " + oModelJsonCabecera.getProperty("/Cetodetxt"));
              sap.ui.getCore().byId("MOCetode").setName(oModelJsonCabecera.getProperty("/Cetode"));
            }
          }
          if(oModelJsonCabecera.getProperty("/Metodo") == "04"){          //porcentaje
            //Energ�a activa
            if(oModelJsonCabecera.getProperty("/PorcAct") != "0.00"){ 
              sap.ui.getCore().byId("MOPorcAct").setValue(oModelJsonCabecera.getProperty("/PorcAct"));
              sap.ui.getCore().byId("MOPorcAct").setName(oModelJsonCabecera.getProperty("/PorcAct"));
            }else{
              sap.ui.getCore().byId("MOLblPorcAct").setVisible(false);
              sap.ui.getCore().byId("MOPorcAct").setVisible(false);
            }
            //Energ�a en Demanda
            if(oModelJsonCabecera.getProperty("/PorcDem") != "0.00"){ 
              sap.ui.getCore().byId("MOPorcDem").setValue(oModelJsonCabecera.getProperty("/PorcDem"));
              sap.ui.getCore().byId("MOPorcDem").setName(oModelJsonCabecera.getProperty("/PorcDem"));
            }else{
              sap.ui.getCore().byId("MOLblPorcDem").setVisible(false);
              sap.ui.getCore().byId("MOPorcDem").setVisible(false);
            }
            //Energ�a Reactiva
            if(oModelJsonCabecera.getProperty("/PorcRea") != "0.00"){ 
              sap.ui.getCore().byId("MOPorcRea").setValue(oModelJsonCabecera.getProperty("/PorcRea"));
              sap.ui.getCore().byId("MOPorcRea").setName(oModelJsonCabecera.getProperty("/PorcRea"));
            }else{
              sap.ui.getCore().byId("MOLblPorcRea").setVisible(false);
              sap.ui.getCore().byId("MOPorcRea").setVisible(false);
            }
          }
        }
  
        if(oModelJsonCabecera.getProperty("/Agencia") != ""){ sap.ui.getCore().byId("MOAgencia").setName(oModelJsonCabecera.getProperty("/Agencia"));}
  
        var claseAct = oModelJsonCabecera.getProperty("/Ilart");
  
        sap.ui.getCore().byId("idOrdenMod").getController().doValidaciones(orden,clase,claseAct,cnrMetodo);
  
        //se valida si orden ya esta con cierre t�cnico
        if(/CTEC/.test(oModelJsonCabecera.getProperty("/sysStatus"))){
          // se deshabilitan todos los campos de entrada 
          sap.ui.getCore().byId("MOFormDatPrin").setEditable(false);
          sap.ui.getCore().byId("MOFormDatPrin").setEditable(false);
          sap.ui.getCore().byId("MOTarifVerif").setEditable(false);
  //        sap.ui.getCore().byId("MORamaEcon").setEditable(false);
          sap.ui.getCore().byId("MOQktextgr").setEditable(false);
          sap.ui.getCore().byId("MOKurztext").setEditable(false);
          sap.ui.getCore().byId("MOObservaciones").setEditable(false);
        }
  
  
        sap.ui.getCore().byId("MOTablaMr").setModel(oModelJsonMatRet);
        sap.ui.getCore().byId("MOTablaMr").bindRows("/");
  
        sap.ui.getCore().byId("MOTablaDe").setModel(oModelJsonDanEqu);
        sap.ui.getCore().byId("MOTablaDe").bindRows("/");
  
        sap.ui.getCore().byId("MOTablaCe").setModel(oModelJsonCenso);
        sap.ui.getCore().byId("MOTablaCe").bindRows("/");
  
        sap.ui.getCore().byId("MOTablaCe").onAfterRendering = function() {
  
  
          if (sap.ui.table.Table.prototype.onAfterRendering) {
            sap.ui.table.Table.prototype.onAfterRendering.apply(this, arguments);
          }
  
          //Se obtienen el objeto table
          var oTable = sap.ui.getCore().byId("MOTablaCe");
          //se obtienen las filas
          var rows = this.getRows();
  
          //se recorren las filas
          for (var i = 0; i < rows.length; i++) {
  
            var idCdp = "MOCnrCdp-col4-row" + i;
            var idCan = "MOCnrCant-col6-row" + i;
  
            //se accede al contexto del indice
            var oContext = oTable.getContextByIndex(i);
  
            var codigo  = parseFloat(oContext.getObject().ZzcodCc);
            if (codigo == "095"){
              sap.ui.getCore().byId(idCdp).setEditable(true);
              sap.ui.getCore().byId(idCan).setEditable(false);
            }else{
              sap.ui.getCore().byId(idCdp).setEditable(false);
              sap.ui.getCore().byId(idCan).setEditable(true);
            }
          }
        };
  
        sap.ui.getCore().byId("MOTablaSe").setModel(oModelJsonSellos);
        sap.ui.getCore().byId("MOTablaSe").bindRows("/");
  
        sap.ui.getCore().byId("MOTablaCo").setModel(oModelJsonCompo);
        sap.ui.getCore().byId("MOTablaCo").bindRows("/");
  
        sap.ui.getCore().byId("MOTablaOp").setModel(oModelJsonOpera);
        sap.ui.getCore().byId("MOTablaOp").bindRows("/");
  
        sap.ui.getCore().byId("MOTablaServ").setModel(oModelJsonServi);
        sap.ui.getCore().byId("MOTablaServ").bindRows("/");
  
  
        sap.ui.getCore().setModel(oModelJsonCabecera,"oModelJsonCabecera");
        sap.ui.getCore().setModel(oModelJsonMatRet,"oModelJsonMatRet");
        sap.ui.getCore().setModel(oModelJsonDanEqu,"oModelJsonDanEqu");
        sap.ui.getCore().setModel(oModelJsonCenso,"oModelJsonCenso");
        sap.ui.getCore().setModel(oModelJsonSellos,"oModelJsonSellos");
        sap.ui.getCore().setModel(oModelJsonCompo,"oModelJsonCompo");
        sap.ui.getCore().setModel(oModelJsonOpera,"oModelJsonOpera");
        sap.ui.getCore().setModel(oModelJsonServi,"oModelJsonServi");
      }
  
      var llamada =   "orderSet?$filter=Aufnr eq '" + orden +
                "' and Clase eq '" + clase + 
                "' and Usuario eq '" + user.usuario + 
                "' and Password eq '" + user.pass + "'&$expand=NavMatRet,NavDanEqu,NavCenso,NavSellos,NavCompo,NavOpera,NavServi";
  
      sap.ui.getCore().getModel("oModelSAP").read(llamada, null, null, false, lecturaCorrecta, lecturaIncorrecta);
    },
  
    doConvFecha: function timeConverter(createdAt) {
        var date = new Date(createdAt);
        date.toUTCString()
        var year = date.getUTCFullYear();
        var month = date.getUTCMonth()+1;
        if(month.toString().length <= 1 ){
         month = "0" + month;
        }
        var day = date.getUTCDate();
        if(day.toString().length <= 1 ){
         day = "0" + day;
        }
        return day+"-"+month+"-"+year;
     },
  
  
    doMostrarMensaje: function(mensaje){
      sap.m.MessageToast.show(mensaje, {
        width: "300px",                   // default
        my: "center center",             // default
        at: "center center",             // default
        of: window,                      // default
        offset: "0 0",                   // default
        collision: "fit fit",            // default
        onClose: null,                   // default
        autoClose: false,                 // default
        animationTimingFunction: "ease", // default
        animationDuration: 1000,         // default
        closeOnBrowserNavigation: true   // default
      });
    },
  
    doValidaciones: function(orden,clase,claseAct,cnrMetodo){
      // se lee el usuario actual
      var user = MYSAP.SessionManager.getUser('user');
      if (user.clase == "1"){
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecOper");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecServ");
      }
      // se define la visualizacion en funcion de la clase
      switch (clase) {
      case "INST":
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDireccion");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecPec");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDanoequi");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecCnr");
        break;
      case "INSP":
        if( claseAct != '032' ) {
          sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDireccion");
        }
        if( claseAct == '032' ){
          sap.ui.getCore().byId("MOZzposte").setEditable(true);
          sap.ui.getCore().byId("MOZzposte").removeStyleClass("divInputOrden");
          sap.ui.getCore().byId("MOZzposte").addStyleClass("divInputOrdenShEna");
  
          sap.ui.getCore().byId("MOGridName2").setShowValueHelp(true);
          sap.ui.getCore().byId("MOGridName2").setValueHelpOnly(true);
          sap.ui.getCore().byId("MOGridName2").setEditable(true);
          sap.ui.getCore().byId("MOGridName2").removeStyleClass("divInputOrdenSh");
          sap.ui.getCore().byId("MOGridName2").addStyleClass("divInputOrdenShEna");
  
          sap.ui.getCore().byId("MOGridLevel").setShowValueHelp(true);
          sap.ui.getCore().byId("MOGridLevel").setValueHelpOnly(true);
          sap.ui.getCore().byId("MOGridLevel").setEditable(true);
          sap.ui.getCore().byId("MOGridLevel").removeStyleClass("divInputOrdenSh");
          sap.ui.getCore().byId("MOGridLevel").addStyleClass("divInputOrdenShEna");
  
          sap.ui.getCore().byId("MOZutmy").setEditable(true);
          sap.ui.getCore().byId("MOZutmx").setEditable(true);
  
  
        }
        sap.ui.getCore().byId("MOZzposte").addStyleClass("divInput");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormMedIns");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormTraIns");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormMedRet");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormTraRet");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecPec");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDanoequi");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecCnr");
        break;
      case "DC01":
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDireccion");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormMedIns");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormTraIns");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormMedRet");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormTraRet");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecPec");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDanoequi");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecCnr");
        break;
      case "RC01":
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDireccion");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormMedIns");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormTraIns");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormMedRet");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormTraRet");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecPec");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDanoequi");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecCnr");
        break;
      case "DCDE":
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDireccion");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormMedIns");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormTraIns");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecPec");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDanoequi");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecCnr");
        break;
      case "SOLI":
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDireccion");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecPec");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDanoequi");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecCnr");
        break;
      case "RECL":
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDireccion");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormMedIns");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormTraIns");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormMedRet");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormTraRet");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecPec");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecCnr");
        break;
      case "DENU":
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDireccion");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormMedIns");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormTraIns");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormMedRet");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormTraRet");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecPec");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDanoequi");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecCnr");
        break;
      case "EMER":
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDireccion");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecPec");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDanoequi");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecCnr");
        break;
      case "OPEC":
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDireccion");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDanoequi");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecCnr");
        break;
      case "PERC":
        if( cnrMetodo != '03' ) { //censo de carga
          sap.ui.getCore().byId("MOFormCnrCen").setVisible(false);
          sap.ui.getCore().byId("MOTablaCe").setVisible(false);
        }
        if( cnrMetodo != '04' ) { //Porcentaje de error
          sap.ui.getCore().byId("MOFormCnrPor").setVisible(false);
        }
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDireccion");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecPec");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDanoequi");
        break;
      case "NLEC":
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDireccion");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecPec");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDanoequi");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecCnr");
        break;
      case "INSE":
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDireccion");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormMedExi");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormTraExi");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormMedIns");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormTraIns");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormMedRet");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormTraRet");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecPec");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDanoequi");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecCnr");
        break;
      case "DTER":
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDireccion");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormMedIns");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormTraIns");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormMedRet");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormTraRet");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecPec");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecCnr");
        break;
      case "INTE":
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDireccion");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecPec");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDanoequi");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecCnr");
        break;
      default:
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDatPrin");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecRespon");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDcCi");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDireccion");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecAcom");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormMedExi");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormTraExi");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormMedIns");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormTraIns");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormMedRet");
        sap.ui.getCore().byId("MOSecEquipo").removeContent("MOFormTraRet");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecSellos");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecPec");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecDanoequi");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecMatret");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecCnr");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecCompo");
        sap.ui.getCore().byId("MOAcordion").removeSection("MOSecOper");
        break;
      }
  
    },
  
    doOkHora: function(oEvent){
  
      // se obtiene el id
      var id    = sap.ui.getCore().byId("MOHoraSel").getName();
      // se define el valor nuevo
      var valor   = sap.ui.getCore().byId("MOHoraSel").getSelectedKey() + ":" +
      sap.ui.getCore().byId("MOMinuSel").getSelectedKey() + ":" +
      sap.ui.getCore().byId("MOSeguSel").getSelectedKey();
      // se cambia al valor seleccionado
      sap.ui.getCore().byId(id).setValue(valor);
      // se cierra el dialogo
      sap.ui.getCore().byId("MODiaSelHora").close();
    },
  
    doCancHora: function(oEvent){
      // se obtiene el id y el valor original
      var id    = sap.ui.getCore().byId("MOHoraSel").getName();
      var valor   = sap.ui.getCore().byId("MOMinuSel").getName();
      // se define el valor original en el campo
      sap.ui.getCore().byId(id).setValue(valor);
      // se cierra el dialogo
      sap.ui.getCore().byId("MODiaSelHora").close();
  
    },
  
    doPresionaBoton: function(oEvent){
  
      if (!sap.ui.getCore().byId("MOContformularios").isOpen()){
  
        var user = MYSAP.SessionManager.getUser('user');
        if (user.usuario == null ) {
          return;
        } 
  
        var FilterOperator = sap.ui.model.FilterOperator;
        var filter  = new sap.ui.model.Filter("Usuario",FilterOperator.EQ, user.usuario);
        var filter2 = new sap.ui.model.Filter("Password",FilterOperator.EQ, user.pass);
        var filter3 = new sap.ui.model.Filter("Aufnr",FilterOperator.EQ, sap.ui.getCore().byId("MOAufnr").getValue());
        var filter4 = new sap.ui.model.Filter("Doctyp",FilterOperator.EQ, sap.ui.getCore().byId("MOAufart").getValue());
        var filter5 = new sap.ui.model.Filter("Workpaper",FilterOperator.EQ, '');
        sap.ui.getCore().byId("MOTablaOrdenForm").setModel(sap.ui.getCore().getModel("oModelPDF"));
        sap.ui.getCore().byId("MOTablaOrdenForm").bindRows("/orderfrmSet", null, null,[ filter, filter2, filter3, filter4, filter5 ])
        sap.ui.getCore().byId("MOContformularios").open();
      } 
    },
  
    doTraerPdf: function(oEvent){
      var oModelJson =  new sap.ui.model.json.JSONModel();
  
      // Lectura correcta
      var lecturaCorrecta = function(oData, oResponse){
        oModelJson.setData(oData);
  
        //se guarda fecha y hora de impresi�n
        var today = new Date();
        var dd    = today.getDate();
        var mm    = today.getMonth()+1;
        var yyyy  = today.getFullYear();
        if(dd < 10){dd='0'+dd}
        if(mm < 10){mm='0'+mm}
  
        var h   = today.getHours();
        var m   = today.getMinutes();
        var s   = today.getSeconds();
        if(m < 10){m='0'+m}
        if(s < 10){s='0'+s}
  
        var today = dd + '-' + mm + '-' + yyyy;
        sap.ui.getCore().byId("MOFecImpre").setValue(today);
        sap.ui.getCore().byId("MOHoraImpre").setValue(h + ':' + m + ':' + s );
  
        var url = oModelJson.getProperty("/Link");
        //url = "http://p47sapgtd01.cisnergia.gob.ec:8000" + url;
        //url = "https://p48sapgtq01.cisnergia.gob.ec:8200" + url;
        window.open(url,"_blank");
      };
  
      // Lectura incorrecta
      var lecturaIncorrecta = function(oError){
        var error = "Error:"+JSON.parse(oError.response.body).error.message.value;
        sap.m.MessageToast.show(error, {
          width: "300px",                  
          my: "center center",         
          at: "center center",          
          of: window,                  
          offset: "0 0",               
          collision: "fit fit",         
          onClose: null,             
          autoClose: false,             
          animationTimingFunction: "ease", 
          animationDuration: 100,    
          closeOnBrowserNavigation: true  
        });
        return;
      }
  
      var user = MYSAP.SessionManager.getUser('user');
      if (user.usuario == null ) {
        return;
      } 
  
      var oModel    = sap.ui.getCore().getModel("oModelPDF");
      var orden     = this.getBindingContext().getProperty('Aufnr');
      var workpaper   = this.getBindingContext().getProperty('Workpaper');
      var clase     = this.getBindingContext().getProperty('Doctyp');
      var llamada   = "/orderfrmSet(Aufnr='" + orden + 
      "',Password='" +  user.pass +
      "',Usuario='" +  user.usuario + 
      "',Doctyp='" + clase +
      "',Workpaper='" + workpaper + "')";
      oModel.read(llamada, null, null, false, lecturaCorrecta, lecturaIncorrecta);
    },
  
    doViewMaps: function(oEvent){
      var lon   = sap.ui.getCore().byId('MOZutmy').getValue();
      var lat   = sap.ui.getCore().byId('MOZutmx').getValue();
      var cuen  = sap.ui.getCore().byId('MOCuen').getValue();
      var url   = "http://gis-sigde.maps.arcgis.com/apps/webappviewer/index.html?id=6620b79457c84a01946c58efa50b0f4e&marker=";
      var llamada = url.concat(lat,";",lon,";32717;Detalle;;",cuen,"&level=17");
      window.open(llamada,"_blank");
    },
  
    doGuardar: function(oEvent){
  
      var error = {value: ""};
      //se obtiene registros de tablas de sello
      var tabSello = sap.ui.getCore().byId("MOTablaSe");
      //se verifica si se modifico
  
      if ( tabSello._aVisibleColumns.length > 0 ){
        //valida duplicidad de sellos
        sap.ui.getCore().byId("idOrdenMod").getController().doValidaSellos(sap.ui.getCore().byId("MOTablaSe"));
      }
  
      //se completa fecha y hora de ingreso
      var today = new Date();
      var dd    = today.getDate();
      var mm    = today.getMonth()+1;
      var yyyy  = today.getFullYear();
      if(dd < 10){dd='0'+dd}
      if(mm < 10){mm='0'+mm}
  
      var h   = today.getHours();
      var m   = today.getMinutes();
      var s   = today.getSeconds();
      if(m < 10){m='0'+m}
      if(s < 10){s='0'+s}
  
      var today = dd + '-' + mm + '-' + yyyy;
      sap.ui.getCore().byId("MOFechaIngreso").setValue(today);
      sap.ui.getCore().byId("MOHoraIngreso").setValue(h + ':' + m + ':' + s );
  
      // validaciones de fechas
      sap.ui.getCore().byId("idOrdenMod").getController().doValidaFechas(sap.ui.getCore().byId("MOFecEjecTrab").getValue(), 
          sap.ui.getCore().byId("MOHoraIniTrab").getValue(), 
          sap.ui.getCore().byId("MOHoraFinTrab").getValue(), 
          sap.ui.getCore().byId("MOFechaIngreso").getValue(), 
          sap.ui.getCore().byId("MOFecImpre").getValue(), 
          sap.ui.getCore().byId("MOHoraIngreso").getValue(),
          error);
      if (error.value == "X"){ 
        return;
      }
  
      //limpia longitudes de acometida cuando no ingresan valores
      if(sap.ui.getCore().byId("MOLongAcom").getValue() == ""){
        sap.ui.getCore().byId("MOLongAcom").setValue("0.00");
      }
      if(sap.ui.getCore().byId("MOLongFachada").getValue() == ""){
        sap.ui.getCore().byId("MOLongFachada").setValue("0.00");
      }
      if(sap.ui.getCore().byId("MODemAcom").getValue() == "" ){
        sap.ui.getCore().byId("MODemAcom").setValue("0.00");
      }
      if(sap.ui.getCore().byId("MOFactDiver").getValue() == ""){
        sap.ui.getCore().byId("MOFactDiver").setValue("0.000");
      }
      if(sap.ui.getCore().byId("MOLongAcomRet").getValue() == ""){
        sap.ui.getCore().byId("MOLongAcomRet").setValue("0.00");
      }
      if(sap.ui.getCore().byId("MODemAcom").getValue() == ""){
        sap.ui.getCore().byId("MODemAcom").setValue("0.00");
      }
  
      //valida campos numericos
      if(isNaN(sap.ui.getCore().byId("MONroTab").getValue())){
        mensaje = 'Ingresar s�lo n�meros en Nro. Tablero';
        sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
        return;
      }
  
      if(sap.ui.getCore().byId("MOAccionMedidor").getValue == '....' || sap.ui.getCore().byId("MOAccionMedidor").getValue == '... | '){
        sap.ui.getCore().byId("MOAccionMedidor").setName('');
        sap.ui.getCore().byId("MOAccionMedidor").setValue('');
      }
  
      if(sap.ui.getCore().byId("MOMediAnt").getValue() == ''){
        sap.ui.getCore().byId("MOMediAnt").setName('');
      }
  
      if(sap.ui.getCore().byId("MOMediPost").getValue() == ''){
        sap.ui.getCore().byId("MOMediPost").setName('');
      }
  
      if(sap.ui.getCore().byId("MOTabCentral").getValue() == ''){
        sap.ui.getCore().byId("MOTabCentral").setName('');
      }
  
      if (sap.ui.getCore().byId("MOLongAcom").getValue() != "0.00"){
        sap.ui.getCore().byId("idOrdenMod").getController().doValidaNros(sap.ui.getCore().byId("MOLongAcom"), error);
        if (error.value == "X"){ return;}
      }
      if (sap.ui.getCore().byId("MOLongFachada").getValue() != "0.00"){
        sap.ui.getCore().byId("idOrdenMod").getController().doValidaNros(sap.ui.getCore().byId("MOLongFachada"), error);
        if (error.value == "X"){ return;}
      }
      if (sap.ui.getCore().byId("MODemAcom").getValue() != "0.00"){
        sap.ui.getCore().byId("idOrdenMod").getController().doValidaNros(sap.ui.getCore().byId("MODemAcom"), error);
        if (error.value == "X"){ return;}
      }
      if (sap.ui.getCore().byId("MOFactDiver").getValue() != "0.000"){
        sap.ui.getCore().byId("idOrdenMod").getController().doValidaNros(sap.ui.getCore().byId("MOFactDiver"), error);
        if (error.value == "X"){ return;}
      }
      if (sap.ui.getCore().byId("MOLongAcomRet").getValue() != "0.00"){
        sap.ui.getCore().byId("idOrdenMod").getController().doValidaNros(sap.ui.getCore().byId("MOLongAcomRet"), error);
        if (error.value == "X"){ return;}
      }
      if (sap.ui.getCore().byId("MONroTab")){
        sap.ui.getCore().byId("idOrdenMod").getController().doValidaNros(sap.ui.getCore().byId("MONroTab"), error);
        if (error.value == "X"){ return;}
      }
  
  
      //var oModelJson =  new sap.ui.model.json.JSONModel();
  
      // se define la respuesta de modificacion correcta
      var modOrdenOk = function(oData,oResponse){
  
        //oModelJson.setData(oData);
        //alert(oModelJson.tolSOString);
  
        if (sap.ui.getCore().byId("idOrdenMod")) {
          sap.ui.getCore().byId("idOrdenMod").destroy();
        }
  
        var viewOrdenMod = new sap.ui.view({
          id:"idOrdenMod",  
          viewName:"ordenes.OrdenModif", 
          type:sap.ui.core.mvc.ViewType.JS 
        });
  
        var errShell   = sap.ui.getCore().getModel("oModelModOrd").getProperty("/errShell");
        var errIdBack    = sap.ui.getCore().getModel("oModelModOrd").getProperty("/errIdBack");
        var errNavVis01  = sap.ui.getCore().getModel("oModelModOrd").getProperty("/errNavVis01");
        var errNavVis02  = sap.ui.getCore().getModel("oModelModOrd").getProperty("/errNavVis02");
  
        sap.ui.getCore().byId(errShell).setContent(viewOrdenMod);
        sap.ui.getCore().byId(errNavVis01).setVisible(true);
        sap.ui.getCore().byId(errNavVis02).setVisible(true);
        sap.ui.getCore().byId(errShell).setSelectedWorksetItem(sap.ui.getCore().byId(errNavVis02));
  
        //se obtienen mensajes relacionados al guardado de la orden
        var oModelJson =  new sap.ui.model.json.JSONModel();
  
        // Lectura correcta
        var lecturaCorrecta = function(oData, oResponse){
          oModelJson.setData(oData);
          var type    = oModelJson.getProperty("/Ztype");
          if(type == "E"){
            var mensaje = oModelJson.getProperty("/Zmessage");
            sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          }else{
            alert("Datos Guardados");
          }
  
        };
  
        // Lectura incorrecta
        var lecturaIncorrecta = function(oError){
          var error = "Error:"+JSON.parse(oError.response.body).error.message.value;
          sap.m.MessageToast.show(error, {
            width: "300px",                  
            my: "center center",         
            at: "center center",          
            of: window,                  
            offset: "0 0",               
            collision: "fit fit",         
            onClose: null,             
            autoClose: false,             
            animationTimingFunction: "ease", 
            animationDuration: 100,    
            closeOnBrowserNavigation: true  
          });
          return;
        }
  
        var user = MYSAP.SessionManager.getUser('user');
        if (user.usuario == null ) {
          return;
        } 
  
        var orden     = sap.ui.getCore().getModel("oModelModOrd").getProperty("/orden");
        var llamada   = "messageSet(Zaufnr='"+
        orden+ 
        "',Zusuario='"+
        user.usuario+
        "')";
  
        sap.ui.getCore().getModel("oModelSAP").read(llamada, null, null, false, lecturaCorrecta, lecturaIncorrecta);  
  
        //alert("Datos Guardados");
      };
      // se define la respuesta de modificacion incorrecta
      var modOrdenError = function(oError){
        var error = "Error: "+JSON.parse(oError.response.body).error.message.value;
        sap.m.MessageToast.show(error, { 
          width: "300px",                  
          my: "center center",         
          at: "center center",          
          of: window,                  
          offset: "0 0",               
          collision: "fit fit",         
          onClose: null,             
          autoClose: false,             
          animationTimingFunction: "ease", 
          animationDuration: 100,    
          closeOnBrowserNavigation: true  
        }); 
      }; 
  
  
  
      var user = MYSAP.SessionManager.getUser('user');
      var fecha;
  
      var oEntry = {};
  
      // CLAVE
      oEntry.Aufnr      = sap.ui.getCore().byId("MOAufnr").getValue();
      oEntry.Usrcons      = user.usuario;
      oEntry.Pascons      = user.pass;
  
      // DATOS FIJOS
      // Estado de usuario C/num. Clasificaci�n
      oEntry.UsrstCcla    = sap.ui.getCore().byId("MOUsrStCclaTxt").getName();
      // Estado de Usr. Sin Num. Clasif
      oEntry.UsrstScla    = sap.ui.getCore().byId("MOUsrStSclaTxt").getName();
  


      // CABECERA
      //Tarifa Verificada
      oEntry.Tarverif     = sap.ui.getCore().byId("MOTarifVerif").getName();
      //oEntry.Tarverif     = sap.ui.getCore().byId("MORamaEcon").getName();
  
      // C�digo Grupo GF
      oEntry.Qmgrp      = sap.ui.getCore().byId("MOQktextgr").getName();  
      // C�digo Cierre GG
      oEntry.Qmcod      = sap.ui.getCore().byId("MOKurztext").getName();
      // Observaciones GH
      oEntry.Observaciones  = sap.ui.getCore().byId("MOObservaciones").getValue();
  



      // RESPONSABLES
      // Hora Inicio de Trabajo GJ
      oEntry.HoraIniTrab    = sap.ui.getCore().byId("MOHoraIniTrab").getValue();
      // Fecha Ejecuci�n Trabajo GI
      oEntry.FecEjecTrab    = sap.ui.getCore().byId("MOFecEjecTrab").getValue();
      // Hora fin de Trabajo GK
      oEntry.HoraFinTrab    = sap.ui.getCore().byId("MOHoraFinTrab").getValue();
      // Ingresado Por
      //oEntry.IngresadoPor   = sap.ui.getCore().byId("MOIngresadoPor").getValue();
  
      // DATOS DE CONEXI�N
      // Grado. Lon. Ubic. Geo. U
      oEntry.Zzlon      = sap.ui.getCore().byId("MOZutmy").getValue();
      // Grado. Lat. Ubic. Geo V
      oEntry.Zzlat      = sap.ui.getCore().byId("MOZutmx").getValue();
      // Poste GN
      oEntry.Zposte     = sap.ui.getCore().byId("MOZzposte").getValue();
      // Punto de Red GO
      oEntry.GridName     = sap.ui.getCore().byId("MOGridName2").getName();
      // Nivel de Red GP
      oEntry.GridLevel    = sap.ui.getCore().byId("MOGridLevel").getName();
  
      // CARGA INSTALADA
      // Carga Normal Verificada kW
      oEntry.CargaNormVer   = sap.ui.getCore().byId("MOCargaNormVer").getValue();
      // Carga Fluctuante Verificada kW
      oEntry.CargaFlucVer   = sap.ui.getCore().byId("MOCargaFlucVer").getValue();
  


      // DIRECCI�N DE ORDEN
      // Provincia
      oEntry.Region     = sap.ui.getCore().byId("MOPaBezei").getName();
      // Cant�n
      oEntry.City1      = sap.ui.getCore().byId("MOPaCity1").getName();
      // Parroqu�a
      oEntry.City2      = sap.ui.getCore().byId("MOPaCity2").getName();
      // Calle
      oEntry.Street     = sap.ui.getCore().byId("MOPaStreet").getName();
      // N�mero
      oEntry.HouseNum1    = sap.ui.getCore().byId("MOPaHouseNum1").getValue();
      // Nombre Intersecci�n
      oEntry.StrSuppl3    = sap.ui.getCore().byId("MOPaStrSuppl3").getValue();
      // Referencia Direcci�n
      oEntry.Location     = sap.ui.getCore().byId("MOPaLocation").getValue();
      // Nombre del Edificio
      oEntry.StrSuppl1    = sap.ui.getCore().byId("MOPaStrSuppl1").getValue();
      // C�digo de Edificio
      oEntry.Building     = sap.ui.getCore().byId("MOPaBuilding").getValue();
      // Nombre de la Torre o Bloque
      oEntry.StrSuppl2    = sap.ui.getCore().byId("MOPaStrSuppl2").getValue();
      // Piso
      oEntry.Floor      = sap.ui.getCore().byId("MOPaFloor").getValue();
      // Departamento
      oEntry.Roomnumber   = sap.ui.getCore().byId("MOPaRoomnumber").getValue();
      // Residencia Alternativa
      oEntry.HomeCity     = sap.ui.getCore().byId("MOPaHomeCity").getValue();
      // Complemento
      oEntry.HouseNum2    = sap.ui.getCore().byId("MOPaHouseNum2").getValue();
      // Comentarios
      oEntry.Remark     = sap.ui.getCore().byId("MOPaRemark").getValue();
  



      // ACOMETIDA
      // Tipo de Acometida
      oEntry.TipoAcom     = sap.ui.getCore().byId("MOTipoAcomx").getName();
      // Calibre de Acometida
      oEntry.CalAcom      = sap.ui.getCore().byId("MOCalAcomx").getName();
      // Longitud de Acometida
      oEntry.LongAcom     = sap.ui.getCore().byId("MOLongAcom").getValue();
      // Longitud Fachada
      oEntry.LongFachada    = sap.ui.getCore().byId("MOLongFachada").getValue();
      // Fases de Acometida
      oEntry.FasesAcom    = sap.ui.getCore().byId("MOFasesAcomx").getName();
      // Material de Acometida
      oEntry.MatAcom      = sap.ui.getCore().byId("MOMatAcomx").getName();
      // Demanda de Acometida
      oEntry.DemAcom      = sap.ui.getCore().byId("MODemAcom").getValue();
      // Factor de Diversificaci�n
      oEntry.FactDiver    = sap.ui.getCore().byId("MOFactDiver").getValue();
      // Calibre de Acometida Retirada
      oEntry.CalAcomRet   = sap.ui.getCore().byId("MOCalAcomRetx").getName();
      // Tipo de Acometida Retirada
      oEntry.TipoAcomRet    = sap.ui.getCore().byId("MOTipoAcomRetx").getName();
      // Longitud de Acometida Retirada
      oEntry.LongAcomRet    = sap.ui.getCore().byId("MOLongAcomRet").getValue();
      // Clase de Red
      oEntry.ClaseRed     = sap.ui.getCore().byId("MOClaseRedx").getName();
      // Tipo de Red
      oEntry.TipoRed      = sap.ui.getCore().byId("MOTipoRedx").getName();
      // N�mero de Proyecto
      oEntry.NroProyecto    = sap.ui.getCore().byId("MONroProyectox").getValue();
      // Origen de Financiamiento
      oEntry.OrigFina     = sap.ui.getCore().byId("MOOrigFinax").getName();
      // Secuencia de Fases Acometida
      oEntry.SecFasesAcom   = sap.ui.getCore().byId("MOSecFasesAcomx").getName();
  
      // TABLERO
      // Ubicaci�n de Tablero
      oEntry.UbicTab      = sap.ui.getCore().byId("MOUbicTabx").getName();
      // N�mero de Tablero
      oEntry.NroTab     = sap.ui.getCore().byId("MONroTab").getValue();
      // Denominaci�n del Tablero
      oEntry.DenTab     = sap.ui.getCore().byId("MODenTab").getValue();
      // Constructor del Tablero
      oEntry.ConstTab     = sap.ui.getCore().byId("MOConstTabx").getName();
      // Protecci�n Principal del Tablero
      oEntry.ProtPpalTab    = sap.ui.getCore().byId("MOProtPpalTabx").getName();
      // Tipo de Protecci�n de Tablero
      oEntry.CargaProt    = sap.ui.getCore().byId("MOCargaProtx").getName();
      // Casillero Tablero
      oEntry.CasTab     = sap.ui.getCore().byId("MOCasTabx").getValue();
      // Protecci�n Individual
      //oEntry.ProtInd      = sap.ui.getCore().byId("MOProtInd").getValue();
      oEntry.ProtInd      = sap.ui.getCore().byId("MOProtInd").getName();
      // Tipo de Protecci�n Individual
      oEntry.TipoProt     = sap.ui.getCore().byId("MOTipoProtx").getName();
      // Fases Medidor
      oEntry.FasesMed     = sap.ui.getCore().byId("MOFasesMedx").getName();
      // Secuencia Fases Medidor
      oEntry.SecFases     = sap.ui.getCore().byId("MOSecFasesx").getName();
  





      
      // EQUIPO
      // Acci�n sobre Medidor
      oEntry.AccionMedidor  = sap.ui.getCore().byId("MOAccionMedidor").getName();
      // Ubicaci�n del Medidor
      oEntry.UbicMedidor    = sap.ui.getCore().byId("MOUbicMedidor").getName();
      // Medidor Anterior
      oEntry.MediAnt      = sap.ui.getCore().byId("MOMediAnt").getName();
      //Medidor Posterior
      oEntry.MediPost     = sap.ui.getCore().byId("MOMediPost").getName();
      // P�rdida por transformaci�n 2%
      if( sap.ui.getCore().byId("MOPerdTrans").getSelected() == true ){
        oEntry.PerdTrans    = "X";
      }else{
        oEntry.PerdTrans    = "";
      }
      // Medidor Centralizado
      oEntry.TabCentral   = sap.ui.getCore().byId("MOTabCentral").getName();
  
      // EQUIPO - MEDIDOR EXISTENTE
      // N�mero de Equipo
      oEntry.NroEquipoE   = sap.ui.getCore().byId("MONroEquipoE").getName();
      // Lectura de Energ�a Activa kWh
      oEntry.LecEnerActE    = sap.ui.getCore().byId("MOLecEnerActE").getValue();
      // Lectura de Energ�a Activa kWh Tarifa A
      oEntry.LecEnerActTaraE  = sap.ui.getCore().byId("MOLecEnerActTaraE").getValue();
      // Lectura de Energ�a Activa kWh Tarifa B
      oEntry.LecEnerActTarbE  = sap.ui.getCore().byId("MOLecEnerActTarbE").getValue();
      // Lectura de Energ�a Activa kWh Tarifa C
      oEntry.LecEnerActTarcE  = sap.ui.getCore().byId("MOLecEnerActTarcE").getValue();
      // Lectura de Energ�a Activa kWh Tarifa D
      oEntry.LecEnerActTardE  = sap.ui.getCore().byId("MOLecEnerActTardE").getValue();
      // Demanda M�xima kW Tarifa A
      oEntry.DemMaxTaraE    = sap.ui.getCore().byId("MODemMaxTaraE").getValue();
      // Demanda M�xima kW Tarifa B
      oEntry.DemMaxTarbE    = sap.ui.getCore().byId("MODemMaxTarbE").getValue();
      // Demanda M�xima kW Tarifa C
      oEntry.DemMaxTarcE    = sap.ui.getCore().byId("MODemMaxTarcE").getValue();
      // Demanda M�xima kW Tarifa D
      oEntry.DemMaxTardE    = sap.ui.getCore().byId("MODemMaxTardE").getValue();
      // Lect. Energ�a Reactiva kVArh
      oEntry.LecEnerReaE    = sap.ui.getCore().byId("MOLecEnerReaE").getValue();
  
      // EQUIPO - MEDIDOR INSTALADO
      // N�mero de Equipo
      oEntry.NroEquipoI   = sap.ui.getCore().byId("MONroEquipoI").getName();
      // Lectura de Energ�a Activa kWh
      oEntry.LecEnerActI    = sap.ui.getCore().byId("MOLecEnerActI").getValue();
      // Lectura de Energ�a Activa kWh Tarifa A
      oEntry.LecEnerActTaraI  = sap.ui.getCore().byId("MOLecEnerActTaraI").getValue();
      // Lectura de Energ�a Activa kWh Tarifa B
      oEntry.LecEnerActTarbI  = sap.ui.getCore().byId("MOLecEnerActTarbI").getValue();
      // Lectura de Energ�a Activa kWh Tarifa C
      oEntry.LecEnerActTarcI  = sap.ui.getCore().byId("MOLecEnerActTarcI").getValue();
      // Lectura de Energ�a Activa kWh Tarifa D
      oEntry.LecEnerActTardI  = sap.ui.getCore().byId("MOLecEnerActTardI").getValue();
      // Demanda M�xima kW Tarifa A
      oEntry.DemMaxTaraI    = sap.ui.getCore().byId("MODemMaxTaraI").getValue();
      // Demanda M�xima kW Tarifa B
      oEntry.DemMaxTarbI    = sap.ui.getCore().byId("MODemMaxTarbI").getValue();
      // Demanda M�xima kW Tarifa C
      oEntry.DemMaxTarcI    = sap.ui.getCore().byId("MODemMaxTarcI").getValue();
      // Demanda M�xima kW Tarifa D
      oEntry.DemMaxTardI    = sap.ui.getCore().byId("MODemMaxTardI").getValue();
      // Lect. Energ�a Reactiva kVArh
      oEntry.LecEnerReaI    = sap.ui.getCore().byId("MOLecEnerReaI").getValue();
  
      // EQUIPO - MEDIDOR RETIRADO
      //N�mero de Equipo
      oEntry.NroEquipoR   = sap.ui.getCore().byId("MONroEquipoR").getName();
      // Lectura de Energ�a Activa kWh
      oEntry.LecEnerActR    = sap.ui.getCore().byId("MOLecEnerActR").getValue();
      // Lectura de Energ�a Activa kWh Tarifa A
      oEntry.LecEnerActTaraR  = sap.ui.getCore().byId("MOLecEnerActTaraR").getValue();
      // Lectura de Energ�a Activa kWh Tarifa B
      oEntry.LecEnerActTarbR  = sap.ui.getCore().byId("MOLecEnerActTarbR").getValue();
      // Lectura de Energ�a Activa kWh Tarifa C
      oEntry.LecEnerActTarcR  = sap.ui.getCore().byId("MOLecEnerActTarcR").getValue();
      // Lectura de Energ�a Activa kWh Tarifa D
      oEntry.LecEnerActTardR  = sap.ui.getCore().byId("MOLecEnerActTardR").getValue();
      // Demanda M�xima kW Tarifa A
      oEntry.DemMaxTaraR    = sap.ui.getCore().byId("MODemMaxTaraR").getValue();
      // Demanda M�xima kW Tarifa B
      oEntry.DemMaxTarbR    = sap.ui.getCore().byId("MODemMaxTarbR").getValue();
      // Demanda M�xima kW Tarifa C
      oEntry.DemMaxTarcR    = sap.ui.getCore().byId("MODemMaxTarcR").getValue();
      // Demanda M�xima kW Tarifa D
      oEntry.DemMaxTardR    = sap.ui.getCore().byId("MODemMaxTardR").getValue();
      // Lect. Energ�a Reactiva kVArh
      oEntry.LecEnerReaR    = sap.ui.getCore().byId("MOLecEnerReaR").getValue();
  
      // EQUIPO - TRANSFORMADOR DE MEDIDA EXISTENTE
      // TC1
      oEntry.Tc1E       = sap.ui.getCore().byId("MOTc1E").getName();
      // TC2
      oEntry.Tc2E       = sap.ui.getCore().byId("MOTc2E").getName();
      // TC3
      oEntry.Tc3E       = sap.ui.getCore().byId("MOTc3E").getName();
      // TP1
      oEntry.Tp1E       = sap.ui.getCore().byId("MOTp1E").getName();
      // TP2
      oEntry.Tp2E       = sap.ui.getCore().byId("MOTp2E").getName();
      // TP3
      oEntry.Tp3E       = sap.ui.getCore().byId("MOTp3E").getName();
      // TMIX
      oEntry.TmixE      = sap.ui.getCore().byId("MOTmixE").getName();
      // Cambio TC1
      if( sap.ui.getCore().byId("MOTc1flagE").getSelected() == true ){
        oEntry.Tc1flagE   = "X";
      }else{
        oEntry.Tc1flagE   = "";
      }
      // Cambio TC2
      if( sap.ui.getCore().byId("MOTc2flagE").getSelected() == true ){
        oEntry.Tc2flagE   = "X";
      }else{
        oEntry.Tc2flagE   = "";
      }
      // Cambio TC3
      if( sap.ui.getCore().byId("MOTc3flagE").getSelected() == true ){
        oEntry.Tc3flagE   = "X";
      }else{
        oEntry.Tc3flagE   = "";
      }
      // Cambio TP1
      if( sap.ui.getCore().byId("MOTp1flagE").getSelected() == true ){
        oEntry.Tp1flagE   = "X";
      }else{
        oEntry.Tp1flagE   = "";
      }
      // Cambio TP2
      if( sap.ui.getCore().byId("MOTp2flagE").getSelected() == true ){
        oEntry.Tp2flagE   = "X";
      }else{
        oEntry.Tp2flagE   = "";
      }
      // Cambio TP3
      if( sap.ui.getCore().byId("MOTp3flagE").getSelected() == true ){
        oEntry.Tp3flagE   = "X";
      }else{
        oEntry.Tp3flagE   = "";
      }
      // Cambio TMIX
      if( sap.ui.getCore().byId("MOTmixflagE").getSelected() == true ){
        oEntry.TmixflagE    = "X";
      }else{
        oEntry.TmixflagE    = "";
      }
  
      // EQUIPO - TRANSFORMADOR DE MEDIDA INSTALADOS
      // TC1
      oEntry.Tc1I       = sap.ui.getCore().byId("MOTc1I").getName();
      // TC2
      oEntry.Tc2I       = sap.ui.getCore().byId("MOTc2I").getName();
      // TC3
      oEntry.Tc3I       = sap.ui.getCore().byId("MOTc3I").getName();
      // TP1
      oEntry.Tp1I       = sap.ui.getCore().byId("MOTp1I").getName();
      // TP2
      oEntry.Tp2I       = sap.ui.getCore().byId("MOTp2I").getName();
      // TP3
      oEntry.Tp3I       = sap.ui.getCore().byId("MOTp3I").getName();
      // TMIX
      oEntry.TmixI      = sap.ui.getCore().byId("MOTmixI").getName();
  
      // EQUIPO - TRANSFORMADOR DE MEDIDA RETIRADOS
      // TC1
      oEntry.Tc1R       = sap.ui.getCore().byId("MOTc1R").getName();
      // TC2
      oEntry.Tc2R       = sap.ui.getCore().byId("MOTc2R").getName();
      // TC3
      oEntry.Tc3R       = sap.ui.getCore().byId("MOTc3R").getName();
      // TP1
      oEntry.Tp1R       = sap.ui.getCore().byId("MOTp1R").getName();
      // TP2
      oEntry.Tp2R       = sap.ui.getCore().byId("MOTp2R").getName();
      // TP3
      oEntry.Tp3R       = sap.ui.getCore().byId("MOTp3R").getName();
      // TMIX
      oEntry.TmixR      = sap.ui.getCore().byId("MOTmixR").getName();
  
      // PEC - COCCI�N
      // Tipo de Equipo
      oEntry.TipoEquipoCo   = sap.ui.getCore().byId("MOTipoEquipoCo").getName();
      // Marca
      oEntry.MarcaCo      = sap.ui.getCore().byId("MOMarcaCo").getName();
      // Modelo
      oEntry.ModeloCo     = sap.ui.getCore().byId("MOModeloCo").getName();
      // Potencia
      oEntry.PotenciaCo   = sap.ui.getCore().byId("MOPotenciaCo").getValue();
      // N�mero de Serie
      oEntry.NroSerieCo   = sap.ui.getCore().byId("MONroSerieCo").getValue();
  
      // PEC - CALENTAMIENTO DE AGUA
      // Tipo de Equipo
      oEntry.TipoEquipoCa   = sap.ui.getCore().byId("MOTipoEquipoCa").getName();
      // Marca
      oEntry.MarcaCa      = sap.ui.getCore().byId("MOMarcaCa").getName();
      // Modelo
      oEntry.ModeloCa     = sap.ui.getCore().byId("MOModeloCa").getName();
      // Potencia
      oEntry.PotenciaCa   = sap.ui.getCore().byId("MOPotenciaCa").getValue();
      // N�mero de Serie
      oEntry.NroSerieCa   = sap.ui.getCore().byId("MONroSerieCa").getValue();
  
      // PEC - CIRCUITO EXPRESO
      // Tipo de Conductor
      oEntry.TipoConductorCe  = sap.ui.getCore().byId("MOTipoConductor").getName();
      // Toma de Corriente
      oEntry.TomacorienteCe = sap.ui.getCore().byId("MOTomaCorriente").getName();
      // Protecci�n
      oEntry.ProteccionCe   = sap.ui.getCore().byId("MOProteccion").getName();
      // Longitud
      oEntry.LongitudCe   = sap.ui.getCore().byId("MOLongitud").getValue();
      // Cr�dito/Meses Plazo
      oEntry.CredMesplazoCe = sap.ui.getCore().byId("MOCredMesplazoCi").getName();
      // Monto
      oEntry.MontoCe      = sap.ui.getCore().byId("MOMontoCi").getValue();
      // Fecha Instalaci�n CIR int
      oEntry.FecIniInsCir   = sap.ui.getCore().byId("MOFecIniInsCir").getValue();
      // Fecha Fin Instalaci�n CIR int
      oEntry.FecFinInsCir   = sap.ui.getCore().byId("MOFecFinInsCir").getValue();
      // Circuito Instalaci�n Cliente
      if( sap.ui.getCore().byId("MOCircInstClte").getSelected() == true ){
        oEntry.CircInstClte   = "X";
      }else{
        oEntry.CircInstClte   = "";
      }
      // Estado Instalaci�n Interna
      oEntry.EstInstInt   = sap.ui.getCore().byId("MOEstInstInt").getName();
  
      // DA�O EQUIPOS
      // Fecha de Restituci�n del Servicio
      oEntry.FecRestSrv   = sap.ui.getCore().byId("MOFecRestServ").getValue();
      // Hora de Restituci�n del Servicio
      oEntry.HorRestSrv   = sap.ui.getCore().byId("MOHorRestServ").getValue();
  
      //Fecha de Impresi�n 
      oEntry.FecImpre     = sap.ui.getCore().byId("MOFecImpre").getValue();
      //Hora de Impresi�n 
      oEntry.HoraImpre    = sap.ui.getCore().byId("MOHoraImpre").getValue();
  
      //Tarifa Rama
  //    oEntry.Rama = sap.ui.getCore().byId("MORamaEcon").getName();
  
      var check1;
      var check2;
      var check3;
      var check4;
      var filaAct;
      var rows;
      var row;
      var mensaje;
      var tablaAct;
  
  
      // SELLOS
      var updSellos;
      // se valida si se hicieron cambios
      tablaAct = null;
      tablaAct = sap.ui.getCore().byId("MOTablaSe");
      var childSellos       = [];
      if ( tablaAct._aVisibleColumns.length > 0 ){
        updSellos = "X";
      }else {
        updSellos = "";
      }
      if( updSellos == "X" ) {
        filaAct = null;
        //se obtiene sellos
        var oModelJsonSellos  = sap.ui.getCore().getModel("oModelJsonSellos");
        var sellos    = oModelJsonSellos.getProperty("/");
        for(var i = 0; i < sellos.length; i++){
          var sello   = sellos[i];
  
          // Validaciones
          if (sello.NroSello == ""){
            filaAct = i + 1;
            mensaje = "Debe ingresar Numero de Sello en fila " + filaAct;
            sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
            return;
          }
          if (sello.Tipo == ""){
            filaAct = i + 1;
            mensaje = "Debe ingresar Tipo de Sello en fila " + filaAct;
            sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
            return;
          }
          if(sello.Instalado){check1 = "X"}else{check1 = ""}
          if(sello.Removido){check2 = "X"}else{check2 = ""}
          if(sello.Perdido){check3 = "X"}else{check3 = ""}
          if(sello.Reemplazado){check4 = "X"}else{check4 = ""}
          childSellos.push({
            NroSello    : sello.NroSello,
            Tipo      : sello.Tipo,
            Color     : sello.Color,
            Ubicacion   : sello.Ubicacion,
            Instalado   : check1,
            Removido    : check2,
            Perdido     : check3,
            Reemplazado   : check4,
            TipoInstal    : sello.TipoInstal,
            NroSerinstal  : sello.NroSerinstal,
            Remreason   : sello.Remreason
          });
        }
      }
      // DA�O EQUIPOS
      var childDanEqui        = [];
      var updDanEqui;
      // se valida si se hicieron cambios
      tablaAct = null;
      tablaAct = sap.ui.getCore().byId("MOTablaDe");
      if ( tablaAct._aVisibleColumns.length > 0 ){
        updDanEqui = "X";
      }else {
        updDanEqui = "";
      }
      if( updDanEqui == "X" ) {
        rows = null;
        filaAct = null;
        rows = tablaAct.getRows();
        //Se recorren las filas
        for (var i = 0; i < rows.length; i++) {
          row = null;
          row = rows[i].getCells();
          if  (   row[0].getValue() == "" &&
              row[1].getValue() == "" &&
              row[2].getValue() == "" &&
              row[3].getValue() == "" &&
              row[4].getName() == ""  ){
            continue;
          }
          // Validaciones
          if (row[0].getValue() == ""){
            filaAct = i + 1;
            mensaje = "Debe ingresar Artefacto en fila " + filaAct;
            sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
            return;
          }
  
          childDanEqui.push({
            Artefacto     : row[0].getValue(),
            Marca       : row[1].getValue(),
            Modelo      : row[2].getValue(),
            NroSerie    : row[3].getValue(),
            Propiedad   : row[4].getName()
          });
        }
      }
  
      // MATERIALES RETIRADOS
      var childMatRet       = [];
      var updMatRet;
      // se valida si se hicieron cambios
      tablaAct = null;
      tablaAct = sap.ui.getCore().byId("MOTablaMr");
      var childMatRet       = [];
      if ( tablaAct._aVisibleColumns.length > 0 ){
        updMatRet = "X";
      }else {
        updMatRet = "";
      }
      if( updMatRet == "X" ) {
  
        filaAct = null;
        //se obtiene Materiales retirados
        var oModelJsonMatRet  = sap.ui.getCore().getModel("oModelJsonMatRet");
        var materialesRet    = oModelJsonMatRet.getProperty("/");
        for(var i = 0; i < materialesRet.length; i++){
          var materialRet   = materialesRet[i];
  
          // Validaciones
          if (materialRet.Matnr == ""){
            filaAct = i + 1;
            mensaje = "Debe ingresar Material en fila " + filaAct;
            sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
            return;
          }
          if (materialRet.Cantidad == ""){
            filaAct = i + 1;
            mensaje = "Debe ingresar Cantidad en fila " + filaAct;
            sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
            return;
          }
          if (materialRet.EstadoMatx == "" || materialRet.EstadoMatx == undefined){
            filaAct = i + 1;
            mensaje = "Debe ingresar Estado de material en fila " + filaAct;
            sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
            return;
          }
          var estadoMat = materialRet.EstadoMatx.split("|");
          estadoMat[0] = estadoMat[0].replace(/\s/g, '');
          childMatRet.push({
            Matnr     : materialRet.Matnr.toString(),
            Cantidad    : materialRet.Cantidad.toString().replace(/\s/g, ''),
            EstadoMat   : estadoMat[0].toString()
          });
        }
  
      }
  
      // COMPONENTES
      var childComp       = [];
      var updComp;
      // se valida si se hicieron cambios
      tablaAct = null;
      tablaAct = sap.ui.getCore().byId("MOTablaCo");
      if ( tablaAct._aVisibleColumns.length > 0 ){
        updComp = "X";
      }else {
        updComp = "";
      }
      if( updComp == "X" ) {
  
        filaAct = null;
        //se obtiene Componentes
        var oModelJsonCompo  = sap.ui.getCore().getModel("oModelJsonCompo");
        var componentes    = oModelJsonCompo.getProperty("/");
        for(var i = 0; i < componentes.length; i++){
          var compo   = componentes[i];
  
          // Validaciones
          if (compo.Posnr == ""){
            filaAct = i + 1;
            mensaje = "Debe ingresar Posici�n en fila " + filaAct;
            sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
            return;
          }
          if (compo.Matnr == ""){
            filaAct = i + 1;
            mensaje = "Debe seleccionar Material en fila " + filaAct;
            sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
            return;
          }
          if (compo.Menge == ""){
            filaAct = i + 1;
            mensaje = "Debe seleccionar Cantidad en fila " + filaAct;
            sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
            return;
          }
          if (compo.Einheit == ""){
            filaAct = i + 1;
            mensaje = "Debe seleccionar Unidad en fila " + filaAct;
            sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
            return;
          }
          if (compo.Vornr == ""){
            filaAct = i + 1;
            mensaje = "Debe ingresar Operaci�n en fila " + filaAct;
            sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
            return;
          }
          childComp.push({
            Posnr     : compo.Posnr,
            Matnr     : compo.Matnr,
            Menge   : compo.Menge,
            Einheit   : compo.Einheit,
            Postp   : compo.Postp, 
            Werks   : compo.Werks,
            Vornr   : compo.Vornr,
            Charg   : compo.Charg
          });
        }
      }
  
      // OPERACIONES
      var childOper       = [];
      var updOper;
      // se valida si se hicieron cambios
      tablaAct = null;
      tablaAct = sap.ui.getCore().byId("MOTablaOp");
      if ( tablaAct._aVisibleColumns.length > 0 ){
        updOper = "X";
      }else {
        updOper = "";
      }
      if( updOper == "X" ) {
        rows = null;
        filaAct = null;
        rows = tablaAct.getRows();
        //Se recorren las filas
        for (var i = 0; i < rows.length; i++) {
          row = null;
          row = rows[i].getCells();
          if  (   row[0].getValue() == "" &&
              row[1].getValue() == "" &&
              row[2].getValue() == "" ){
            continue;
          }
          // Validaciones
          if (row[0].getValue() == ""){
            filaAct = i + 1;
            mensaje = "Debe ingresar Acreedor en fila " + filaAct;
            sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
            return;
          }
          if (row[1].getValue() == ""){
            filaAct = i + 1;
            mensaje = "Debe seleccionar Contrato en fila " + filaAct;
            sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
            return;
          }
          if (row[2].getValue() == ""){
            filaAct = i + 1;
            mensaje = "Debe seleccionar Posici�n en fila " + filaAct;
            sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
            return;
          }
  
          childOper.push({
            Lifnr     : row[0].getValue(),
            Konnr     : row[1].getValue(),
            Ktpnr   : row[2].getValue()
          });
        }
      }
  
      // SERVICIOS
      var childServ       = [];
      var updServ;
      // se valida si se hicieron cambios
      tablaAct = null;
      tablaAct = sap.ui.getCore().byId("MOTablaServ");
      if ( tablaAct._aVisibleColumns.length > 0 ){
        updServ = "X";
      }else {
        updServ = "";
      }
      if( updServ == "X" ) {
  
        filaAct = null;
        //se obtiene Servicios
        var oModelJsonServi  = sap.ui.getCore().getModel("oModelJsonServi");
        var servicios    = oModelJsonServi.getProperty("/");
        for(var i = 0; i < servicios.length; i++){
          var servicio  = servicios[i];
  
          // Validaciones
          if (servicio.Srvpos == ""){
            filaAct = i + 1;
            mensaje = "Debe seleccionar Servicio en fila " + filaAct;
            sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
            return;
          }
          childServ.push({
            Extrow    : servicio.Extrow.toString(),
            Srvpos      : servicio.Srvpos,
            Menge       : servicio.Menge,
            Meins       : servicio.Meins,
            //Tbtwr       : servicio.Tbtwr,
            //Waers       : servicio.Waers
          });
        }
      }
  
      // CNR
      var childCnr = [];
      if(sap.ui.getCore().byId("MOMetodo").getName() == "03"){ //censo de carga
        if(sap.ui.getCore().byId("MODemandaKw").getValue() == ""){
          mensaje = "Debe Ingresar valor en demanda - CNR";
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          return;
        }
        if(sap.ui.getCore().byId("MOCodipr").getValue() == ""){
          mensaje = "Debe seleccionar CDP - CNR";
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          return;
        }
        childCnr.push({
          Metodo      : sap.ui.getCore().byId("MOMetodo").getName(),
          DemandaKw   : sap.ui.getCore().byId("MODemandaKw").getValue(),  
          Meobde      : sap.ui.getCore().byId("MOMeobde").getName(),
          FechaMedicion : sap.ui.getCore().byId("MOFechaMedicion").getValue(),
          HoraMedicion  : sap.ui.getCore().byId("MOHoraMedicion").getValue(),
          Codipr      : sap.ui.getCore().byId("MOCodipr").getValue(),
          Cetode      : sap.ui.getCore().byId("MOCetode").getName(),
        });
  
        // CENSO
        var childCenso        = [];
        // se valida si se hicieron cambios
        tablaAct = null;
        tablaAct = sap.ui.getCore().byId("MOTablaCe");
        if( sap.ui.getCore().byId("MOMeobde").getName() == "02" ) {
          rows = null;
          filaAct = null;
          rows = tablaAct.getRows();
          //Se recorren las filas
          for (var i = 0; i < rows.length; i++) {
            row = null;
            row = rows[i].getCells();
            if  (   row[7].getValue() == "0.00" &&
                row[8].getValue() == "0.00" ){
              continue;
            }
  
            childCenso.push({
              ZzcodCc   : row[0].getValue(),
              ZzcanCc   : row[6].getValue(),
              ZzconCalCc  : row[7].getValue(),
              ZzpotCalCc  : row[8].getValue()
            });
          }
  
        }
  
      }else if(sap.ui.getCore().byId("MOMetodo").getName() == "04"){ //porcentaje de error
        childCnr.push({
          Metodo      : sap.ui.getCore().byId("MOMetodo").getName(),
          PorcAct     : sap.ui.getCore().byId("MOPorcAct").getValue(),
          PorcRea     : sap.ui.getCore().byId("MOPorcRea").getValue(),
          PorcDem     : sap.ui.getCore().byId("MOPorcDem").getValue(),
        });
      }else{
        childCnr.push({
          Metodo      : sap.ui.getCore().byId("MOMetodo").getName(),
        });
      }
  
      oEntry.UpdSellos  = updSellos;
      oEntry.UpdDanEqui = updDanEqui;
      oEntry.UpdMatret  = updMatRet;
      oEntry.UpdCompo   = updComp;
      oEntry.UpdOper    = updOper;
      oEntry.UpdServ    = updServ;
  
      oEntry.ORDENSELLOS  = childSellos;
      oEntry.ORDENDANEQUI = childDanEqui;
      oEntry.ORDENMATRET  = childMatRet;
      oEntry.ORDENCOMPO   = childComp;
      oEntry.ORDENOPER  = childOper;
      oEntry.ORDENSERV  = childServ;
      oEntry.ORDENCNR   = childCnr;
      oEntry.ORDENCENSO = childCenso;
  
  
      // Se define la ruta del modelo
      var sServiceUrl = "/sap/opu/odata/SAP/ZWMGS_ORDEN_MOD_SRV_02/";
  
      // Crear instancia del modelo OData
      var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true, "WMWEBCON", "Q1p0w2o9");
  
      oModel.create("ordenCabSet",oEntry,{  
        success   : modOrdenOk,
        error     : modOrdenError,
        async     : false 
      });
  
    },
  
    doSelHora: function(oEvent) {
      // se define el id del evento que llamo al dialogo
      var id = this.getId(); 
  
      // en funcion del id seleccionado se obtiene el dato seleccionado
      var valor = sap.ui.getCore().byId(id).getValue();
  
      // se define la hora a desplegar en el cuadro
      // Hora
      var hora = valor.substring(0,2);
      sap.ui.getCore().byId("MOHoraSel").setSelectedKey(hora);
      // Minutos
      var minu = valor.substring(3,5);
      sap.ui.getCore().byId("MOMinuSel").setSelectedKey(minu);
      // Segundos
      var segu = valor.substring(6,8);
      sap.ui.getCore().byId("MOSeguSel").setSelectedKey(segu);
  
      // se almacena el objeto que llamo en el nombre del select de hora
      sap.ui.getCore().byId("MOHoraSel").setName(id);
      // se almacena el valor original en el nombre del select de minutos
      sap.ui.getCore().byId("MOMinuSel").setName(valor);
  
      if (!this._valueHelpSelectDialog) {  
        this._valueHelpSelectDialog = sap.ui.getCore().byId("MODiaSelHora"); 
      }
  
      this._valueHelpSelectDialog.open();
    },
  
    doCierreTecnico: function(oEvent) {
  
      var error = {value: ""};
  
      // validaciones de fechas
      sap.ui.getCore().byId("idOrdenMod").getController().doValidaFechas(sap.ui.getCore().byId("MOFecEjecTrab").getValue(), 
          sap.ui.getCore().byId("MOHoraIniTrab").getValue(), 
          sap.ui.getCore().byId("MOHoraFinTrab").getValue(), 
          sap.ui.getCore().byId("MOFechaIngreso").getValue(), 
          sap.ui.getCore().byId("MOFecImpre").getValue(), 
          sap.ui.getCore().byId("MOHoraIngreso").getValue(),
          error);
      if (error.value == "X"){ 
        return;
      }
  
      // se define la respuesta de creacion correcta
      var cierreCorrecto = function(oData,oResponse){
        var correcto = "Se ha realizado el cierre tecnico de la orden";
  
        var oModelJson =  new sap.ui.model.json.JSONModel();
        // se asocia el modelo JSON al ODATA
        oModelJson.setData(oData);
  
        var estSistema = oModelJson.getProperty("/ESysStatus");
        //se verifica si se realiz� el cierre t�cnico
        if(/CTEC/.test(estSistema)){
          // se deshabilitan todos los campos de entrada 
          sap.ui.getCore().byId("MOFormDatPrin").setEditable(false);
          sap.ui.getCore().byId("MOTarifVerif").setEditable(false);
          sap.ui.getCore().byId("MOQktextgr").setEditable(false);
          sap.ui.getCore().byId("MOKurztext").setEditable(false);
          sap.ui.getCore().byId("MOObservaciones").setEditable(false);
          sap.ui.getCore().byId("MOBtnCierre").setEnabled(false);
          sap.ui.getCore().byId("MOBtnGuardar").setEnabled(false);
  
          sap.m.MessageToast.show(correcto, {
            width: "300px",                  
            my: "center center",         
            at: "center center",          
            of: window,                  
            offset: "0 0",               
            collision: "fit fit",         
            onClose: null,             
            autoClose: false,             
            animationTimingFunction: "ease", 
            animationDuration: 100,    
            closeOnBrowserNavigation: true
          });
        }else{
          mensaje = "Cierre no ejecutado correctamente";
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          return;
        }
      };
  
      // se define la respuesta de creacion incorrecta
      var cierreError = function(oError){
        var error = "Error: "+JSON.parse(oError.response.body).error.message.value;
        sap.m.MessageToast.show(error, { 
          width: "300px",                  
          my: "center center",         
          at: "center center",          
          of: window,                  
          offset: "0 0",               
          collision: "fit fit",         
          onClose: null,             
          autoClose: false,             
          animationTimingFunction: "ease", 
          animationDuration: 100,    
          closeOnBrowserNavigation: true  
        }); 
      }; 
  
      // se define la llamada del cierre tecnico
      var user = MYSAP.SessionManager.getUser('user');   
      if(user){  
        var usrcons   = user.usuario;
        var pascons   = user.pass;
        var aufnr     = sap.ui.getCore().byId("MOAufnr").getValue();
  
        // Se obtiene el modelo
        var oModel = sap.ui.getCore().getModel("oModelSAP");
  
        var oEntry = {};
        oEntry.IAufnr   = aufnr
        oEntry.Pascons    = pascons;
        oEntry.Usrcons    = usrcons;
  
        oModel.create("cierreOrdenSet",oEntry,{  
          success   : cierreCorrecto,
          error     : cierreError,
          async     : false 
        });
  
      }
    },
  
    // ========================================================
    // AYUDAS DE B�SQUEDA
    // ========================================================  
    //AYUDA SIMPLE
    doAyudaBusqueda: function(oEvent) {
  
      var dialogo;
      var FilterOperator = sap.ui.model.FilterOperator;
      var oFilter;  
      var oFilter2;
      var oFilter3;
      var caract;
      var mensaje;
      var user = MYSAP.SessionManager.getUser('user');
  
      switch (this.sId) {
      case "MOUsrStCclaTxt":      // status con clasif.
        dialogo   = "UsrStCclaDia";
        break; 
      case "MOUsrStSclaTxt":      // status sin clasif.
        dialogo   = "UsrStSclaDia";
        break;
      case "MOTarifVerif":      // tarifa verificada
        dialogo   = "TariVerifDia";
        break;
  /*    case "MORamaEcon":      // Rama Economica
        dialogo   = "RamaEconDia";
        break;*/
      case "MOQktextgr":        // codigo de grupo
        dialogo   = "QmgrpDia";
        oFilter   = new sap.ui.model.Filter("IAuart",FilterOperator.EQ, sap.ui.getCore().byId("MOAufart").getName());
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([oFilter]);
        break;
      case "MOKurztext":        // codigo de cierre
        dialogo   = "QmcodDia";
        oFilter   = new sap.ui.model.Filter("IAuart",FilterOperator.EQ, sap.ui.getCore().byId("MOAufart").getName());
        oFilter2  = new sap.ui.model.Filter("Codegruppe",FilterOperator.EQ, sap.ui.getCore().byId("MOQktextgr").getName());
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([oFilter, oFilter2]);
        break;
      case "MOKurztext":        // codigo de cierre
        dialogo   = "QmcodDia";
        oFilter   = new sap.ui.model.Filter("IAuart",FilterOperator.EQ, sap.ui.getCore().byId("MOAufart").getName());
        oFilter2  = new sap.ui.model.Filter("Codegruppe",FilterOperator.EQ, sap.ui.getCore().byId("MOQktextgr").getName());
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([oFilter, oFilter2]);
        break;
      case "MOPaBezei":       // provincia
        dialogo   = "PaBezeiDia"
          break;
      case "MOPaCity1":       // canton
        if(sap.ui.getCore().byId("MOPaBezei").getName() == ""){
          mensaje = "Seleccione Provincia";
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          return;
        }
        dialogo   = "PaCity1Dia"
          filter = new sap.ui.model.Filter("Region", sap.ui.model.FilterOperator.EQ, sap.ui.getCore().byId("MOPaBezei").getName() );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOPaCity2":       // parroquia
        if(sap.ui.getCore().byId("MOPaBezei").getName() == ""){
          mensaje = "Seleccione Provincia";
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          return;
        }
        if(sap.ui.getCore().byId("MOPaCity1").getName() == ""){
          mensaje = "Seleccione Cant�n";
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          return;
        }
        dialogo   = "PaCity2Dia"
          filter    = new sap.ui.model.Filter("Region", sap.ui.model.FilterOperator.EQ, sap.ui.getCore().byId("MOPaBezei").getName() );
        filter2   = new sap.ui.model.Filter("CityCode", sap.ui.model.FilterOperator.EQ, sap.ui.getCore().byId("MOPaCity1").getName() );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter,filter2]);
        break;
      case "MOPaStreet":        // calle
        if(sap.ui.getCore().byId("MOPaBezei").getName() == ""){
          mensaje = "Seleccione Provincia";
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          return;
        }
        if(sap.ui.getCore().byId("MOPaCity1").getName() == ""){
          mensaje = "Seleccione Cant�n";
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          return;
        }
        if(sap.ui.getCore().byId("MOPaCity1").getName() == ""){
          mensaje = "Seleccione Cant�n";
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          return;
        }
        dialogo   = "PaStreetDia"
          filter    = new sap.ui.model.Filter("Region", sap.ui.model.FilterOperator.EQ, sap.ui.getCore().byId("MOPaBezei").getName() );
        filter2   = new sap.ui.model.Filter("CityCode", sap.ui.model.FilterOperator.EQ, sap.ui.getCore().byId("MOPaCity1").getName() );
        filter3   = new sap.ui.model.Filter("CitypCode", sap.ui.model.FilterOperator.EQ, sap.ui.getCore().byId("MOPaCity2").getName() );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter,filter2,filter3]);
        break;
      case "MOTipoAcomx":       // 
        dialogo   = "CaracteristicaDia";
        sap.ui.getCore().byId(dialogo).setTitle("Tipo de Acometida");
        sap.ui.getCore().byId(dialogo).setTooltip("MOTipoAcomx");
        filter  = new sap.ui.model.Filter("NameChar", sap.ui.model.FilterOperator.EQ, "ZTIPACO" );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOCalAcomx":
  /*      sap.ui.getCore().byId("MODemAcom").attachLiveChange(function(oEvent){
          var x = sap.ui.getCore().byId("MODemAcom");
          alert(this.getValue());
          var val   = this.getValue();
          var regex   = /^[0-9]{0,3}\.([0-9]{1,2})?$/  
          if(!val.match(regex)) {
            this.setValue(this._lastValue);
          }else{
            this._lastValue = val;
          }
        });*/
        dialogo   = "CaracteristicaDia";
        sap.ui.getCore().byId(dialogo).setTitle("Calibre Acometida"); 
        sap.ui.getCore().byId(dialogo).setTooltip("MOCalAcomx");
        filter  = new sap.ui.model.Filter("NameChar", sap.ui.model.FilterOperator.EQ, "ZCALACO" );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOFasesAcomx":
        dialogo   = "CaracteristicaDia";
        sap.ui.getCore().byId(dialogo).setTitle("Fases de Acometida");
        sap.ui.getCore().byId(dialogo).setTooltip("MOFasesAcomx");
        filter  = new sap.ui.model.Filter("NameChar", sap.ui.model.FilterOperator.EQ, "ZFASESACO" );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOMatAcomx":
        dialogo   = "CaracteristicaDia";
        sap.ui.getCore().byId(dialogo).setTitle("Material Acometida");
        sap.ui.getCore().byId(dialogo).setTooltip("MOMatAcomx");
        filter  = new sap.ui.model.Filter("NameChar", sap.ui.model.FilterOperator.EQ, "ZMAT" );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOCalAcomRetx":
        dialogo   = "CaracteristicaDia";
        sap.ui.getCore().byId(dialogo).setTitle("Calibre de Acometida Retirada");
        sap.ui.getCore().byId(dialogo).setTooltip("MOCalAcomRetx");
        filter  = new sap.ui.model.Filter("NameChar", sap.ui.model.FilterOperator.EQ, "ZCALACO" );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOTipoAcomRetx":
        dialogo   = "CaracteristicaDia";
        sap.ui.getCore().byId(dialogo).setTitle("Tipo de Acometida Retirada");
        sap.ui.getCore().byId(dialogo).setTooltip("MOTipoAcomRetx");
        filter  = new sap.ui.model.Filter("NameChar", sap.ui.model.FilterOperator.EQ, "ZTIPACORETI" );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOClaseRedx":
        dialogo   = "CaracteristicaDia";
        sap.ui.getCore().byId(dialogo).setTitle("Clase de Red");
        sap.ui.getCore().byId(dialogo).setTooltip("MOClaseRedx");
        filter  = new sap.ui.model.Filter("NameChar", sap.ui.model.FilterOperator.EQ, "ZCLARED" );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOTipoRedx":
        dialogo   = "CaracteristicaDia";
        sap.ui.getCore().byId(dialogo).setTitle("Tipo de Red");
        sap.ui.getCore().byId(dialogo).setTooltip("MOTipoRedx");
        filter  = new sap.ui.model.Filter("NameChar", sap.ui.model.FilterOperator.EQ, "ZTIPRED" );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOOrigFinax":
        dialogo   = "CaracteristicaDia";
        sap.ui.getCore().byId(dialogo).setTitle("Origen de Financiamiento");
        sap.ui.getCore().byId(dialogo).setTooltip("MOOrigFinax");
        filter  = new sap.ui.model.Filter("NameChar", sap.ui.model.FilterOperator.EQ, "ZORIGFINA" );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOSecFasesAcomx":
        dialogo   = "CaracteristicaDia";
        sap.ui.getCore().byId(dialogo).setTitle("Secuencia de Fases Acometida");
        sap.ui.getCore().byId(dialogo).setTooltip("MOSecFasesAcomx");
        filter  = new sap.ui.model.Filter("NameChar", sap.ui.model.FilterOperator.EQ, "ZSECUFASEACO" );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOUbicTabx":
        dialogo   = "CaracteristicaDia";
        sap.ui.getCore().byId(dialogo).setTitle("Ubicaci�n de Tablero");
        sap.ui.getCore().byId(dialogo).setTooltip("MOUbicTabx");
        filter  = new sap.ui.model.Filter("NameChar", sap.ui.model.FilterOperator.EQ, "ZUBICATAB" );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOConstTabx":
        dialogo   = "CaracteristicaDia";
        sap.ui.getCore().byId(dialogo).setTitle("Constructor del Tablero");
        sap.ui.getCore().byId(dialogo).setTooltip("MOConstTabx");
        filter  = new sap.ui.model.Filter("NameChar", sap.ui.model.FilterOperator.EQ, "ZCONSTAB" );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOProtPpalTabx":
        dialogo   = "CaracteristicaDia";
        sap.ui.getCore().byId(dialogo).setTitle("Protecci�n Principal del Tablero");
        sap.ui.getCore().byId(dialogo).setTooltip("MOProtPpalTabx");
        filter  = new sap.ui.model.Filter("NameChar", sap.ui.model.FilterOperator.EQ, "ZPROTABL" );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOCargaProtx":
        dialogo   = "CaracteristicaDia";
        sap.ui.getCore().byId(dialogo).setTitle("Tipo de Protecci�n de Tablero");
        sap.ui.getCore().byId(dialogo).setTooltip("MOCargaProtx");
        filter  = new sap.ui.model.Filter("NameChar", sap.ui.model.FilterOperator.EQ, "ZTIPROTAB" );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOProtInd":
        dialogo   = "CaracteristicaDia";
        sap.ui.getCore().byId(dialogo).setTitle("Protecci�n Individual");
        sap.ui.getCore().byId(dialogo).setTooltip("MOProtInd");
        filter  = new sap.ui.model.Filter("NameChar", sap.ui.model.FilterOperator.EQ, "ZPROTABL" );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOTipoProtx":
        dialogo   = "CaracteristicaDia";
        sap.ui.getCore().byId(dialogo).setTitle("Tipo de Protecci�n Individual");
        sap.ui.getCore().byId(dialogo).setTooltip("MOTipoProtx");
        filter  = new sap.ui.model.Filter("NameChar", sap.ui.model.FilterOperator.EQ, "ZTIPROT" );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOFasesMedx":
        dialogo   = "CaracteristicaDia";
        sap.ui.getCore().byId(dialogo).setTitle("Fases de Medidor");
        sap.ui.getCore().byId(dialogo).setTooltip("MOFasesMedx");
        filter  = new sap.ui.model.Filter("NameChar", sap.ui.model.FilterOperator.EQ, "ZFASESMED" );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOSecFasesx":
        dialogo   = "CaracteristicaDia";
        sap.ui.getCore().byId(dialogo).setTitle("Secuencia Fases Medidor");
        sap.ui.getCore().byId(dialogo).setTooltip("MOSecFasesx");
        filter  = new sap.ui.model.Filter("NameChar", sap.ui.model.FilterOperator.EQ, "ZSECUFASEMED" );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOAccionMedidor":
        dialogo   = "AccionMedDia";
        oFilter   = new sap.ui.model.Filter("ZcodCred",FilterOperator.EQ, sap.ui.getCore().byId("MOAccionMedidor").getName());
        oFilter2  = new sap.ui.model.Filter("Metodo",FilterOperator.EQ, sap.ui.getCore().byId("MOMetodo").getName());
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([oFilter, oFilter2]);
        break;
      case "MOUbicMedidor":
        dialogo   = "CaracteristicaDia";
        sap.ui.getCore().byId(dialogo).setTitle("Ubicaci�n del Medidor");
        sap.ui.getCore().byId(dialogo).setTooltip("MOUbicMedidor");
        filter  = new sap.ui.model.Filter("NameChar", sap.ui.model.FilterOperator.EQ, "ZUBICATAB" );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOTabCentral":
        dialogo   = "TabCentralDia";
        var filter = new sap.ui.model.Filter("Domname", sap.ui.model.FilterOperator.EQ, 'ZD_TAB_CENTR' );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOTipoEquipoCo":
        dialogo   = "TipoEquipoCoDia";
        break;
      case "MOMarcaCo":
        dialogo   = "MarcaCoDia";
        filter  = new sap.ui.model.Filter("TipEquipo", sap.ui.model.FilterOperator.EQ,  "0" );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOModeloCo":
        dialogo   = "ModeloCoDia";
        filter  = new sap.ui.model.Filter("TipEquipo", sap.ui.model.FilterOperator.EQ,  "0" );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOTipoEquipoCa":
        dialogo   = "TipoEquipoCaDia";
        break;
      case "MOMarcaCa":
        dialogo   = "MarcaCaDia";
        filter  = new sap.ui.model.Filter("TipEquipo", sap.ui.model.FilterOperator.EQ,  "1" );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOModeloCa":
        dialogo   = "ModeloCaDia";
        filter  = new sap.ui.model.Filter("TipEquipo", sap.ui.model.FilterOperator.EQ,  "1" );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOTipoConductor":
        dialogo   = "TipoConductorDia";
        break;
      case "MOTomaCorriente":
        dialogo   = "TomaCorrienteDia";
        break;
      case "MOProteccion":
        dialogo   = "ProteccionDia";
        break;
      case "MOCredMesplazoCi":
        dialogo   = "CredMesplazoCiDia";
        break;
      case "MOEstInstInt":
        dialogo   = "EstInstIntDia";
        break;
      case "MOMediAnt":     // Medidor Anterior
        dialogo   = "EquipoDiaRet";
        caract      = "ZMED";
        sap.ui.getCore().byId(dialogo).setTooltip(this.sId);
        sap.ui.getCore().byId("idOrdenMod").getController().doAyudaEquipoRet(caract,sap.ui.getCore().byId(this.sId));
        return;
      case "MOMediPost":
        dialogo   = "EquipoDiaRet";
        caract      = "ZMED";
        sap.ui.getCore().byId(dialogo).setTooltip(this.sId);
        sap.ui.getCore().byId("idOrdenMod").getController().doAyudaEquipoRet(caract,sap.ui.getCore().byId(this.sId));
        return;
      case "MONroEquipoI":
        dialogo   = "EquipoDia";
        sap.ui.getCore().byId(dialogo).setTitle("N�mero Equipo");
        sap.ui.getCore().byId(dialogo).setTooltip("MONroEquipoI");
        caract      = "ZMED";
        sap.ui.getCore().byId("idOrdenMod").getController().doAyudaEquipoIns(caract,sap.ui.getCore().byId(this.sId));
        return;
      case "MONroEquipoR":
        dialogo   = "EquipoDiaRet";
        caract      = "ZMED";
        sap.ui.getCore().byId(dialogo).setTooltip(this.sId);
        sap.ui.getCore().byId("idOrdenMod").getController().doAyudaEquipoRet(caract,sap.ui.getCore().byId(this.sId));
        return;
      case "MOTc1I":
        dialogo   = "EquipoDia";
        sap.ui.getCore().byId(dialogo).setTitle("N�mero Transformador");
        sap.ui.getCore().byId(dialogo).setTooltip("MOTc1I");
        caract      = "ZTRA";
        sap.ui.getCore().byId("idOrdenMod").getController().doAyudaEquipoIns(caract,sap.ui.getCore().byId(this.sId));
        return;
      case "MOTc2I":
        dialogo   = "EquipoDia";
        sap.ui.getCore().byId(dialogo).setTitle("N�mero Transformador");
        sap.ui.getCore().byId(dialogo).setTooltip("MOTc2I");
        caract      = "ZTRA";
        sap.ui.getCore().byId("idOrdenMod").getController().doAyudaEquipoIns(caract,sap.ui.getCore().byId(this.sId));
        return;
      case "MOTc3I":
        dialogo   = "EquipoDia";
        sap.ui.getCore().byId(dialogo).setTitle("N�mero Transformador");
        sap.ui.getCore().byId(dialogo).setTooltip("MOTc3I");
        caract      = "ZTRA";
        sap.ui.getCore().byId("idOrdenMod").getController().doAyudaEquipoIns(caract,sap.ui.getCore().byId(this.sId));
        return;
      case "MOTp1I":
        dialogo   = "EquipoDia";
        sap.ui.getCore().byId(dialogo).setTitle("N�mero Transformador");
        sap.ui.getCore().byId(dialogo).setTooltip("MOTp1I");
        caract      = "ZTRA";
        sap.ui.getCore().byId("idOrdenMod").getController().doAyudaEquipoIns(caract,sap.ui.getCore().byId(this.sId));
        return;
      case "MOTp2I":
        dialogo   = "EquipoDia";
        sap.ui.getCore().byId(dialogo).setTitle("N�mero Transformador");
        sap.ui.getCore().byId(dialogo).setTooltip("MOTp2I");
        caract      = "ZTRA";
        sap.ui.getCore().byId("idOrdenMod").getController().doAyudaEquipoIns(caract,sap.ui.getCore().byId(this.sId));
        return;
      case "MOTp3I":
        dialogo   = "EquipoDia";
        sap.ui.getCore().byId(dialogo).setTitle("N�mero Transformador");
        sap.ui.getCore().byId(dialogo).setTooltip("MOTp3I");
        caract      = "ZTRA";
        sap.ui.getCore().byId("idOrdenMod").getController().doAyudaEquipoIns(caract,sap.ui.getCore().byId(this.sId));
        return;
      case "MOTmixI":
        dialogo   = "EquipoDia";
        sap.ui.getCore().byId(dialogo).setTitle("N�mero Transformador");
        sap.ui.getCore().byId(dialogo).setTooltip("MOTmixI");
        caract      = "ZTRA";
        sap.ui.getCore().byId("idOrdenMod").getController().doAyudaEquipoIns(caract,sap.ui.getCore().byId(this.sId));
        return;
      case "MOTc1R":
        dialogo   = "EquipoDiaRet";
        caract      = "ZTRA";
        sap.ui.getCore().byId(dialogo).setTooltip(this.sId);
        sap.ui.getCore().byId("idOrdenMod").getController().doAyudaEquipoRet(caract,sap.ui.getCore().byId(this.sId));
        return;
      case "MOTc2R":
        dialogo   = "EquipoDiaRet";
        caract      = "ZTRA";
        sap.ui.getCore().byId(dialogo).setTooltip(this.sId);
        sap.ui.getCore().byId("idOrdenMod").getController().doAyudaEquipoRet(caract,sap.ui.getCore().byId(this.sId));
        return;
      case "MOTc3R":
        dialogo   = "EquipoDiaRet";
        caract      = "ZTRA";
        sap.ui.getCore().byId(dialogo).setTooltip(this.sId);
        sap.ui.getCore().byId("idOrdenMod").getController().doAyudaEquipoRet(caract,sap.ui.getCore().byId(this.sId));
        return;
      case "MOTp1R":
        dialogo   = "EquipoDiaRet";
        caract      = "ZTRA";
        sap.ui.getCore().byId(dialogo).setTooltip(this.sId);
        sap.ui.getCore().byId("idOrdenMod").getController().doAyudaEquipoRet(caract,sap.ui.getCore().byId(this.sId));
        return;
      case "MOTp2R":
        dialogo   = "EquipoDiaRet";
        caract      = "ZTRA";
        sap.ui.getCore().byId(dialogo).setTooltip(this.sId);
        sap.ui.getCore().byId("idOrdenMod").getController().doAyudaEquipoRet(caract,sap.ui.getCore().byId(this.sId));
        return;
      case "MOTp3R":
        dialogo   = "EquipoDiaRet";
        caract      = "ZTRA";
        sap.ui.getCore().byId(dialogo).setTooltip(this.sId);
        sap.ui.getCore().byId("idOrdenMod").getController().doAyudaEquipoRet(caract,sap.ui.getCore().byId(this.sId));
        return;
      case "MOTmixR":
        dialogo   = "EquipoDiaRet";
        caract      = "ZTRA";
        sap.ui.getCore().byId(dialogo).setTooltip(this.sId);
        sap.ui.getCore().byId("idOrdenMod").getController().doAyudaEquipoRet(caract,sap.ui.getCore().byId(this.sId));
        return;
      case "MOMetodo":
        dialogo   = "MOMetodoDia";
        var filter = new sap.ui.model.Filter("Domname", sap.ui.model.FilterOperator.EQ, 'ZWM_METODO' );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOMeobde":
        dialogo   = "MOMeobdeDia";
        var filter = new sap.ui.model.Filter("Domname", sap.ui.model.FilterOperator.EQ, 'ZMEOBDE' );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOCetode":
        dialogo   = "MOCetodeDia";
        var filter = new sap.ui.model.Filter("Domname", sap.ui.model.FilterOperator.EQ, 'ZCETODE' );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOTabCentr":
        dialogo   = "MOTabCentrDia";
        var filter = new sap.ui.model.Filter("Domname", sap.ui.model.FilterOperator.EQ, 'ZD_TAB_CENTR' );
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([filter]);
        break;
      case "MOGridName2":
        dialogo   = "MOGridName2Dia";
        var mensaje;
        if (!sap.ui.getCore().byId("MOPaCity1").getValue()){
          mensaje = "Debe ingresar Cant�n";
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          return;
        }
        if (!sap.ui.getCore().byId("MOPaCity2").getValue()){
          mensaje = "Debe ingresar Parroquia";
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          return;
        }
        if (!sap.ui.getCore().byId("MOPaBezei").getValue()){
          mensaje = "Debe ingresar Regi�n";
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          return;
        }
        oFilter   = new sap.ui.model.Filter("Canton",FilterOperator.EQ, sap.ui.getCore().byId("MOPaCity1").getName());
        oFilter2  = new sap.ui.model.Filter("Parroquia",FilterOperator.EQ, sap.ui.getCore().byId("MOPaCity2").getName());
        oFilter3  = new sap.ui.model.Filter("Region",FilterOperator.EQ, sap.ui.getCore().byId("MOPaBezei").getName());
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([oFilter, oFilter2, oFilter3]);
        break;
      case "MOGridLevel":
        dialogo   = "MOGridLevelDia";
        oFilter   = new sap.ui.model.Filter("GridName",FilterOperator.EQ, sap.ui.getCore().byId("MOGridName2").getValue());
        sap.ui.getCore().byId(dialogo).getBinding("items").filter([oFilter]);
        break;
      case "MOInTipMR":
        dialogo   = "MOInTipMRDia";
        break;
      }
  
      if (!this._valueHelpSelectDialog) {  
        this._valueHelpSelectDialog = sap.ui.getCore().byId(dialogo); 
      }
      this._valueHelpSelectDialog.open();  
  
    },
  
    //ACCION SOBRE MEDIDOR
    handleSearchAccionMed : function (oEvent) {
      var sValue = oEvent.getParameter("value");
      var oFilter1 = new sap.ui.model.Filter("ZdescCred", sap.ui.model.FilterOperator.Contains, sValue);
      oEvent.getSource().getBinding("items").filter([oFilter1]);
    },
  
    //TARIFA VERIFICADA
    handleSearchTariVerif : function (oEvent) {
      var sValue = oEvent.getParameter("value");
      var oFilter = new sap.ui.model.Filter("Ttypbez", sap.ui.model.FilterOperator.Contains, sValue);
      oEvent.getSource().getBinding("items").filter([oFilter]);
    },
  
    //RAMA ECONOMICA
  /*  handleSearchRamaEcon  : function (oEvent) {
      var sValue = oEvent.getParameter("value");
      var oFilter = new sap.ui.model.Filter("TEXT", sap.ui.model.FilterOperator.Contains, sValue);
      oEvent.getSource().getBinding("items").filter([oFilter]);
    },*/
  
    //PROVINCIA
    handleSearchPaBezei   : function (oEvent) {
      var sValue = oEvent.getParameter("value");
      var oFilter = new sap.ui.model.Filter("Bezei", sap.ui.model.FilterOperator.Contains, sValue);
      oEvent.getSource().getBinding("items").filter([oFilter]);
    },
  
    //CANTON 
    handleSearchPaCity1   : function (oEvent) {
      var sValue = oEvent.getParameter("value");
      var oFilter = new sap.ui.model.Filter("Region", sap.ui.model.FilterOperator.EQ, sap.ui.getCore().byId("MOPaBezei").getName());
      var oFilter2 = new sap.ui.model.Filter("CityName", sap.ui.model.FilterOperator.Contains, sValue);
      oEvent.getSource().getBinding("items").filter([oFilter,oFilter2]);
    },
  
    //PARROQUIA 
    handleSearchPaCity2   : function (oEvent) {
      var sValue = oEvent.getParameter("value");
      var oFilter = new sap.ui.model.Filter("Region", sap.ui.model.FilterOperator.EQ, sap.ui.getCore().byId("MOPaBezei").getName());
      var oFilter2 = new sap.ui.model.Filter("CityCode", sap.ui.model.FilterOperator.EQ, sap.ui.getCore().byId("MOPaCity1").getName());
      var oFilter3 = new sap.ui.model.Filter("CityPart", sap.ui.model.FilterOperator.Contains, sValue);
      oEvent.getSource().getBinding("items").filter([oFilter,oFilter2,oFilter3]);
    },
  
    //CALLE  
    handleSearchPaStreet  : function (oEvent) {
      var sValue = oEvent.getParameter("value");
      var oFilter = new sap.ui.model.Filter("Region", sap.ui.model.FilterOperator.EQ, sap.ui.getCore().byId("MOPaBezei").getName());
      var oFilter2 = new sap.ui.model.Filter("CityCode", sap.ui.model.FilterOperator.EQ, sap.ui.getCore().byId("MOPaCity1").getName());
      var oFilter3 = new sap.ui.model.Filter("CitypCode", sap.ui.model.FilterOperator.EQ, sap.ui.getCore().byId("MOPaCity2").getName());
      var oFilter4 = new sap.ui.model.Filter("Street", sap.ui.model.FilterOperator.Contains, sValue);
      oEvent.getSource().getBinding("items").filter([oFilter,oFilter2,oFilter3,oFilter4]);
    },
  
    //CARACTERISTICA
    handleSearchCaracteristica  : function (oEvent) {
      var sValue    = oEvent.getParameter("value");
      var caract;
  
      switch (sap.ui.getCore().byId(this.sId).getTooltip()) {
      case "MOTipoAcomx" :          // Tipo de Acometida
        caract  = "ZTIPACO";
        break; 
      case "MOCalAcomx":          // Calibre Acometida
        caract  = "ZCALACO";
        break;
      case "MOFasesAcomx":        // Fases de Acometida
        caract  = "ZFASESACO";
        break;
      case "MOMatAcomx":          // Material Acometida
        caract  = "ZMAT";
        break;
      case "MOCalAcomRetx":       // Calibre de Acometida Retirada
        caract  = "ZCALACO";
        break;
      case "MOTipoAcomRetx":        // Tipo de Acometida Retirada
        caract  = "ZTIPACORETI";
        break;
      case "MOClaseRedx":         // Clase de Red
        caract  = "ZCLARED";
        break;
      case "MOTipoRedx":          // Tipo de Red
        caract  = "ZTIPRED";
        break;
      case "MOOrigFinax":         // Origen de Financiamiento
        caract  = "ZORIGFINA";
        break;
      case "MOSecFasesAcomx":       // Secuencia de Fases Acometida
        caract  = "ZSECUFASEACO";
        break;
      case "MOUbicTabx":          // Ubicaci�n de Tablero
        caract  = "ZUBICATAB";
        break;
      case "MOConstTabx":         // Constructor del Tablero
        caract  = "ZCONSTAB";
        break;
      case "MOProtPpalTabx":        // Protecci�n Principal del Tablero
        caract  = "ZPROTABL";
        break;
      case "MOCargaProtx":        // Tipo de Protecci�n de Tablero
        caract  = "ZTIPROTAB";
        break;
      case "MOProtInd":         // Protecci�n Individual
        caract  = "ZPROTABL";
        break;
      case "MOTipoProtx":         // Tipo de Protecci�n Individual
        caract  = "ZTIPROT";
        break;
      case "MOFasesMedx":         // Fases de Medidor
        caract  = "ZFASESMED";
        break;
      case "MOSecFasesx":         // Secuencia Fases Medidor
        caract  = "ZSECUFASEMED";
        break;
      case "MOUbicMedidor":       // Ubicaci�n del Medidor
        caract  = "ZUBICATAB";
        break;
      case "MOMediAnt":     // Medidor Anterior
        dialogo   = "EquipoDiaRet";
        sap.ui.getCore().byId(dialogo).setTitle("Medidor Anterior");
        sap.ui.getCore().byId(dialogo).setTooltip("MOMediAnt");
        caract      = "ZMED";
        break;
      case "MOMediPost":
        dialogo   = "EquipoDiaRet";
        sap.ui.getCore().byId(dialogo).setTitle("Medidor Posterior");
        sap.ui.getCore().byId(dialogo).setTooltip("MOMediPost");
        caract      = "ZMED";
        break;
      case "MONroEquipoI":
        dialogo   = "EquipoDia";
        sap.ui.getCore().byId(dialogo).setTitle("N�mero Equipo");
        sap.ui.getCore().byId(dialogo).setTooltip("MONroEquipoI");
        caract      = "ZMED";
        break;
      case "MONroEquipoR":
        dialogo   = "EquipoDiaRet";
        sap.ui.getCore().byId(dialogo).setTitle("N�mero Equipo");
        sap.ui.getCore().byId(dialogo).setTooltip("MONroEquipoR");
        caract      = "ZMED";
        break;
      case "MOTc1I":
        dialogo   = "EquipoDia";
        sap.ui.getCore().byId(dialogo).setTitle("N�mero Transformador");
        sap.ui.getCore().byId(dialogo).setTooltip("MOTc1I");
        caract      = "ZTRA";
        break;
      case "MOTc2I":
        dialogo   = "EquipoDia";
        sap.ui.getCore().byId(dialogo).setTitle("N�mero Transformador");
        sap.ui.getCore().byId(dialogo).setTooltip("MOTc2I");
        caract      = "ZTRA";
        break;
      case "MOTc3I":
        dialogo   = "EquipoDia";
        sap.ui.getCore().byId(dialogo).setTitle("N�mero Transformador");
        sap.ui.getCore().byId(dialogo).setTooltip("MOTc3I");
        caract      = "ZTRA";
        break;
      case "MOTp1I":
        dialogo   = "EquipoDia";
        sap.ui.getCore().byId(dialogo).setTitle("N�mero Transformador");
        sap.ui.getCore().byId(dialogo).setTooltip("MOTp1I");
        caract      = "ZTRA";
        break;
      case "MOTp2I":
        dialogo   = "EquipoDia";
        sap.ui.getCore().byId(dialogo).setTitle("N�mero Transformador");
        sap.ui.getCore().byId(dialogo).setTooltip("MOTp2I");
        caract      = "ZTRA";
        break;
      case "MOTp3I":
        dialogo   = "EquipoDia";
        sap.ui.getCore().byId(dialogo).setTitle("N�mero Transformador");
        sap.ui.getCore().byId(dialogo).setTooltip("MOTp3I");
        caract      = "ZTRA";
        break;
      case "MOTmixI":
        dialogo   = "EquipoDia";
        sap.ui.getCore().byId(dialogo).setTitle("N�mero Transformador");
        sap.ui.getCore().byId(dialogo).setTooltip("MOTmixI");
        caract      = "ZTRA";
        break;
      case "MOTc1R":
        dialogo   = "EquipoDia";
        sap.ui.getCore().byId(dialogo).setTitle("N�mero Transformador");
        sap.ui.getCore().byId(dialogo).setTooltip("MOTc1R");
        caract      = "ZTRA";
        break;
      case "MOTc2R":
        dialogo   = "EquipoDia";
        sap.ui.getCore().byId(dialogo).setTitle("N�mero Transformador");
        sap.ui.getCore().byId(dialogo).setTooltip("MOTc2R");
        caract      = "ZTRA";
        break;
      case "MOTc3R":
        dialogo   = "EquipoDia";
        sap.ui.getCore().byId(dialogo).setTitle("N�mero Transformador");
        sap.ui.getCore().byId(dialogo).setTooltip("MOTc3R");
        caract      = "ZTRA";
        break;
      case "MOTp1R":
        dialogo   = "EquipoDia";
        sap.ui.getCore().byId(dialogo).setTitle("N�mero Transformador");
        sap.ui.getCore().byId(dialogo).setTooltip("MOTp1R");
        caract      = "ZTRA";
        break;
      case "MOTp2R":
        dialogo   = "EquipoDia";
        sap.ui.getCore().byId(dialogo).setTitle("N�mero Transformador");
        sap.ui.getCore().byId(dialogo).setTooltip("MOTp2R");
        caract      = "ZTRA";
        break;
      case "MOTp3R":
        dialogo   = "EquipoDia";
        sap.ui.getCore().byId(dialogo).setTitle("N�mero Transformador");
        sap.ui.getCore().byId(dialogo).setTooltip("MOTp3R");
        caract      = "ZTRA";
        break;
      case "MOTmixR":
        dialogo   = "EquipoDia";
        sap.ui.getCore().byId(dialogo).setTitle("N�mero Transformador");
        sap.ui.getCore().byId(dialogo).setTooltip("MOTmixR");
        caract      = "ZTRA";
        break;
      }
  
      var filter1   = new sap.ui.model.Filter("NameChar", sap.ui.model.FilterOperator.EQ, caract );
      var filter2   = new sap.ui.model.Filter("DescrCval", sap.ui.model.FilterOperator.Contains, sValue);
      oEvent.getSource().getBinding("items").filter([filter1,filter2]);
  
    },
  
    handleSearchTipoConductor : function (oEvent) {
      var sValue = oEvent.getParameter("value");
      var oFilter1 = new sap.ui.model.Filter("ZdescCred", sap.ui.model.FilterOperator.Contains, sValue);
      oEvent.getSource().getBinding("items").filter([oFilter1]);
    },
  
    handleSearchTomaCorriente : function (oEvent) {
      var sValue = oEvent.getParameter("value");
      var oFilter1 = new sap.ui.model.Filter("ZdescCred", sap.ui.model.FilterOperator.Contains, sValue);
      oEvent.getSource().getBinding("items").filter([oFilter1]);
    },
  
    handleSearchProteccion : function (oEvent) {
      var sValue = oEvent.getParameter("value");
      var oFilter1 = new sap.ui.model.Filter("ZdescCred", sap.ui.model.FilterOperator.Contains, sValue);
      oEvent.getSource().getBinding("items").filter([oFilter1]);
    },
  
    handleSearchCredMesplazoCi : function (oEvent) {
      var sValue = oEvent.getParameter("value");
      var oFilter1 = new sap.ui.model.Filter("ZdescCred", sap.ui.model.FilterOperator.Contains, sValue);
      oEvent.getSource().getBinding("items").filter([oFilter1]);
    },
  
    handleSearchEquipo  : function (oEvent) {
      var sValue    = oEvent.getParameter("value");
      var caract;
  
      // se lee el usuario actual
      var user = MYSAP.SessionManager.getUser('user');
      var filter1  = new sap.ui.model.Filter("Werks", sap.ui.model.FilterOperator.EQ, user.werks );
      var filter2  = new sap.ui.model.Filter("Arbpl", sap.ui.model.FilterOperator.EQ, sap.ui.getCore().byId("MOArtxt").getName());
  
      switch (sap.ui.getCore().byId(this.sId).getTooltip()) {
      case "MOMediAnt":         // Medidor Anterior
        caract = 'ZMED';
        break; 
      case "MOMediPost":
        caract = 'ZMED';
        break;
      case "MONroEquipoI":
        caract = 'ZMED';
        break;
      case "MONroEquipoR":
        caract = 'ZMED';
        break;
      case "MOTc1I":
        caract = 'ZTRA';
        break;
      case "MOTc2I":
        caract = 'ZTRA';
        break;
      case "MOTc3I":
        caract = 'ZTRA';
        break;
      case "MOTp1I":
        caract = 'ZTRA';
        break;
      case "MOTp2I":
        caract = 'ZTRA';
        break;
      case "MOTp3I":
        caract = 'ZTRA';
        break;
      case "MOTmixI":
        caract = 'ZTRA';
        break;
      case "MOTc1R":
        caract = 'ZTRA';
        break;
      case "MOTc2R":
        caract = 'ZTRA';
        break;
      case "MOTc3R":
        caract = 'ZTRA';
        break;
      case "MOTp1R":
        caract = 'ZTRA';
        break;
      case "MOTp2R":
        caract = 'ZTRA';
        break;
      case "MOTp3R":
        caract = 'ZTRA';
        break;
      case "MOTmixR":
        caract = 'ZTRA';
        break;
      }
      var filter3  = new sap.ui.model.Filter("Mtart", sap.ui.model.FilterOperator.EQ, caract );
      var filter4   = new sap.ui.model.Filter("Sernr", sap.ui.model.FilterOperator.Contains, sValue);
      oEvent.getSource().getBinding("items").filter([filter1,filter2,filter3,filter4]);
    },
  
    handleSearchTipoMR : function (oEvent) {
      var sValue = oEvent.getParameter("value");
      var oFilter = new sap.ui.model.Filter("Mtbez", sap.ui.model.FilterOperator.Contains, sValue);
      oEvent.getSource().getBinding("items").filter([oFilter]);
    },
  
    // ========================================================
    // CIERRE DE DIALOGO DE AYUDAS DE B�SQUEDA
    // ========================================================
    //ESTADOS DE USUARIO CON CLASIFICACION 
    handleCloseUsrStCcla  : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOUsrStCclaTxt").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOUsrStCclaTxt").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOUsrStCclaTxt").setValue(oSelectedItem.getInfo());
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOUsrStCclaTxt").setName("");
          sap.ui.getCore().byId("MOUsrStCclaTxt").setValue("");
        }                      
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    //ESTADOS DE USUARIO SIN CLASIFICACION 
    handleCloseUsrStScla  : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOUsrStSclaTxt").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOUsrStSclaTxt").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOUsrStSclaTxt").setValue(oSelectedItem.getInfo());
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOUsrStSclaTxt").setName("");
          sap.ui.getCore().byId("MOUsrStSclaTxt").setValue("");
        }                      
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    //TARIFA VERIFICADA
    handleCloseTariVerif  : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOTarifVerif").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOTarifVerif").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOTarifVerif").setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOTarifVerif").setName("");
          sap.ui.getCore().byId("MOTarifVerif").setValue("");
        }                      
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
  
    //RAMA ECONOMICA
  /*  handleCloseRamaEcon : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MORamaEcon").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MORamaEcon").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MORamaEcon").setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MORamaEcon").setName("");
          sap.ui.getCore().byId("MORamaEcon").setValue("");
        }                      
      }
      oEvent.getSource().getBinding("items").filter([]);
    },*/
  
  
  
    //CODIGO DE GRUPO
    handleCloseQmgrp  : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOQktextgr").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOQktextgr").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOQktextgr").setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
  
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOQktextgr").setName("");
          sap.ui.getCore().byId("MOQktextgr").setValue("");
        }                      
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    //CODIGO DE CIERRE
    handleCloseQmcod  : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOKurztext").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOKurztext").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOKurztext").setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOKurztext").setName("");
          sap.ui.getCore().byId("MOKurztext").setValue("");
        }                      
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    // PROVINCIA
    handleClosePaBezei  : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOPaBezei").getName() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOPaBezei").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOPaBezei").setValue(oSelectedItem.getInfo());
        sap.ui.getCore().byId("MOPaCity1").setName("");
        sap.ui.getCore().byId("MOPaCity1").setValue("");
        sap.ui.getCore().byId("MOPaCity2").setName("");
        sap.ui.getCore().byId("MOPaCity2").setValue("");
        sap.ui.getCore().byId("MOPaStreet").setName("");
        sap.ui.getCore().byId("MOPaStreet").setValue("");
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOPaBezei").setName("");
          sap.ui.getCore().byId("MOPaBezei").setValue("");
        }                      
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    // CANTON
    handleClosePaCity1  : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOPaCity1").getName() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOPaCity1").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOPaCity1").setValue(oSelectedItem.getInfo());
        sap.ui.getCore().byId("MOPaCity2").setName("");
        sap.ui.getCore().byId("MOPaCity2").setValue("");
        sap.ui.getCore().byId("MOPaStreet").setName("");
        sap.ui.getCore().byId("MOPaStreet").setValue("");
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOPaCity1").setName("");
          sap.ui.getCore().byId("MOPaCity1").setValue("");
        }                      
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    // PARROQUIA
    handleClosePaCity2  : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOPaCity2").getName() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOPaCity2").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOPaCity2").setValue(oSelectedItem.getInfo());
        sap.ui.getCore().byId("MOPaStreet").setName("");
        sap.ui.getCore().byId("MOPaStreet").setValue("");
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOPaCity2").setName("");
          sap.ui.getCore().byId("MOPaCity2").setValue("");
        }                      
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    // CALLE
    handleClosePaStreet : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOPaStreet").getName() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOPaStreet").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOPaStreet").setValue(oSelectedItem.getInfo());
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOPaStreet").setName("");
          sap.ui.getCore().byId("MOPaStreet").setValue("");
        }                      
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
  
    handleCloseCaracteristica : function (oEvent) {  
  
      var idInput = sap.ui.getCore().byId("CaracteristicaDia").getTooltip();
  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId(idInput).getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId(idInput).setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId(idInput).setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
  
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId(idInput).setName("");
          sap.ui.getCore().byId(idInput).setValue("");
        }                      
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    //ACCION SOBRE MEDIDOR
    handleCloseAccionMed : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOAccionMedidor").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOAccionMedidor").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOAccionMedidor").setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOAccionMedidor").setName("");
          sap.ui.getCore().byId("MOAccionMedidor").setValue("");
        }    
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    // MEDIDOR CENTRALIZADO
    handleCloseTabCentral : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOTabCentral").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOTabCentral").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOTabCentral").setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOTabCentral").setName("");
          sap.ui.getCore().byId("MOTabCentral").setValue("");
        }    
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    // CENTRALIZADO COMPARTIDO
    handleCloseTabCentr : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOTabCentr").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOTabCentr").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOTabCentr").setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOTabCentr").setName("");
          sap.ui.getCore().byId("MOTabCentr").setValue("");
        }    
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    //PEC TIPO DE EQUIPO COCCION
    handleCloseTipoEquipoCo : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOTipoEquipoCo").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOTipoEquipoCo").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOTipoEquipoCo").setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOTipoEquipoCo").setName("");
          sap.ui.getCore().byId("MOTipoEquipoCo").setValue("");
        }                      
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    //PEC MARCA COCCION
    handleCloseMarcaCo  : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOMarcaCo").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOMarcaCo").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOMarcaCo").setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOMarcaCo").setName("");
          sap.ui.getCore().byId("MOMarcaCo").setValue("");
        }                      
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    //PEC MODELO COCCION
    handleCloseModeloCo : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOModeloCo").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOModeloCo").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOModeloCo").setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOModeloCo").setName("");
          sap.ui.getCore().byId("MOModeloCo").setValue("");
        }                      
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    //PEC TIPO DE EQUIPO CALENTAMIENTO
    handleCloseTipoEquipoCa : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOTipoEquipoCa").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOTipoEquipoCa").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOTipoEquipoCa").setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOTipoEquipoCa").setName("");
          sap.ui.getCore().byId("MOTipoEquipoCa").setValue("");
        }                      
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    //PEC MARCA CALENTAMIENTO
    handleCloseMarcaCa  : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOMarcaCa").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOMarcaCa").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOMarcaCa").setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOMarcaCa").setName("");
          sap.ui.getCore().byId("MOMarcaCa").setValue("");
        }                      
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    //PEC MODELO CALENTAMIENTO
    handleCloseModeloCa : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOModeloCa").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOModeloCa").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOModeloCa").setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOModeloCa").setName("");
          sap.ui.getCore().byId("MOModeloCa").setValue("");
        }                      
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    //PEC TIPO CONDUCTOR
    handleCloseTipoConductor  : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOTipoConductor").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOTipoConductor").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOTipoConductor").setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOTipoConductor").setName("");
          sap.ui.getCore().byId("MOTipoConductor").setValue("");
        }                      
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    //PEC TOMA DE CORRIENTE
    handleCloseTomaCorriente  : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOTomaCorriente").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOTomaCorriente").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOTomaCorriente").setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOTomaCorriente").setName("");
          sap.ui.getCore().byId("MOTomaCorriente").setValue("");
        }                      
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    //PEC PROTECCI�N
    handleCloseProteccion : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOProteccion").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOProteccion").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOProteccion").setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOProteccion").setName("");
          sap.ui.getCore().byId("MOProteccion").setValue("");
        }                      
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    //PEC CREDITO MESES PLAZO
    handleCloseCredMesplazoCi : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOCredMesplazoCi").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOCredMesplazoCi").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOCredMesplazoCi").setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOCredMesplazoCi").setName("");
          sap.ui.getCore().byId("MOCredMesplazoCi").setValue("");
        }                      
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    //PEC ESTADO INSTALACION INTERNA
    handleCloseEstInstInt : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOEstInstInt").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOEstInstInt").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOEstInstInt").setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOEstInstInt").setName("");
          sap.ui.getCore().byId("MOEstInstInt").setValue("");
        }                      
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    //Cierre de ayuda de busqueda
    handleCloseEquipo : function (oEvent) {  
  
      var name;
      var value;
      var sec;
  
      var idInput = sap.ui.getCore().byId("EquipoDia").getTooltip();
      if (idInput){
        //var oSelectedItem = oEvent.getParameter("selectedItem"); 
        //if (oSelectedItem && ( sap.ui.getCore().byId(idInput).getValue() != oSelectedItem.getTitle() ) ){
        //  sap.ui.getCore().byId(idInput).setName(oSelectedItem.getTitle());
        //  sap.ui.getCore().byId(idInput).setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
  
        //name  = oSelectedItem.getTitle();
        //value = oSelectedItem.getInfo();
        //}else{
        //  return;
        //}
  
        name  = sap.ui.getCore().byId(idInput).getName();
        value = sap.ui.getCore().byId(idInput).getValue();
      }else if (sap.ui.getCore().byId("EquipoDiaRet").getTooltip()){
        var idInput = sap.ui.getCore().byId("EquipoDiaRet").getTooltip();
        name  = sap.ui.getCore().byId(idInput).getName();
        value = sap.ui.getCore().byId(idInput).getValue();
      }else{
        idInput = "MONroEquipoE";
        name  = sap.ui.getCore().byId("MONroEquipoE").getName();
      }
      if(idInput.substr(idInput.length - 1,1) == "I"){
        sec = "I";
      }else if(idInput.substr(idInput.length - 1,1) == "R"){
        sec = "R";
      }else{
        sec = "E";
      }
      if(idInput == 'MOMediAnt' || idInput == 'MOMediPost'){
        return;
      }
  
      //var oSelectedItem = oEvent.getParameter("selectedItem");  
      //if (oSelectedItem && ( sap.ui.getCore().byId(idInput).getValue() != oSelectedItem.getTitle() ) ) {
  
      //sap.ui.getCore().byId(idInput).setName(oSelectedItem.getTitle());
      //sap.ui.getCore().byId(idInput).setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
  
      //se procede a habilitar campos de secci�n instalado
      // Se cre objeto Json
      var oModelJson =  new sap.ui.model.json.JSONModel();
      // Lectura correcta
      var lecturaCorrecta = function(oData, oResponse){
        // se asocia el modelo JSON al ODATA
        oModelJson.setData(oData);
  
        //LOGICA PARA HABILITAR SECCION DE INSTALADOS
        var validaCampos =  Object.getOwnPropertyNames(oData);
  
        try{
          if(idInput == "MONroEquipoI"){
            for (var i = 1; i < validaCampos.length; i++) {
              var id      = 'MO' + validaCampos[i];
              var value     = "/" + validaCampos[i];
  
              if(oModelJson.getProperty(value) == 'X'){
                sap.ui.getCore().byId(id).setEditable(true);
                if (sap.ui.getCore().byId(id).getValueHelpOnly()){
                  sap.ui.getCore().byId(id).setShowValueHelp(true);
                  sap.ui.getCore().byId(id).setValueHelpOnly(true);
                  sap.ui.getCore().byId(id).setEditable(true);
                  sap.ui.getCore().byId(id).removeStyleClass("divInputOrden");
                  sap.ui.getCore().byId(id).addStyleClass("divInputOrdenShEna");
                }
                var idNum = "/" + validaCampos[i] + 'Numx';
                if(oModelJson.getProperty(idNum)){
                  sap.ui.getCore().byId(id).setTooltip(oModelJson.getProperty(idNum));
                }
              }
            }
          }else if(idInput == "MONroEquipoR"){
            for (var i = 1; i < validaCampos.length; i++) {
              var id = 'MO' + validaCampos[i];
              var value = "/" + validaCampos[i];
              //alert(id.getMetadata().getName());
              if(oModelJson.getProperty(value) == 'X'){
                sap.ui.getCore().byId(id).setEditable(true);
                if (sap.ui.getCore().byId(id).getValueHelpOnly()){
                  sap.ui.getCore().byId(id).setShowValueHelp(true);
                  sap.ui.getCore().byId(id).setValueHelpOnly(true);
                  sap.ui.getCore().byId(id).setEditable(true);
                  sap.ui.getCore().byId(id).removeStyleClass("divInputOrden");
                  sap.ui.getCore().byId(id).addStyleClass("divInputOrdenShEna");
                }
                var idNum = "/" + validaCampos[i] + 'Numx';
                if(oModelJson.getProperty(idNum)){
                  sap.ui.getCore().byId(id).setTooltip(oModelJson.getProperty(idNum));
                }
              }
            }
          }else if(idInput == "MONroEquipoE"){
            for (var i = 1; i < validaCampos.length; i++) {
              var id = 'MO' + validaCampos[i];
              var value = "/" + validaCampos[i];
              if(oModelJson.getProperty(value) == 'X'){
                sap.ui.getCore().byId(id).setEditable(true);
                if (sap.ui.getCore().byId(id).getValueHelpOnly()){
                  sap.ui.getCore().byId(id).setShowValueHelp(true);
                  sap.ui.getCore().byId(id).setValueHelpOnly(true);
                  sap.ui.getCore().byId(id).setEditable(true);
                  sap.ui.getCore().byId(id).removeStyleClass("divInputOrden");
                  sap.ui.getCore().byId(id).addStyleClass("divInputOrdenShEna");
                }
                var idNum = "/" + validaCampos[i] + 'Numx';
                if(oModelJson.getProperty(idNum)){
                  sap.ui.getCore().byId(id).setTooltip(oModelJson.getProperty(idNum));
                }
              }
            }
          }
        }catch(error){
  
        }
      }
  
       //Lectura incorrecta
      var lecturaIncorrecta = function(oError){
        var mensaje = "Error: "+JSON.parse(oError.response.body).error.message.value;
        sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
        return;
      }
  
      //llamada a la validaci�n de equipos
      var llamada = "validaNumSet(Equnr='"+ name +
      "',Seccion='" +  sec + "')";
  
      sap.ui.getCore().getModel("oModelSAP").read(llamada, null, null, false, lecturaCorrecta, lecturaIncorrecta);
  
      //if(oSelectedItem){
      //  if (oSelectedItem.getTitle() == "...."){
      //    sap.ui.getCore().byId(idInput).setName("");
      //    sap.ui.getCore().byId(idInput).setValue("");
      //  }                      
        //}
    //    oEvent.getSource().getBinding("items").filter([]);
    //  }
      sap.ui.getCore().byId("EquipoDia").setTooltip(undefined);
      sap.ui.getCore().byId("EquipoDiaRet").setTooltip(undefined);
    },
  
    // CIERRE DE CNR - METODO
    handleCloseMetodo : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOMetodo").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOMetodo").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOMetodo").setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
        //se recupera obtenci�n de demanda
        if( oSelectedItem.getTitle() != '03' ) { //censo de carga
          sap.ui.getCore().byId("MOFormCnrCen").setVisible(false);
          sap.ui.getCore().byId("MOTablaCe").setVisible(false);
  
          //sap.ui.getCore().byId("MOSecCnr").removeContent("MOFormCnrCen");
  
        }
        if( oSelectedItem.getTitle() == '03' ) { //censo de carga
  
          //se realiza llamada a isu para validar franjas horarias
          var oModelJson =  new sap.ui.model.json.JSONModel();
  
          var lecturaCorrecta = function(oData, oResponse){;
            oModelJson.setData(oData);
            var Error = oModelJson.getProperty("/Error");
            if(Error == "X"){
              sap.ui.getCore().byId("MOFormCnrCen").setVisible(false);
              sap.ui.getCore().byId("MOTablaCe").setVisible(false);
              var mensaje = "Censo de Carga no permitido para clientes que miden franjas horarias";
              sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
              return;
            }else{
              sap.ui.getCore().byId("MOFormCnrCen").setVisible(true);
              sap.ui.getCore().byId("MOTablaCe").setVisible(false);
            }
          }
  
          // Lectura incorrecta
          var lecturaIncorrecta = function(oError){
            sap.m.MessageToast.show(JSON.parse(oError.response.body).error.message.value, {
              width: "300px",                  
              my: "center center",         
              at: "center center",          
              of: window,                  
              offset: "0 0",               
              collision: "fit fit",         
              onClose: null,             
              autoClose: true,             
              animationTimingFunction: "ease", 
              animationDuration: 100,    
              closeOnBrowserNavigation: true   
            });
          }
          var equnr     =    sap.ui.getCore().byId("MONroEquipoE").getName();
          var llamada   = "/validaFranjaSet(Equnr='" + equnr + "')";
          sap.ui.getCore().getModel("oModelSAP").read(llamada, null, null, false, lecturaCorrecta, lecturaIncorrecta);
        }
        if( oSelectedItem.getTitle() != '04' ) { //Porcentaje de error
          sap.ui.getCore().byId("MOFormCnrPor").setVisible(false);
        }
        if( oSelectedItem.getTitle() == '04' ) { //Porcentaje de error
          sap.ui.getCore().byId("MOFormCnrPor").setVisible(true);
  
          //se realiza llamada a isu para habilitar los tipos de energ�a seg�n la instalaci�n
          var oModelJson =  new sap.ui.model.json.JSONModel();
  
          var lecturaCorrecta = function(oData, oResponse){;
            oModelJson.setData(oData);
            var tarifart = oModelJson.getProperty("/Tarifart");
            if(/EA/.test(oModelJson.getProperty("/Tarifart"))){
              sap.ui.getCore().byId("MOPorcAct").setVisible(true);
              sap.ui.getCore().byId("MOLblPorcAct").setVisible(true);
            }
            if(/ER/.test(oModelJson.getProperty("/Tarifart"))){
              sap.ui.getCore().byId("MOPorcRea").setVisible(true);
              sap.ui.getCore().byId("MOLblPorcRea").setVisible(true);
            }
            if(/DE/.test(oModelJson.getProperty("/Tarifart"))){
              sap.ui.getCore().byId("MOPorcDem").setVisible(true);
              sap.ui.getCore().byId("MOLblPorcDem").setVisible(true);
            }
          }
  
          // Lectura incorrecta
          var lecturaIncorrecta = function(oError){
            sap.m.MessageToast.show(JSON.parse(oError.response.body).error.message.value, {
              width: "300px",                  
              my: "center center",         
              at: "center center",          
              of: window,                  
              offset: "0 0",               
              collision: "fit fit",         
              onClose: null,             
              autoClose: true,             
              animationTimingFunction: "ease", 
              animationDuration: 100,    
              closeOnBrowserNavigation: true   
            });
          }
          var orden     = sap.ui.getCore().getModel("oModelModOrd").getProperty("/orden");
          var llamada   = "/tipEnergiaSet(Aufnr='" + orden + "')";
          sap.ui.getCore().getModel("oModelSAP").read(llamada, null, null, false, lecturaCorrecta, lecturaIncorrecta);
  
        }
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOMetodo").setName("");
          sap.ui.getCore().byId("MOMetodo").setValue("");
        }    
      }
      //oEvent.getSource().getBinding("items").filter([]);
    },
  
    // CIERRE DE CNR - M�TODO OBTENCI�N DEMANDA
    handleCloseMeobde : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOMeobde").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOMeobde").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOMeobde").setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
        //se ocultan secciones
        if( oSelectedItem.getTitle() != '02' ) { //censo de carga
          sap.ui.getCore().byId("MOTablaCe").setVisible(false);
          sap.ui.getCore().byId("MODemandaKw").setEditable(true);
          sap.ui.getCore().byId("MOCodipr").setEditable(true);
        }else{
          sap.ui.getCore().byId("MOTablaCe").setVisible(true);
          sap.ui.getCore().byId("MODemandaKw").setEditable(false);
          sap.ui.getCore().byId("MOCodipr").setEditable(false);
          sap.ui.getCore().byId("MODemandaKw").setName("");
          sap.ui.getCore().byId("MODemandaKw").setValue("");
          sap.ui.getCore().byId("MOCodipr").setName("");
          sap.ui.getCore().byId("MOCodipr").setValue("");
        }
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOMeobde").setName("");
          sap.ui.getCore().byId("MOMeobde").setValue("");
        }    
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    // CIERRE DE CNR - Censo Total o Adicionar Valor
    handleCloseCetode : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOCetode").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOCetode").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOCetode").setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOCetode").setName("");
          sap.ui.getCore().byId("MOCetode").setValue("");
        }    
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    //PUNTO DE RED
    handleClosePtoRed : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOGridName2").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOGridName2").setName(oSelectedItem.getInfo());
        sap.ui.getCore().byId("MOGridName2").setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOGridName2").setName("");
          sap.ui.getCore().byId("MOGridName2").setValue("");
        }                      
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    //NIVEL DE RED
    handleCloseNivRed : function (oEvent) {  
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOGridLevel").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOGridLevel").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOGridLevel").setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MMOGridLevel").setName("");
          sap.ui.getCore().byId("MOGridLevel").setValue("");
        }                      
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    //Tipo de Material
    handleCloseTipoMR : function (oEvent) { 
      var oSelectedItem = oEvent.getParameter("selectedItem");  
      if (oSelectedItem && ( sap.ui.getCore().byId("MOInTipMR").getValue() != oSelectedItem.getTitle() ) ) {
        sap.ui.getCore().byId("MOInTipMR").setName(oSelectedItem.getTitle());
        sap.ui.getCore().byId("MOInTipMR").setValue(oSelectedItem.getTitle() + " | " + oSelectedItem.getInfo());
        if (oSelectedItem.getTitle() == "...."){
          sap.ui.getCore().byId("MOInTipMR").setName("");
          sap.ui.getCore().byId("MOInTipMR").setValue("");
        }                      
      }
      oEvent.getSource().getBinding("items").filter([]);
    },
  
    // ========================================================
    // METODOS PARA TABLA MATERIAL RETIRADO
    // ========================================================
    //Agrega filas a tabla Material retirado
    doAgregaMatRet: function(){
  
      var oModelJsonMatRet = sap.ui.getCore().getModel("oModelJsonMatRet");
      var oEntryMatRet   = oModelJsonMatRet.getProperty("/");
      oEntryMatRet.push({
        Matnr   : "",
        Descripcion : "",
        Cantidad    : "",
        EstadoMat   : "",
      });
      sap.ui.getCore().getModel("oModelJsonMatRet").refresh();
    },
  
    doQuitaMatRet: function(e){
      //se obtiene el indice de la fila seleccionada
      var idx = this.getParent().getParent()._oSelection.aSelectedIndices[0];
      if (idx !== -1){
        var oModelJsonMatRet = sap.ui.getCore().getModel("oModelJsonMatRet");
        var oEntryMatRet   = oModelJsonMatRet.getProperty("/");
        oEntryMatRet.splice(idx, 1);
        oModelJsonMatRet.refresh();
        return;
        //}
      } else {
        sap.m.MessageToast.show('Por favor seleccione una Fila');
      }
      sap.ui.getCore().byId("MOTablaMr").clearSelection();
    },
  
    doRetMatnrAyudaBusqueda: function(){
  
      //limpia informaci�n
      sap.ui.getCore().byId("MOInTipMR").setValue("");
      sap.ui.getCore().byId("MOInDesMR").setValue("");
      sap.ui.getCore().byId("MOInTipMR").setName("");
      sap.ui.getCore().byId("MOInDesMR").setName("");
  
      //se obtiene ids
      var description = this.getId().split("-");
      var idDesc = "MORetDesMatnrIn" + "-" + "col1" + "-" + description[2];
  
      sap.ui.getCore().byId("MORetMatnrIn").setDescription(this.getId() + "|" + idDesc); 
  
      if (!sap.ui.getCore().byId("MOContFormAyudaMR").isOpen()){
        sap.ui.getCore().byId("MOContFormAyudaMR").open();
        return;
      }
  
  
      /*var iRowIndex = this.getParent().getIndex();
      var cell      = this.getParent().getCells();
  
      //Se obtiene la orden
      var orden = sap.ui.getCore().getModel("oModelModOrd").getProperty("/orden");
      var clase = sap.ui.getCore().getModel("oModelModOrd").getProperty("/clase");
  
      // se lee el usuario actual
      var user = MYSAP.SessionManager.getUser('user');
  
      //se obtiene id del dialogo
      var dialogoId;
  
      //filtro con centro
      var filterCentro = new sap.ui.model.Filter("Werks", sap.ui.model.FilterOperator.EQ, user.werks );
      var filterArbpl  = new sap.ui.model.Filter("Arbpl", sap.ui.model.FilterOperator.EQ, sap.ui.getCore().byId("MOArtxt").getName());
  
      //b�squeda
      var handleSearch = function (oEvent) {
        var user = MYSAP.SessionManager.getUser('user');
  
        var sValue = oEvent.getParameter("value"); 
        var oFilter1 = new sap.ui.model.Filter("Werks", sap.ui.model.FilterOperator.EQ, user.werks );
        var oFilter2  = new sap.ui.model.Filter("Arbpl", sap.ui.model.FilterOperator.EQ, sap.ui.getCore().byId("MOArtxt").getName() );
        var oFilter3 = new sap.ui.model.Filter("Maktx", sap.ui.model.FilterOperator.Contains, sValue);
        oEvent.getSource().getBinding("items").filter([oFilter1,oFilter2,oFilter3]);
      };
  
      // cierre de ayuda
      var handleClose = function (oEvent) {  
        var oSelectedItem = oEvent.getParameter("selectedItem");  
        if (oSelectedItem) {  
          sap.ui.getCore().byId(dialogoId).setValue(oSelectedItem.getTitle());
          sap.ui.getCore().byId(dialogoId).setName(oSelectedItem.getInfo());
          cell[1].setValue(oSelectedItem.getInfo());
          oEvent.getSource().getBinding("items").filter([]);
          oEvent.getSource().destroy();
        }
      }
  
      this._valueHelpSelectDialog = new sap.m.SelectDialog({  
        title   : "Material",  
        items   : {  
          path    : "/matnrSet",  
          template  : new sap.m.StandardListItem({  
            title: "{Matnr}",
            info : "{Maktx}",
            active: true}),
        },
        liveChange  : handleSearch,
        search    : handleSearch,
        confirm   : handleClose,  
        cancel    : handleClose}); 
      this._valueHelpSelectDialog.setModel(sap.ui.getCore().getModel("oModelSAP"));
      //sap.ui.getCore().byId("MORetMatnrDia").getBinding("items").filter([filterCentro, filterArbpl]);
      sap.ui.getCore().byId(this._valueHelpSelectDialog.getId()).getBinding("items").filter([filterCentro, filterArbpl]);
      dialogoId = this.getId();
      this._valueHelpSelectDialog.open();   */
    },
  
    doRetEstMatnrAyudaBusqueda: function(){
      var iRowIndex = this.getParent().getIndex();
      var cell      = this.getParent().getCells();
  
      // se lee el usuario actual
      var user = MYSAP.SessionManager.getUser('user');
  
      //se obtiene id del dialogo
      var dialogoId;
  
      //filtro con centro
      var oFilter1 = new sap.ui.model.Filter("Domname", sap.ui.model.FilterOperator.EQ, 'ZD_ESTA_MAT' );
  
      // cierre de ayuda
      var handleClose = function (oEvent) {  
        var oSelectedItem = oEvent.getParameter("selectedItem");  
        if (oSelectedItem) {  
          sap.ui.getCore().byId(dialogoId).setValue(oSelectedItem.getTitle() + '|' + oSelectedItem.getInfo());
          sap.ui.getCore().byId(dialogoId).setName(oSelectedItem.getTitle());
          oEvent.getSource().getBinding("items").filter([]);
          oEvent.getSource().destroy();
        }
      }
  
      this._valueHelpSelectDialog = new sap.m.SelectDialog({  
        title   : "Estado Material",  
        items   : {  
          path    : "/dominioSet",  
          template  : new sap.m.StandardListItem({  
            title: "{DomvalueL}",
            info : "{Ddtext}",
            active: true}),
        },
        //liveChange  : handleSearch,
        //search    : handleSearch,
        confirm   : handleClose,  
        cancel    : handleClose}); 
      this._valueHelpSelectDialog.setModel(sap.ui.getCore().getModel("oModelSAP"));
      //sap.ui.getCore().byId("MORetEstMatnrDia").getBinding("items").filter([oFilter1]);
      sap.ui.getCore().byId(this._valueHelpSelectDialog.getId()).getBinding("items").filter([oFilter1]);
      dialogoId = this.getId();
      this._valueHelpSelectDialog.open();
    },
  
  
    // ========================================================
    // METODOS PARA TABLA SELLOS
    // ========================================================
    //Agrega filas a tabla Sellos
    doAgregaSellos: function(){
  
      var oModelJsonSellos = sap.ui.getCore().getModel("oModelJsonSellos");
      var oEntrySellos   = oModelJsonSellos.getProperty("/");
      oEntrySellos.push({
        NroSello    : "",
        Tipo            : "",
        Color           : "",
        Ubicacion       : "",
        Instalado       : "",
        Removido        : "",
        Perdido     : "",
        Reemplazado   : "",
        TipoInstal      : "",
        NroSerinstal    : "",
        Reemplazado     : ""
      });
      sap.ui.getCore().getModel("oModelJsonSellos").refresh();
    },
  
    doQuitaSellos: function(e){
  
      //se obtiene el indice de la fila seleccionada
      var idx = this.getParent().getParent()._oSelection.aSelectedIndices[0];
      if (idx !== -1){
        var oModelJsonSellos = sap.ui.getCore().getModel("oModelJsonSellos");
        var oEntrySellos   = oModelJsonSellos.getProperty("/");
        oEntrySellos.splice(idx, 1);
        oModelJsonSellos.refresh();
        return;
        //}
      } else {
        sap.m.MessageToast.show('Por favor seleccione una Fila');
      }
      sap.ui.getCore().byId("MOTablaSe").clearSelection();
    },
  
    //Tipo Sellos
    doTipoSelloAyudaBusqueda: function(oEvent) {
      var iRowIndex = this.getParent().getIndex();
      var cell      = this.getParent().getCells();
      //se obtiene id del dialogo
      var dialogoId;
  
      var oFilter1 = new sap.ui.model.Filter("Scode", sap.ui.model.FilterOperator.Contains, cell[0].getValue());
  
  
      //b�squeda
      var handleSearch = function (oEvent) {
        var sValue = oEvent.getParameter("value"); 
        var oFilter1 = new sap.ui.model.Filter("Scode", sap.ui.model.FilterOperator.Contains, cell[0].getValue());
        var oFilter2 = new sap.ui.model.Filter("Scat", sap.ui.model.FilterOperator.Contains, sValue);
        oEvent.getSource().getBinding("items").filter([oFilter1,oFilter2]);
      };
  
      // cierre de ayuda
      var handleClose = function (oEvent) {  
        var oSelectedItem = oEvent.getParameter("selectedItem");  
        if (oSelectedItem) {  
          sap.ui.getCore().byId(dialogoId).setValue(oSelectedItem.getTitle());
          sap.ui.getCore().byId(dialogoId).setName(oSelectedItem.getInfo());
  
          var rows = sap.ui.getCore().byId("MOTablaSe").getRows();
          var row0 = rows[0].getCells();
          var nroSello  = row0[0].getValue();
          var tipoSello = row0[1].getValue();
          for (var i = 1; i < rows.length; i++) {
            var row = rows[i].getCells();
            if  ( row[0].getValue() == nroSello &&
                row[1].getValue() == tipoSello ){
              mensaje = 'No se puede ingresar nro. de sellos y tipos duplicados';
              sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
            }
          }
  
          // Se cre objeto Json
          var oModelJson =  new sap.ui.model.json.JSONModel();
          // Lectura correcta
          var lecturaCorrecta = function(oData, oResponse){
            // se asocia el modelo JSON al ODATA
            oModelJson.setData(oData);
            cell[2].setValue(oModelJson.getProperty("/Text20"));
          }
  
          // Lectura incorrecta
          var lecturaIncorrecta = function(oError){
            var mensaje = "Error: "+JSON.parse(oError.response.body).error.message.value;
            sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
            return;
          }
  
          //llamada a la orden
          var llamada = "colorSelloSet(Scat='"+
          oSelectedItem.getTitle()+
          "')";
          sap.ui.getCore().getModel("oModelSAP").read(llamada, null, null, false, lecturaCorrecta, lecturaIncorrecta);
          oEvent.getSource().getBinding("items").filter([]);
          oEvent.getSource().destroy();
  
  
        }
      };  
  
      this._valueHelpSelectDialog = new sap.m.SelectDialog({  
        title   : "Tipo Sello",  
        items   : {  
          path    : "/tipoSelloSet",  
          template  : new sap.m.StandardListItem({  
            title: "{Scat}",
            info : "{Text30}",
            active: true}),
        },
        liveChange  : handleSearch,
        search    : handleSearch,
        confirm   : handleClose,  
        cancel    : handleClose}); 
      this._valueHelpSelectDialog.setModel(sap.ui.getCore().getModel("oModelSAP"));
      sap.ui.getCore().byId(this._valueHelpSelectDialog.getId()).getBinding("items").filter([oFilter1]);
      dialogoId = this.getId();
      this._valueHelpSelectDialog.open();
    },
  
    //Ubicaci�n Sellos
    doUbicaSelloAyudaBusqueda: function(oEvent) {
      //se obtiene id del dialogo
      var dialogoId;
  
      //b�squeda
      var handleSearch = function (oEvent) { 
        var sValue = oEvent.getParameter("value"); 
        var oFilter1 = new sap.ui.model.Filter("Descripcion", sap.ui.model.FilterOperator.Contains, sValue);
        oEvent.getSource().getBinding("items").filter([oFilter1]);
      };
  
      // cierre de ayuda
      var handleClose = function (oEvent) {  
        var oSelectedItem = oEvent.getParameter("selectedItem");  
        if (oSelectedItem) {  
          sap.ui.getCore().byId(dialogoId).setValue(oSelectedItem.getTitle());
          sap.ui.getCore().byId(dialogoId).setName(oSelectedItem.getInfo());
          oEvent.getSource().getBinding("items").filter([]);
          oEvent.getSource().destroy();
        }
      };  
  
      this._valueHelpSelectDialog = new sap.m.SelectDialog({  
        title   : "Ubicaci�n Sello",  
        items   : {  
          path    : "/ubicaSelloSet",  
          template  : new sap.m.StandardListItem({  
            title: "{Codigo}",
            info : "{Descripcion}",
            active: true}),
        },
        liveChange  : handleSearch,
        search    : handleSearch,
        confirm   : handleClose,  
        cancel    : handleClose}); 
      this._valueHelpSelectDialog.setModel(sap.ui.getCore().getModel("oModelSAP"));
      sap.ui.getCore().byId(this._valueHelpSelectDialog.getId()).getBinding("items");
      dialogoId = this.getId();
      this._valueHelpSelectDialog.open();      
    },
  
    //Tipo Sellos Nuevo
    doTipoSelloNewAyudaBusqueda: function(oEvent) {
      var iRowIndex = this.getParent().getIndex();
      var cell      = this.getParent().getCells();
      var dialogoId;
  
      var oFilter1 = new sap.ui.model.Filter("Scode", sap.ui.model.FilterOperator.Contains, cell[9].getValue());
  
      //b�squeda
      var handleSearch = function (oEvent) {
        var sValue = oEvent.getParameter("value"); 
        var oFilter2 = new sap.ui.model.Filter("Scat", sap.ui.model.FilterOperator.Contains, sValue);
        oEvent.getSource().getBinding("items").filter([oFilter1,oFilter2]);
      };
  
      // cierre de ayuda
      var handleClose = function (oEvent) {  
        var oSelectedItem = oEvent.getParameter("selectedItem");  
        if (oSelectedItem) {  
          sap.ui.getCore().byId(dialogoId).setValue(oSelectedItem.getTitle());
          sap.ui.getCore().byId(dialogoId).setName(oSelectedItem.getInfo());
        }
        oEvent.getSource().getBinding("items").filter([]);
        //var source = oEvent.getSource();
        //alert(source.getMetadata().getName());
        oEvent.getSource().destroy();
      };  
  
      this._valueHelpSelectDialog = new sap.m.SelectDialog({
        title   : "Tipo Sello",  
        items   : {  
          path    : "/tipoSelloSet",  
          template  : new sap.m.StandardListItem({  
            title: "{Scat}",
            info : "{Text30}",
            active: true}),
        },
        liveChange  : handleSearch,
        search    : handleSearch,
        confirm   : handleClose,  
        cancel    : handleClose}); 
      this._valueHelpSelectDialog.setModel(sap.ui.getCore().getModel("oModelSAP"));
      sap.ui.getCore().byId(this._valueHelpSelectDialog.getId()).getBinding("items").filter([oFilter1]);
      dialogoId = this.getId();
      this._valueHelpSelectDialog.open();
    },
  
    //Motivo de Remoci�n sello
    doRemoveSelloAyudaBusqueda: function(oEvent) {
      //se obtiene id del dialogo
      var dialogoId;
  
      //b�squeda
      var handleSearch = function (oEvent) {
        var sValue = oEvent.getParameter("value"); 
        oEvent.getSource().getBinding("items").filter([oFilter1]);
      };
  
      // cierre de ayuda
      var handleClose = function (oEvent) {  
        var oSelectedItem = oEvent.getParameter("selectedItem");  
        if (oSelectedItem) {  
          sap.ui.getCore().byId(dialogoId).setValue(oSelectedItem.getTitle());
          sap.ui.getCore().byId(dialogoId).setName(oSelectedItem.getInfo());
          oEvent.getSource().getBinding("items").filter([]);
          oEvent.getSource().destroy();
        }
      };  
  
      this._valueHelpSelectDialog = new sap.m.SelectDialog({  
        title   : "Raz�n para Remover...",  
        items   : {  
          path    : "/removeSelloSet",  
          template  : new sap.m.StandardListItem({  
            title: "{Remreason}",
            info : "{RemreasonLong}",
            active: true}),
        },
        liveChange  : handleSearch,
        search    : handleSearch,
        confirm   : handleClose,  
        cancel    : handleClose}); 
      this._valueHelpSelectDialog.setModel(sap.ui.getCore().getModel("oModelSAP"));
      sap.ui.getCore().byId(this._valueHelpSelectDialog.getId()).getBinding("items");
      dialogoId = this.getId();
      this._valueHelpSelectDialog.open();
    },
  
    doSelectedSello: function(oEvent){
      var iRowIndex = this.getParent().getIndex();
      var cell      = this.getParent().getCells();
      var idCheck   = this.getId();
      var estatus; 
      var estatusnew;
      var mensaje;
  
      if(!cell[0].getValue()){
        mensaje = "Debe ingresar Nro. de sello";
        sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
        return;
      }
      // Se cre objeto Json
      var oModelJson =  new sap.ui.model.json.JSONModel();
      // Lectura correcta
      var lecturaCorrecta = function(oData, oResponse){
        // se asocia el modelo JSON al ODATA
        oModelJson.setData(oData);
        estatus    = oModelJson.getProperty("/Status");
        estatusnew = oModelJson.getProperty("/StatusNew");
  
        if(sap.ui.getCore().byId(idCheck).getSelected()){
  
          if (idCheck.match("MOSelloIn")){
            sap.ui.getCore().byId(cell[5].getId()).setSelected(false);
            sap.ui.getCore().byId(cell[6].getId()).setSelected(false);
            sap.ui.getCore().byId(cell[7].getId()).setSelected(false);
            sap.ui.getCore().byId(cell[9].getId()).setEditable(false);
            if(estatus != "S"){
              mensaje = 'Sello no se encuentra en estado Disponible';
              sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
              sap.ui.getCore().byId(idCheck).setSelected(false);
              return;
            }else{
              sap.ui.getCore().byId(idCheck).setSelected(true);
            }
          }
          if (idCheck.match("MOSelloRe")){
            sap.ui.getCore().byId(cell[4].getId()).setSelected(false);
            sap.ui.getCore().byId(cell[6].getId()).setSelected(false);
            sap.ui.getCore().byId(cell[7].getId()).setSelected(false);
            sap.ui.getCore().byId(cell[9].getId()).setEditable(false);
            if(estatus != "I"){
              mensaje = 'Sello no se encuentra en estado Instalado';
              sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
              sap.ui.getCore().byId(idCheck).setSelected(false);
              return;
            }
          }
          if (idCheck.match("MOSelloPe")){
            sap.ui.getCore().byId(cell[4].getId()).setSelected(false);
            sap.ui.getCore().byId(cell[5].getId()).setSelected(false);
            sap.ui.getCore().byId(cell[7].getId()).setSelected(false);
            sap.ui.getCore().byId(cell[9].getId()).setEditable(false);
            if(estatus != "I"){
              mensaje = 'Sello no se encuentra en estado Instalado';
              sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
              sap.ui.getCore().byId(idCheck).setSelected(false);
              return;
            }
          }
          if (idCheck.match("MOSelloRp")){
            sap.ui.getCore().byId(cell[4].getId()).setSelected(false);
            sap.ui.getCore().byId(cell[5].getId()).setSelected(false);
            sap.ui.getCore().byId(cell[6].getId()).setSelected(false);
            if(estatus != "I"){
              mensaje = 'Sello no se encuentra en estado Instalado';
              sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
              sap.ui.getCore().byId(idCheck).setSelected(false);
              return;
            }
            //verifica que este el sello nuevo disponible
            if(cell[9].getValue()){
              if(estatusnew != "S"){
                mensaje = 'Sello no se encuentra en estado Disponible';
                sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
                sap.ui.getCore().byId(idCheck).setSelected(false);
                return;
              }
            }else{
              mensaje = 'Debe ingresar sello nuevo';
              sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
              sap.ui.getCore().byId(idCheck).setSelected(false);
              return;
            }
          }
        }
      }
  
      // Lectura incorrecta
      var lecturaIncorrecta = function(oError){
        mensaje = "Error: "+JSON.parse(oError.response.body).error.message.value;
        sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
        return;
        //sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
      }
  
      //llamada al set
      var llamada = "estatusSelloSet(IScode='"+
      cell[0].getValue()+
      "',IScat='"+
      cell[1].getValue()+
      "',IScatNew='"+
      cell[8].getValue()+
      "',IScodeNew='"+
      cell[9].getValue()+
      "')";
  
      sap.ui.getCore().getModel("oModelSAP").read(llamada, null, null, false, lecturaCorrecta, lecturaIncorrecta);
    },
  
    // ========================================================
    // METODOS PARA TABLA COMPONENTES
    // ========================================================
    //COMPONENTES
    doAgregaCo: function(){
      var posnr;
      var oModelJsonCompo  = sap.ui.getCore().getModel("oModelJsonCompo");
      var componentes    = oModelJsonCompo.getProperty("/");
      var indiceFila  = componentes.length - 1
      if (indiceFila < 0 ) {
        posnr = "0010";
      }else{
        posnr = parseInt(oModelJsonCompo.getProperty("/"+indiceFila+"/Posnr")) + 10;
        posnr = ("000" + posnr).slice (-4);
  
      }
      var vornr
  
      // se lee el usuario actual
      var user = MYSAP.SessionManager.getUser('user');
  
      // Se cre objeto Json
      var oModelJson =  new sap.ui.model.json.JSONModel();
      // Lectura correcta
      var lecturaCorrecta = function(oData, oResponse){
        // se asocia el modelo JSON al ODATA
        oModelJson.setData(oData);
        if(oModelJson.getProperty("/Vornr")){
          vornr = oModelJson.getProperty("/Vornr");
          //werks = oModelJson.getProperty("/Werks");
        }
      }
  
      // Lectura incorrecta
      var lecturaIncorrecta = function(oError){
        sap.m.MessageToast.show(JSON.parse(oError.response.body).error.message.value, {
          width: "300px",                  
          my: "center center",         
          at: "center center",          
          of: window,                  
          offset: "0 0",               
          collision: "fit fit",         
          onClose: null,             
          autoClose: false,             
          animationTimingFunction: "ease", 
          animationDuration: 100,    
          closeOnBrowserNavigation: true   
        });
      }
  
      //llamada para obtener operaci�n
      var llamada = "vornrSet(Aufnr='"+
      sap.ui.getCore().getModel("oModelModOrd").getProperty("/orden")+
      "')";
  
      sap.ui.getCore().getModel("oModelSAP").read(llamada, null, null, false, lecturaCorrecta, lecturaIncorrecta);
  
      componentes.push({
        Posnr   : posnr,
        Matnr   : "",
        Matxt       : "",
        Menge       : "",
        Einheit     : "",
        Postp       : "",
        Werks       : "",
        Vornr   : vornr,
        Charg   : "",
      });
          
      sap.ui.getCore().getModel("oModelJsonCompo").refresh();
    },
  
    doQuitaCo: function(e){
      //se obtiene el indice de la fila seleccionada
      var idx = this.getParent().getParent()._oSelection.aSelectedIndices[0];
      if (idx !== -1){
        var oModelJsonCompo = sap.ui.getCore().getModel("oModelJsonCompo");
        var oEntryCompo  = oModelJsonCompo.getProperty("/");
        oEntryCompo.splice(idx, 1);
        oModelJsonCompo.refresh();
        return;
        //}
      } else {
        sap.m.MessageToast.show('Por favor seleccione una Fila');
      }
      sap.ui.getCore().byId("MOTablaCo").clearSelection();
    },
  
    //Ayudas de busqueda para COMPONENTES
  
    //Material
    doCompoMatnrAyudaBusqueda: function(oEvent) {
      window.idCompo   = this.getId();
      window.rowCompo  = this.getParent().getIndex();
      window.cellCompo = this.getParent().getCells();
  
      if (!sap.ui.getCore().byId("MOContFormMatnr").isOpen()){
  
        // se lee el usuario actual
        var user = MYSAP.SessionManager.getUser('user');
        if (user.usuario == null ) {
          return;
        } 
  
        var filter = new sap.ui.model.Filter("Werks", sap.ui.model.FilterOperator.EQ, user.werks );
        var filter2  = new sap.ui.model.Filter("Arbpl", sap.ui.model.FilterOperator.EQ, sap.ui.getCore().byId("MOArtxt").getName());
        var filter3  = new sap.ui.model.Filter("Beber", sap.ui.model.FilterOperator.EQ, sap.ui.getCore().byId("MOAgencia").getName());
  
        sap.ui.getCore().byId("MOTablaMatnr").setModel(sap.ui.getCore().getModel("oModelSAP"));
        sap.ui.getCore().byId("MOTablaMatnr").bindRows("/matnrSet", null, null,[ filter, filter2, filter3])
        sap.ui.getCore().byId("MOContFormMatnr").open();
        return;
      }
  
      /*var iRowIndex = this.getParent().getIndex();
      var cell      = this.getParent().getCells();
  
      //Se obtiene nro.orden y clase
      var orden = sap.ui.getCore().getModel("oModelModOrd").getProperty("/orden");
      var clase = sap.ui.getCore().getModel("oModelModOrd").getProperty("/clase");
  
      // se lee el usuario actual
      var user = MYSAP.SessionManager.getUser('user');
      if (user.usuario == null ) {
        return;
      } 
  
      //id del dialogo
      var dialogoId;
  
      if (user.werks == null) {
        //debe ingresar Centro
        sap.m.MessageToast.show('Se debe ingresar un Centro');
        return;
      }
      //filtro con centro
      var filterCentro = new sap.ui.model.Filter("Werks", sap.ui.model.FilterOperator.EQ, user.werks );
      var filterArbpl  = new sap.ui.model.Filter("Arbpl", sap.ui.model.FilterOperator.EQ, sap.ui.getCore().byId("MOArtxt").getName());
      var filterBeber  = new sap.ui.model.Filter("Beber", sap.ui.model.FilterOperator.EQ, sap.ui.getCore().byId("MOAgencia").getName());
  
      //b�squeda
      var handleSearch = function (oEvent) {
        var user = MYSAP.SessionManager.getUser('user');
  
        var sValue = oEvent.getParameter("value"); 
        var oFilter1 = new sap.ui.model.Filter("Werks", sap.ui.model.FilterOperator.EQ, user.werks );
        var oFilter2  = new sap.ui.model.Filter("Arbpl", sap.ui.model.FilterOperator.EQ, sap.ui.getCore().byId("MOArtxt").getName() );
        var oFilter3 = new sap.ui.model.Filter("Maktx", sap.ui.model.FilterOperator.Contains, sValue);
        oEvent.getSource().getBinding("items").filter([oFilter1,oFilter2,oFilter3]);
      };
  
  
      // cierre de ayuda
      var handleClose = function (oEvent) {  
  
  
  
        var oSelectedItem = oEvent.getParameter("selectedItem");  
        if (oSelectedItem) {  
          sap.ui.getCore().byId(dialogoId).setValue(oSelectedItem.getTitle());
          sap.ui.getCore().byId(dialogoId).setName(oSelectedItem.getInfo());
  
          //se valida duplicidad de material
          var rows = sap.ui.getCore().byId("MOTablaCo").getRows();
          var row0 = rows[0].getCells();
          var material  = row0[1].getValue();
  
          for (var i = 1; i < rows.length; i++) {
            var row = rows[i].getCells();
            if  ( row[1].getValue() == material ){
              mensaje = 'No se puede ingresar nro. Material duplicados';
              sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
            }
          }
  
          var source = oEvent.getSource();
          var param  = oEvent.getParameters();
          cell[2].setValue(oSelectedItem.getInfo());
  
  
          //se realiza l�gica para setear tipo de posici�n
          // se lee el usuario actual
          var user = MYSAP.SessionManager.getUser('user');
          if (user.usuario == null ) {
            return;
          } 
  
          // Se cre objeto Json
          var oModelJson =  new sap.ui.model.json.JSONModel();
          // Lectura correcta
          var lecturaCorrecta = function(oData, oResponse){
            // se asocia el modelo JSON al ODATA
            oModelJson.setData(oData);
            cell[4].setValue(oModelJson.getProperty("/Meins"));
            cell[5].setValue(oModelJson.getProperty("/Postp"));
            if(oModelJson.getProperty("/Xchpf") != 'X'){
              sap.ui.getCore().byId("MOCompoLoteIn").setEditable(false);
              sap.ui.getCore().byId("MOCompoLoteIn").setEnabled(false);
              sap.ui.getCore().byId("MOCompoLoteIn").setShowValueHelp(false);
              sap.ui.getCore().byId("MOCompoLoteIn").addStyleClass("divInputOrdenSh");
            }
          }
  
          // Lectura incorrecta
          var lecturaIncorrecta = function(oError){
            sap.m.MessageToast.show(JSON.parse(oError.response.body).error.message.value, {
              width: "300px",                  
              my: "center center",         
              at: "center center",          
              of: window,                  
              offset: "0 0",               
              collision: "fit fit",         
              onClose: null,             
              autoClose: false,             
              animationTimingFunction: "ease", 
              animationDuration: 100,    
              closeOnBrowserNavigation: true   
            });
          }
  
          //llamada para obtener tipo de posici�n
          var llamada = "tiposSet(Matnr='"+
          oSelectedItem.getTitle()+
          "',Werks='"+
          user.werks+
          "',Arbpl='"+
          sap.ui.getCore().byId("MOArtxt").getName()+
          "')"; 
  
          sap.ui.getCore().getModel("oModelSAP").read(llamada, null, null, false, lecturaCorrecta, lecturaIncorrecta);
          oEvent.getSource().getBinding("items").filter([]);
          oEvent.getSource().destroy();
        }
      }  
  
  
      this._valueHelpSelectDialog = new sap.m.SelectDialog({  
        title   : "Material",  
        items   : {  
          path    : "/matnrSet",  
          template  : new sap.m.StandardListItem({  
            title: "{Matnr}",
            info : "{Maktx}",
            description: "{Werks}",
            active: true}),
        },
        liveChange  : handleSearch,
        search    : handleSearch,
        confirm   : handleClose,  
        cancel    : handleClose}); 
      this._valueHelpSelectDialog.setModel(sap.ui.getCore().getModel("oModelSAP")); 
      //sap.ui.getCore().byId("MOCompoMatnrDia").getBinding("items").filter([filterCentro, filterArbpl]);
      sap.ui.getCore().byId(this._valueHelpSelectDialog.getId()).getBinding("items").filter([filterCentro, filterArbpl, filterBeber]);
      dialogoId = this.getId();
      this._valueHelpSelectDialog.open();  */    
    },
  
    doRowSelectionTbMatnr: function(oEvent){
  
      //se obtiene indice seleccionado
      var rowIndex = oEvent.getParameters().rowIndex;
  
      //Se obtienen el objeto table
      var oTable = sap.ui.getCore().byId("MOTablaMatnr");
  
      //se accede al contexto del indice
      var oContext = oTable.getContextByIndex(rowIndex);
  
      //se setea valor
      sap.ui.getCore().byId(window.idCompo).setName(oContext.getObject().Matnr);
      sap.ui.getCore().byId(window.idCompo).setValue(oContext.getObject().Maktx);
  
      window.cellCompo[1].setValue(oContext.getObject().Matnr);
      window.cellCompo[2].setValue(oContext.getObject().Maktx);
      window.cellCompo[4].setValue(oContext.getObject().Meins);
      window.cellCompo[5].setValue(oContext.getObject().Postp);
      window.cellCompo[6].setValue(oContext.getObject().Werks);
  
      //se cierra form
      sap.ui.getCore().byId("MOContFormMatnr").close();
    },
  
    //LOTE
    doCompoLoteBusqueda: function(oEvent) {
      //id del dialogo
      var dialogoId;
      var user = MYSAP.SessionManager.getUser('user');
  
      //se obtiene material y centro ingresado
      var iRowIndex = this.getParent().getIndex();
      var cell      = this.getParent().getCells();
      var filterWerksOrd = new sap.ui.model.Filter("WerksOrd", sap.ui.model.FilterOperator.EQ, user.werks);
      var filterWerks = new sap.ui.model.Filter("Werks", sap.ui.model.FilterOperator.EQ, cell[6].getValue());
      var filterMaterial = new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.EQ, cell[1].getValue() );
      var filterArbpl  = new sap.ui.model.Filter("Arbpl", sap.ui.model.FilterOperator.EQ, sap.ui.getCore().byId("MOArtxt").getName() );
  
      //b�squeda
      var handleSearch = function (oEvent) {
        var sValue = oEvent.getParameter("value"); 
        var oFilter1 = new sap.ui.model.Filter("Werks", sap.ui.model.FilterOperator.EQ, cell[6].getValue());
        var oFilter2 = new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.EQ, cell[1].getValue());
        var oFilter3 = new sap.ui.model.Filter("Arbpl", sap.ui.model.FilterOperator.EQ, sap.ui.getCore().byId("MOArtxt").getName());
        var oFilter4 = new sap.ui.model.Filter("Charg", sap.ui.model.FilterOperator.Contains, sValue);
        oEvent.getSource().getBinding("items").filter([oFilter1,oFilter2,oFilter3,oFilter4]);
      };
  
      // cierre de ayuda
      var handleClose = function (oEvent) {  
        var oSelectedItem = oEvent.getParameter("selectedItem");  
        if (oSelectedItem) {  
          sap.ui.getCore().byId(dialogoId).setValue(oSelectedItem.getInfo());
          sap.ui.getCore().byId(dialogoId).setName(oSelectedItem.getTitle());
        }
  
        // se lee el usuario actua
  
        oEvent.getSource().getBinding("items").filter([]);
        oEvent.getSource().destroy();
      };  
  
      this._valueHelpSelectDialog = new sap.m.SelectDialog({  
        title   : "Lote",  
        items   : {  
          path    : "/loteSet",  
          template  : new sap.m.StandardListItem({  
            title: "{Charg}",
            info : "{Charg}",
            //name : "{Xchpf}",
            active: true}),
        },
        liveChange  : handleSearch,
        search    : handleSearch,
        confirm   : handleClose,  
        cancel    : handleClose}); 
      this._valueHelpSelectDialog.setModel(sap.ui.getCore().getModel("oModelSAP"));
      sap.ui.getCore().byId(this._valueHelpSelectDialog.getId()).getBinding("items").filter([filterWerksOrd,filterWerks,filterMaterial,filterArbpl]);
      dialogoId = this.getId();
      this._valueHelpSelectDialog.open();      
    },
  
    //Ayuda de busqueda para operaciones
  
    //Contrato
    doOperaContratoAyudaBusqueda: function(oEvent) {
      //id del dialogo
      var dialogoId;
  
      var filterSearchhelp  = new sap.ui.model.Filter("Searchhelp", sap.ui.model.FilterOperator.EQ, 'OUTLL' );
  
      // se lee el usuario que esta tratando el sistema
      var user = MYSAP.SessionManager.getUser('user');
      if (user.usuario == null ) {
        return;
      } 
      var orden = sap.ui.getCore().getModel("oModelModOrd").getProperty("/orden");
  
      //filtro con centro
      var filterCentro = new sap.ui.model.Filter("Werks", sap.ui.model.FilterOperator.EQ, user.werks );
  
      //filtro para proveedor
      //Se obtienen el objeto table
      var oTable = sap.ui.getCore().byId("MOTablaOp");
      //se obtiene el proveedor de la �nica operaci�n que tendr� la orden
      var lifnr = oTable.getRows()[0].getCells()[0].getValue();
      var filterLifnr = new sap.ui.model.Filter("Lifnr", sap.ui.model.FilterOperator.EQ, lifnr );
  
      //b�squeda
      var handleSearch = function (oEvent) {
        var sValue = oEvent.getParameter("value"); 
        var oFilter1  = new sap.ui.model.Filter("Searchhelp", sap.ui.model.FilterOperator.EQ, 'OUTLL' );
        var oFilter2 = new sap.ui.model.Filter("Lifnr", sap.ui.model.FilterOperator.EQ, oTable.getRows()[0].getCells()[0].getValue());
        var oFilter3 = new sap.ui.model.Filter("Ebeln", sap.ui.model.FilterOperator.Contains, sValue);
        oEvent.getSource().getBinding("items").filter([oFilter1,oFilter2,oFilter3]);
      };
  
      // cierre de ayuda
      var handleClose = function (oEvent) {  
        var oSelectedItem = oEvent.getParameter("selectedItem");  
        if (oSelectedItem) {  
          //se recupera nro. de contrato
          var Ebeln = oTable.getRows()[0].getCells()[1].getValue();
          if (Ebeln){
            //Se verifica si cambi� el contrato
            if (Ebeln != oSelectedItem.getTitle()){
  
              var retorno = function (oAction) {
                if(oAction == sap.m.MessageBox.Action.YES) {
                  sap.ui.getCore().byId(dialogoId).setValue(oSelectedItem.getTitle());
                  sap.ui.getCore().byId(dialogoId).setName(oSelectedItem.getInfo());;
  
                  //se limpia posici�n del contrato
                  oTable.getRows()[0].getCells()[2].setName("");
                  oTable.getRows()[0].getCells()[2].setValue("");
  
                  //se eliminan servicios del antiguo contrato
                  var oModelJsonServi  = sap.ui.getCore().getModel("oModelJsonServi");
                  var servicios = oModelJsonServi.getProperty("/");
                  for(var i = servicios.length; i >= 0; i--){
                    servicios.splice(i, 1);
                    oModelJsonServi.refresh();
                  }
                }
              }
  
              jQuery.sap.require("sap.m.MessageBox");
              sap.m.MessageBox.show("Al cambiar Contrato o Posici�n, se eliminaran todos los servicios", {
                icon    : sap.m.MessageBox.Icon.INFORMATION,
                title   : "Confirmar Acci�n",
                actions   : [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                onClose   : retorno
              });
            }
          }else{
            sap.ui.getCore().byId(dialogoId).setValue(oSelectedItem.getTitle());
            sap.ui.getCore().byId(dialogoId).setName(oSelectedItem.getInfo());;
  
          }
        }
        oEvent.getSource().getBinding("items").filter([]);
        oEvent.getSource().destroy();
      };  
  
      this._valueHelpSelectDialog = new sap.m.SelectDialog({  
        title   : "Contrato",  
        items   : {  
          path    : "/contratoSet",  
          template  : new sap.m.StandardListItem({  
            title: "{Ebeln}",
            info : "{Txz01}",
            active: true}),
        },
        liveChange  : handleSearch,
        search    : handleSearch,
        confirm   : handleClose,  
        cancel    : handleClose}); 
      this._valueHelpSelectDialog.setModel(sap.ui.getCore().getModel("oModelSAP"));
      //sap.ui.getCore().byId("MOOperaContratoDia").getBinding("items").filter([filterSearchhelp,filterCentro,filterLifnr]);
      sap.ui.getCore().byId(this._valueHelpSelectDialog.getId()).getBinding("items").filter([filterSearchhelp,filterCentro,filterLifnr]);
      dialogoId = this.getId();
      this._valueHelpSelectDialog.open();      
    },
    //Posici�n
    doOperaPosAyudaBusqueda: function(oEvent) {
      //id del dialogo
      var dialogoId;
  
      var filterSearchhelp  = new sap.ui.model.Filter("Searchhelp", sap.ui.model.FilterOperator.EQ, 'OUTLL' );
  
      // se lee el usuario que esta tratando el sistema
      var user = MYSAP.SessionManager.getUser('user');
      if (user.usuario == null ) {
        return;
      } 
  
      //se obtiene el centro
      var centro = user.werks;
  
      if (centro == null) {
        //debe ingresar Centro
        mensaje = "Se debe ingresar un Centro";
        sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
        return;
      }
      //filtro con centro
      var filterCentro = new sap.ui.model.Filter("Werks", sap.ui.model.FilterOperator.EQ, centro );
  
      //filtro para proveedor
      //Se obtienen el objeto table
      var oTable = sap.ui.getCore().byId("MOTablaOp");
      //se obtiene el proveedor de la �nica operaci�n que tendr� la orden
      var lifnr = oTable.getRows()[0].getCells()[0].getValue();
      var filterLifnr = new sap.ui.model.Filter("Lifnr", sap.ui.model.FilterOperator.EQ, lifnr );
  
      //filtro para contrato
      //se obtiene el contrato de la �nica operaci�n que tendr� la orden
      var Ebeln = oTable.getRows()[0].getCells()[1].getValue();
      var filterEbeln = new sap.ui.model.Filter("Ebeln", sap.ui.model.FilterOperator.EQ, Ebeln );
  
      //b�squeda
      var handleSearch = function (oEvent) {
        var sValue = oEvent.getParameter("value"); 
        var oFilter1 = new sap.ui.model.Filter("Ebelp", sap.ui.model.FilterOperator.Contains, sValue);
        oEvent.getSource().getBinding("items").filter([oFilter1]);
      };
  
      // cierre de ayuda
      var handleClose = function (oEvent) {  
        var oSelectedItem = oEvent.getParameter("selectedItem");  
        if (oSelectedItem) {  
          //se recupera nro. de contrato
          var Ebelp = oTable.getRows()[0].getCells()[2].getValue();
          if (Ebelp != "00000"){
            //Se verifica si cambi� el contrato
            if (Ebelp != oSelectedItem.getTitle()){
  
              var retorno = function (oAction) {
                if(oAction == sap.m.MessageBox.Action.YES) {
                  sap.ui.getCore().byId(dialogoId).setValue(oSelectedItem.getTitle());
                  sap.ui.getCore().byId(dialogoId).setName(oSelectedItem.getInfo());
                  //se eliminan servicios del antiguo contrato - posici�n
                  var oModelJsonServi  = sap.ui.getCore().getModel("oModelJsonServi");
                  var servicios = oModelJsonServi.getProperty("/");
                  for(var i = servicios.length; i >= 0; i--){
                    servicios.splice(i, 1);
                    oModelJsonServi.refresh();
                  }
                }
              }
  
              jQuery.sap.require("sap.m.MessageBox");
              sap.m.MessageBox.show("Al cambiar Contrato o Posici�n, se eliminaran todos los servicios", {
                icon    : sap.m.MessageBox.Icon.INFORMATION,
                title   : "Confirmar Acci�n",
                actions   : [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                onClose   : retorno
              });
            }
          }else{
            sap.ui.getCore().byId(dialogoId).setValue(oSelectedItem.getTitle());
            sap.ui.getCore().byId(dialogoId).setName(oSelectedItem.getInfo());
          }
        }
        oEvent.getSource().getBinding("items").filter([]);
        oEvent.getSource().destroy();
      };  
  
      this._valueHelpSelectDialog = new sap.m.SelectDialog({  
        title   : "Posici�n",  
        items   : {  
          path    : "/posContSet",  
          template  : new sap.m.StandardListItem({  
            title: "{Ebelp}",
            info : "{Txz01}",
            active: true}),
        },
        //liveChange  : handleSearch,
        //search    : handleSearch,
        confirm   : handleClose,  
        cancel    : handleClose}); 
      this._valueHelpSelectDialog.setModel(sap.ui.getCore().getModel("oModelSAP"));
      //sap.ui.getCore().byId("MOOperaPosDia").getBinding("items").filter([filterSearchhelp,filterCentro,filterLifnr,filterEbeln]);
      sap.ui.getCore().byId(this._valueHelpSelectDialog.getId()).getBinding("items").filter([filterSearchhelp,filterCentro,filterLifnr,filterEbeln]);
      dialogoId = this.getId();
      this._valueHelpSelectDialog.open();      
    },
  
    // ========================================================
    // METODOS PARA TABLA SERVICIOS
    // ========================================================
    //Agrega filas al servicio
    doAgregaServ: function(){
      var Extrow;
  
      var oModelJsonServi = sap.ui.getCore().getModel("oModelJsonServi");
      var oEntryServi  = oModelJsonServi.getProperty("/");
  
      var indiceFila  = oEntryServi.length - 1
      if (indiceFila < 0 ) {
        Extrow = "10";
      }else{
        Extrow = parseInt(oModelJsonServi.getProperty("/"+indiceFila+"/Extrow")) + 10;
        //Extrow = ("000" + Extrow).slice (-4);
  
      }
      oEntryServi.push({
        Extrow  : Extrow,
        Srvpos  : "",
        Ktext1  : "",
        Menge   : "",
              Meins   : "",
              Tbtwr   : "",
              Waers   : "",
      });
      sap.ui.getCore().getModel("oModelJsonServi").refresh();
    },
  
    //Quita filas al servicio
    doQuitaServ: function(e){
  
      //se obtiene el indice de la fila seleccionada
      var idx = this.getParent().getParent()._oSelection.aSelectedIndices[0];
      if (idx !== -1){
        var oModelJsonServi = sap.ui.getCore().getModel("oModelJsonServi");
        var oEntryServi  = oModelJsonServi.getProperty("/");
        oEntryServi.splice(idx, 1);
        oModelJsonServi.refresh();
        return;
        //}
      } else {
        sap.m.MessageToast.show('Por favor seleccione una Fila');
      }
      sap.ui.getCore().byId("MOTablaServ").clearSelection();
  
    },
  
  
    //Unidad de Medida
    doServUnMedAyudaBusqueda: function(oEvent) {
  
      var dialogoId;
      var filterSearchhelp  = new sap.ui.model.Filter("Searchhelp", sap.ui.model.FilterOperator.EQ, 'H_T006' );
  
      //b�squeda
      var handleSearch = function (oEvent) {
        var sValue = oEvent.getParameter("value"); 
        var oFilter2  = new sap.ui.model.Filter("Searchhelp", sap.ui.model.FilterOperator.EQ, 'H_T006' );
        var oFilter1 = new sap.ui.model.Filter("Msehl", sap.ui.model.FilterOperator.Contains, sValue);
        oEvent.getSource().getBinding("items").filter([oFilter1,oFilter2]);
      };
  
      // cierre de ayuda
      var handleClose = function (oEvent) {  
        var oSelectedItem = oEvent.getParameter("selectedItem");  
        if (oSelectedItem) {  
          sap.ui.getCore().byId(dialogoId).setValue(oSelectedItem.getTitle());
          sap.ui.getCore().byId(dialogoId).setName(oSelectedItem.getInfo());
        }
        oEvent.getSource().getBinding("items").filter([]);
        oEvent.getSource().destroy();
      };  
  
      this._valueHelpSelectDialog = new sap.m.SelectDialog({  
        title   : "Unidad de Medida",  
        items   : {  
          path    : "/unidadMedSet",  
          template  : new sap.m.StandardListItem({  
            title: "{Mseh3}",
            info : "{Msehl}",
            active: true}),
        },
        liveChange  : handleSearch,
        search    : handleSearch,
        confirm   : handleClose,  
        cancel    : handleClose}); 
      this._valueHelpSelectDialog.setModel(sap.ui.getCore().getModel("oModelSAP"));
      //sap.ui.getCore().byId("MOServUnMedDia").getBinding("items").filter([filterSearchhelp]);
      sap.ui.getCore().byId(this._valueHelpSelectDialog.getId()).getBinding("items").filter([filterSearchhelp]);
      dialogoId = this.getId();
      this._valueHelpSelectDialog.open();      
    },
  
    //N�mero de Servicio
    doNroSerAyudaBusqueda: function(oEvent) {
  
      window.idServicio   = this.getId();
      window.rowServicio  = this.getParent().getIndex();
      window.cellServicio = this.getParent().getCells();
  
      if (!sap.ui.getCore().byId("MOContFormServicio").isOpen()){
  
        var oModelJsonOpera  = sap.ui.getCore().getModel("oModelJsonOpera");
        var operaciones    = oModelJsonOpera.getProperty("/");
  
        var indiceFila  = operaciones.length - 1;
  
        var Ebeln = parseInt(oModelJsonOpera.getProperty("/"+indiceFila+"/Konnr"));
        var filterEbeln = new sap.ui.model.Filter("Ebeln", sap.ui.model.FilterOperator.EQ, Ebeln );
  
        var Ebelp = parseInt(oModelJsonOpera.getProperty("/"+indiceFila+"/Ktpnr"));
        var filterEbelp = new sap.ui.model.Filter("Ebelp", sap.ui.model.FilterOperator.EQ, Ebelp );
  
  /*      //Se obtienen el objeto table
        var oTable = sap.ui.getCore().byId("MOTablaOp");
  
        //Nro de contrato
        //se obtiene el contrato de la �nica operaci�n que tendr� la orden
        var Eb = this.getBindingContext().getProperty('Ebeln');
        var oContext = oTable.getContextByIndex(0);
        var Ebeln = oTable.getRows()[0].getCells()[1].getValue();
        var filterEbeln = new sap.ui.model.Filter("Ebeln", sap.ui.model.FilterOperator.EQ, Ebeln );
        //Posici�n de contrato
        //se obtiene la posici�n de la �nica operaci�n que tendr� la orden
        var Ebelp = oTable.getRows()[0].getCells()[2].getValue();
        var filterEbelp = new sap.ui.model.Filter("Ebelp", sap.ui.model.FilterOperator.EQ, Ebelp ); */
  
        sap.ui.getCore().byId("MOTablaServicio").setModel(sap.ui.getCore().getModel("oModelSAP"));
        sap.ui.getCore().byId("MOTablaServicio").bindRows("/numserviceSet", null, null,[ filterEbeln, filterEbelp])
        sap.ui.getCore().byId("MOContFormServicio").open();
        return;
      }
      /*var iRowIndex = this.getParent().getIndex();
      var cell      = this.getParent().getCells();
  
      var dialogoId;
  
      //Se obtienen el objeto table
      var oTable = sap.ui.getCore().byId("MOTablaOp");
  
      //Nro de contrato
      //se obtiene el contrato de la �nica operaci�n que tendr� la orden
      var Eb = this.getBindingContext().getProperty('Ebeln');
      var oContext = oTable.getContextByIndex(0);
      var Ebeln = oTable.getRows()[0].getCells()[1].getValue();
      var filterEbeln = new sap.ui.model.Filter("Ebeln", sap.ui.model.FilterOperator.EQ, Ebeln );
      //Posici�n de contrato
      //se obtiene la posici�n de la �nica operaci�n que tendr� la orden
      var Ebelp = oTable.getRows()[0].getCells()[2].getValue();
      var filterEbelp = new sap.ui.model.Filter("Ebelp", sap.ui.model.FilterOperator.EQ, Ebelp );
  
      //b�squeda
      var handleSearch = function (oEvent) {
  
        var Ebeln;
        var rows = sap.ui.getCore().byId("MOTablaOp").getRows();
        //Se recorren las filas
        for (var i = 0; i < rows.length; i++) {
          var row = rows[i].getCells();
          var Ebeln = row[2].getValue();
          var Ebelp = row[3].getValue();
          if (Ebeln){
            break;
          }
        }
        //contrato
        var oFilter1 = new sap.ui.model.Filter("Ebeln", sap.ui.model.FilterOperator.EQ, Ebeln );
        //Posici�n de contrato
        var oFilter2 = new sap.ui.model.Filter("Ebelp", sap.ui.model.FilterOperator.EQ, Ebelp );
  
        var sValue = oEvent.getParameter("value"); 
        var oFilter3 = new sap.ui.model.Filter("Srvpos", sap.ui.model.FilterOperator.Contains, sValue);
        oEvent.getSource().getBinding("items").filter([oFilter1,oFilter2,oFilter3]);
      };
  
      // cierre de ayuda
      var handleClose = function (oEvent) {  
        var oSelectedItem = oEvent.getParameter("selectedItem");  
        if (oSelectedItem) {  
          sap.ui.getCore().byId(dialogoId).setValue(oSelectedItem.getTitle());
          sap.ui.getCore().byId(dialogoId).setName(oSelectedItem.getInfo());
          cell[2].setValue(oSelectedItem.getInfo());
        }
        oEvent.getSource().getBinding("items").filter([]);
        oEvent.getSource().destroy();
      };  
  
      this._valueHelpSelectDialog = new sap.m.SelectDialog({  
        title   : "Unidad de Medida",  
        items   : {  
          path    : "/numserviceSet",  
          template  : new sap.m.StandardListItem({  
            title: "{Srvpos}",
            info : "{Ktext1}",
            active: true}),
        },
        liveChange  : handleSearch,
        search    : handleSearch,
        confirm   : handleClose,  
        cancel    : handleClose}); 
      this._valueHelpSelectDialog.setModel(sap.ui.getCore().getModel("oModelSAP"));
      //sap.ui.getCore().byId("MOServUnMedDia").getBinding("items").filter([filterEbeln, filterEbelp]);
      sap.ui.getCore().byId(this._valueHelpSelectDialog.getId()).getBinding("items").filter([filterEbeln, filterEbelp]);
      dialogoId = this.getId();
      this._valueHelpSelectDialog.open();     */ 
    },
  
    doRowSelectionTbServicio: function(oEvent){
  
      //se obtiene indice seleccionado
      var rowIndex = oEvent.getParameters().rowIndex;
  
      //Se obtienen el objeto table
      var oTable = sap.ui.getCore().byId("MOTablaServicio");
  
      //se accede al contexto del indice
      var oContext = oTable.getContextByIndex(rowIndex);
  
      //se setea valor
      sap.ui.getCore().byId(window.idServicio).setName(oContext.getObject().Srvpos);
      sap.ui.getCore().byId(window.idServicio).setValue(oContext.getObject().Srvpos);
  
      window.cellServicio[1].setValue(oContext.getObject().Srvpos);
      window.cellServicio[2].setValue(oContext.getObject().Ktext1);
      window.cellServicio[4].setValue(oContext.getObject().Meins);
      //window.cellServicio[5].setValue(oContext.getObject().Tbtwr);
      //window.cellServicio[6].setValue(oContext.getObject().Waers);
  
      //se cierra form
      sap.ui.getCore().byId("MOContFormServicio").close();
    },
  
    //Agrega filas a tabla Sellos
    doAgregaDE: function(){
  
      var oModelJsonDanEqu = sap.ui.getCore().getModel("oModelJsonDanEqu");
      var oEntryDanEqu   = oModelJsonDanEqu.getProperty("/");
      oEntryDanEqu.push({
        Artefacto   : "",
        Marca       : "",
        Modelo        : "",
        NroSerie      : "",
        Propiedad     : "",
      });
      sap.ui.getCore().getModel("oModelJsonDanEqu").refresh();
    },
  
    doQuitaDE: function(e){
      var idx, oRow, oRowData, oModelDE, oData, oRemoved;
      //se obtiene el indice de la fila seleccionada
      idx = this.getParent().getParent()._oSelection.aSelectedIndices[0];
      if (idx !== -1){
        oRow = sap.ui.getCore().byId("MOTablaDe").getRows()[idx];
        oRowData = oRow.getBindingContext().getObject();
  
        oModelDE = sap.ui.getCore().getModel("oModelDE");
  
        oData = oModelDE.getData();
        //verifica que sea el registro seleccionado
        if(oData.rows[idx].Artefacto === oRowData.Artefacto){
          // elimina fila seleccionada
          delete oData.rows[idx];
          oRemoved = oData.rows.splice(idx, 1);
          oModelDE.refresh();
          return;
        }
      } else {
        sap.m.MessageToast.show('Por favor seleccione una Fila');
      }
    },
  
    doDEPropAyudaBusqueda: function(oEvent){
      var iRowIndex = this.getParent().getIndex();
      var cell      = this.getParent().getCells();
  
      // se lee el usuario actual
      var user = MYSAP.SessionManager.getUser('user');
  
      //se obtiene id del objeto actual de la tabla
      var x = this.getId();
  
      //filtro
      var oFilter1 = new sap.ui.model.Filter("Domname", sap.ui.model.FilterOperator.EQ, 'ZD_PROPIEDAD' );
  
      // cierre de ayuda
      var handleClose = function (oEvent) {  
        var oSelectedItem = oEvent.getParameter("selectedItem");  
        if (oSelectedItem) {  
          sap.ui.getCore().byId(x).setValue(oSelectedItem.getTitle());
          sap.ui.getCore().byId(x).setName(oSelectedItem.getInfo());
        }
      }
  
      if (!this._valueHelpSelectDialog) {  
        this._valueHelpSelectDialog = new sap.m.SelectDialog("MODEPropDia", {  
  
  
          title   : "Propiedad",  
          items   : {  
            path    : "/dominioSet",  
            template  : new sap.m.StandardListItem({  
              title: "{DomvalueL}",
              info : "{Ddtext}",
              active: true}),
          },
          //liveChange  : handleSearch,
          //search    : handleSearch,
          confirm   : handleClose,  
          cancel    : handleClose}); 
        this._valueHelpSelectDialog.setModel(sap.ui.getCore().getModel("oModelSAP"));
      } else { 
      }  
      sap.ui.getCore().byId("MODEPropDia").getBinding("items").filter([oFilter1]);
      this._valueHelpSelectDialog.open();
    },
  
  
    //Verifica cambios en los campos de Equipo
    doChangeNroSello: function(oEvent){
      //se obtiene valor del sello que se esta tratando
      var valueSello = this.getValue();
  
    },
  
  
    doChangeDuplicateEqui: function(oEvent){
      //obtiene nro de equipo
      //var valueEqui = this.getValue();
  
    },
  
    doChangeEquipo: function(){
      if(this.getId() == "MONroEquipoR" || this.getId() == "MONroEquipoI"){
        //se obtiene valor del equipo que se esta tratando
        if(!this.getValue()){
          sap.ui.getCore().byId("MOLecEnerActR").setEditable(false);
          sap.ui.getCore().byId("MOLecEnerActTaraR").setEditable(false);
          sap.ui.getCore().byId("MOLecEnerActTarbR").setEditable(false);
          sap.ui.getCore().byId("MOLecEnerActTarcR").setEditable(false);
          sap.ui.getCore().byId("MOLecEnerActTardR").setEditable(false);
          sap.ui.getCore().byId("MODemMaxTaraR").setEditable(false);
          sap.ui.getCore().byId("MODemMaxTarbR").setEditable(false);
          sap.ui.getCore().byId("MODemMaxTarcR").setEditable(false);
          sap.ui.getCore().byId("MODemMaxTardR").setEditable(false);
          sap.ui.getCore().byId("MOLecEnerReaR").setEditable(false);
          sap.ui.getCore().byId("MONroEquipoR").setName("");
        }
      }
    },
  
    doAyudaEquipoRet: function(caract,campo){
  
      if (!sap.ui.getCore().byId("MOContFormEqui").isOpen()){
  
        var user = MYSAP.SessionManager.getUser('user');
        if (user.usuario == null ) {
          return;
        }
  
        if(!campo.getValue()){
          mensaje = 'Debe digitar Nro. de Serie';
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          return;
        }
  
        var FilterOperator = sap.ui.model.FilterOperator;
        var filter  = new sap.ui.model.Filter("Sernr",FilterOperator.EQ, campo.getValue());
        var filter2 = new sap.ui.model.Filter("Mtart",FilterOperator.EQ, caract);
        var filter3 = new sap.ui.model.Filter("Werks",FilterOperator.EQ, user.werks);
        if(caract == "ZMED"){
          sap.ui.getCore().byId("MOTablaEqui").setTitle("Medidores");
        }else if(caract == "ZTRA"){
          sap.ui.getCore().byId("MOTablaEqui").setTitle("Transformadores");
        }
        sap.ui.getCore().byId("MOTablaEqui").setModel(sap.ui.getCore().getModel("oModelSAP"));
        sap.ui.getCore().byId("MOTablaEqui").bindRows("/equnrRetSet", null, null,[ filter, filter2, filter3 ])
        sap.ui.getCore().byId("MOContFormEqui").open();
        return;
      }
    },
  
    doAyudaEquipoIns: function(caract,campo){
  
      if (!sap.ui.getCore().byId("MOContFormEqui").isOpen()){
  
        var user = MYSAP.SessionManager.getUser('user');
        if (user.usuario == null ) {
          return;
        }
  
        if(!campo.getValue()){
          mensaje = 'Debe digitar Nro. de Serie';
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          return;
        }
  
        var FilterOperator = sap.ui.model.FilterOperator;
        var filter = new sap.ui.model.Filter("Arbpl", sap.ui.model.FilterOperator.EQ, sap.ui.getCore().byId("MOArtxt").getName());
        var filter2 = new sap.ui.model.Filter("ISernr",FilterOperator.EQ, campo.getValue());
        var filter3 = new sap.ui.model.Filter("Mtart",FilterOperator.EQ, caract);
        var filter4 = new sap.ui.model.Filter("Werks",FilterOperator.EQ, user.werks);
        var filter5 = new sap.ui.model.Filter("Beber", sap.ui.model.FilterOperator.EQ, sap.ui.getCore().byId("MOAgencia").getName());
  
        if(caract == "ZMED"){
          sap.ui.getCore().byId("MOTablaEqui").setTitle("Medidores");
        }else if(caract == "ZTRA"){
          sap.ui.getCore().byId("MOTablaEqui").setTitle("Transformadores");
        }
        sap.ui.getCore().byId("MOTablaEqui").setModel(sap.ui.getCore().getModel("oModelSAP"));
        sap.ui.getCore().byId("MOTablaEqui").bindRows("/equnrSet", null, null,[ filter, filter2, filter3, filter4, filter5 ])
        sap.ui.getCore().byId("MOContFormEqui").open();
        return;
      }
    },
  
    doRowSelectionTbEqui: function(oEvent){
  
      var campo = sap.ui.getCore().byId("EquipoDiaRet").getTooltip();
      if(!campo){
        var campo = sap.ui.getCore().byId("EquipoDia").getTooltip();
      }
  
      //se obtiene indice seleccionado
      var rowIndex = oEvent.getParameters().rowIndex;
  
      //Se obtienen el objeto table
      var oTable = sap.ui.getCore().byId("MOTablaEqui");
  
      //se accede al contexto del indice
      var oContext = oTable.getContextByIndex(rowIndex);
  
      //se setea valor
      //alert("equnr: + " + oContext.getObject().Equnr + "sernr: " + oContext.getObject().Sernr + "maktx: "+oContext.getObject().Maktx);
      sap.ui.getCore().byId(campo).setName(oContext.getObject().Equnr);
      sap.ui.getCore().byId(campo).setValue(oContext.getObject().Sernr + " | "  + oContext.getObject().Maktx);
  
      //se llama al cierre de la ayuda de busqueda
      sap.ui.getCore().byId("idOrdenMod").getController().handleCloseEquipo(oEvent);
  
      //se cierra form
      sap.ui.getCore().byId("MOContFormEqui").close();
    },
  
    doValidaLecturas: function(oEvent){
      //se obtiene id del objeto
      var id = this.getId();
      var num, val, error;
      //var val;
  
      //se obtiene valor del equipo que se esta tratando
      var valueLectura = this.getValue();
      if(!valueLectura){
        return;
      }
  
      //valida campos numericos
      if(isNaN(sap.ui.getCore().byId(id).getValue())){
        mensaje = 'Ingresar s�lo n�meros en Lecturas';
        sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
        return;
      }
  
      if(sap.ui.getCore().byId(id).getTooltip()){
        num = sap.ui.getCore().byId(id).getTooltip().split(".");
        if(!num || num.length < 2){
          var mensaje = "Valor de lectura no valido, cantidad de enteros: " + num[0] + ", cantidad decimales:" + num[1];
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          return;
        }
      }
      val = valueLectura.split(",");
      if (val.length < 2){
        val = valueLectura.split(".");
      }
  
  /*    if(!val || val.length < 2){
        var mensaje = "Error: valor de lectura no valido";
        sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
        return;
      } */
  
      //valida entero de la Lectura
      var nro;
      if (val[0]){
        if(val[0].length < 10){
          nro = '0'+val[0].length;
        }
        if(nro > num[0]){
          error = "X";
        }
      }
      //valida decimal de la Lectura
      if (val[1]){
        if(val[1].length < 10){
          nro = '0'+val[1].length;
        }
        if(nro > num[1]){
          error = "X";
        }
      }
      if(error){
        var mensaje = "Valor de lectura no valido, cantidad de enteros: " + num[0] + ", cantidad decimales:" + num[1];
        sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
        return;
      }
  
    },
  
    doChangeTableCNR: function(oEvent){
  
      //se obtiene indice seleccionado
      var rowIndex = oEvent.getParameters().rowIndex;
      var control  =  oEvent.getParameters().cellControl
  
      //se obtiene id del objeto
      var id = this.getId();
  
      //se obtiene cantidad ingresada
      var cantidad = this.getValue();
    },
  
    doChangeCantCompo: function(oEvent){
      //se obtiene id del objeto
      var id = this.getId();
  
      //se obtiene cantidad ingresada
      var cantidad = this.getValue();
  
      //si no se ha ingresado cantidad termina
      if(!cantidad){
        return;
      }
  
      //se accede al objeto padre
      var parent = oEvent.getSource().getParent();
      var agregations = parent.mAggregations;
  
      //se obtiene posici�n tratada
      var posicion = agregations.cells[0]._sRenderedValue;
      //se obtiene material
      var material = agregations.cells[1]._lastValue;
      //se obtiene centro
      var werks = agregations.cells[6]._sRenderedValue;
      //se obtiene lote
      var lote = agregations.cells[8]._lastValue;
  
      //Se obtienen el objeto table
      var oTable = sap.ui.getCore().byId("MOTablaMatnr");
  
      //se obtienen las filas
      var rows = oTable.getRows();
  
      //se recorren las filas
      for (var i = 0; i < rows.length; i++) {
  
        //se accede al contexto del indice
        var oContext = oTable.getContextByIndex(i);
  
        //se verifica que sea la posici�n tratada
        if  ( oContext.getObject().Matnr == material && oContext.getObject().Werks == werks ){
          //se valida cantidad
          if( Number(cantidad) > oContext.getObject().Lblab){
            var mensaje = "Cantidad no puede ser superior a " + oContext.getObject().Lblab;
            sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
            return;
          }
        }
  
      }
  
  /*      // Se cre objeto Json
        var oModelJson =  new sap.ui.model.json.JSONModel();
        // Lectura correcta
        var lecturaCorrecta = function(oData, oResponse){
          // se asocia el modelo JSON al ODATA
          oModelJson.setData(oData);
  
          //se valida cantidad
          var cantsap = oModelJson.getProperty("/Lblab");
          if( Number(cantidad) > cantsap){
            var mensaje = "Cantidad no puede ser superior a " + oModelJson.getProperty("/Lblab");
            sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
            return;
          }
        }
  
        // Lectura incorrecta
        var lecturaIncorrecta = function(oError){
          sap.m.MessageToast.show(JSON.parse(oError.response.body).error.message.value, {
            width: "300px",                  
            my: "center center",         
            at: "center center",          
            of: window,                  
            offset: "0 0",               
            collision: "fit fit",         
            onClose: null,             
            autoClose: false,             
            animationTimingFunction: "ease", 
            animationDuration: 100,    
            closeOnBrowserNavigation: true   
          });
        }
  
        //llamada para obtener tipo de posici�n
        var llamada = "cantidadMatSet(Matnr='"+
        material+
        "',Werks='"+
        werks+
        "',Arbpl='"+
        sap.ui.getCore().byId("MOArtxt").getName()+
        "',Lote='"+
        lote+
        "')"; 
  
        sap.ui.getCore().getModel("oModelSAP").read(llamada, null, null, false, lecturaCorrecta, lecturaIncorrecta);
      }   */
  
    },
  
    doExpresionReg: function(oEvent){
      var val, entero, decimal, num, nombre, nro, mensaje;
  
      var val = this.getValue();
  
      //se verifica si tiene info
      if(!val){
        return;
      }
  
      //valida que se ingrese s�lo n�meros
      if(isNaN(val)){
        mensaje = 'Ingresar s�lo n�meros';
        sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
        return;
      }
  
      //se trata cantidad de entero y decimal, seg�n el caso
      switch (this.getId()) {
        case "MOLongAcom":
          nombre = "Longitud de Acometida";
          entero = 4; decimal = 2;
          break;
        case "MOLongFachada":
          nombre = "Longitud Fachada";
          entero = 3; decimal = 2;
          break;
        case "MODemAcom":
          nombre = "Demanda Acometida";
          entero = 3; decimal = 2;
          break;
        case "MOFactDiver":
          nombre = "Factor Diversificaci�n";
          entero = 1; decimal = 3;
          break;
        case "MOLongAcomRet":
          nombre = "Longitud Acometida Retirada";
          entero = 4; decimal = 2;
          break;
        case "MONroTab":
          nombre = "N�mero tablero";
          entero = 6; 
          break;
      }
  
      //se separa entero y decimal
      if (entero && decimal){
        num = val.split(",");
        if (num.length < 2){
          num = val.split(".");
        }
        if (num.length < 2){
          mensaje = nombre + " debe tener, cantidad de entero " + entero.toString() + " y decimal" + decimal.toString();
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          return;
        }
      }else if (entero){
        num = [val];
      }
  
      //valida cantidad de entero
      if (entero){
        if (num[0].length > entero){
          mensaje = nombre + " debe tener, cantidad de entero " + entero.toString() + " y decimal" + decimal.toString();
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          return;
        }
      }
  
      //valida cantidad de decimales
      if (decimal){
        if (num[1].length > decimal){
          mensaje = nombre + " debe tener, cantidad de entero " + entero.toString() + " y decimal" + decimal.toString();
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          return;
        }
      }
    },
  
    doValidaNros: function(campo, error){
      var val, entero, decimal, num, nombre, nro, mensaje;
  
      var val = campo.getValue();
  
      //se verifica si tiene info
      if(!val){
        return;
      }
  
      //valida que se ingrese s�lo n�meros
      if(isNaN(val)){
        mensaje = 'Ingresar s�lo n�meros';
        sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
        error.value = "X";
        return;
      }
  
      //se trata cantidad de entero y decimal, seg�n el caso
      switch (campo.getId()) {
        case "MOLongAcom":
          nombre = "Longitud de Acometida";
          entero = 4; decimal = 2;
          break;
        case "MOLongFachada":
          nombre = "Longitud Fachada";
          entero = 3; decimal = 2;
          break;
        case "MODemAcom":
          nombre = "Demanda Acometida";
          entero = 3; decimal = 2;
          break;
        case "MOFactDiver":
          nombre = "Factor Diversificaci�n";
          entero = 1; decimal = 3;
          break;
        case "MOLongAcomRet":
          nombre = "Longitud Acometida Retirada";
          entero = 4; decimal = 2;
          break;
        case "MONroTab":
          nombre = "N�mero tablero";
          entero = 6; 
          break;
      }
  
      //se separa entero y decimal
      if (entero && decimal){
        num = val.split(",");
        if (num.length < 2){
          num = val.split(".");
        }
        if (num.length < 2){
          mensaje = nombre + " debe tener, cantidad de entero " + entero.toString() + " y decimal" + decimal.toString();
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          error.value = "X";
          return;
        }
      }else if (entero){
        num = [val];
      }
  
      //valida cantidad de entero
      if (entero){
        if (num[0].length > entero){
          mensaje = nombre + " debe tener, cantidad de entero " + entero.toString() + " y decimal" + decimal.toString();
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          error.value = "X";
          return;
        }
      }
  
      //valida cantidad de decimales
      if (decimal){
        if (num[1].length > decimal){
          mensaje = nombre + " debe tener, cantidad de entero " + entero.toString() + " y decimal" + decimal.toString();
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          error.value = "X";
          return;
        }
      }
    },
  
    doDate: function(oEvent){
      var val = this.getValue();
      var id = this.getId();
      var format = sap.ui.getCore().byId(id).getYyyymmdd();
      //se valida formato de fecha
      if(format == ""){
        sap.ui.getCore().byId(id).setValue("");
        mensaje = "Formato de fecha incorrecto";
        sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
        return;
      }
      sap.ui.getCore().byId(id).setValue(format.substring(6, 8) + '-' + format.substring(4, 6) + '-' + format.substring(4,0));
  
  
  
  //    var hoy = new Date();//Fecha actual del sistema
  //    var fecha = sap.ui.getCore().byId(id).getValue();
  //    var fecha_aux = fecha.value.split("-");
  //    var fecha1 = new Date(parseInt(fecha_aux[2]),parseInt(fecha_aux[1]-1),parseInt(fecha_aux[0]));
  //     
  //    if (fecha1 > hoy){
  //      sap.ui.getCore().byId(id).setValue("");
  //      mensaje = "Formato de fecha incorrecto";
  //      sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
  //      return;
  //    }
    },
  
    doSelectedPec: function(oEvent){
      var id    = this.getId();
  
      if(sap.ui.getCore().byId(id).getSelected()){ 
        sap.ui.getCore().byId("MOTipoConductor").setShowValueHelp(false);
        sap.ui.getCore().byId("MOTipoConductor").setValueHelpOnly(false);
        sap.ui.getCore().byId("MOTipoConductor").setEditable(false);
        sap.ui.getCore().byId("MOTipoConductor").removeStyleClass("divInput");
        sap.ui.getCore().byId("MOTipoConductor").addStyleClass("divInputOrdenSh");
  
        sap.ui.getCore().byId("MOTomaCorriente").setShowValueHelp(false);
        sap.ui.getCore().byId("MOTomaCorriente").setValueHelpOnly(false);
        sap.ui.getCore().byId("MOTomaCorriente").setEditable(false);
        sap.ui.getCore().byId("MOTomaCorriente").removeStyleClass("divInput");
        sap.ui.getCore().byId("MOTomaCorriente").addStyleClass("divInputOrdenSh");
  
        sap.ui.getCore().byId("MOProteccion").setShowValueHelp(false);
        sap.ui.getCore().byId("MOProteccion").setValueHelpOnly(false);
        sap.ui.getCore().byId("MOProteccion").setEditable(false);
        sap.ui.getCore().byId("MOProteccion").removeStyleClass("divInput");
        sap.ui.getCore().byId("MOProteccion").addStyleClass("divInputOrdenSh");
  
        sap.ui.getCore().byId("MOLongitud").setEditable(false);
        sap.ui.getCore().byId("MOLongitud").removeStyleClass("divInputOrden");
        sap.ui.getCore().byId("MOLongitud").addStyleClass("divInputOrdenSh");
      }else{
        sap.ui.getCore().byId("MOTipoConductor").setShowValueHelp(true);
        sap.ui.getCore().byId("MOTipoConductor").setValueHelpOnly(true);
        sap.ui.getCore().byId("MOTipoConductor").setEditable(true);
        sap.ui.getCore().byId("MOTipoConductor").removeStyleClass("divInputOrdenSh");
        sap.ui.getCore().byId("MOTipoConductor").addStyleClass("divInputOrdenShEna");
  
        sap.ui.getCore().byId("MOTomaCorriente").setShowValueHelp(true);
        sap.ui.getCore().byId("MOTomaCorriente").setValueHelpOnly(true);
        sap.ui.getCore().byId("MOTomaCorriente").setEditable(true);
        sap.ui.getCore().byId("MOTomaCorriente").removeStyleClass("divInputOrdenSh");
        sap.ui.getCore().byId("MOTomaCorriente").addStyleClass("divInputOrdenShEna");
  
        sap.ui.getCore().byId("MOProteccion").setShowValueHelp(true);
        sap.ui.getCore().byId("MOProteccion").setValueHelpOnly(true);
        sap.ui.getCore().byId("MOProteccion").setEditable(true);
        sap.ui.getCore().byId("MOProteccion").removeStyleClass("divInputOrdenSh");
        sap.ui.getCore().byId("MOProteccion").addStyleClass("divInputOrdenShEna");
  
        sap.ui.getCore().byId("MOLongitud").setEditable(true);
        sap.ui.getCore().byId("MOLongitud").removeStyleClass("divInputOrdenSh");
        sap.ui.getCore().byId("MOLongitud").addStyleClass("divInputOrden");
      }
    },
  
    doValidaEnergia: function(oEvent){
      var val, id, entero, decimal, num, nombre, nro, mensaje;
  
      val = this.getValue();
      id  = this.getId();
      var error = {value: ""};
  
      //se verifica si tiene info
      if(!val){
        return;
      }
  
      //valida que se ingrese s�lo n�meros
      if(isNaN(val)){
        mensaje = 'Ingresar s�lo n�meros';
        sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
        error.value = "X";
        return;
      }
  
      if(id == "MOPorcAct" || id == "MOPorcDem"){
        if (val < -0.01 && val > -99.99 ){
          return;
        }else{
          mensaje = 'El valor ingresado debe estar en el rango de -0,01 a -99,99';
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          error.value = "X";
          return;
        }
      }
  
      if(id == "MOPorcRea"){
        if(val < 0){
          mensaje = 'El valor ingresado debe ser positivo';
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          error.value = "X";
          return;
        }else if (val == "000000.00"){
          mensaje = 'El valor ingresado debe ser positivo';
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          error.value = "X";
          return;
        }
      }
  
      //se trata cantidad de entero y decimal, seg�n el caso
      switch (id) {
        case "MOPorcAct":
          nombre = "Energ�a Activa";
          entero = 3; decimal = 2;
          break;
        case "MOPorcDem":
          nombre = "Demanda";
          entero = 6; decimal = 2;
          break;
        case "MOPorcRea":
          nombre = "Energ�a Reactiva";
          entero = 3; decimal = 2;
          break;
      }
  
      //se separa entero y decimal
      if (entero && decimal){
        num = val.split(",");
        if (num.length < 2){
          num = val.split(".");
        }
        if (num.length < 2){
          mensaje = nombre + " debe tener, cantidad de entero " + entero.toString() + " y decimal" + decimal.toString();
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          error.value = "X";
          return;
        }
      }else if (entero){
        num = [val];
      }
  
      //valida cantidad de entero
      if (entero){
        if (num[0].length > entero){
          mensaje = nombre + " debe tener, cantidad de entero " + entero.toString() + " y decimal" + decimal.toString();
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          error.value = "X";
          return;
        }
      }
  
      //valida cantidad de decimales
      if (decimal){
        if (num[1].length > decimal){
          mensaje = nombre + " debe tener, cantidad de entero " + entero.toString() + " y decimal" + decimal.toString();
          sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
          error.value = "X";
          return;
        }
      }
  
    },
  
    doCnrChangeVal: function(oEvent){
      var val, id, cod, idPotencia, idCdp, idCan, idCon, idPot;
  
      val = this.getValue();
      id  = this.getId();
  
      if(/MOCnrCant/.test(id)){
        idPotencia = id.replace("MOCnrCant-col6", "MOCnrPotencia-col1");
        idCdp      = id.replace("MOCnrCant-col6", "MOCnrCdp-col4");
        idCon      = id.replace("MOCnrCant-col6", "MOCnrCon-col7");
        idPot      = id.replace("MOCnrCant-col6", "MOCnrPot-col8");
      }
      if(/MOCnrCdp/.test(id)){
        if(id == "MOCnrCdp-col4-row0"){
          idCan = id.replace("MOCnrCdp-col4", "MOCnrCant-col6");
          idCon = id.replace("MOCnrCdp-col4", "MOCnrCon-col7");
          idPot = id.replace("MOCnrCdp-col4", "MOCnrPot-col8");
        }else{
  
        }
      }
  
      //si no se ha ingresado valor
      if(!val){
        return;
      }
  
      var iRowIndex = this.getParent().getIndex();
      var cell      = this.getParent().getCells();
  
      //Se obtienen el objeto table
      var oTable = sap.ui.getCore().byId("MOTablaCe");
  
      //se accede al contexto del indice
      var oContext = oTable.getContextByIndex(iRowIndex);
  
      //se setea valor
      var cod = oContext.getObject().ZzcodCc;
      var cdp = oContext.getObject().ZzcdpCc;
  
      //fila inicial
      if(/row0/.test(id)){
        if(id == "MOCnrCdp-col4-row0"){
          //se verifica si c�digo es "otros"
          if(cod == "095"){
            //se setea cantidad en 1
            sap.ui.getCore().byId(idCan).setValue("1");
            sap.ui.getCore().byId(idCan).setName("1");
            //se iguala al cdp (debido a que es igual al cdp x cantidad = 1)
            var cantidad = parseFloat(val * "1").toFixed(2);
            sap.ui.getCore().byId(idCon).setValue(cantidad);
          }
        }else if(id == "MOCnrCant-col6-row0"){
          if(cod == "095"){
            //se deja cantidad con valor anterior
            if(sap.ui.getCore().byId(idCdp).getValue() != "0.00000"){
              sap.ui.getCore().byId(id).setValue("1");
            }else{
              sap.ui.getCore().byId(id).setValue("0");
            }
          }
        }
      //otras filas
      }else{
        if(/MOCnrCdp/.test(id)){
          //dejar valor anterior
        }else{
          //cdp x cantidad
          sap.ui.getCore().byId(idCon).setValue((sap.ui.getCore().byId(idCdp).getValue() * val).toFixed(2));
          //(potencia x cantidad) / 1000
          sap.ui.getCore().byId(idPot).setValue(((sap.ui.getCore().byId(idPotencia).getValue() * val) / 1000).toFixed(2));
        }
      }
    },
  
    doMoveValCen : function (oEvent) {
      var total_consumo = 0;
      var total_potencia = 0;
  
      //Se obtienen el objeto table
      //var oTable = sap.ui.getCore().byId("MOTablaCe");
  
      //se obtienen las filas
      //var rows = oTable.getRows();
  
      //se recorren las filas
  /*    for (var i = 0; i < rows.length; i++) {
  
        //se accede al contexto del indice
        var oContext = oTable.getContextByIndex(i);
  
        var consumo   = parseFloat(oContext.getObject().ZzconCalCc).toFixed(2);
        var potencia  = parseFloat(oContext.getObject().ZzpotCalCc).toFixed(2);
        total_consumo   = (parseFloat(total_consumo) + parseFloat(consumo)).toFixed(2); 
        total_potencia  = (parseFloat(total_potencia) + parseFloat(potencia)).toFixed(2);
      }*/
  
      //se obtiene datos de Censo
      var oModelJsonCenso  = sap.ui.getCore().getModel("oModelJsonCenso");
      var Censos    = oModelJsonCenso.getProperty("/");
      for(var i = 0; i < Censos.length; i++){
        var censo   = Censos[i];
  
        var consumo   = parseFloat(censo.ZzconCalCc).toFixed(2);
        var potencia  = parseFloat(censo.ZzpotCalCc).toFixed(2);
        total_consumo   = (parseFloat(total_consumo) + parseFloat(consumo)).toFixed(2); 
        total_potencia  = (parseFloat(total_potencia) + parseFloat(potencia)).toFixed(2);
      }
  
      sap.ui.getCore().byId("MOCodipr").setValue(total_consumo);
      sap.ui.getCore().byId("MODemandaKw").setValue(total_potencia);
    },
  
    doValDec: function(oEvent){
      var oModelOrdAct    = sap.ui.getCore().getModel("oModelOrdAct");
      var regex;
      var expresion;
      var valor         = this.getValue();
      var valorAnt      = this._lastValue;
      var id          = this.getId();
      var valorReal     = sap.ui.getCore().byId(id).getValue(); 
  
      //se trata cantidad de entero y decimal, seg�n el caso
      switch (id) {
        case "MOPorcAct":
          nombre = "Energ�a Activa";
          entero = 3; decimal = 2;
          break;
        case "MOPorcDem":
          nombre = "Demanda";
          entero = 6; decimal = 2;
          break;
        case "MOPorcRea":
          nombre = "Energ�a Reactiva";
          entero = 3; decimal = 2;
          break;
        case "MOCodipr":
          nombre = "CPD";
          entero = 3; decimal = 2;
          break;
        case "MODemandaKw":
          nombre = "Demanda";
          entero = 13; decimal = 2;
          break;
      }
  
      if(decimal > 0) { // tiene decimal
        expresion = "^([0-9]{0," +
                entero.toString() + 
               "})([\.]([0-9]{1," +
                decimal.toString() +
                "})?)?$";
        var regex = new RegExp(expresion);
      }
  
      if(!valor.match(regex)) {
        this.setValue(valorAnt);
      }else{
        this._lastValue = valor;
      }
    },
  
    doBuscaMR: function(oEvent){
      var mensaje;
      var tipoMR = sap.ui.getCore().byId("MOInTipMR").getName();
      var DescMR = sap.ui.getCore().byId("MOInDesMR").getValue();
      var id     = this.getId();
  
      //validaciones
      if (!tipoMR){
        mensaje = "Debe ingresar Tipo de material";
        sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
        return;
      }
      if (!DescMR){
        mensaje = "Debe ingresar Descripci�n del material";
        sap.ui.getCore().byId("idOrdenMod").getController().doMostrarMensaje(mensaje);
        return;
      }
  
      if (sap.ui.getCore().byId("MOContFormAyudaMR").isOpen()){
        //crea filtros
        var FilterOperator = sap.ui.model.FilterOperator;
        var filter = new sap.ui.model.Filter("Mtart", sap.ui.model.FilterOperator.EQ, tipoMR);
        var filter2 = new sap.ui.model.Filter("Maktxt",FilterOperator.EQ, DescMR);
  
        sap.ui.getCore().byId("MOTablaAyudaMR").setModel(sap.ui.getCore().getModel("oModelSAP"));
        sap.ui.getCore().byId("MOTablaAyudaMR").bindRows("/matnrRetSet", null, null,[ filter, filter2 ])
        sap.ui.getCore().byId("MOContFormTableMR").open();
        sap.ui.getCore().byId("MOContFormAyudaMR").close()
      }
    },
  
    doRowSelectionAyudaMR: function(oEvent){
  
      //se obtiene indice seleccionado
      var rowIndex = oEvent.getParameters().rowIndex;
  
      //Se obtienen el objeto table
      var oTable = sap.ui.getCore().byId("MOTablaAyudaMR");
  
      //se accede al contexto del indice
      var oContext = oTable.getContextByIndex(rowIndex);
  
      //se obtiene ids
      var id = sap.ui.getCore().byId("MORetMatnrIn").getDescription();
      var ids = id.split("|");
      //se setea valor
      sap.ui.getCore().byId(ids[0]).setName(oContext.getObject().Matnr);
      sap.ui.getCore().byId(ids[0]).setValue(oContext.getObject().Matnr);
  
      sap.ui.getCore().byId(ids[1]).setName(oContext.getObject().Maktxt);
      sap.ui.getCore().byId(ids[1]).setValue(oContext.getObject().Maktxt);
  
      //se cierra form
      sap.ui.getCore().byId("MOContFormTableMR").close();
    },
  
    /**
     * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
     * (NOT before the first rendering! onInit() is used for that one!).
     * @memberOf ordenes.MenuAdminOrdenVer
     */
  //  onBeforeRendering: function() {
  
  //  },
  
    /**
     * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
     * This hook is the same one that SAPUI5 controls get after being rendered.
     * @memberOf ordenes.MenuAdminOrdenVer
     */
  //  onAfterRendering: function() {
  
  //  },
  
    /**
     * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
     * @memberOf ordenes.MenuAdminOrdenVer
     */
  //  onExit: function() {
  
  //  }
  
  });
  //# sourceURL=https://sapgw.redenergia.gob.ec:8200/sap/bc/ui5_ui5/sap/zord/ordenes/OrdenModif.controller.js