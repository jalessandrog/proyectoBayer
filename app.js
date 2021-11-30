const express = require('express');
const ejs = require('ejs');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const PORT = 8080;
const csrf = require('csurf');
const csrfProtection = csrf();
const moment = require('moment');
const http = require('http');
const multer = require('multer');
const { jsPDF } = require("jspdf");
const cron = require('node-cron');
const nodemailer = require("nodemailer"); 

const mainRouter = require('./routes/Main');
const muestrasRouter = require('./routes/Muestras');
const usuariosRouter = require('./routes/Usuarios');
const movimientosRouter = require('./routes/Movimientos');
const alertasroles = require('./routes/AlertasRoles');

const { cookie } = require('express-validator');


const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, 'public/uploads');
    },
    filename: (request, file, callback) => {
        callback(null, new Date().getMilliseconds() + '-' + file.originalname);
    },
});


//cron.schedule('* * 8 * * *', () => {
/*cron.schedule('* * * * * *', (req, res, next) => {
    console.log('Hola Joe');
    res.redirect('/Inicio');*/
    /*app.post("/send-email", (req, res) => {
        var mailOptions = {
            from: 'inventariobayer@gmail.com',
            to: req.body.CorreoElectronico,
            subject: 'BAYER: Recupera tu contraseña',
            html: '<a href="https://inventario-bayer.herokuapp.com/NuevaContrasena/'+t+'"> Click para recuperar tu contraseña</a>'
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    });

    var mailOptions = {
        from: "Remitente",
        to: "a01173130@tec.mx",
        subject: "prueba correo alertas",
        text: "HolaMundo",
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            res.status(500).send(error,message);
        }else{
            console.log("Email enviado");
            res.status(200).jsonp(req.body);
        }
    });*/
    /*app.post("/send-email", (req, res) => {
        var mailOptions = {
            from: 'inventariobayer@gmail.com',
            to: 'inventariobayer@gmail.com',
            subject: 'BAYER: Recupera tu contraseña',
            html: '<p> Click para recuperar tu contraseña</p>'
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    });*/ 
//});

// ************ Template Engine ************
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
// app.use(csrf({ cookie: true }))


app.use(multer({ storage: fileStorage }).single('HojaSeguridad'));

app.use(session({
    secret: 'kJSDLKJshdflMOEKJHDKJAHSKJHksWCD03DIDAPI3WDPpoijp98jpjjkiojp0LKSD0knlnl', 
    resave: false,  
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 30 * 60 * 1000
    },
    rolling: true
}));

app.use(csrfProtection); 
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use('/', mainRouter);
app.use('/Muestras', muestrasRouter);
app.use('/Usuarios', usuariosRouter);
app.use('/Movimientos', movimientosRouter);
app.use('/AlertasRoles', alertasroles);

app.use('/error', (request, response, next) => {
    response.status(500).send('Internal Server Error'); 
});

app.use((req, res, next) => {
    res.status(404).send('Recurso no encontrado'); 
});

//Activando el servidor desde express
app.listen((process.env.PORT || 3000), function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
