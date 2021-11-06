const Usuario = require('../Models/Usuarios');
const Usuarios = require('../Models/Usuarios');

function random() {
    return Math.random().toString(36).substr(2); // Eliminar `0.`
};
 
function token() {
    return random() + random(); // Para hacer el token más largo
};
 

const controller = {
    SolicitudCambioContrasena:(req, res, next) => {
        console.log("Ruta Cambio contraseña")
        res.render('LoginRecuperarC',{});
    },

    CambioContrasena:(req, res, next) => {
        console.log("Ruta Cambio contraseña POST")
        Usuario.fetchOne(req.body.CorreoElectronico).then(([rows, fieldData]) => {
        Usuario.UpdateToken( rows[0].idEmpleado,token())
        })
        res.render('LoginRecuperarC',{});
    },
}

module.exports = controller;