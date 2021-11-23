const express = require('express');
const router = express.Router();

const isAuth = require('../middlewares/is-Auth');
const MuestrasController = require('../controllers/MuestrasController')

const validacionCrearMuestra = require('../middlewares/validacionRegistrarMuestra')
const validacionEditarMuestra = require('../middlewares/validacionEditarMuestra')
const adminMiddleware = require('../middlewares/adminMiddleware')

const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

router.post('/delete/:id',adminMiddleware, MuestrasController.borrarMuestra);

router.get('/agregar', adminMiddleware,  MuestrasController.RegistrarMuestra);
router.post('/agregar', adminMiddleware, validacionCrearMuestra,  MuestrasController.saveMuestra);
router.post('/agregarContenedor', adminMiddleware,  MuestrasController.saveContenedor);

router.get('/editar/:id', adminMiddleware, MuestrasController.EditarMuestra);
router.post('/editar/:id',adminMiddleware, validacionEditarMuestra, MuestrasController.processUpdate);

router.post('/reportar/:id',jsonParser, MuestrasController.reportarMuestra);
router.get('/ExportarPDF',adminMiddleware, MuestrasController.ExportarPDF);

router.get('/:id', MuestrasController.VerMuestra);

router.get('/', MuestrasController.ConsultarMuestras);
router.post('/',  MuestrasController.BuscarMuestras);


module.exports = router; 