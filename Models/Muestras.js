const db = require('../util/database');

module.exports = class Muestras {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(NombreMuestra, CodigoMuestra, SP, HojaSeguridad, UsoMuestra, Lote, Concentracion, Cantidad, FechaFabricacion, FechaCaducidad, idTipoDeMuestra, CodigoFormulacion, Status, idContenedor ) {
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
        this.idContenedor = idContenedor;
    }


    save() {
        return db.execute('INSERT INTO muestras (NombreMuestra, CodigoMuestra, SP, HojaSeguridad, UsoMuestra, Lote, Concentracion, Cantidad, FechaFabricacion, FechaCaducidad, idTipoDeMuestra, CodigoFormulacion, Status, idContenedor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [this.NombreMuestra, this.CodigoMuestra, this.SP, this.HojaSeguridad, this.UsoMuestra, this.Lote, this.Concentracion, this.Cantidad,  this.FechaFabricacion,  this.FechaCaducidad, this.idTipoDeMuestra, this.CodigoFormulacion, this.Status, this.idContenedor ]);
    }

    static updateMuestra(idMuestra, NombreMuestra, CodigoMuestra, SP, HojaSeguridad, UsoMuestra, Lote, Concentracion, Cantidad, FechaFabricacion, FechaCaducidad, idTipoDeMuestra, CodigoFormulacion, Status, idContenedor){
        return db.execute('UPDATE muestras SET NombreMuestra = ?, CodigoMuestra = ?, SP = ?, HojaSeguridad = ?, UsoMuestra = ?, Lote = ?, Concentracion = ?, Cantidad = ?, FechaFabricacion = ?, FechaCaducidad = ?, idTipoDeMuestra = ?, CodigoFormulacion = ?, Status = ?, idContenedor = ?  WHERE idMuestra = ? ',
            [idMuestra, NombreMuestra, CodigoMuestra, SP, HojaSeguridad, UsoMuestra, Lote, Concentracion, Cantidad, FechaFabricacion, FechaCaducidad, idTipoDeMuestra, CodigoFormulacion, Status, idContenedor]);
    }



    static fetchAll() {
        // return db.execute('SELECT * FROM muestras');
        return db.execute('SELECT muestras.idMuestra, muestras.NombreMuestra, muestras.CodigoMuestra, muestras.SP, muestras.HojaSeguridad, muestras.UsoMuestra, muestras.Lote, muestras.Concentracion, muestras.Cantidad, muestras.FechaIngreso, muestras.FechaFabricacion, muestras.FechaCaducidad, tipomuestra.Tipo, tipoformulacion.CodigoFormulacion, tipoformulacion.Formulacion, tipoformulacion.DescripcionFormulacion, contenedores.NoContenedor, contenedores.Clasificacion, muestras.Status, estadomuestra.DescripcionStatus FROM muestras, contenedores, tipoformulacion, tipomuestra, estadomuestra WHERE muestras.idTipoDeMuestra = tipomuestra.idTipoDeMuestra AND muestras.CodigoFormulacion = tipoformulacion.CodigoFormulacion AND contenedores.idContenedor = muestras.idContenedor AND muestras.Status = estadomuestra.Status')
    }
    static fetchAllbyTerm(query) {
        // return db.execute('SELECT * FROM muestras');
        return db.execute('SELECT muestras.idMuestra, muestras.NombreMuestra, muestras.CodigoMuestra, muestras.SP, muestras.HojaSeguridad, muestras.UsoMuestra, muestras.Lote, muestras.Concentracion, muestras.Cantidad, muestras.FechaIngreso, muestras.FechaFabricacion, muestras.FechaCaducidad, tipomuestra.Tipo, tipoformulacion.CodigoFormulacion, tipoformulacion.Formulacion, tipoformulacion.DescripcionFormulacion, contenedores.NoContenedor, contenedores.Clasificacion, muestras.Status, estadomuestra.DescripcionStatus FROM muestras, contenedores, tipoformulacion, tipomuestra, estadomuestra WHERE muestras.idTipoDeMuestra = tipomuestra.idTipoDeMuestra AND muestras.CodigoFormulacion = tipoformulacion.CodigoFormulacion AND contenedores.idContenedor = muestras.idContenedor AND muestras.Status = estadomuestra.Status AND (muestras.NombreMuestra LIKE ? OR muestras.SP LIKE ?)',['%'+query+'%','%'+query+'%'])
    }
    static fetchOne(id){
        // return db.execute('SELECT * FROM muestras WHERE idMuestra = ?', [id]);
        return db.execute('SELECT muestras.idMuestra, muestras.NombreMuestra, muestras.CodigoMuestra, muestras.SP, muestras.HojaSeguridad, muestras.UsoMuestra, muestras.Lote, muestras.Concentracion, muestras.Cantidad, muestras.FechaIngreso, muestras.FechaFabricacion, muestras.FechaCaducidad, tipomuestra.Tipo, tipoformulacion.CodigoFormulacion, tipoformulacion.Formulacion, tipoformulacion.DescripcionFormulacion, contenedores.NoContenedor, contenedores.Clasificacion, muestras.Status, estadomuestra.DescripcionStatus FROM muestras, contenedores, tipoformulacion, tipomuestra, estadomuestra WHERE muestras.idTipoDeMuestra = tipomuestra.idTipoDeMuestra AND muestras.CodigoFormulacion = tipoformulacion.CodigoFormulacion AND contenedores.idContenedor = muestras.idContenedor AND muestras.Status = estadomuestra.Status AND muestras.idMuestra = ?', [id])
    }
    static retirar(idMuestra,idUsuario,descarga){
        return db.execute('UPDATE muestras SET Cantidad = Cantidad-? WHERE idMuestra = ?',[descarga,idMuestra] ).then(()=>{
            return db.execute('SELECT * FROM muestras WHERE idMuestra = ?',[idMuestra]).then(            ([rows, fieldData]) => {
            return db.execute('INSERT INTO manipulan (idMuestra,idEmpleado,Sobrante,Descarga,FechaDeUso) VALUES (?,?,?,?,NOW())',[idMuestra,idUsuario,rows[0].Cantidad,descarga])
            })
        })
    }
}