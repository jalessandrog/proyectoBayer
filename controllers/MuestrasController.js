const controller = {
    ConsultarMuestras: (req, res, next) => {
        console.log("Ruta Consultar Muestras")
        res.render('ConsultarMuestras', {
            Titulo : ' Registrar Muestra',
            isLoggedIn: req.session.isLoggedIn,
            email: req.session.email,
            
        })
    },

    VerMuestra:(req, res, next) => {
        console.log("Ruta ver Muestra")
        res.render('VerMuestra', {
            Titulo : 'Muestra',
            isLoggedIn: req.session.isLoggedIn,
            email: req.session.email,
        })
    },

    EditarMuestra:(req, res, next) => {
        console.log("Ruta Editar Muestra")
        res.render('EditarMuestra', {
            Titulo : 'Editando Información de Muestra',
            isLoggedIn: req.session.isLoggedIn,
            email: req.session.email,
        })
    },

    ConsultarMovimientos:(req, res, next) => {
        console.log("Ruta Consultar Movimientos")
        res.render('ConsultarMovimientos',{
            isLoggedIn: req.session.isLoggedIn,
            email: req.session.email,
        })
    },

    RegistrarMuestra:(req, res, next) => {
        console.log("Ruta Agregar Muestras")
        res.render('RegistrarMuestra', {
            Titulo : ' Registrar Muestra',
            submit : 'Guardar Muestra',
            isLoggedIn: req.session.isLoggedIn,
            email: req.session.email,
        })
    },

}
module.exports = controller;
