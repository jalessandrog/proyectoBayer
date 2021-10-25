const express = require('express');
const router = express.Router();

const isAuth = require('../middlewares/is-Auth');
const MuestrasController = require('../controllers/MuestrasController')

router.post('/delete/:id', MuestrasController.borrarMuestra);

router.get('/agregar',  MuestrasController.RegistrarMuestra);
router.post('/agregar',  MuestrasController.saveMuestra);

router.get('/editar/:id', MuestrasController.EditarMuestra);
router.post('/editar/:id', MuestrasController.processUpdate);


router.get('/:id', MuestrasController.VerMuestra);

router.get('/', MuestrasController.ConsultarMuestras);
router.post('/',  MuestrasController.BuscarMuestras);

module.exports = router;