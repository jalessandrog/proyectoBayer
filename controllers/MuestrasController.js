const Muestra = require('../Models/Movimientos');
const Muestras = require('../Models/Muestras');

const controller = {
    ConsultarMuestras: (req, res, next) => {
        console.log("Ruta Consultar Muestras")

        Muestras.fetchAll()
        .then(([rows, fieldData]) => {
            // console.log(rows);
            //Mover el response.render para acá
            res.render('ConsultarMuestras',{
                Titulo : ' Registrar Muestra',
                isLoggedIn: req.session.isLoggedIn,
                CorreoElectronico: req.session.CorreoElectronico,
                NombreCompleto: req.session.NombreCompleto,
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
        console.log(req.params.id)
        Muestras.fetchOne(req.params.id)
        .then(([rows, fieldData]) => {
            res.render('VerMuestra', {
                Titulo : 'Muestra ',
                isLoggedIn: req.session.isLoggedIn,
                CorreoElectronico: req.session.CorreoElectronico,
                NombreCompleto: req.session.NombreCompleto,
                Muestra: rows[0],
            });
        })
        .catch(err => {
            console.log(err);
            res.status(302).redirect('/error');
        });
    },

    // EditarMuestra:(req, res, next) => {
    //     console.log("Ruta Editar Muestra")
    //     res.render('EditarMuestra', {
    //         Titulo : 'Editando Información de Muestra',
    //         isLoggedIn: req.session.isLoggedIn,
    //         CorreoElectronico: req.session.CorreoElectronico,
                // NombreCompleto: req.session.NombreCompleto,
    //     })
    // },

    RegistrarMuestra:(req, res, next) => {
        console.log("Ruta Agregar Muestras")
        res.render('RegistrarMuestra', {
            Titulo : ' Registrar Muestra',
            submit : 'Guardar Muestra',
            isLoggedIn: req.session.isLoggedIn,
            CorreoElectronico: req.session.CorreoElectronico,
            NombreCompleto: req.session.NombreCompleto,
        })
    },

    saveMuestra:(req, res, next) => {
        console.log("Ruta Guardar Muestra")
        
        // res.setHeader('Set-Cookie', 'ultima_Muestra_Agregada='+req.body.NombreMuestra+'; HttpOnly');
        var cant = req.body.Cantidad;
        var UnidadDeMedida = req.body.UnidadDeMedida;
        if(UnidadDeMedida == 'Lt'){
            cant= parseInt(req.body.Cantidad, 10)*1000;
        }
        const muestra = new Muestras(req.body.NombreMuestra, req.body.CodigoMuestra, req.body.SP, 'https://github.com/jalessandrog/proyectoBayer.git', req.body.UsoMuestra, req.body.Lote, req.body.Concentracion, cant, req.body.FechaFabricacion, req.body.FechaCaducidad,req.body.idTipoDeMuestra, req.body.CodigoFormulacion, '1' );
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