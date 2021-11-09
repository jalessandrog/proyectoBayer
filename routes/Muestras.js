const express = require('express');
const router = express.Router();

const isAuth = require('../middlewares/is-Auth');
const MuestrasController = require('../controllers/MuestrasController')

const validacionCrearMuestra = require('../middlewares/validacionRegistrarMuestra')
const validacionEditarMuestra = require('../middlewares/validacionEditarMuestra')
const adminMiddleware = require('../middlewares/adminMiddleware')


router.post('/delete/:id',adminMiddleware, MuestrasController.borrarMuestra);

router.get('/agregar', adminMiddleware,  MuestrasController.RegistrarMuestra);
router.post('/agregar', adminMiddleware, validacionCrearMuestra,  MuestrasController.saveMuestra);

router.get('/editar/:id', adminMiddleware, MuestrasController.EditarMuestra);
router.post('/editar/:id',adminMiddleware, validacionEditarMuestra, MuestrasController.processUpdate);


router.get('/:id', MuestrasController.VerMuestra);

router.get('/', MuestrasController.ConsultarMuestras);
router.post('/',  MuestrasController.BuscarMuestras);

module.exports = router;