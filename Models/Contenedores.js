const db = require('../util/database');

module.exports = class Contenedores {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(NoContenedor, Clasificacion) {
        this.NoContenedor = NoContenedor;
        this.Clasificacion = Clasificacion;
    }


    save() {
        return db.execute('INSERT INTO contenedores (NoContenedor, Clasificacion) VALUES (?, ?)',
            [this.NoContenedor, this.Clasificacion]);
    }


    static fetchAll() {
        return db.execute('SELECT contenedores.idContenedor, contenedores.NoContenedor, contenedores.Clasificacion FROM contenedores')
    }
    
}