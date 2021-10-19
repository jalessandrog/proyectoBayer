window.addEventListener('load', function(){
    let errors = {};
    let forms = document.querySelector('.EditarMuestraForm');
    // let  = document.querySelector('#');
    // let  CodigoDeMuestra= document.querySelector('#CodigoMuestra');
    let codigoSP= document.querySelector('#SP');
    // let nombreMuestra = document.querySelector('#NombreMuestra');
    let UnidadDeMedida = document.querySelector('#UnidadMedida');
    let Cantidad = document.querySelector('#Cantidad');
    let Concentracion = document.querySelector('#Concentracion');
    let Lote = document.querySelector('#Lote');
    let codigoFormulacion = document.querySelector('#CodigoFormulacion');
    // let  = document.querySelector('#');
    let Contenedor = document.querySelector('#idContenedor');
    
    // Concentracion.focus();

    const validarSP = input => {
        // (1020000)+\d{5}$
        let result = /(1020000)+\d{5}$/.test(input.value)
        // console.log(result)
        if(input.value !== ''){
            if(result == false){
                input.placeholder = "SP invalido";
                errors[input.name] = `${input.name} es invalido`
                input.style.color= "red";
                input.style.border= "solid red"
            }else{
                input.style.backgroundColor = "white";
                input.style.color= "green";
                input.style.border= "";
                input.style.fontWeight = "bold"
                delete errors[input.name]
            }
        }
    }

    const validarCantidad = input => {
        if(input.value<0){
            input.placeholder = "No es posible esa cantidad";
            errors[input.name] = `${input.name} tiene valores fuera del rango`
            input.style.color= "red";
            input.style.border= "solid red"
        }else{
            input.style.backgroundColor = "white";
            input.style.color= "green";
            input.style.border= "";
            input.style.fontWeight = "bold"
            delete errors[input.name]
        }
    }

    const validarConcentracion = input => {
        if(input.value === '' || input.value>100 || input.value<0){
            if(input.value>100 || input.value<0){
                input.placeholder = "No es posible esa concentración";
                errors[input.name] = `${input.name} tiene valores fuera del rango`
            }else{
                input.placeholder = "Este campo es obligatorio";
                errors[input.name] = `${input.name} is required`
            }
            input.style.color= "red";
            input.style.border= "solid red"
        }else{
            input.style.backgroundColor = "white";
            input.style.color= "green";
            input.style.border= "";
            input.style.fontWeight = "bold"
            delete errors[input.name]
        }
    }

    const validarLote = input => {
        if(input.value === '' || input.value<0){
            if(input.value<0){
                input.placeholder = "No es posible ese codigo de Lote";
                errors[input.name] = `${input.name} invalido`
            }else{
                input.placeholder = "Este campo es obligatorio";
                errors[input.name] = `${input.name} is required`
            }
            input.style.color= "red";
            input.style.border= "solid red"
        }else{
            input.style.backgroundColor = "white";
            input.style.color= "green";
            input.style.border= "";
            input.style.fontWeight = "bold"
            delete errors[input.name]
        }
    }

    const validarUnidadMedida = select => {
        if(select.value === "" ){
            select.placeholder = "Este campo es obligatorio";
            errors[select.name] = `${select.name} is required`
            select.style.color= "red";
            select.style.border= "solid red"
        }else{
            select.style.backgroundColor = "white";
            select.style.color= "green";
            select.style.border= "";
            select.style.fontWeight = "bold"
            delete errors[select.name]
        }
    }

    const validarCodigoFormulacion = select => {
        if(select.value === "" ){
            select.placeholder = "Este campo es obligatorio";
            errors[select.name] = `${select.name} is required`
            select.style.color= "red";
            select.style.border= "solid red"
        }else{
            select.style.backgroundColor = "white";
            select.style.color= "green";
            select.style.border= "";
            select.style.fontWeight = "bold"
            delete errors[select.name]
        }
    }

    const validarContenedor = select => {
        if(select.value === "" ){
            select.placeholder = "Este campo es obligatorio";
            errors[select.name] = `${select.name} is required`
            select.style.color= "red";
            select.style.border= "solid red"
        }else{
            select.style.backgroundColor = "white";
            select.style.color= "green";
            select.style.border= "";
            select.style.fontWeight = "bold"
            delete errors[select.name]
        }
    }

    
    Concentracion.addEventListener("blur", function(){ validarConcentracion(Concentracion); })
    Cantidad.addEventListener("blur", function(){ validarCantidad(Cantidad); })
    UnidadDeMedida.addEventListener("blur", function(){ validarUnidadMedida(UnidadDeMedida); })
    Lote.addEventListener("blur", function(){ validarLote(Lote); })
    codigoSP.addEventListener("blur", function(){ validarSP(codigoSP); })
    codigoFormulacion.addEventListener("blur", function(){ validarCodigoFormulacion(codigoFormulacion); })
    Contenedor.addEventListener("blur", function(){ validarContenedor(Contenedor); })

    function validacionForm() {
        validarConcentracion();
        validarUnidadMedida();
        validarCantidad();
        validarLote();
        validarSP()
        validarCodigoFormulacion()
        validarContenedor()
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