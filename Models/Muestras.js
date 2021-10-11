const db = require('../util/database');

module.exports = class Muestra {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(NombreMuestra, CodigoMuestra, SP, HojaSeguridad, UsoMuestra, Lote, Concentracion, Cantidad, FechaFabricacion, FechaCaducidad, idTipoDeMuestra, Codigo_Formulacion, Status ) {
        this.NombreMuestra = NombreMuestra;
        this.CodigoMuestra = CodigoMuestra;
        this.SP = SP;
        this.HojaSeguridad = HojaSeguridad;
        this.UsoMuestra = UsoMuestra;
        this.Lote = Lote;
        this.Concentracion = Concentracion;
        this.Cantidad = Cantidad;
        this.FechaFabricacion = FechaFabricacion;
        this.FechaCaducidad = FechaCaducidad;
        this.idTipoDeMuestra = idTipoDeMuestra;
        this.Codigo_Formulacion = Codigo_Formulacion;
        this.Status = Status;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute('INSERT INTO muestras (NombreMuestra, CodigoMuestra, SP, HojaSeguridad, UsoMuestra, Lote, Concentracion, Cantidad, FechaFabricacion, FechaCaducidad, idTipoDeMuestra, Codigo_Formulacion, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [this.NombreMuestra, this.CodigoMuestra, this.SP, this.HojaSeguridad, this.UsoMuestra, this.Lote, this.Concentracion, this.Cantidad,  this.FechaFabricacion, this.FechaCaducidad, this.idTipoDeMuestra, this.Codigo_Formulacion, this.Status ]);
    }


    // update() {
    //     return db.execute(' UPDATE heroes set (nombre, profesion, pais, resenia, imagen) VALUES (?, ?, ?, ?, ?)',
    //         [this.nombre, this.profesion, this.pais, this.resenia, this.imagen]);
    // }
}