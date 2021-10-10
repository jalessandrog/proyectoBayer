const Movimientos = require('../models/movimientos');

const controller = {
    ConsultarMuestras: (req, res, next) => {
        console.log("Ruta Consultar Muestras")

        Movimientos.ConsulMuestras()
        .then(([rows, fieldData]) => {
            console.log(rows);
            //Mober el response.render para acá
            res.render('ConsultarMuestras',{
                Titulo : ' Registrar Muestra',
                isLoggedIn: req.session.isLoggedIn,
                email: req.session.email,
                ConsultarMuestras: rows,
            });
        })
        .catch(err => {
            console.log(err);
            //response.status(302).redirect('/error');
        });
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

        Movimientos.ConsulMovements()
        .then(([rows, fieldData]) => {
            console.log(rows);
            //Mober el response.render para acá
            res.render('ConsultarMovimientos',{
                isLoggedIn: req.session.isLoggedIn,
                email: req.session.email,
                ConsultarMovimientos: rows,
            });
        })
        .catch(err => {
            console.log(err);
            //response.status(302).redirect('/error');
        });
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