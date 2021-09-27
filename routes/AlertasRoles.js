const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log("Ruta Consultar Alertas y Roles")
    res.render('ConsultarAlertasRoles')
});

router.get('/agregarAlerta', (req, res, next) => {
    console.log("Ruta Agregar Alertas y Roles")
    res.render('AgregarAlerta')
});

router.get('/modificarAlerta', (req, res, next) => {
    console.log("Ruta Modificar Alertas y Roles")
    res.render('ModificarAlerta')
});

module.exports = router; 