const Usuario = require('../models/Usuarios');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const Main = require('../Models/Main');
const Alertas = require('../Models/Alertas');
const CronJob = require('cron').CronJob;
const nodeCron = require("node-cron");
const cron = require('node-cron');
 
const controller = {

    login:(req, res, next) => {
        console.log("Ruta Login")
        res.render('Login', {
            isLoggedIn: req.session.isLoggedIn,
            CorreoElectronico: req.session.CorreoElectronico,
            NombreCompleto: req.session.NombreCompleto,
            Permisos: req.session.rolEmpleado
        });
    },
    
    processLoggin:(req, res, next) => {
        Usuario.fetchOne(req.body.CorreoElectronico).then(([rows, fieldData]) => {
            if(rows[0]){
                bcrypt.compare(req.body.password, rows[0].password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.idEmpleado =  rows[0].idEmpleado;
                        req.session.rolEmpleado = rows[0].Rol;
                        req.session.CorreoElectronico = req.body.CorreoElectronico;
                        req.session.NombreCompleto = rows[0].Nombres + ' ' + rows[0].Apellidos;
                        return req.session.save(err => {
                            res.redirect('/Inicio');
                        });
                    }else{
                        console.log('Credenciales invalidas')
                        res.status(302),
                        res.render('Login', {
                            isLoggedIn: req.session.isLoggedIn,
                            Permisos: req.session.rolEmpleado,
                            CorreoElectronico: req.session.CorreoElectronico,
                            NombreCompleto: req.session.NombreCompleto,
                            errors: {
                                CorreoElectronico: {
                                    msg: 'Credenciales inválidas'
                                }
                            }
                        });
                    }
                }).catch(err => {
                    console.log("Credenciales invalidas");
                    res.status(302).res.redirect('/');
                });
            }else{
                console.log("Ruta Login")
                res.render('Login', {
                    isLoggedIn: req.session.isLoggedIn,
                    CorreoElectronico: req.session.CorreoElectronico,
                    NombreCompleto: req.session.NombreCompleto,
                    Permisos: req.session.rolEmpleado,
                    errors: {
                        CorreoElectronico: {
                            msg: 'Credenciales inválidas'
                        }
                    }
                });
            }
        }).catch(err => {
            console.log(err);
            console.log('No existe el usuario')
            res.status(302).res.redirect('/');
        });
    },

    logout:(req, res, next) => {
        console.log("Cerrando sesión")
        req.session.destroy(() => {
            res.redirect('/'); //Este código se ejecuta cuando la sesión se elimina.
        });
    },

    index: (req, res, next) => {

        

        cron.schedule('*/10 * * * * *', () => {
            console.log('running a task every minute');
        });

        console.log("Ruta index")
        Main.Alerta1()
            .then(([alertaOne, fieldData]) => {
                Main.Alerta2()
                    .then(([alertaTwo, fieldData]) => {
                        Main.Alerta3()
                            .then(([alertaThree, fieldData]) => {
                                res.render('Index',{
                                    isLoggedIn: req.session.isLoggedIn,
                                    CorreoElectronico: req.session.CorreoElectronico,
                                    NombreCompleto: req.session.NombreCompleto,
                                    Permisos: req.session.rolEmpleado,
                                    alertaOne: alertaOne,
                                    alertaTwo: alertaTwo,
                                    alertaThree: alertaThree,
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(302).redirect('/error');
                            });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(302).redirect('/error');
                    });
            })
            .catch(err => {
                console.log(err);
                res.status(302).redirect('/error');
            });
    },
    
}
module.exports = controller;
