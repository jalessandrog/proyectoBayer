const db = require('../util/database');

module.exports = class Main {

    static Alerta1() {
        return db.execute('SELECT M.NombreMuestra, M.CodigoMuestra, M.SP, M.Cantidad, M.UnidadMedida, A.Color, A.NombreAlerta, DATEDIFF(M.FechaCaducidad, NOW()) "DiasRestantes" FROM muestras M, alertas A WHERE A.Activa = 1 AND DATEDIFF(M.FechaCaducidad, NOW()) BETWEEN 0 AND( SELECT alertas.Condicion FROM alertas WHERE alertas.idAlerta = 1 ) AND A.idAlerta NOT IN( SELECT alertas.idAlerta FROM alertas WHERE alertas.idAlerta = 2 ) AND A.idAlerta NOT IN( SELECT alertas.idAlerta FROM alertas WHERE alertas.idAlerta = 3 ) AND M.NombreMuestra IN( SELECT muestras.NombreMuestra FROM muestras WHERE muestras.Activa = "1" ) ORDER BY DiasRestantes')
    }

    static Alerta2() {
        return db.execute('SELECT M.NombreMuestra,M.CodigoMuestra, M.SP, M.Cantidad, M.UnidadMedida, A.Color, A.NombreAlerta, DATEDIFF(M.FechaCaducidad, NOW()) "DiasRestantes" FROM muestras M, alertas A WHERE A.Activa = 1 AND DATEDIFF(M.FechaCaducidad, NOW()) BETWEEN( SELECT alertas.Condicion FROM alertas WHERE alertas.idAlerta = 1 ) AND( SELECT alertas.Condicion FROM alertas WHERE alertas.idAlerta = 2 ) AND A.idAlerta NOT IN( SELECT alertas.idAlerta FROM alertas WHERE alertas.idAlerta = 1 ) AND A.idAlerta NOT IN( SELECT alertas.idAlerta FROM alertas WHERE alertas.idAlerta = 3 ) AND M.NombreMuestra IN( SELECT muestras.NombreMuestra FROM muestras WHERE muestras.Activa = "1" ) ORDER BY DiasRestantes')
    }

    static Alerta3() {
        return db.execute('SELECT M.NombreMuestra,M.CodigoMuestra, M.SP, M.Cantidad, M.UnidadMedida, A.Color, A.NombreAlerta, DATEDIFF(M.FechaCaducidad, NOW()) "DiasRestantes" FROM muestras M, alertas A WHERE A.Activa = 1 AND DATEDIFF(M.FechaCaducidad, NOW()) BETWEEN( SELECT alertas.Condicion FROM alertas WHERE alertas.idAlerta = 2 ) AND( SELECT alertas.Condicion FROM alertas WHERE alertas.idAlerta = 3 ) AND A.idAlerta NOT IN( SELECT alertas.idAlerta FROM alertas WHERE alertas.idAlerta = 1 ) AND A.idAlerta NOT IN( SELECT alertas.idAlerta FROM alertas WHERE alertas.idAlerta = 2 ) AND M.NombreMuestra IN( SELECT muestras.NombreMuestra FROM muestras WHERE muestras.Activa = "1" ) ORDER BY DiasRestantes')
    }
    
}