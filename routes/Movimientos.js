const express = require('express');
const router = express.Router();

const isAuth = require('../middlewares/is-Auth');
const MovimientosController = require('../controllers/MovimientosController')

router.get('/', isAuth, MovimientosController.ConsultarMovimientos);
router.post('/', isAuth, MovimientosController.CrearMovimiento);
 
module.exports = router;