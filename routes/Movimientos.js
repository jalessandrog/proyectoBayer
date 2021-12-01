const express = require('express');
const router = express.Router();

const isAuth = require('../middlewares/is-Auth');
const MovimientosController = require('../controllers/MovimientosController')
const adminMiddleware = require('../middlewares/adminMiddleware')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

router.get('/', isAuth, MovimientosController.ConsultarMovimientos);
router.post('/', isAuth, MovimientosController.BuscarMovimientos);

router.post('/add', isAuth, MovimientosController.CrearMovimiento);

router.get('/ExportarPDF',adminMiddleware,isAuth, MovimientosController.ExportarPDF);

module.exports = router; 