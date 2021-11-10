const express = require('express');
const path = require('path');
const router = express.Router();

const isAuth = require('../middlewares/is-Auth');
const AlertasRolesController = require('../controllers/AlertasRolesController')
const adminMiddleware = require('../middlewares/adminMiddleware')



// router.get('/agregarAlerta', isAuth, AlertasRolesController.AgregarAlerta);

router.get('/editar/:id', isAuth, adminMiddleware, AlertasRolesController.ModificarAlerta );
router.post('/editar/:id', isAuth, adminMiddleware, AlertasRolesController.processUpdate );

router.get('/', isAuth, AlertasRolesController.ConsultarAlertasRoles);

module.exports = router; 