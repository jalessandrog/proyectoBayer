const express = require('express');
const router = express.Router();

const isAuth = require('../middlewares/is-Auth');
const MuestrasController = require('../controllers/MuestrasController')
//Endpoints de API
router.get('/agregar', isAuth, MuestrasController.RegistrarMuestra);
router.post('/agregar', isAuth, MuestrasController.saveMuestra);
router.post('/actualizar_status/:id', isAuth, MuestrasController.CambiarStatus)
// router.get('/editar', isAuth, MuestrasController.EditarMuestra);

//Renderizados
router.get('/:id', isAuth, MuestrasController.VerMuestra);
router.get('/', isAuth, MuestrasController.ConsultarMuestras);

module.exports = router;