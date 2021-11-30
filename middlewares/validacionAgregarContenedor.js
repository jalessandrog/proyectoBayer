const { body, param, matchedData, check } = require('express-validator');

// Validaciones
const validacionAgregarContenedor = [
    body('Clasificacion')
        .notEmpty().withMessage('Este campo es obligatorio')
];

module.exports = validacionAgregarContenedor; 