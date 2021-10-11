const express = require('express');
const path = require('path');
const router = express.Router();

const isAuth = require('../middlewares/is-Auth');
const MuestrasController = require('../controllers/MuestrasController')

router.get('/', isAuth, MuestrasController.ConsultarMuestras);

router.get('/muestra', isAuth, MuestrasController.VerMuestra);

router.get('/editar', isAuth, MuestrasController.EditarMuestra);

router.get('/Movimientos', isAuth, MuestrasController.ConsultarMovimientos);

router.get('/agregar', isAuth, MuestrasController.RegistrarMuestra);
router.post('/agregar', isAuth, MuestrasController.saveMuestra);

module.exports = router;