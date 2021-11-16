const { createUser } = require('../Models/Usuarios');
const Usuarios = require('../Models/Usuarios');
const bcrypt = require('bcryptjs');

const controller = {
    ConsultarUsuarios:(req, res, next) => {
        console.log("Ruta Consultar Usuarios")

        Usuarios.fetchAll()
            .then(([rows, fieldData]) => {
                res.render('ConsultarUsuarios',{
                    isLoggedIn: req.session.isLoggedIn,
                    CorreoElectronico: req.session.CorreoElectronico,
                    NombreCompleto: req.session.NombreCompleto,
                    Permisos: req.session.rolEmpleado,
                    ConsultarUsuarios: rows,
                });
            })
            .catch(err => {
                console.log(err);
                //response.status(302).redirect('/error');
            });
    },

    AgregarUsuario: (req, res, next) => {
        console.log("Ruta para editar Usuario")
        if(req.method=="POST"){
            if(!req.body){
                res.status(400).send({
                    error: "No se puede crear el usuario"
                })
            }
            bcrypt.hash(req.body.password,12).then((hash)=> {
                Usuarios.createUser(req.body.idEmpleado, req.body.nombres,req.body.apellidos,req.body.correo,hash,req.body.rol).then(()=>{
                    res.status(201).send({
                        mensaje: "Se ha creado el usuario"
                    })
                }).catch(()=>{
                    res.status(400).send({
                        error: "No se puede crear el usuario correo o contraseña repetida"
                    }) 
                })
                })
        }
        else{
        res.render('AgregarUsuario',{
            isLoggedIn: req.session.isLoggedIn,
            CorreoElectronico: req.session.CorreoElectronico,
            NombreCompleto: req.session.NombreCompleto,
            Permisos: req.session.rolEmpleado
        })}
    },

    ModificarUsuario:(req, res, next) => {
        console.log("Modificar usuario:",req.params.id)
        //Logica de extraer info del backend
        let nombres = ["Jesus","Ivan","Arturo"]
        res.render('ModificarUsuario',{id:req.params.id, nombre: nombres[req.params.id],
            isLoggedIn: req.session.isLoggedIn,
            CorreoElectronico: req.session.CorreoElectronico,
            NombreCompleto: req.session.NombreCompleto,
            Permisos: req.session.rolEmpleado
        })
    },
}
module.exports = controller;
