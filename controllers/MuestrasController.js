const Muestras = require('../Models/Muestras');
const Contenedores = require('../Models/Contenedores');
const Formulaciones = require('../Models/TipoFormulacion');
const { request } = require('express');

const controller = {
    ConsultarMuestras: (req, res, next) => {
        console.log("Ruta Consultar Muestras")

        Muestras.fetchAll()
            .then(([rows, fieldData]) => {
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
    BuscarMuestras: (req, res, next) => {
        console.log("Ruta Consultar Muestras")
        let query = req.body.query;
        console.log(req.body)
        Muestras.fetchAllbyTerm(query)
            .then(([rows, fieldData]) => {
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
        console.log("Ruta ver Muestra con ID: "+req.params.id)
        console.log(req.body)
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

    RegistrarMuestra:(req, res, next) => {
        console.log("Ruta Agregar Muestras")
        Contenedores.fetchAll()
            .then(([contenedores, fieldData]) => {
                Formulaciones.fetchAll()
                    .then(([formulaciones, fieldData]) => {
                        res.render('RegistrarMuestra', {
                            Titulo : ' Registrar Muestra',
                            submit : 'Guardar Muestra',
                            isLoggedIn: req.session.isLoggedIn,
                            CorreoElectronico: req.session.CorreoElectronico,
                            NombreCompleto: req.session.NombreCompleto,
                            lista_contenedores: contenedores,
                            lista_formulaciones: formulaciones,
                        });
                    })
            })
    },

    saveMuestra:(req, res, next) => {
        console.log("Ruta Guardar Muestra")
        console.log(req.body)
        res.setHeader('Set-Cookie', 'ultima_Muestra_Agregada='+req.body.NombreMuestra+'; HttpOnly');
        var cant = req.body.Cantidad;
        var UnidadDeMedida = req.body.UnidadDeMedida;
        if(UnidadDeMedida == 'Lt'){
            cant= parseInt(req.body.Cantidad, 10)*1000;
        }
        const muestra = new Muestras(req.body.NombreMuestra, req.body.CodigoMuestra, req.body.SP, 'https://github.com/jalessandrog/proyectoBayer.git', req.body.UsoMuestra, req.body.Lote, req.body.Concentracion, cant, req.body.FechaFabricacion, req.body.FechaCaducidad,req.body.idTipoDeMuestra, req.body.CodigoFormulacion, '1', req.body.idContenedor);
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

    EditarMuestra:(req, res, next) => {
        console.log("Ruta Editar Muestra con ID "+req.params.id)
        Muestras.fetchOne(req.params.id)
            .then(([rows, fieldData]) => {
                Contenedores.fetchAll()
                    .then(([contenedores, fieldData]) => {
                        Formulaciones.fetchAll()
                            .then(([formulaciones, fieldData]) => {
                                res.render('EditarMuestra', {
                                    Titulo : 'Editar información de Muestra',
                                    isLoggedIn: req.session.isLoggedIn,
                                    CorreoElectronico: req.session.CorreoElectronico,
                                    NombreCompleto: req.session.NombreCompleto,
                                    lista_contenedores: contenedores,
                                    lista_formulaciones: formulaciones,
                                    Muestra: rows[0],
                                });
                            })
                    })
            })
            .catch(err => {
                res.status(302).redirect('/error');
            });
    },

    processUpdate: (req, res, next) => {
        
        console.log("Ruta Procesando Actualización de  Muestra")
        console.log('actualizando Muestra...')
        console.log('ID: '+req.params.id+' Correspondiente a: '+req.body.NombreMuestra)
        
        cant = req.body.Cantidad;
        UnidadDeMedida = req.body.UnidadDeMedida;
        if(UnidadDeMedida == 'Lt'){
            cant= parseInt(req.body.Cantidad, 10)*1000;
        }
        console.log(req.body)
        Muestras.updateMuestra(req.body.NombreMuestra, req.body.CodigoMuestra, req.body.SP, 'https://github.com/jalessandrog/proyectoBayer.git', req.body.UsoMuestra, req.body.Lote, req.body.Concentracion, cant, req.body.FechaFabricacion, req.body.FechaCaducidad,req.body.idTipoDeMuestra, req.body.CodigoFormulacion, '1', req.body.idContenedor, req.params.id)
            .then( () => {
                console.log('Actualización de muestra con exito!!')
                res.status(302).redirect('/Muestras');
            })
            .catch(err => {
                console.log(err);
                console.log('Error al actualizar muestra')
                res.status(302).redirect('/error');
            });
    },

}
module.exports = controller;