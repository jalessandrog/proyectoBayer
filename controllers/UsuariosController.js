const Usuarios = require('../Models/Usuarios');

const controller = {
    ConsultarUsuarios:(req, res, next) => {
        console.log("Ruta Consultar Usuarios")

        Usuarios.fetchAll()
            .then(([rows, fieldData]) => {
                res.render('ConsultarUsuarios',{
                    isLoggedIn: req.session.isLoggedIn,
                    CorreoElectronico: req.session.CorreoElectronico,
                    NombreCompleto: req.session.NombreCompleto,
                    Permisos: req.session.rolEmpleado,
                    ConsultarUsuarios: rows,
                });
            })
            .catch(err => {
                console.log(err);
                //response.status(302).redirect('/error');
            });
    },

    AgregarUsuario: (req, res, next) => {
        console.log("Ruta para editar Usuario")
        res.render('AgregarUsuario',{
            isLoggedIn: req.session.isLoggedIn,
            CorreoElectronico: req.session.CorreoElectronico,
            NombreCompleto: req.session.NombreCompleto,
            Permisos: req.session.rolEmpleado
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
            Permisos: req.session.rolEmpleado
        })
    },
}
module.exports = controller;
