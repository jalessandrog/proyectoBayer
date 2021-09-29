
const controller = {
    ConsultarAlertasRoles: (req, res, next) => {
        console.log("Ruta Consultar Alertas y Roles")
        res.render('ConsultarAlertasRoles')
    },

    AgregarAlerta:(req, res, next) => {
        console.log("Ruta Agregar Alertas y Roles")
        res.render('AgregarAlerta')
    },

    ModificarAlerta:(req, res, next) => {
        console.log("Ruta Modificar Alertas y Roles")
        res.render('ModificarAlerta')
    },
}
module.exports = controller;

