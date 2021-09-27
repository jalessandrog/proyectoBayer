const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log("Ruta Consultar Alertas y Roles")
    res.render('ConsultarAlertasRoles')
});

/*router.get('/agregar', (req, res, next) => {
    console.log("Ruta Consultar Alertas y Roles")
    res.render('AgregarAlertasRoles')
});*/

/*router.get('/modificar', (req, res, next) => {
    console.log("Ruta Consultar Alertas y Roles")
    res.render('ModificarAlertasRoles')
});*/

module.exports = router; 