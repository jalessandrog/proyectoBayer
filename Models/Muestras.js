const db = require('../util/database');

module.exports = class Muestras {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(NombreMuestra, CodigoMuestra, SP, HojaSeguridad, UsoMuestra, Lote, Concentracion, Cantidad, FechaFabricacion, FechaCaducidad, idTipoDeMuestra, CodigoFormulacion, Status ) {
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
        this.CodigoFormulacion = CodigoFormulacion;
        this.Status = Status;
    }


    save() {
        return db.execute('INSERT INTO muestras (NombreMuestra, CodigoMuestra, SP, HojaSeguridad, UsoMuestra, Lote, Concentracion, Cantidad, FechaFabricacion, FechaCaducidad, idTipoDeMuestra, CodigoFormulacion, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [this.NombreMuestra, this.CodigoMuestra, this.SP, this.HojaSeguridad, this.UsoMuestra, this.Lote, this.Concentracion, this.Cantidad,  this.FechaFabricacion,  this.FechaCaducidad, this.idTipoDeMuestra, this.CodigoFormulacion, this.Status ]);
    }

     static updateStatus(idMuestra, Status){
         return db.execute('UPDATE muestras SET Activo = ?  WHERE idMuestra = ? ',
             [ Status, idMuestra]);
    }

    static fetchAll() {
        // return db.execute('SELECT * FROM muestras');
        
        return db.execute('SELECT muestras.idMuestra, muestras.NombreMuestra, muestras.Activo, muestras.CodigoMuestra,  muestras.SP, muestras.HojaSeguridad, muestras.UsoMuestra, muestras.Lote, muestras.Concentracion, muestras.Cantidad, muestras.FechaIngreso, muestras.FechaFabricacion, muestras.FechaCaducidad, tipomuestra.Tipo, tipoformulacion.CodigoFormulacion, tipoformulacion.Formulacion, tipoformulacion.DescripcionFormulacion, contenedores.NoContenedor, contenedores.Clasificacion, muestras.Status, estadomuestra.DescripcionStatus FROM muestras, contenedores, tipoformulacion, muestras_contenedores, tipomuestra, estadomuestra WHERE muestras.idMuestra = muestras_contenedores.idMuestra AND muestras.idTipoDeMuestra = tipomuestra.idTipoDeMuestra AND muestras.CodigoFormulacion = tipoformulacion.CodigoFormulacion AND contenedores.idContenedor = muestras_contenedores.idContenedor AND muestras.Status = estadomuestra.Status')
    }

    static fetchOne(id){
        // return db.execute('SELECT * FROM muestras WHERE idMuestra = ?', [id]);
        return db.execute('SELECT muestras.NombreMuestra, muestras.CodigoMuestra,  muestras.SP, muestras.HojaSeguridad, muestras.UsoMuestra, muestras.Lote, muestras.Concentracion, muestras.Cantidad, muestras.FechaIngreso, muestras.FechaFabricacion, muestras.FechaCaducidad, tipomuestra.Tipo, tipoformulacion.CodigoFormulacion, tipoformulacion.Formulacion, tipoformulacion.DescripcionFormulacion, contenedores.NoContenedor, contenedores.Clasificacion, muestras.Status, estadomuestra.DescripcionStatus FROM muestras, contenedores, tipoformulacion, muestras_contenedores, tipomuestra, estadomuestra WHERE muestras.idMuestra = muestras_contenedores.idMuestra AND muestras.idTipoDeMuestra = tipomuestra.idTipoDeMuestra AND muestras.CodigoFormulacion = tipoformulacion.CodigoFormulacion AND contenedores.idContenedor = muestras_contenedores.idContenedor AND muestras.Status = estadomuestra.Status AND muestras.idMuestra = ?', [id])
    }
    
}