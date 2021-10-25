const Usuario = require('../models/Usuarios');
const bcrypt = require('bcryptjs');

const controller = {

    login:(req, res, next) => {
        console.log("Ruta Login")
        res.render('Login', {
            isLoggedIn: req.session.isLoggedIn,
            CorreoElectronico: req.session.CorreoElectronico,
            NombreCompleto: req.session.NombreCompleto,
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
                            CorreoElectronico: req.session.CorreoElectronico,
                            NombreCompleto: req.session.NombreCompleto,
                            errors: {
                                CorreoElectronico: {
                                    msg: 'Credenciales invalidas'
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
                    errors: {
                        CorreoElectronico: {
                            msg: 'No se encuentra email'
                        }
                    }
                });
            }
        }).catch(err => {
            console.log(err);
            console.log('No existe el usuario')
            res.status(302).res.redirect('/');
        });
        // Usuario.fetchOne(req.body.CorreoElectronico).then(([rows, fieldData]) => {
        //     console.log(rows)
        //     bcrypt.compare(req.body.password, rows[0].password)
        //         .then(doMatch => {
        //             if (doMatch) {
        //                 req.session.isLoggedIn = true;
        //                 req.session.idEmpleado =  rows[0].idEmpleado;
        //                 req.session.CorreoElectronico = req.body.CorreoElectronico;
        //                 req.session.NombreCompleto = rows[0].Nombres + ' ' + rows[0].Apellidos;
        //                 return req.session.save(err => {
        //                     res.redirect('/Inicio');
        //                 });
        //             }
        //             console.log('Credenciales invalidas')
        //             res.status(302).res.redirect('/');
        //         }).catch(err => {
        //             console.log("Credenciales invalidas");
        //             res.status(302).res.redirect('/');
        //         });
        // })
        // .catch(err => {
        //     console.log(err);
        //     console.log('No existe el usuario')
        //     res.status(302).res.redirect('/');
        // });
    },

    logout:(req, res, next) => {
        console.log("Cerrando sesión")
        req.session.destroy(() => {
            res.redirect('/'); //Este código se ejecuta cuando la sesión se elimina.
        });
    },

    index: (req, res, next) => {
        console.log("Ruta index")
        res.render('Index',{
            isLoggedIn: req.session.isLoggedIn,
            CorreoElectronico: req.session.CorreoElectronico,
            NombreCompleto: req.session.NombreCompleto,
        });
    },
    
}
module.exports = controller;
