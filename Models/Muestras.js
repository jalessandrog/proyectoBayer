const db = require('../util/database');

module.exports = class Muestras {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(NombreMuestra, CodigoMuestra, SP, HojaSeguridad, UsoMuestra, Lote, Concentracion, UnidadMedida, Cantidad, FechaFabricacion, FechaCaducidad, idTipoDeMuestra, CodigoFormulacion, Status, idContenedor ) {
        this.NombreMuestra = NombreMuestra;
        this.CodigoMuestra = CodigoMuestra;
        this.SP = SP;
        this.HojaSeguridad = HojaSeguridad;
        this.UsoMuestra = UsoMuestra;
        this.Lote = Lote;
        this.Concentracion = Concentracion;
        this.UnidadMedida = UnidadMedida;
        this.Cantidad = Cantidad;
        this.FechaFabricacion = FechaFabricacion;
        this.FechaCaducidad = FechaCaducidad;
        this.idTipoDeMuestra = idTipoDeMuestra;
        this.CodigoFormulacion = CodigoFormulacion;
        this.Status = Status;
        this.idContenedor = idContenedor;
    } 

    
    save() {
        return db.execute('INSERT INTO muestras (NombreMuestra, CodigoMuestra, SP, HojaSeguridad, UsoMuestra, Lote, Concentracion, UnidadMedida, Cantidad, FechaFabricacion, FechaCaducidad, idTipoDeMuestra, CodigoFormulacion, Status, idContenedor, Activa) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)',
            [this.NombreMuestra, this.CodigoMuestra, this.SP, this.HojaSeguridad, this.UsoMuestra, this.Lote, this.Concentracion, this.UnidadMedida, this.Cantidad,  this.FechaFabricacion,  this.FechaCaducidad, this.idTipoDeMuestra, this.CodigoFormulacion, this.Status, this.idContenedor ]);
    }

    static updateMuestra(idMuestra, NombreMuestra, CodigoMuestra, SP, HojaSeguridad, UsoMuestra, Lote, Concentracion, UnidadMedida, Cantidad, FechaFabricacion, FechaCaducidad, idTipoDeMuestra, CodigoFormulacion, Status, idContenedor){
        // return db.execute('UPDATE muestras SET NombreMuestra = ?, CodigoMuestra = ?, SP = ?, HojaSeguridad = ?, UsoMuestra = ?, Lote = ?, Concentracion = ?, UnidadMedida = ?, Cantidad = ?, FechaFabricacion = ?, FechaCaducidad = ?, idTipoDeMuestra = ?, CodigoFormulacion = ?, Status = ?, idContenedor = ?  WHERE idMuestra = ? ',
        //     [idMuestra, NombreMuestra, CodigoMuestra, SP, HojaSeguridad, UsoMuestra, Lote, Concentracion, UnidadMedida, Cantidad, FechaFabricacion, FechaCaducidad, idTipoDeMuestra, CodigoFormulacion, Status, idContenedor]);
        return db.execute ('CALL updateMuestra (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [idMuestra, NombreMuestra, CodigoMuestra, SP, HojaSeguridad, UsoMuestra, Lote, Concentracion, UnidadMedida, Cantidad, FechaFabricacion, FechaCaducidad, idTipoDeMuestra, CodigoFormulacion, Status, idContenedor]);
    }
    static updateMuestraSinHoja(idMuestra, NombreMuestra, CodigoMuestra, SP, UsoMuestra, Lote, Concentracion, UnidadMedida, Cantidad, FechaFabricacion, FechaCaducidad, idTipoDeMuestra, CodigoFormulacion, Status, idContenedor){
        // return db.execute('UPDATE muestras SET NombreMuestra = ?, CodigoMuestra = ?, SP = ?, HojaSeguridad = ?, UsoMuestra = ?, Lote = ?, Concentracion = ?, UnidadMedida = ?, Cantidad = ?, FechaFabricacion = ?, FechaCaducidad = ?, idTipoDeMuestra = ?, CodigoFormulacion = ?, Status = ?, idContenedor = ?  WHERE idMuestra = ? ',
        //     [idMuestra, NombreMuestra, CodigoMuestra, SP, HojaSeguridad, UsoMuestra, Lote, Concentracion, UnidadMedida, Cantidad, FechaFabricacion, FechaCaducidad, idTipoDeMuestra, CodigoFormulacion, Status, idContenedor]);
        return db.execute ('CALL updateMuestraSinHoja (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [idMuestra, NombreMuestra, CodigoMuestra, SP, UsoMuestra, Lote, Concentracion, UnidadMedida, Cantidad, FechaFabricacion, FechaCaducidad, idTipoDeMuestra, CodigoFormulacion, Status, idContenedor]);
    } 

    static fetchAll() {
        // return db.execute('SELECT * FROM muestras');
        return db.execute('SELECT muestras.idMuestra, muestras.NombreMuestra, muestras.CodigoMuestra, muestras.SP, muestras.HojaSeguridad, muestras.UsoMuestra, muestras.Lote, muestras.Concentracion, muestras.UnidadMedida, muestras.Cantidad, muestras.FechaIngreso, muestras.FechaFabricacion, muestras.FechaCaducidad, muestras.Status, muestras.Reporte, tipomuestra.Tipo, tipoformulacion.CodigoFormulacion, tipoformulacion.Formulacion, tipoformulacion.DescripcionFormulacion, contenedores.idContenedor, contenedores.NoContenedor, contenedores.Clasificacion, muestras.Status FROM muestras, contenedores, tipoformulacion, tipomuestra WHERE muestras.idTipoDeMuestra = tipomuestra.idTipoDeMuestra AND muestras.CodigoFormulacion = tipoformulacion.CodigoFormulacion AND contenedores.idContenedor = muestras.idContenedor AND muestras.Activa = "1" ORDER BY muestras.NombreMuestra ASC')
        // return db.execute('SELECT muestras.*, tipomuestra.Tipo, tipoformulacion.CodigoFormulacion, tipoformulacion.Formulacion, tipoformulacion.DescripcionFormulacion, contenedores.idContenedor, contenedores.NoContenedor, contenedores.Clasificacion, muestras.Status, estadomuestra.DescripcionStatus FROM muestras, contenedores, tipoformulacion, tipomuestra, estadomuestra WHERE muestras.idTipoDeMuestra = tipomuestra.idTipoDeMuestra AND muestras.CodigoFormulacion = tipoformulacion.CodigoFormulacion AND contenedores.idContenedor = muestras.idContenedor AND muestras.Status = estadomuestra.Status AND muestras.Activa = "1" ORDER BY muestras.NombreMuestra ASC')
    }
    static fetchAllporcaducar() {
        // return db.execute('SELECT * FROM muestras');
        return db.execute('SELECT muestras.idMuestra, muestras.NombreMuestra, muestras.CodigoMuestra, muestras.SP, muestras.HojaSeguridad, muestras.UsoMuestra, muestras.Lote, muestras.Concentracion, muestras.UnidadMedida, muestras.Cantidad, muestras.FechaIngreso, muestras.FechaFabricacion, muestras.FechaCaducidad, muestras.Status, muestras.Reporte, tipomuestra.Tipo, tipoformulacion.CodigoFormulacion, tipoformulacion.Formulacion, tipoformulacion.DescripcionFormulacion, contenedores.idContenedor, contenedores.NoContenedor, contenedores.Clasificacion, muestras.Status FROM muestras, contenedores, tipoformulacion, tipomuestra WHERE muestras.idTipoDeMuestra = tipomuestra.idTipoDeMuestra AND muestras.CodigoFormulacion = tipoformulacion.CodigoFormulacion AND contenedores.idContenedor = muestras.idContenedor AND muestras.Activa = "1"  ORDER BY muestras.NombreMuestra ASC')
    }
    static fetchAllbyTerm(query) {
        // return db.execute('SELECT * FROM muestras');
        return db.execute('SELECT muestras.idMuestra, muestras.NombreMuestra, muestras.CodigoMuestra, muestras.SP, muestras.HojaSeguridad, muestras.UsoMuestra, muestras.Lote, muestras.Concentracion, muestras.UnidadMedida, muestras.Cantidad, muestras.FechaIngreso, muestras.FechaFabricacion, muestras.FechaCaducidad, muestras.Status, muestras.Reporte, tipomuestra.Tipo, tipoformulacion.CodigoFormulacion, tipoformulacion.Formulacion, tipoformulacion.DescripcionFormulacion, contenedores.idContenedor, contenedores.NoContenedor, contenedores.Clasificacion, muestras.Status FROM muestras, contenedores, tipoformulacion, tipomuestra WHERE muestras.idTipoDeMuestra = tipomuestra.idTipoDeMuestra AND muestras.CodigoFormulacion = tipoformulacion.CodigoFormulacion AND contenedores.idContenedor = muestras.idContenedor AND muestras.Activa = "1" AND (muestras.NombreMuestra LIKE ? OR muestras.SP LIKE ? OR muestras.UsoMuestra LIKE ?)',['%'+query+'%','%'+query+'%','%'+query+'%'])
    }
    static fetchOne(id){
        // return db.execute('SELECT * FROM muestras WHERE idMuestra = ?', [id]);
        return db.execute('SELECT muestras.idMuestra, muestras.NombreMuestra, muestras.CodigoMuestra, muestras.SP, muestras.HojaSeguridad, muestras.UsoMuestra, muestras.Lote, muestras.Concentracion, muestras.UnidadMedida, muestras.Cantidad, muestras.FechaIngreso, muestras.FechaFabricacion, muestras.FechaCaducidad, muestras.Status, muestras.Reporte, tipomuestra.Tipo, tipoformulacion.CodigoFormulacion, tipoformulacion.Formulacion, tipoformulacion.DescripcionFormulacion, contenedores.idContenedor,contenedores.NoContenedor, contenedores.Clasificacion, muestras.Status FROM muestras, contenedores, tipoformulacion, tipomuestra WHERE muestras.idTipoDeMuestra = tipomuestra.idTipoDeMuestra AND muestras.CodigoFormulacion = tipoformulacion.CodigoFormulacion AND contenedores.idContenedor = muestras.idContenedor AND muestras.idMuestra = ?', [id])
    }

    static deleteMuestra(id){
        // return db.execute ('CALL deleteMuestra (?)', [id]);
        return db.execute ('UPDATE muestras SET Activa = "0" WHERE idMuestra = ?', [id]);
    }


    static retirar(idMuestra,idUsuario,descarga){
        return db.execute('CALL retirar(?,?,?) ',[idMuestra,idUsuario,descarga,] )
    }

    static reportarMuestra(idMuestra, Status, Reporte){
        return db.execute('UPDATE muestras SET muestras.Status = ?, Reporte = ?  WHERE idMuestra = ? ', [Status,Reporte,idMuestra])
    }
}