
const controller = {
    ConsultarAlertasRoles: (req, res, next) => {
        console.log("Ruta Consultar Alertas y Roles")
        res.render('ConsultarAlertasRoles',{
            isLoggedIn: req.session.isLoggedIn,
            email: req.session.email,
        })
    },

    AgregarAlerta:(req, res, next) => {
        console.log("Ruta Agregar Alertas y Roles")
        res.render('AgregarAlerta',{
            isLoggedIn: req.session.isLoggedIn,
            email: req.session.email,
        })
    },

    ModificarAlerta:(req, res, next) => {
        console.log("Ruta Modificar Alertas y Roles")
        res.render('ModificarAlerta',{
            isLoggedIn: req.session.isLoggedIn,
            email: req.session.email,
        })
    },
}
module.exports = controller;

