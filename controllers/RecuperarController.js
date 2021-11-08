const Usuario = require('../Models/Usuarios');

const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "michelltenaortega@gmail.com",
      pass: "RKBRADGMTO",
    },
  });

function random() {
    return Math.random().toString(36).substr(2); // Eliminar `0.`
};
 
function token() {
    return random() + random(); // Para hacer el token más largo
};
 

const controller = {
    SolicitudCambioContrasena:(req, res, next) => {
        console.log("Ruta Cambio contraseña")
        res.render('LoginRecuperarC',{});
    },
    CambiarContrasena:(req, res, next) => {
        console.log("Ruta Cambio contraseña")
        if (req.method === 'GET'){
            Usuario.fetchOneByToken(req.params.token).then(([rows, fieldData]) => {
                if(rows.length>0){
                res.render('NuevaContrasena',{ error: null, token:req.params.token});
                }
                else{
                    res.render('NuevaContrasena',{error: "Token Inválido o ya usado", token:req.params.token});
                }
             })
           
        } else if(req.method === 'POST'){
            Usuario.fetchOneByToken(req.params.token).then(([rows, fieldData]) => {
                if(rows.length>0){
                let password1 =  req.body.password1;
                let password2 =  req.body.password2;
                if(password1===password2){
                    bcrypt.hash(password1,12).then((hash)=> {
                    Usuario.UpdatePassword(rows[0].idEmpleado,hash ).then(()=>{
                        Usuario.UpdateToken( rows[0].idEmpleado,token()).then(()=>{
                            res.redirect('/Inicio');
                        })
                    })})
                }else{
                    res.render('NuevaContrasena',{error: "Las contraseñas no coinciden", token:req.params.token});
                }
                    }
                    else{
                        res.render('NuevaContrasena',{error: "Token Inválido o ya usado", token:req.params.token});
                    }
            })
        }
        
    },

    CambioContrasena:(req, res, next) => {
        console.log("Ruta Cambio contraseña POST")
        Usuario.fetchOne(req.body.CorreoElectronico).then(([rows, fieldData]) => {
        let t= token()
        Usuario.UpdateToken( rows[0].idEmpleado,t)
        var mailOptions = {
            from: 'mic@quantumelectric.com.mx',
            to: req.body.CorreoElectronico,
            subject: 'Recupera tu contraseña',
            html: '<a href="http://localhost:3030/NuevaContrasena/'+t+'"> Click para recuperar tu contraseña</a>'
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          
        })
        res.render('LoginRecuperarC',{});
    },
}

module.exports = controller;