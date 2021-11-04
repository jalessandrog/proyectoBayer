const db = require('../util/database');

module.exports = class Muestra {

    static ConsulMovements() {
        return db.execute("SELECT M.idMuestra, CONCAT(U.Nombres,' ', U.Apellidos) 'NombreUsuario', M.FechaDeUso, Mu.NombreMuestra, Mu.SP, M.Descarga, M.Sobrante FROM manipulan M, usuarios U, muestras Mu WHERE M.idMuestra = Mu.idMuestra AND M.idEmpleado = U.idEmpleado ORDER BY M.FechaDeUso DESC");
    }
    static fetchAllbyTerm(query) {
        return db.execute("SELECT M.idMuestra, CONCAT(U.Nombres,' ', U.Apellidos) 'NombreUsuario', M.FechaDeUso, Mu.NombreMuestra, Mu.SP, M.Descarga, M.Sobrante FROM manipulan M, usuarios U, muestras Mu WHERE M.idMuestra = Mu.idMuestra AND M.idEmpleado = U.idEmpleado AND U.Nombres LIKE ? ORDER BY M.FechaDeUso DESC",['%'+query+'%'])
    }
    

}