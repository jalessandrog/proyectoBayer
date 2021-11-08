const express = require('express');
const router = express.Router();

const isAuth = require('../middlewares/is-Auth');
const MainController = require('../controllers/MainController');
const RecuperarController = require('../controllers/RecuperarController');


router.get('/', MainController.login);
router.post('/', MainController.processLoggin);
router.get('/logout', isAuth, MainController.logout);
router.get('/Inicio', isAuth, MainController.index);
router.get('/Recuperar', RecuperarController.SolicitudCambioContrasena);
router.post('/Recuperar', RecuperarController.CambioContrasena);
router.get('/NuevaContrasena/:token', RecuperarController.CambiarContrasena);
router.post('/NuevaContrasena/:token', RecuperarController.CambiarContrasena);

module.exports = router;