
const controller = {
    

    // processLogin: ,

    ConsultarUsuarios:(req, res, next) => {
        console.log("Ruta Consultar Usuarios")
        res.render('ConsultarUsuarios')
    },

    AgregarUsuario: (req, res, next) => {
        console.log("Ruta para editar Usuario")
        res.render('AgregarUsuario')
    },

    ModificarUsuario:(req, res, next) => {
        console.log("Modificar usuario:",req.params.id)
        //Logica de extraer info del backend
        let nombres = ["Jesus","Ivan","Arturo"]
        res.render('ModificarUsuario',{id:req.params.id, nombre: nombres[req.params.id]})
    },
}
module.exports = controller;
