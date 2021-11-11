const { body, param, matchedData, check } = require('express-validator');

// Validaciones
const validacionCrearMuestra = [
    body('CodigoMuestra').if(body('NombreMuestra').isEmpty()).if(body('SP').isEmpty())
        .notEmpty().withMessage('Debes ingresar alguno de los campos').bail()
        .isLength({ min: 3 }).withMessage('El código de muestra es invalido'),
    body('NombreMuestra').if(body('CodigoMuestra').isEmpty()).if(body('SP').isEmpty())
        .notEmpty().withMessage('Debes ingresar alguno de los campos').bail()
        .isLength({ min: 3, max:250 }).withMessage('Debes ingresar un nombre de muestra valido. \n El nombre debe contener más de 3 caracteres y menos de 250 caracteres'),
    body('SP').if(body('CodigoMuestra').isEmpty()).if(body('NombreMuestra').isEmpty())
        .notEmpty().withMessage('Debes ingresar alguno de los campos').bail()
        .matches(/(1020000)+\d{5}$/,"i").withMessage('El código SP es invalido, reingrese el código'),
    body('UnidadMedida').notEmpty().withMessage('Debes ingresar la unidad de medida correspondiente de la Muestra'),
    body('Cantidad')
        .notEmpty().withMessage('Debes registrar la cantidad la Muestra').bail()
        .toFloat({locale: 'es-ES'})
        .isFloat({gt: 0}).withMessage('Debes ingresar una cantidad mayor a 0').bail()
        .isDecimal({force_decimal: true, decimal_digits: '1,2'}),
    body('Concentracion')
        .notEmpty().withMessage('Debes registrar la concentración de la Muestra').bail()
        .toFloat({locale: 'es-ES'})
        .isFloat({min: 0, max: 100}).withMessage('No es posible ingresar una concentración mayor al 100%').bail()
        .isDecimal({force_decimal: true, decimal_digits: '1,2'}),
    body('idTipoDeMuestra').notEmpty().withMessage('Debes ingresar el Tipo de Muestra'),
    body('CodigoFormulacion').notEmpty().withMessage('Debes ingresar el Codigo de Formulación al que pertenece la Muestra').bail()
        .isLength({min: 2, max: 2}).withMessage('Código de formulación invalido'),
    body('Lote')
        .notEmpty().withMessage('Debes ingresar el Lote de la Muestra').bail()
        .isLength({ min: 1, max:20}).withMessage('Lote de la muestra invalido'),
    body('UsoMuestra').notEmpty().withMessage('Debes ingresar el uso de la Muestra'),
    body('idContenedor').notEmpty().withMessage('Debes ingresar el contenedor donde se almacenará la Muestra'),
    body('FechaFabricacion')
        .notEmpty().withMessage('Debes ingresar la Fecha de Fabricación la Muestra').bail()
        .toDate({format: 'YYYY-MM-DD'}),
    body('FechaCaducidad')
        .notEmpty().withMessage('Debes ingresar la Fecha de Caducidad la Muestra').bail()
        .toDate({format: 'YYYY-MM-DD'}),
];

module.exports = validacionCrearMuestra; 