const Consultas = require('../Models/Consultas');
const Muestra = require('../Models/Muestras');

const controller = {
    ConsultarMuestras: (req, res, next) => {
        console.log("Ruta Consultar Muestras")

        Consultas.ConsulMuestras()
        .then(([rows, fieldData]) => {
            console.log(rows);
            //Mover el response.render para acá
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

        Consultas.ConsulMovements()
        .then(([rows, fieldData]) => {
            console.log(rows);
            //Mover el response.render para acá
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

    saveMuestra:(req, res, next) => {
        console.log("Ruta Guardar Muestra")
        
        // res.setHeader('Set-Cookie', 'ultima_Muestra_Agregada='+req.body.NombreMuestra+'; HttpOnly');
        var cant = req.body.Cantidad;
        if(req.body.UnidadMedida == 'Lt'){
            cant= parseInt(req.body.Cantidad, 10)*1000;
        }
        const muestra = new Muestra(req.body.NombreMuestra, req.body.CodigoMuestra, req.body.SP, 'https://github.com/jalessandrog/proyectoBayer.git', req.body.UsoMuestra, req.body.Lote, req.body.Concentracion, cant, req.body.FechaFabricacion, req.body.FechaCaducidad,req.body.idTipoDeMuestra, req.body.CodigoFormulacion, '1' );
        console.log(muestra)
        muestra.save()
            .then( () => {
                console.log('Muestra agregada con exito')
                res.status(302).redirect('/Muestras');
            })
            .catch(err => {
                console.log(err);
                console.log('Error al agregar muestra')
                res.status(302).redirect('/error');
            });
    },

}
module.exports = controller;