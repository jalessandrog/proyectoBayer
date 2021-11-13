const { validationResult } = require('express-validator');
const Muestras = require('../Models/Muestras');
const Contenedores = require('../Models/Contenedores');
const Formulaciones = require('../Models/TipoFormulacion');
const moment = require('moment');
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
                    Permisos: req.session.rolEmpleado,
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
                    Permisos: req.session.rolEmpleado,
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
                    Permisos: req.session.rolEmpleado,
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
                            Permisos: req.session.rolEmpleado,
                            lista_contenedores: contenedores,
                            lista_formulaciones: formulaciones,
                        });
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(302).redirect('/error');
            });
    },

    // errors: {
    //     CorreoElectronico: {
    //         msg: 'No se encuentra email'
    //     }
    // }

    saveMuestra:(req, res, next) => {
        console.log("Ruta Guardar Muestra")
        console.log(req.body)
        
        let SP, CodigoMuestra
        if(req.body.SP === '' || req.body.SP === '0'){
            SP = null;
        }else{
            SP = req.body.SP;
        }

        if(req.body.CodigoMuestra === '' || req.body.CodigoMuestra === '0'){
            CodigoMuestra = null;
        }else{
            CodigoMuestra = req.body.CodigoMuestra;
        }

        const Concentracion = Number(req.body.Concentracion).toFixed(2);
        const Cantidad = Number(req.body.Cantidad).toFixed(2); 

        const muestra = new Muestras(req.body.NombreMuestra, CodigoMuestra, SP, 'https://github.com/jalessandrog/proyectoBayer.git', req.body.UsoMuestra, req.body.Lote, Concentracion, req.body.UnidadMedida, Cantidad,req.body.FechaFabricacion, req.body.FechaCaducidad,req.body.idTipoDeMuestra, req.body.CodigoFormulacion, '1', req.body.idContenedor);
        console.log(muestra)
        let errors = validationResult(req); 
		if(errors.isEmpty()){
            muestra.save()
                .then( () => {
                    res.setHeader('Set-Cookie', 'ultima_Muestra_Agregada='+req.body.NombreMuestra+'; HttpOnly');
                    console.log('Muestra agregada con exito')
                    res.status(302).redirect('/Muestras');
                    
                })
        }else{    
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
                                Permisos: req.session.rolEmpleado,
                                lista_contenedores: contenedores,
                                lista_formulaciones: formulaciones,
                                errors: errors.mapped(), 
                                old : req.body
                            });
                        }).catch(err => {
                            res.status(302).redirect('/error');
                        });
                }).catch(err => {
                    res.status(302).redirect('/error');
                });
            } 
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
                                    Permisos: req.session.rolEmpleado,
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
        let SP, CodigoMuestra
        if(req.body.SP === '' || req.body.SP === '0'){
            SP = null;
        }else{
            SP = req.body.SP;
        }

        if(req.body.CodigoMuestra === '' || req.body.CodigoMuestra === '0'){
            CodigoMuestra = null;
        }else{
            CodigoMuestra = req.body.CodigoMuestra;
        }

        const Concentracion = Number(req.body.Concentracion).toFixed(2);
        const Cantidad = Number(req.body.Cantidad).toFixed(2);

        console.log(Concentracion)
        console.log(Cantidad)

        console.log("Ruta Procesando Actualización de  Muestra")
        console.log('actualizando Muestra...')
        console.log('ID: '+req.params.id+' Correspondiente a: '+req.body.NombreMuestra)
        
        console.log(req.body)
        Muestras.updateMuestra(req.params.id, req.body.NombreMuestra, CodigoMuestra, SP, 'https://github.com/jalessandrog/proyectoBayer.git', req.body.UsoMuestra, req.body.Lote, Concentracion, req.body.UnidadMedida, Cantidad,  req.body.FechaFabricacion, req.body.FechaCaducidad,req.body.idTipoDeMuestra, req.body.CodigoFormulacion, '1', req.body.idContenedor)
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

    borrarMuestra:(req, res, next) => {
        console.log("Ruta Borrar  Muestra")
        console.log('ID: '+req.params.id+' Correspondiente a: '+req.body.NombreMuestra)
        console.log('Borrando Muestra...')
        Muestras.deleteMuestra(req.params.id)
            .then(() => {
                console.log('Eliminacion de Muestra con exito!!')
                res.status(302).redirect('/Muestras');
            })
            .catch(err => {
                console.log(err);
                console.log('Error al borrar muestra')
                res.status(302).redirect('/error');
            });
    },

}
module.exports = controller;