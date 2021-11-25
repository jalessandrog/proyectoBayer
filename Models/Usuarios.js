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

    static createUser(idEmpleado, Nombres, Apellidos, CorreoElectronico, Password, Rol){
        return db.execute('INSERT into usuarios (idEmpleado, Nombres, Apellidos, CorreoElectronico, Password, Rol) values (?,?,?,?,?,?)', [idEmpleado,Nombres, Apellidos, CorreoElectronico, Password, Rol])
    }

    static fetchOne(CorreoElectronico){
        return db.execute('SELECT * FROM usuarios WHERE CorreoElectronico = ? AND STATUS = 1', [CorreoElectronico])
    }
    static fetchOnebyId(idEmpleado){
        return db.execute('SELECT * FROM usuarios WHERE idEmpleado = ? ', [idEmpleado])
    }

    static fetchAll() {
        return db.execute("SELECT U.idEmpleado, CONCAT(U.Nombres,' ', U.Apellidos) 'NombreUsuario', U.CorreoElectronico, U.Rol, U.Status FROM usuarios U ORDER BY U.Nombres ASC")
    }

     static UpdateToken(idEmpleado, token){
        return db.execute('UPDATE usuarios SET token = ? WHERE idEmpleado = ? ', [token, idEmpleado])
    }

    static fetchOneByToken(token){
        return db.execute('SELECT * FROM usuarios WHERE token = ? ', [token])
    }
    static UpdatePassword(idEmpleado, password){
        return db.execute('UPDATE usuarios SET password = ? WHERE idEmpleado = ? ', [password, idEmpleado])
    }

    static UpdateUser(idEmpleado, Nombres, Apellidos, CorreoElectronico, Rol, Status){
        return db.execute('UPDATE usuarios SET  Nombres = ?, Apellidos = ?, CorreoElectronico =?, Rol = ?, Status = ? WHERE idEmpleado = ? ', [idEmpleado, Nombres, Apellidos, CorreoElectronico, Rol,Status])
    }
} 