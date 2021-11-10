const express = require('express');
const path = require('path');
const router = express.Router();
let ejs = require('ejs')

const isAuth = require('../middlewares/is-Auth');
const UsuariosController = require('../controllers/UsuariosController')
const adminMiddleware = require('../middlewares/adminMiddleware')


router.get('/', adminMiddleware, isAuth, UsuariosController.ConsultarUsuarios);

router.get('/Nuevo', adminMiddleware, isAuth,  UsuariosController.AgregarUsuario);

router.get('/:id', adminMiddleware, isAuth, UsuariosController.ModificarUsuario); 



module.exports = router; 