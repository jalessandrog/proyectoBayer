const Movimientos = require('../Models/Movimientos');
const Muestras = require('../Models/Muestras');
const moment = require('moment');
const { request } = require('express');

const controller = {
    ConsultarMovimientos:(req, res, next) => {
        console.log("Ruta Consultar Movimientos")

        Movimientos.ConsulMovements()
        .then(([rows, fieldData]) => {
            console.log(rows);
            //Mover el response.render para acá
            res.render('ConsultarMovimientos',{
                isLoggedIn: req.session.isLoggedIn,
                CorreoElectronico: req.session.CorreoElectronico,
                NombreCompleto: req.session.NombreCompleto,
                Permisos: req.session.rolEmpleado,
                ConsultarMovimientos: rows,
            });
        })
        .catch(err => {
            console.log(err);
            //response.status(302).redirect('/error');
        });
    }, 

    BuscarMovimientos:(req, res, next) => {
        console.log("Ruta Consultar Movimientos")
        let query = req.body.query;
        console.log(req.body)
        Movimientos.fetchAllbyTerm(query)
        .then(([rows, fieldData]) => {
            console.log(rows);
            //Mover el response.render para acá
            res.render('ConsultarMovimientos',{
                isLoggedIn: req.session.isLoggedIn,
                CorreoElectronico: req.session.CorreoElectronico,
                NombreCompleto: req.session.NombreCompleto,
                Permisos: req.session.rolEmpleado,
                ConsultarMovimientos: rows,
            });
        })
        .catch(err => {
            console.log(err);
            //response.status(302).redirect('/error');
        });
    },

    CrearMovimiento:(req, res, next) => {
        console.log("Ruta crear Movimientos")
        
        Muestras.retirar(req.body.idMuestra, req.session.idEmpleado,req.body.descarga).then(()=>{
            Movimientos.ConsulMovements()
        .then(([rows, fieldData]) => {
            res.redirect('/Movimientos'); 
            /*console.log(rows);
            //Mover el response.render para acá
            res.render('ConsultarMovimientos',{
                isLoggedIn: req.session.isLoggedIn,
                CorreoElectronico: req.session.CorreoElectronico,
                NombreCompleto: req.session.NombreCompleto,
                ConsultarMovimientos: rows,
            });*/
        })
        .catch(err => {
            console.log(err);
            //response.status(302).redirect('/error');
        });
        })
        
    },

    ExportarPDF: (req, res, next) => {
        console.log("Ruta ExportarMovimientosPDF")

        //Muestras.fetchAll() 
        Movimientos.ConsulMovements()
            .then(([rows, fieldData]) => {
                res.render('ExportarMovimientosPDF',{
                    isLoggedIn: req.session.isLoggedIn,
                    CorreoElectronico: req.session.CorreoElectronico,
                    NombreCompleto: req.session.NombreCompleto,
                    Permisos: req.session.rolEmpleado,
                    ConsultarMovimientos: rows,
                });
            })
            .catch(err => {
                console.log(err);
                //response.status(302).redirect('/error'); 
            });
    },
}
module.exports = controller;