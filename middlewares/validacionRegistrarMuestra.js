const { body, param, matchedData, check } = require('express-validator');

// Validaciones
const validacionCrearMuestra = [
    body('CodigoMuestra').if(body('NombreMuestra').isEmpty()).if(body('SP').isEmpty())
        .notEmpty().withMessage('Debes ingresar alguno de los campos'),
    body('NombreMuestra').if(body('CodigoMuestra').isEmpty()).if(body('SP').isEmpty())
        .notEmpty().withMessage('Debes ingresar alguno de los campos'),
    body('SP').if(body('CodigoMuestra').isEmpty()).if(body('NombreMuestra').isEmpty())
        .notEmpty().withMessage('Debes ingresar alguno de los campos'),
    body('UnidadMedida').notEmpty().withMessage('Debes ingresar la unidad de medida correspondiente de la Muestra'),
    body('Cantidad').notEmpty().withMessage('Debes registrar la cantidad la Muestra'),
    body('Concentracion').notEmpty().withMessage('Debes registrar la concentración de la Muestra'),
    body('idTipoDeMuestra').notEmpty().withMessage('Debes ingresar el Tipo de Muestra'),
    body('CodigoFormulacion').notEmpty().withMessage('Debes ingresar el Codigo de Formulaciión al que pertenece la Muestra'),
    body('Lote').notEmpty().withMessage('Debes ingresar el Lote de la Muestra'),
    body('UsoMuestra').notEmpty().withMessage('Debes ingresar el uso de la Muestra'),
    body('idContenedor').notEmpty().withMessage('Debes ingresar el contenedor donde se almacenará la Muestra'),
    body('FechaFabricacion').notEmpty().withMessage('Debes ingresar la Fecha de Fabricación la Muestra'),
    body('FechaCaducidad').notEmpty().withMessage('Debes ingresar la Fecha de Caducidad la Muestra'),
];


module.exports = validacionCrearMuestra; 