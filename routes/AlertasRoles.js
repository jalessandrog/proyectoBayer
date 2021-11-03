const express = require('express');
const path = require('path');
const router = express.Router();

const isAuth = require('../middlewares/is-Auth');
const AlertasRolesController = require('../controllers/AlertasRolesController')



router.get('/agregarAlerta', isAuth, AlertasRolesController.AgregarAlerta);

router.get('/editar/:id', isAuth, AlertasRolesController.ModificarAlerta );
router.post('/editar/:id', isAuth, AlertasRolesController.processUpdate );

router.get('/', isAuth, AlertasRolesController.ConsultarAlertasRoles);

module.exports = router; 