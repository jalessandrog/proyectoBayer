const express = require('express');
const router = express.Router();

const MainController = require('../controllers/MainController')

router.get('/', MainController.login);
router.post('/', MainController.processLoggin);
router.get('/logout', MainController.logout);
router.get('/Inicio', MainController.index);

module.exports = router;