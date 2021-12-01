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

    ModificarUsuario:(req, res, next) => {
        if(req.method=="POST"){
            console.log("Actualizando Usuario")
            if(!req.body){
                res.status(400).send({
                    error: "No se puede crear el usuario"
                })
            }
            console.log(req.params.id, req.body.nombres,req.body.apellidos,req.body.correo,req.body.rol)
                //Logica de edicion
                Usuarios.UpdateUser(req.params.id, req.body.nombres,req.body.apellidos,req.body.correo,req.body.rol,req.body.status)
                .then(()=>{
                    console.log("se actualizó!")
                    res.status(201).send({
                        mensaje: "Se ha actualizado el usuario"
                    })
                }).catch((e)=>{
                    console.log(e)
                })
    }else{
        console.log("Modificar usuario:",req.params.id)
        Usuarios.fetchOnebyId(req.params.id).then(([rows, fieldData])=>{ 
            res.render('ModificarUsuario',{id:req.params.id,
                isLoggedIn: req.session.isLoggedIn,
                CorreoElectronico: req.session.CorreoElectronico,
                NombreCompleto: req.session.NombreCompleto,
                Permisos: req.session.rolEmpleado,
                usuario:rows[0]
            })
            .catch(err => {
                console.log(err); 
                console.log('Error al actualizar usuario');
                res.status(302).redirect('/error'); 
            }); 
        })}
    },


     AgregarUsuario:(req, res, next) => {
         console.log("Ruta para editar Usuario")
         if(req.method=="POST"){
             if(!req.body){
                 res.status(400).send({
                     error: "No se puede crear el usuario"
                 })
            }
            Usuarios.fetchOnebyId(req.body.idEmpleado).then(([rows, fieldData]) => {
                console.log("ya existe")
                if(rows.length>0)
                res.status(400).send({
                    error: "No se puede crear el usuario por que el id del usuario ya existe"
                })
            })
         bcrypt.hash(req.body.password,12).then((hash)=> {
                Usuarios.createUser(req.body.idEmpleado, req.body.nombres,req.body.apellidos,req.body.correo,hash,req.body.rol)
                .then(()=>{
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

    // ModificarUsuario:(req, res, next) => {
    //     if(req.method=="POST"){
    //         console.log("Actualizando Usuario")
    //         if(!req.body){
    //             res.status(400).send({
    //                 error: "No se puede crear el usuario"
    //             })
    //         }
    //         console.log(req.params.id, req.body.nombres,req.body.apellidos,req.body.correo,req.body.rol)
    //             //Logica de edicion
    //             Usuarios.UpdateUser(req.params.id, req.body.nombres,req.body.apellidos,req.body.correo,req.body.rol,req.body.status)
    //             .then(()=>{
    //                 console.log("se actualizó!")

    //                 res.status(201).send({
    //                     mensaje: "Se ha actualizado el usuario"
    //                 })
    //             }).catch((e)=>{
    //                 console.log(e)
    //             })
    // }

    
    // else{
    //     console.log("Modificar usuario:",req.params.id)
    //     Usuarios.fetchOnebyId(req.params.id).then(([rows, fieldData])=>{ 
    //         res.render('ModificarUsuario',{id:req.params.id,
    //             isLoggedIn: req.session.isLoggedIn,
    //             CorreoElectronico: req.session.CorreoElectronico,
    //             NombreCompleto: req.session.NombreCompleto,
    //             Permisos: req.session.rolEmpleado,
    //             usuario:rows[0]
    //         })
    // })
    // }},
}
module.exports = controller;