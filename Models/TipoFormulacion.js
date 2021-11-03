const db = require('../util/database');

module.exports = class Formulaciones {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(CodigoFormulacion , Formulacion,DescripcionFormulacion) {
        this.CodigoFormulacion = CodigoFormulacion,
        this.Formulacion = Formulacion,
        this.DescripcionFormulacion = DescripcionFormulacion
    }


    save() {
        return db.execute('INSERT INTO tipoformulacion (CodigoFormulacion , Formulacion,DescripcionFormulacion) VALUES (?, ?, ?)',
            [this.CodigoFormulacion, this.Formulacion, this.DescripcionFormulacion]);
    }


    static fetchAll() {
        return db.execute('SELECT tipoformulacion.CodigoFormulacion, tipoformulacion.Formulacion, tipoformulacion.DescripcionFormulacion FROM tipoformulacion WHERE tipoformulacion.Activa = "1" ')
    }
}