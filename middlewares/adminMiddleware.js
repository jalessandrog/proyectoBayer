const Usuario = require('../Models/Usuarios');

function adminMiddleware (req, res, next) {

    Usuario.fetchOne(req.session.CorreoElectronico)
        .then(([rows, fieldData]) => {
            console.log(rows[0])
            
            if (rows[0].Rol === 'Administrador'){
                next();
            }else{
                res.redirect('/Inicio')
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).res.redirect('/');
        });
} 

module.exports = adminMiddleware;
