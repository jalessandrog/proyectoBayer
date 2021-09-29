const express = require('express');
const path = require('path');
const router = express.Router();

const MainController = require('../controllers/MainController')

router.get('/', MainController.login);
router.get('/Inicio', MainController.index);

module.exports = router;