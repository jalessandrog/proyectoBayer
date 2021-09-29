const express = require('express');
const path = require('path');
const router = express.Router();

const AlertasRolesController = require('../controllers/AlertasRolesController')

router.get('/', AlertasRolesController.ConsultarAlertasRoles);

router.get('/agregarAlerta', AlertasRolesController.AgregarAlerta);

router.get('/modificarAlerta', AlertasRolesController.ModificarAlerta );

module.exports = router; 