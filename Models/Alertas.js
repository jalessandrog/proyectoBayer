const db = require('../util/database');

module.exports = class Alertas {

    constructor(idAlerta, NombreAlerta, Color, Condicion) {
        this.idAlerta = idAlerta;
        this.NombreAlerta = NombreAlerta;
        this.Color = Color;
        this.Condicion = Condicion;
    }

    static fetchAll() {
        return db.execute('SELECT alertas.idAlerta, alertas.NombreAlerta, alertas.Color, alertas.Condicion FROM alertas ORDER BY alertas.Condicion ASC')
    }
    
    static fetchOne(id){
        return db.execute('SELECT alertas.idAlerta, alertas.NombreAlerta, alertas.Color, alertas.Condicion FROM alertas WHERE alertas.idAlerta = ?', [id])
    }

    static updateAlerta(idAlerta, NombreAlerta, Color, Condicion){
        return db.execute('UPDATE alertas SET NombreAlerta = ?, Color = ?, Condicion = ? WHERE idAlerta = ?',
            [idAlerta, NombreAlerta, Color, Condicion]);
    }
}