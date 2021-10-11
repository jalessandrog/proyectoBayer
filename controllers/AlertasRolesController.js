
const controller = {
    ConsultarAlertasRoles: (req, res, next) => {
        console.log("Ruta Consultar Alertas y Roles")
        res.render('ConsultarAlertasRoles',{
            isLoggedIn: req.session.isLoggedIn,
            CorreoElectronico: req.session.CorreoElectronico,
        })
    },

    AgregarAlerta:(req, res, next) => {
        console.log("Ruta Agregar Alertas y Roles")
        res.render('AgregarAlerta',{
            isLoggedIn: req.session.isLoggedIn,
            CorreoElectronico: req.session.CorreoElectronico,
        })
    },

    ModificarAlerta:(req, res, next) => {
        console.log("Ruta Modificar Alertas y Roles")
        res.render('ModificarAlerta',{
            isLoggedIn: req.session.isLoggedIn,
            CorreoElectronico: req.session.CorreoElectronico,
        })
    },
}
module.exports = controller;

