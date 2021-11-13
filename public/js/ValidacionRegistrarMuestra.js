window.addEventListener('load', function(){
    let errors = {};
    let forms = document.querySelector('.RegistrarMuestraForm');
    // let  = document.querySelector('#');
    // let  CodigoDeMuestra= document.querySelector('#CodigoMuestra');
    let codigoSP= document.querySelector('#SP');
    let pcodigoSP= document.querySelector('#errorSP');
    // let nombreMuestra = document.querySelector('#NombreMuestra');
    let Archivo = document.querySelector('#HojaSeguridad');
    let pArchivo = document.querySelector('#errorHojaSeguridad');

    let UnidadDeMedida = document.querySelector('#UnidadMedida');
    let pUnidadDeMedida = document.querySelector('#errorMedida');

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
    
    let fechaCaducidad = document.querySelector('#FechaCaducidad');
    let pfechaCaducidad = document.querySelector('#errorFechaCaducidad');
    
    // Concentracion.focus();

    // const validarNombreSPCodigo = (nombre,SP,codigo) => {
    //     if((nombre.value === '' || codigo.value === '') && SP.input === ''){
    //         input.style.color= "red";
    //         input.style.border= "solid red"
    //     }else{
    //         input.style.backgroundColor = "white";
    //             input.style.color= "green";
    //             input.style.border= "";
    //             input.style.fontWeight = "bold"
    //     }
    // }

//No funciona || Corregir match
    const validarSP = input => {
        // (1020000)+\d{5}$
        let result = /(1020000)+\d{5}$/.test(input.value)
        console.log(result)
        if(input.value === '' || input.value === NULL   || input.value.length==0){
            input.value === NULL;
        }
        if(input.value !== '' || input.value.length>0 ){
            if(result == false){
                input.placeholder = "SP invalido";
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
        if(select.value === "" || select.value.length==0 ){
            select.placeholder = "Este campo es obligatorio";
            errors[select.name] = `${select.name} is required`
            select.style.color= "red";
            select.style.border= "solid red"
            pUnidadDeMedida.classList.add("mostrar");
            pUnidadDeMedida.innerHTML= "Este campo es obligatorio"
        }else{
            select.style.backgroundColor = "white";
            select.style.color= "green";
            select.style.border= "";
            select.style.fontWeight = "bold"
            delete errors[select.name]
            pUnidadDeMedida.classList.remove("mostrar");
            pUnidadDeMedida.classList.add("ocultar");
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
                // alert("Debe ingresar un valor entre 0% y 100%");
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
        if(select.value === "" || select.value.length==0 ){
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

    

    const validarFabricacion = fecha => {
        if(fecha.value === '' || fecha.value === NULL || fecha.value.length==0 ){
            errors[select.name] = `${fecha.name} es obligatorio`
            fecha.style.color= "red";
            fecha.style.border= "solid red";
            pfechaFabricacion.classList.add("mostrar");
            pfechaFabricacion.innerHTML= "Este campo es obligatorio!"
        }else if(!moment(fecha.value).isValid()){
            errors[fecha.name] = `${fecha.name} es invalido`
            fecha.style.color= "red";
            fecha.style.border= "solid red";
            pfechaFabricacion.classList.add("mostrar");
            pfechaFabricacion.innerHTML= "La fecha es invalida"
        }else if(moment(fecha.value).isAfter('2018/08/10')){
            errors[fecha.name] = `${fecha.name} es invalido`
            fecha.style.color= "red";
            fecha.style.border= "solid red";
            pfechaFabricacion.classList.add("mostrar");
            pfechaFabricacion.innerHTML= "La fecha es invalida after"
        }else{
            pfechaFabricacion.classList.remove("mostrar");
            pfechaFabricacion.classList.add("ocultar");
            fecha.style.color= "green";
            fecha.style.border= "";
            fecha.style.fontWeight = "bold"
            delete errors[fecha.name]
        }
    }

    const validarCaducidad = fecha => {
        if(fecha.value === '' || fecha.value === NULL || fecha.value.length==0 ){
            errors[select.name] = `${fecha.name} es obligatorio`
            fecha.style.color= "red";
            fecha.style.border= "solid red";
            pfechaCaducidad.classList.add("mostrar");
            pfechaCaducidad.innerHTML= "Este campo es obligatorio!"
        }else if(!moment(fecha.value).isValid()){
            errors[fecha.name] = `${fecha.name} es invalido`
            fecha.style.color= "red";
            fecha.style.border= "solid red";
            pfechaCaducidad.classList.add("mostrar");
            pfechaCaducidad.innerHTML= "La fecha es invalida"
        }else if(moment(fecha.value).isAfter('2018/08/10')){
            errors[fecha.name] = `${fecha.name} es invalido`
            fecha.style.color= "red";
            fecha.style.border= "solid red";
            pfechaCaducidad.classList.add("mostrar");
            pfechaCaducidad.innerHTML= "La fecha es invalida adter"
        }else{
            pfechaCaducidad.classList.remove("mostrar");
            pfechaCaducidad.classList.add("ocultar");
            fecha.style.color= "green";
            fecha.style.border= "";
            fecha.style.fontWeight = "bold"
            delete errors[fecha.name]
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

    
    Concentracion.addEventListener("blur", function(){ validarConcentracion(Concentracion); })
    Cantidad.addEventListener("blur", function(){ validarCantidad(Cantidad); })
    UnidadDeMedida.addEventListener("blur", function(){ validarUnidadMedida(UnidadDeMedida); })
    Lote.addEventListener("blur", function(){ validarLote(Lote); })
    codigoSP.addEventListener("blur", function(){ validarSP(codigoSP); })
    codigoFormulacion.addEventListener("blur", function(){ validarCodigoFormulacion(codigoFormulacion); })
    Contenedor.addEventListener("blur", function(){ validarContenedor(Contenedor); })
    tipoMuestra.addEventListener("blur", function(){ validarTipoDeMuestra(tipoMuestra); })
    usoDeMuestra.addEventListener("blur", function(){ validarUsoDeMuestra(usoDeMuestra); })
    fechaFabricacion.addEventListener("blur", function(){ validarFabricacion(fechaFabricacion); })
    fechaCaducidad.addEventListener("blur", function(){ validarCaducidad(fechaCaducidad); })
    Archivo.addEventListener("change", function(){ validarFile(Archivo); })

    function validacionForm() {
        validarConcentracion()
        validarUnidadMedida()
        validarCantidad()
        validarLote()
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