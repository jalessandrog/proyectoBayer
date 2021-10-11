const express = require('express');
const path = require('path');
const router = express.Router();

const isAuth = require('../middlewares/is-Auth');
const AlertasRolesController = require('../controllers/AlertasRolesController')

router.get('/', isAuth, AlertasRolesController.ConsultarAlertasRoles);

router.get('/agregarAlerta', isAuth, AlertasRolesController.AgregarAlerta);

router.get('/modificarAlerta', isAuth, AlertasRolesController.ModificarAlerta );

module.exports = router; 