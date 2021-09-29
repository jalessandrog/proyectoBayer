const express = require('express');
const path = require('path');
const router = express.Router();

const MuestrasController = require('../controllers/MuestrasController')

router.get('/', MuestrasController.ConsultarMuestras);

router.get('/muestra', MuestrasController.VerMuestra);

router.get('/editar', MuestrasController.EditarMuestra);

router.get('/Movimientos', MuestrasController.ConsultarMovimientos);

router.get('/agregar', MuestrasController.RegistrarMuestra);

module.exports = router;