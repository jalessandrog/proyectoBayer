const express = require('express');
const path = require('path');
const router = express.Router();
let ejs = require('ejs')

router.get('/', (req, res, next) => {
    console.log("Ruta Consultar Usuarios")
    res.render('ConsultarUsuarios')
});
router.get('/Nuevo', (req, res, next) => {
    console.log("Ruta para editar Usuario")
    res.render('AgregarUsuario')
});
router.get('/:id', (req, res, next) => {
    console.log("Detalle usuario:",req.params.id)
    //Logica de extraer info del backend
    let nombres = ["Jesus","Ivan","Arturo"]
    res.render('DetalleUsuario',{id:req.params.id, nombre: nombres[req.params.id]})
});



module.exports = router;