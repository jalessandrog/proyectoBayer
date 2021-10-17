
const controller = {
    

    ConsultarUsuarios:(req, res, next) => {
        console.log("Ruta Consultar Usuarios")
        res.render('ConsultarUsuarios',{
            isLoggedIn: req.session.isLoggedIn,
            CorreoElectronico: req.session.CorreoElectronico,
            NombreCompleto: req.session.NombreCompleto,
        })
    },

    AgregarUsuario: (req, res, next) => {
        console.log("Ruta para editar Usuario")
        res.render('AgregarUsuario',{
            isLoggedIn: req.session.isLoggedIn,
            CorreoElectronico: req.session.CorreoElectronico,
            NombreCompleto: req.session.NombreCompleto,
        })
    },

    ModificarUsuario:(req, res, next) => {
        console.log("Modificar usuario:",req.params.id)
        //Logica de extraer info del backend
        let nombres = ["Jesus","Ivan","Arturo"]
        res.render('ModificarUsuario',{id:req.params.id, nombre: nombres[req.params.id],
            isLoggedIn: req.session.isLoggedIn,
            CorreoElectronico: req.session.CorreoElectronico,
            NombreCompleto: req.session.NombreCompleto,
        })
    },
}
module.exports = controller;
