const Usuario = require('../Models/Usuarios');

function adminMiddleware (req, res, next) {

    Usuario.fetchOne(req.session.CorreoElectronico)
        .then(([rows, fieldData]) => {
            console.log(rows[0])
            
            if (rows[0].Rol === 'Administrador'){
                console.log('soy el admin')
                next();
            }else{
                console.log('No soy el admin')
                res.redirect('/Inicio')
            }
        })
        .catch(err => {
            console.log(err);
            res.status(302).res.redirect('/');
        });
} 

module.exports = adminMiddleware;
