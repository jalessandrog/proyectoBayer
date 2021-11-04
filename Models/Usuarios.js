const db = require('../util/database');

module.exports = class Usuario {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(idEmpleado, Nombres, Apellidos, CorreoElectronico, Password, Rol) {
        this.idEmpleado = idEmpleado;
        this.Nombres = Nombres;
        this.Apellidos = Apellidos;
        this.CorreoElectronico = CorreoElectronico;
        this.Password = Password;
        this.Rol = Rol;
    }

    static fetchOne(CorreoElectronico){
        return db.execute('SELECT * FROM usuarios WHERE CorreoElectronico = ? ', [CorreoElectronico])
    }

    static fetchAll() {
        return db.execute("SELECT U.idEmpleado, CONCAT(U.Nombres,' ', U.Apellidos) 'NombreUsuario', U.CorreoElectronico, U.Rol FROM usuarios U ORDER BY U.Nombres ASC")
    }
    
} 