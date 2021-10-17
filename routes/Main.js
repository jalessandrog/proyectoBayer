const express = require('express');
const router = express.Router();

const isAuth = require('../middlewares/is-Auth');
const MainController = require('../controllers/MainController')

router.get('/', MainController.login);
router.post('/', MainController.processLoggin);
router.get('/logout', isAuth, MainController.logout);
router.get('/Inicio', isAuth, MainController.index);

module.exports = router;