window.addEventListener('load', function(){
    let errors = {};
    let forms = document.querySelector('.RegistrarMuestraForm');

    let nombreMuestra= document.querySelector('#NombreMuestra');
    let pnombreMuestra= document.querySelector('#errorNombreMuestra');
    let pAnombreMuestra= document.querySelector('#alertaNombreMuestra');

    let codigoMuestra= document.querySelector('#CodigoMuestra');
    let pcodigoMuestra= document.querySelector('#errorCodigoMuestra');
    let pAcodigoMuestra= document.querySelector('#alertaCodigoMuestra');

    let codigoSP= document.querySelector('#SP');
    let pcodigoSP= document.querySelector('#errorSP');
    let pAcodigoSP= document.querySelector('#alertaSP');

    let Archivo = document.querySelector('#HojaSeguridad'); 
    let pArchivo = document.querySelector('#errorHojaSeguridad');

    let UnidadDeMedida = document.querySelector('#UnidadMedida');
    let pUnidadDeMedida = document.querySelector('#errorUnidadMedida'); 

    let Cantidad = document.querySelector('#Cantidad');
    let pCantidad = document.querySelector('#errorCantidad');

    let Concentracion = document.querySelector('#Concentracion');
    let pConcentracion = document.querySelector('#errorConcentracion');
    
    let Lote = document.querySelector('#Lote');
    let pLote = document.querySelector('#errorLote');
    
    let codigoFormulacion = document.querySelector('#CodigoFormulacion');
    let pcodigoFormulacion = document.querySelector('#errorCodigoFormulacion');
    
    let tipoMuestra = document.querySelector('#idTipoDeMuestra');
    let ptipoMuestra = document.querySelector('#erroridTipoDeMuestra');
    
    let Contenedor = document.querySelector('#idContenedor');
    let pContenedor = document.querySelector('#erroridContenedor');
    
    let usoDeMuestra = document.querySelector('#UsoMuestra');
    let pusoDeMuestra = document.querySelector('#errorUsoMuestra');
    
    let fechaFabricacion = document.querySelector('#FechaFabricacion');
    let pfechaFabricacion = document.querySelector('#errorFechaFabricacion');
    let pAfechaFabricacion = document.querySelector('#alertaFechaFabricacion');
    
    let fechaCaducidad = document.querySelector('#FechaCaducidad');
    let pfechaCaducidad = document.querySelector('#errorFechaCaducidad');
    let pAfechaCaducidad = document.querySelector('#alertaFechaCaducidad');

    const validacionConjunto = () => {
        let nombre= document.querySelector('#NombreMuestra').value;
        let codigo= document.querySelector('#CodigoMuestra').value;
        let SP= document.querySelector('#SP').value; 

        if( ((nombre === '' || nombre === null || nombre.length===0) && (codigo === '' || codigo === null   || codigo.length===0))  && (SP === '' || SP === null   || SP.length===0)){
            
            // document.querySelector('#NombreMuestra').style.color= "orange";
            // document.querySelector('#NombreMuestra').style.border= "solid orange"
            // document.querySelector('#CodigoMuestra').style.color= "orange";
            // document.querySelector('#CodigoMuestra').style.border= "solid orange"
            // document.querySelector('#SP').style.color= "orange";
            // document.querySelector('#SP').style.border= "solid orange"
            pAnombreMuestra.classList.add("mostrar");
            pAnombreMuestra.innerHTML= "Debes escribir al menos uno de estos campos para poder registrar una muestra"
            pAcodigoMuestra.classList.add("mostrar");
            pAcodigoMuestra.innerHTML= "Debes escribir al menos uno de estos campos para poder registrar una muestra"
            pAcodigoSP.classList.add("mostrar");
            pAcodigoSP.innerHTML= "Debes escribir al menos uno de estos campos para poder registrar una muestra"
        }else{
            // document.querySelector('#NombreMuestra').style.color= "";
            // document.querySelector('#NombreMuestra').style.border= ""
            // document.querySelector('#CodigoMuestra').style.color= "";
            // document.querySelector('#CodigoMuestra').style.border= ""
            // document.querySelector('#SP').style.color= "";
            // document.querySelector('#SP').style.border= ""
            pAnombreMuestra.classList.remove("mostrar");
            pAnombreMuestra.classList.add("ocultar");
            pAcodigoMuestra.classList.remove("mostrar");
            pAcodigoMuestra.classList.add("ocultar");
            pAcodigoSP.classList.remove("mostrar");
            pAcodigoSP.classList.add("ocultar");
        }
    }
    

    const validarNombreMuestra = input => {

        if(input.value === '' || input.value === null   || input.value.length===0){
            input.value === NULL;
        } 

        if(input.value !== '' && input.value.length<=2 ){
            input.placeholder = "Nombre de muestra invalido. Debe escribir un nombre con más caracteres";
            errors[input.name] = `${input.name} es invalido`
            input.style.color= "red";
            input.style.border= "solid red"
            pnombreMuestra.classList.add("mostrar");
            pnombreMuestra.innerHTML= "Nombre de muestra invalido. Debe escribir un nombre con más caracteres"
            
        }else{
            input.style.backgroundColor = "white";
            input.style.color= "green";
            input.style.border= "";
            input.style.fontWeight = "bold"
            delete errors[input.name]
            pnombreMuestra.classList.remove("mostrar");
            pnombreMuestra.classList.add("ocultar");
        }
    }

    const validarCodigoMuestra = input => {
        if(input.value === '' || input.value === null   || input.value.length==0){
            input.value === NULL;
        } 

        // if(input.value !== '' || input.value.length<=0 ){
        //     input.placeholder = "Codigo de Muestra invalido. Debe escribir un codigo de muestra con más caracteres";
        //     errors[input.name] = `${input.name} es invalido`
        //     input.style.color= "red";
        //     input.style.border= "solid red"
        //     pcodigoMuestra.classList.add("mostrar");
        //     pcodigoMuestra.innerHTML= "Codigo de Muestra invalido. Debe escribir un codigo de muestra con más caracteres"
            
        // }
        else{
            input.style.backgroundColor = "white";
            input.style.color= "green";
            input.style.border= "";
            input.style.fontWeight = "bold"
            delete errors[input.name]
            pcodigoMuestra.classList.remove("mostrar");
            pcodigoMuestra.classList.add("ocultar");
        }
    }


    const validarSP = input => {
        // (1020000)+\d{5}$
        let result = /(1020000)+\d{5}$/.test(input.value)
        console.log(result)
        if(input.value === '' || input.value === null   || input.value.length==0){
            input.value === NULL;
        } 
        if(input.value !== '' || input.value.length>0 ){
            if(result == false){
                input.placeholder = "SP invalido. El códigp SP";
                errors[input.name] = `${input.name} es invalido`
                input.style.color= "red";
                input.style.border= "solid red"
                pcodigoSP.classList.add("mostrar");
                pcodigoSP.innerHTML= "SP invalido"
            }else{
                input.style.backgroundColor = "white";
                input.style.color= "green";
                input.style.border= "";
                input.style.fontWeight = "bold"
                delete errors[input.name]
                pcodigoSP.classList.remove("mostrar");
                pcodigoSP.classList.add("ocultar");
            }
        }
    }

    const validarUnidadMedida = select => {
        if(select.value === "" || select.value.length===0 || select.value === null ){
            select.placeholder = "Este campo es obligatorio";
            errors[select.name] = `${select.name} is required`
            select.style.color= "red";
            select.style.border= "solid red"
            pUnidadDeMedida.classList.add("mostrar");
            pUnidadDeMedida.innerHTML= "Este campo es obligatorio"
        }else{
            pUnidadDeMedida.classList.remove("mostrar");
            pUnidadDeMedida.classList.add("ocultar");
            select.style.backgroundColor = "white";
            select.style.color= "green";
            select.style.border= "";
            select.style.fontWeight = "bold"
            delete errors[select.name]
        }
    }

    const validarCantidad = input => {
        if(input.value === '' || input.value<0){
            if(input.value<0){
                input.placeholder = "No es posible esa cantidad";
                errors[input.name] = `${input.name} tiene valores fuera del rango`
                pCantidad.classList.add("mostrar");
                pCantidad.innerHTML= "Valores fuera del rango"
            }else{
                input.placeholder = "Este campo es obligatorio";
                errors[input.name] = `${input.name} is required`
                pCantidad.classList.add("mostrar");
                pCantidad.innerHTML= "Este campo es obligatorio"
            }
            input.style.color= "red";
            input.style.border= "solid red"
        }else{
            input.style.backgroundColor = "white";
            input.style.color= "green";
            input.style.border= "";
            input.style.fontWeight = "bold"
            delete errors[input.name]
            pCantidad.classList.remove("mostrar");
            pCantidad.classList.add("ocultar");
        }
    }

    const validarConcentracion = input => {
        if(input.value === '' || input.value>100 || input.value<0 ||  input.value.length==0){
            if(input.value>100 || input.value<0){
                input.placeholder = "No es posible esa concentración";
                errors[input.name] = `${input.name} tiene valores fuera del rango`
                pConcentracion.classList.add("mostrar");
                pConcentracion.innerHTML= "No es posible esa concentración. Tiene valores fuera del rango"
            }else{
                input.placeholder = "Este campo es obligatorio";
                errors[input.name] = `${input.name} is required`
                pConcentracion.classList.add("mostrar");
                pConcentracion.innerHTML= "Este campo es obligatorio"
            }
            input.style.color= "red";
            input.style.border= "solid red"
        }else{
            input.style.backgroundColor = "white";
            input.style.color= "green";
            input.style.border= "";
            input.style.fontWeight = "bold"
            delete errors[input.name]
            pConcentracion.classList.remove("mostrar");
            pConcentracion.classList.add("ocultar");
        }
    }
    
    const validarTipoDeMuestra = select => {
        if(select.value === "" || select.value.length===0 || select.value === null ){
            select.placeholder = "Este campo es obligatorio";
            errors[select.name] = `${select.name} is required`
            select.style.color= "red";
            select.style.border= "solid red";
            ptipoMuestra.classList.add("mostrar");
            ptipoMuestra.innerHTML= "Este campo es obligatorio!"
        }else{
            ptipoMuestra.classList.remove("mostrar");
            ptipoMuestra.classList.add("ocultar");
            select.style.backgroundColor = "white";
            select.style.color= "green";
            select.style.border= "";
            select.style.fontWeight = "bold"
            delete errors[select.name]
        }
    }

    const validarCodigoFormulacion = select => {
        if(select.value === "" || select.value.length==0  ){
            select.placeholder = "Este campo es obligatorio";
            errors[select.name] = `${select.name} is required`
            select.style.color= "red";
            select.style.border= "solid red"
            pcodigoFormulacion.classList.add("mostrar");
            pcodigoFormulacion.innerHTML="Este campo es obligatorio"
        }else{
            pcodigoFormulacion.classList.remove("mostrar");
            pcodigoFormulacion.classList.add("ocultar");
            select.style.backgroundColor = "white";
            select.style.color= "green";
            select.style.border= "";
            select.style.fontWeight = "bold"
            delete errors[select.name]
        }
    }

    const validarLote = input => {
        if(input.value === '' || input.value<0 || input.value.length==0){
            if(input.value<0){
                input.placeholder = "No es posible ese codigo de Lote";
                errors[input.name] = `${input.name} invalido`
                pLote.classList.add("mostrar");
                pLote.innerHTML= "Lote invalido. No es posible ese codigo de Lote"
            }else{
                input.placeholder = "Este campo es obligatorio";
                errors[input.name] = `${input.name} is required`
                pLote.classList.add("mostrar");
                pLote.innerHTML= "Este campo es obligatorio"
            }
            input.style.color= "red";
            input.style.border= "solid red"
        }else{
            
            input.style.backgroundColor = "white";
            input.style.color= "green";
            input.style.border= "";
            input.style.fontWeight = "bold"
            delete errors[input.name]
            pLote.classList.remove("mostrar");
            pLote.classList.add("ocultar");
        }
    }

    

    const validarUsoDeMuestra = select => {
        if(select.value === "" || select.value.length==0  ){
            select.placeholder = "Este campo es obligatorio";
            errors[select.name] = `${select.name} is required`
            select.style.color= "red";
            select.style.border= "solid red"
            pusoDeMuestra.classList.add("mostrar");
            pusoDeMuestra.innerHTML= "Este campo es obligatorio"
        }else{
            pusoDeMuestra.classList.remove("mostrar");
            pusoDeMuestra.classList.add("ocultar");
            select.style.backgroundColor = "white";
            select.style.color= "green";
            select.style.border= "";
            select.style.fontWeight = "bold"
            delete errors[select.name]
        }
    }

    const validarContenedor = select => {
        if(select.value === "" || select.value.length==0  ){
            select.placeholder = "Este campo es obligatorio";
            errors[select.name] = `${select.name} is required`
            select.style.color= "red";
            select.style.border= "solid red"
            pContenedor.classList.add("mostrar");
            pContenedor.innerHTML= "Este campo es obligatorio"
        }else{
            pContenedor.classList.remove("mostrar");
            pContenedor.classList.add("ocultar");
            select.style.backgroundColor = "white";
            select.style.color= "green";
            select.style.border= "";
            select.style.fontWeight = "bold"
            delete errors[select.name]
        }
    }

    function existeFecha(f){
        var fechaf = f.split("-");
        var year = fechaf[0];
        var month = fechaf[1];
        var day = fechaf[2];
        var date = new Date(year,month,'0');
        if((day-0)>(date.getDate()-0)){
              return false;
        }
        return true;
  }

    
    const validarFabricacion = fecha => {
        // let today = new Date()
        // let todayAño = today.getFullYear() 
        // let todayMes = parseInt(today.getMonth()) + 1 
        // let todayDia = today.getDate()
        // console.log("today año "+todayAño+ " today mes "+todayMes + " today dia "+todayDia)

        // let ingresada =  new Date(fecha.value);
        // let ingresadaAño = ingresada.getFullYear() 
        // let ingresadaMes = parseInt(ingresada.getMonth()) + 1 
        // let ingresadaDia = parseInt(ingresada.getDate()) + 1 
        // console.log("ingresada año "+ingresadaAño+ " ingresada mes "+ingresadaMes + " ingresada dia "+ingresadaDia)

        // let prueba = today.Date.CompareTo(ingresada.Date)
        // console.log(" After "+ prueba)

        let today = moment(new Date())
        console.log("today "+today)

        let ingresada = moment(new Date(fecha.value))
        console.log("ingresada "+ingresada)

        console.log("diferencia "+today.diff(ingresada,'days'))

        let RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/.test(fecha.value)
        console.log(fecha.value)
        if(fecha.value === '' || fecha.value === null || fecha.value.length==0 ){
            errors[fecha.name] = `${fecha.name} es obligatorio`
            fecha.style.color= "red";
            fecha.style.border= "solid red";
            pfechaFabricacion.classList.add("mostrar");
            pfechaFabricacion.innerHTML= "Este campo es obligatorio!"
        }else{
            if(RegExPattern){
                if(existeFecha(fecha.value)){
                    
                    if(today.diff(ingresada,'days') == 1){
                        console.log("La fecha fabricación coincide al dia actual")
                        fecha.style.color= "orange";
                        fecha.style.border= "solid orange";
                        pAfechaFabricacion.classList.add("mostrar");
                        pAfechaFabricacion.innerHTML= "La fecha fabricacion coincide al dia actual!"
                    }
                    
                    if(today.diff(ingresada,'days') > 1){
                            console.log("es fecha fabricación menor al día actual")
                            pfechaFabricacion.classList.remove("mostrar");
                            pfechaFabricacion.classList.add("ocultar");
                            pAfechaFabricacion.classList.remove("mostrar");
                            pAfechaFabricacion.classList.add("ocultar");
                            fecha.style.color= "green";
                            fecha.style.border= "";
                            fecha.style.fontWeight = "bold"
                            delete errors[fecha.name]
                    }

                    if(today.diff(ingresada,'days') < 1){
                        console.log("es fecha fabricación mayor al día actual")
                        fecha.style.color= "orange";
                        fecha.style.border= "solid orange";
                        pAfechaFabricacion.classList.add("mostrar");
                        pAfechaFabricacion.innerHTML= "¿Eso es posible? La fecha de fabricación que ha ingresado ocurre en el futuro"
                    }
                }else{
                    errors[fecha.name] = `${fecha.name} introducida no existe.`
                    fecha.style.color= "red";
                    fecha.style.border= "solid red";
                    pfechaFabricacion.classList.add("mostrar");
                    pfechaFabricacion.innerHTML= "La fecha introducida no existe."
                    pAfechaFabricacion.classList.remove("mostrar");
                    pAfechaFabricacion.classList.add("ocultar");
                }
            }else{
                errors[fecha.name] = `El formato de la fecha es incorrecto.`
                fecha.style.color= "red";
                fecha.style.border= "solid red";
                pfechaFabricacion.classList.add("mostrar");
                pfechaFabricacion.innerHTML= "El formato de la fecha es incorrecto."
                pAfechaFabricacion.classList.remove("mostrar");
                pAfechaFabricacion.classList.add("ocultar");
            }
        }
    }

    const validarCaducidad = fecha => {
        let today = moment(new Date())
        console.log("today "+today)

        let ingresada = moment(new Date(fecha.value))
        console.log("ingresada "+ingresada)

        console.log("diferencia "+today.diff(ingresada,'days'))

        let RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/.test(fecha.value)
        console.log(fecha.value)
        if(fecha.value === '' || fecha.value === null || fecha.value.length==0 ){
            errors[fecha.name] = `${fecha.name} es obligatorio`
            fecha.style.color= "red";
            fecha.style.border= "solid red";
            pfechaCaducidad.classList.add("mostrar");
            pfechaCaducidad.innerHTML= "Este campo es obligatorio!"
        }else{
            if(RegExPattern){
                if(existeFecha(fecha.value)){

                    if(today.diff(ingresada,'days') == 1){
                        console.log("La fecha Caducidad coincide al dia actual!")
                        fecha.style.color= "orange";
                        fecha.style.border= "solid orange";
                        pAfechaCaducidad.classList.add("mostrar");
                        pAfechaCaducidad.innerHTML= "La muestra caduca el día de hoy! La fecha Caducidad coincide al dia actual"
                    }
                    
                    if(today.diff(ingresada,'days') > 1){
                        console.log("es fecha Caducidad menor al día actual")
                        fecha.style.color= "orange";
                        fecha.style.border= "solid orange";
                        pfechaCaducidad.classList.remove("mostrar");
                        pfechaCaducidad.classList.add("ocultar");
                        pAfechaCaducidad.classList.add("mostrar");
                        pAfechaCaducidad.innerHTML= "La muestra ya ha caducado!"
                    }

                    if(today.diff(ingresada,'days') < 1){
                        console.log("es fecha caducidad mayor al día actual")
                        pfechaCaducidad.classList.remove("mostrar");
                        pfechaCaducidad.classList.add("ocultar");
                        pAfechaCaducidad.classList.remove("mostrar");
                        pAfechaCaducidad.classList.add("ocultar");
                        fecha.style.color= "green";
                        fecha.style.border= "";
                        fecha.style.fontWeight = "bold"
                        delete errors[fecha.name]
                    }
                    
                }else{
                    errors[fecha.name] = `${fecha.name} introducida no existe.`
                    fecha.style.color= "red";
                    fecha.style.border= "solid red";
                    pfechaCaducidad.classList.add("mostrar");
                    pfechaCaducidad.innerHTML= "La fecha introducida no existe."
                    pAfechaCaducidad.classList.remove("mostrar");
                    pAfechaCaducidad.classList.add("ocultar");
                }
            }else{
                errors[fecha.name] = `El formato de la fecha es incorrecto.`
                fecha.style.color= "red";
                fecha.style.border= "solid red";
                pfechaCaducidad.classList.add("mostrar");
                pfechaCaducidad.innerHTML= "El formato de la fecha es incorrecto."
                pAfechaCaducidad.classList.remove("mostrar");
                pAfechaCaducidad.classList.add("ocultar");
            }
        }
    }

    const  validarFile = file =>{
        var filePath = file.value;
        var allowedExtensions = /(.pdf|.PDF)$/i;
        if(!allowedExtensions.exec(filePath)){
            alert('Por favor agrege solo archivos PDF'); 
            errors[file.name] = `${file.name} es invalido`
            pArchivo.classList.add("mostrar");
            pArchivo.innerHTML= "Tipo de archivo invalido"
            file.value = '';
            return false;
        }else{
            pArchivo.classList.remove("mostrar");
            pArchivo.classList.add("ocultar");
            file.style.color= "green";
            file.style.border= "";
            file.style.fontWeight = "bold"
            delete errors[file.name]
        }
    }


    addEventListener("click", function(){ validacionConjunto(); })
    nombreMuestra.addEventListener("blur", function(){ validarNombreMuestra(nombreMuestra); })
    codigoMuestra.addEventListener("blur", function(){ validarCodigoMuestra(codigoMuestra); })
    codigoSP.addEventListener("blur", function(){ validarSP(codigoSP); })
    UnidadDeMedida.addEventListener("blur", function(){ validarUnidadMedida(UnidadDeMedida); })
    Cantidad.addEventListener("blur", function(){ validarCantidad(Cantidad); })
    Concentracion.addEventListener("blur", function(){ validarConcentracion(Concentracion); })
    Lote.addEventListener("blur", function(){ validarLote(Lote); })
    codigoFormulacion.addEventListener("blur", function(){ validarCodigoFormulacion(codigoFormulacion); })
    Contenedor.addEventListener("blur", function(){ validarContenedor(Contenedor); })
    tipoMuestra.addEventListener("blur", function(){ validarTipoDeMuestra(tipoMuestra); })
    usoDeMuestra.addEventListener("blur", function(){ validarUsoDeMuestra(usoDeMuestra); })
    fechaFabricacion.addEventListener("blur", function(){ validarFabricacion(fechaFabricacion); })
    fechaCaducidad.addEventListener("blur", function(){ validarCaducidad(fechaCaducidad); })
    Archivo.addEventListener("change", function(){ validarFile(Archivo); })

    function validacionForm() {
        validacionConjunto()
        validarConcentracion()
        validarUnidadMedida()
        validarCantidad()
        validarLote()
        validarNombreMuestra()
        validarCodigoMuestra()
        validarSP()
        validarCodigoFormulacion()
        validarContenedor()
        validarTipoDeMuestra()
        validarUsoDeMuestra()
        validarFabricacion()
        validarCaducidad()
        validarFile()
    }

    forms.addEventListener("submit", function(event) {
        validacionForm()
        if(Object.keys(errors).length) {
            event.preventDefault();
            event.stopPropagation();
            console.log(errors)
        }
        console.log('Actualización de muestra con exito')
    })
})