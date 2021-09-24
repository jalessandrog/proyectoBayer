const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log("Ruta Consultar Muestras")
    res.render('ConsultarMuestras')
});

router.get('/Movimientos', (req, res, next) => {
    console.log("Ruta Consultar Movimientos")
    res.render('ConsultarMovimientos')
});

router.get('/agregar', (req, res, next) => {
    console.log("Ruta Agregar Muestras")
    res.render('RegistrarMuestra')
});

module.exports = router;