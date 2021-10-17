const Consultas = require('../Models/Movimientos');

const controller = {
    ConsultarMovimientos:(req, res, next) => {
        console.log("Ruta Consultar Movimientos")

        Consultas.ConsulMovements()
        .then(([rows, fieldData]) => {
            console.log(rows);
            //Mover el response.render para acá
            res.render('ConsultarMovimientos',{
                isLoggedIn: req.session.isLoggedIn,
                CorreoElectronico: req.session.CorreoElectronico,
                NombreCompleto: req.session.NombreCompleto,
                ConsultarMovimientos: rows,
            });
        })
        .catch(err => {
            console.log(err);
            //response.status(302).redirect('/error');
        });
    }
}
module.exports = controller;