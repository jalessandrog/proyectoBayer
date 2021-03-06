const Usuario = require('../Models/Usuarios');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const Main = require('../Models/Main');
const Alertas = require('../Models/Alertas');
const cron = require('node-cron');
const nodemailer = require("nodemailer"); 
const auth = require('../secret/secret');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: auth,
});

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
                        return req.session.save(() => {
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
                                    msg: 'Credenciales inv??lidas'
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
                            msg: 'Credenciales inv??lidas'
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
        console.log("Cerrando sesi??n")
        req.session.destroy(() => {
            res.redirect('/'); //Este c??digo se ejecuta cuando la sesi??n se elimina.
        });
    },

    index: (req, res, next) => {
        console.log("Ruta index")
        //-----------------------------------------
        cron.schedule('1 1 17 * * *', (req, res, next) => {
        //cron.schedule('1 * * * * *', (req, res, next) => {
            console.log('Enviar correo de alertas');
            Main.Alerta1()
            .then(([alertaOne, fieldData]) => { 
                let data = alertaOne.rows;
                let contenido = "";
                if (alertaOne.length > 0) {
                    for (let muestro of alertaOne) {
                        contenido += '<div class="col s12 m6 l4">'
                        contenido += '<p><strong>Nombre: </strong>'+ muestro.NombreMuestra + ', <strong>C??digo: </strong>'+ muestro.CodigoMuestra +', <strong>SP: </strong>'+ muestro.SP +', <strong>D??as para caducar: </strong>'+ muestro.DiasRestantes +', <strong>Existencias: </strong>'+ (muestro.Cantidad)+'</p><hr><hr>'
                        contenido += '</div>'  
                    }
                }
                var mailOptions = {
                    from: 'inventariobayer@gmail.com',
                    to: 'inventariobayer@gmail.com',
                    subject: 'Muestras a 30 d??as de CADUCAR',
                    html: contenido
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(302).redirect('/error');
            });
        });
        //-----------------------------------------
        Main.Alerta1()
            .then(([alertaOne, fieldData]) => {
                Main.Alerta2()
                    .then(([alertaTwo, fieldData]) => {
                        Main.Alerta3()
                            .then(([alertaThree, fieldData]) => {
                                res.render('index',{
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
