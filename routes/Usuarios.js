const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log("Ruta Consultar Usuarios")
    res.render('ConsultarUsuarios')
});

module.exports = router;