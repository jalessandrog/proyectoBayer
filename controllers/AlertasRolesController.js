const { validationResult } = require('express-validator');
const Alertas = require('../Models/Alertas');
const moment = require('moment');
const { request } = require('express');

const controller = {
    ConsultarAlertasRoles: (req, res, next) => {
        console.log("Ruta Consultar Alertas y Roles")

        Alertas.fetchAll()
            .then(([rows, fieldData]) => {
                res.render('ConsultarAlertasRoles',{
                    isLoggedIn: req.session.isLoggedIn,
                    CorreoElectronico: req.session.CorreoElectronico,
                    NombreCompleto: req.session.NombreCompleto,
                    Permisos: req.session.rolEmpleado,
                    ConsultarAlertas: rows,
                })
            })
            .catch(err => {
                console.log(err);
                //response.status(302).redirect('/error');
            });
    },   

    // AgregarAlerta:(req, res, next) => {
    //     console.log("Ruta Agregar Alertas y Roles")
    //     res.render('AgregarAlerta',{
    //         isLoggedIn: req.session.isLoggedIn,
    //         CorreoElectronico: req.session.CorreoElectronico,
    //         NombreCompleto: req.session.NombreCompleto,
    //     })
    // },

    ModificarAlerta:(req, res, next) => {
        console.log("Ruta Modificar Alerta")
        Alertas.fetchOne(req.params.id)
            .then(([rows, fieldData]) => {
                res.render('ModificarAlerta', {
                    Titulo : 'Editar información de Muestra',
                    isLoggedIn: req.session.isLoggedIn,
                    CorreoElectronico: req.session.CorreoElectronico,
                    NombreCompleto: req.session.NombreCompleto,
                    Permisos: req.session.rolEmpleado,
                    alerta: rows[0],
                });
            })
            .catch(err => {
                console.log(err);
                // res.status(302).redirect('/error');
            });
    },

    processUpdate: (req, res, next) => {
        
        console.log("Ruta Procesando Actualización de Alertas")
        console.log('actualizando Alertas...')
        console.log('ID: '+req.params.id+' Correspondiente a: '+req.body.NombreAlerta)
        
        console.log(req.body)
        

        Alertas.updateAlerta(req.params.id, req.body.NombreAlerta,  req.body.Color, req.body.Condicion)
            .then( () => {
                console.log('Actualización de alerta con exito!!')
                res.status(302).redirect('/AlertasRoles');
            })
            .catch(err => {
                console.log(err);
                console.log('Error al actualizar alerta')
                res.status(302).redirect('/error');
            });
    },
}
module.exports = controller;

