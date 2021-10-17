const express = require('express');
const router = express.Router();

const isAuth = require('../middlewares/is-Auth');
const MuestrasController = require('../controllers/MuestrasController')

router.get('/agregar', isAuth, MuestrasController.RegistrarMuestra);
router.post('/agregar', isAuth, MuestrasController.saveMuestra);

// router.get('/editar', isAuth, MuestrasController.EditarMuestra);

router.get('/:id', isAuth, MuestrasController.VerMuestra);
router.get('/', isAuth, MuestrasController.ConsultarMuestras);

module.exports = router;