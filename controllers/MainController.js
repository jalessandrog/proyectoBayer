const Usuario = require('../models/Usuarios');
const bcrypt = require('bcryptjs');

const controller = {

    login:(req, res, next) => {
        console.log("Ruta Login")
        res.render('Login', {
            isLoggedIn: req.session.isLoggedIn,
            CorreoElectronico: req.session.CorreoElectronico,
        });
    },
    
    processLoggin:(req, res, next) => {
        // console.log("Procesando Login")
        // req.session.email = req.body.email;
        // console.log("Usuario logueado: "+req.body.email)
        // console.log("Username: "+req.body.email.split('@')[0])
        // req.session.isLoggedIn = true;
        // console.log(req.session.email);
        // res.status(302).redirect('/Inicio');

        Usuario.fetchOne(req.body.CorreoElectronico).then(([rows, fieldData]) => {
            console.log(rows)
            bcrypt.compare(req.body.password, rows[0].password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.CorreoElectronico = req.body.CorreoElectronico;
                        return req.session.save(err => {
                            res.redirect('/Inicio');
                        });
                    }
                    console.log('Credenciales invalidas')
                    res.status(302).res.redirect('/');
                }).catch(err => {
                    console.log("Ocurrió un error en la comparación de los passwords");
                    res.status(302).res.redirect('/');
                });
        })
        .catch(err => {
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
        console.log("Ruta index")
        res.render('Index',{
            isLoggedIn: req.session.isLoggedIn,
            CorreoElectronico: req.session.CorreoElectronico,
        });
    },
    
}
module.exports = controller;
