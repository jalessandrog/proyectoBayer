window.addEventListener('load', function(){
    let errors = {};
    let forms = document.querySelector('.RegistrarContenedorForm');

    
    let clasificacion = document.querySelector('#Clasificacion');
    let pclasificacionContenedor = document.querySelector('#errorClasificacion');
    


    const validarClasificacion = input => {
        if(input.value === '' || input.value<0 || input.value.length==0){
            input.placeholder = "Este campo es obligatorio";
            errors[input.name] = `${input.name} is required`
            input.style.color= "red";
            input.style.border= "solid red"
            pclasificacionContenedor.classList.add("mostrar");
            pclasificacionContenedor.innerHTML= "Este campo es obligatorio"
        }else{
            pclasificacionContenedor.classList.remove("mostrar");
            pclasificacionContenedor.classList.add("ocultar");
            input.style.backgroundColor = "white";
            input.style.color= "green";
            input.style.border= "";
            input.style.fontWeight = "bold"
            delete errors[input.name]
        }
    } 



    
    clasificacionContenedor.addEventListener("click", function(){ validarClasificacion(clasificacionContenedor); })
    

    function validacionForm() {
        validarClasificacion()
    }

    forms.addEventListener("submit", function(event) {
        validacionForm()
        if(Object.keys(errors).length) {
            event.preventDefault();
            event.stopPropagation();
            console.log(errors)
        }
        console.log('Registro de contenedor con exito')
    })
})