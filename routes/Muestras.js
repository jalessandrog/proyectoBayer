const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log("Ruta Consultar Muestras")
    res.render('ConsultarMuestras', {
        Titulo : ' Registrar Muestra'
    })
});

router.get('/muestra', (req, res, next) => {
    console.log("Ruta ver Muestra")
    res.render('VerMuestra', {
        Titulo : 'Muestra'
    })
});

router.get('/editar', (req, res, next) => {
    console.log("Ruta Editar Muestra")
    res.render('EditarMuestra', {
        Titulo : 'Editando Información de Muestra'
    })
});

router.get('/Movimientos', (req, res, next) => {
    console.log("Ruta Consultar Movimientos")
    res.render('ConsultarMovimientos')
});

router.get('/agregar', (req, res, next) => {
    console.log("Ruta Agregar Muestras")
    res.render('RegistrarMuestra', {
        Titulo : ' Registrar Muestra',
        submit : 'Guardar Muestra'
    })
});

module.exports = router;