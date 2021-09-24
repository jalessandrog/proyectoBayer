const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log("Ruta index")
    res.render('Login');
});

router.get('/Inicio', (req, res, next) => {
    console.log("Ruta index")
    res.render('Index');
});

module.exports = router;