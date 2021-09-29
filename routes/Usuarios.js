const express = require('express');
const path = require('path');
const router = express.Router();
let ejs = require('ejs')

const UsuariosController = require('../controllers/UsuariosController')


router.get('/', UsuariosController.ConsultarUsuarios);

router.get('/Nuevo',UsuariosController.AgregarUsuario);

router.get('/:id', UsuariosController.ModificarUsuario);



module.exports = router;