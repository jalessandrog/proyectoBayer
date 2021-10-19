const express = require('express');
const router = express.Router();

const isAuth = require('../middlewares/is-Auth');
const MuestrasController = require('../controllers/MuestrasController')

router.get('/agregar', isAuth,  MuestrasController.RegistrarMuestra);
router.post('/agregar', isAuth, MuestrasController.saveMuestra);

router.get('/editar/:id', isAuth, MuestrasController.EditarMuestra);
router.post('/editar/:id', isAuth, MuestrasController.processUpdate);

router.get('/:id', isAuth, MuestrasController.VerMuestra);
router.get('/', isAuth, MuestrasController.ConsultarMuestras);
router.post('/', isAuth, MuestrasController.BuscarMuestras);

module.exports = router;