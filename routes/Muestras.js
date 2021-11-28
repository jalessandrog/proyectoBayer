const express = require('express');
const router = express.Router();

const isAuth = require('../middlewares/is-Auth');
const MuestrasController = require('../controllers/MuestrasController')

const validacionCrearMuestra = require('../middlewares/validacionRegistrarMuestra')
const validacionEditarMuestra = require('../middlewares/validacionEditarMuestra')
const validacionAgregarContenedor = require('../middlewares/validacionAgregarContenedor')
const adminMiddleware = require('../middlewares/adminMiddleware')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

router.post('/delete/:id',isAuth, adminMiddleware, MuestrasController.borrarMuestra);

router.get('/agregar',isAuth, adminMiddleware,  MuestrasController.RegistrarMuestra);
router.post('/agregar',isAuth, adminMiddleware, validacionCrearMuestra,  MuestrasController.saveMuestra);
router.post('/agregarContenedor',isAuth, validacionAgregarContenedor, adminMiddleware,  MuestrasController.saveContenedor);
router.post('/agregarTipoFormulacion', adminMiddleware,  MuestrasController.saveFormulacion);

router.get('/editar/:id',isAuth, adminMiddleware, MuestrasController.EditarMuestra);
router.post('/editar/:id',isAuth,adminMiddleware, validacionEditarMuestra, MuestrasController.processUpdate);

router.post('/reportar/:id',jsonParser,isAuth, MuestrasController.reportarMuestra);
router.get('/ExportarPDF',adminMiddleware,isAuth, MuestrasController.ExportarPDF);

router.get('/:id',isAuth, MuestrasController.VerMuestra);

router.get('/',isAuth, MuestrasController.ConsultarMuestras);
router.post('/',isAuth,  MuestrasController.BuscarMuestras);


module.exports = router; 