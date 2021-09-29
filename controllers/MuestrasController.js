const controller = {
    ConsultarMuestras: (req, res, next) => {
        console.log("Ruta Consultar Muestras")
        res.render('ConsultarMuestras', {
            Titulo : ' Registrar Muestra'
        })
    },

    VerMuestra:(req, res, next) => {
        console.log("Ruta ver Muestra")
        res.render('VerMuestra', {
            Titulo : 'Muestra'
        })
    },

    EditarMuestra:(req, res, next) => {
        console.log("Ruta Editar Muestra")
        res.render('EditarMuestra', {
            Titulo : 'Editando Información de Muestra'
        })
    },

    ConsultarMovimientos:(req, res, next) => {
        console.log("Ruta Consultar Movimientos")
        res.render('ConsultarMovimientos')
    },

    RegistrarMuestra:(req, res, next) => {
        console.log("Ruta Agregar Muestras")
        res.render('RegistrarMuestra', {
            Titulo : ' Registrar Muestra',
            submit : 'Guardar Muestra'
        })
    },

}
module.exports = controller;
