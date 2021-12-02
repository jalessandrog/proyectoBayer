const { body, param, matchedData, check } = require('express-validator');

// Validaciones
const validacionAgregarFormulacion = [
    body('Codigo')
        .notEmpty().withMessage('Este campo es obligatorio').bail()
        .exists().withMessage('El código de formulación ya existe'),
    body('Formulacion')
        .notEmpty().withMessage('Este campo es obligatorio'),
];

module.exports = validacionAgregarFormulacion; 