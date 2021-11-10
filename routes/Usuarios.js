const express = require('express');
const path = require('path');
const router = express.Router();
let ejs = require('ejs')

const isAuth = require('../middlewares/is-Auth');
const UsuariosController = require('../controllers/UsuariosController')
const adminMiddleware = require('../middlewares/adminMiddleware')


router.get('/', isAuth, UsuariosController.ConsultarUsuarios);

router.get('/Nuevo', isAuth,  UsuariosController.AgregarUsuario);

router.get('/:id', isAuth, UsuariosController.ModificarUsuario);



module.exports = router; 