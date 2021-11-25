const express = require('express');
const path = require('path');
const router = express.Router();
let ejs = require('ejs')
// app.use(express.json())
// const bodyParser = require('body-parser')

// const jsonParser = bodyParser.json()
const isAuth = require('../middlewares/is-Auth');
const UsuariosController = require('../controllers/UsuariosController')
const adminMiddleware = require('../middlewares/adminMiddleware')


router.get('/', adminMiddleware, isAuth, UsuariosController.ConsultarUsuarios);

// router.get('/Nuevo', adminMiddleware, isAuth,  UsuariosController.AgregarUsuario);
// router.post('/Nuevo', jsonParser,UsuariosController.AgregarUsuario);


// router.get('/:id', adminMiddleware, isAuth, UsuariosController.ModificarUsuario); 

// router.post('/:id',jsonParser, UsuariosController.ModificarUsuario);


module.exports = router; 