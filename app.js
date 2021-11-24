const express = require('express');
const ejs = require('ejs');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const PORT = 3030;
const csrf = require('csurf');
const csrfProtection = csrf();
const moment = require('moment');
const multer = require('multer');
const { jsPDF } = require("jspdf");
const nodeCron = require("node-cron");

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

// ************ Template Engine ************
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(multer({ storage: fileStorage }).single('HojaSeguridad'));

app.use(session({
    secret: 'kJSDLKJshdflMOEKJHDKJAHSKJHksWCD03DIDAPI3WDPpoijp98jpjjkiojp0LKSD0knlnl', //mi string secreto que debe ser un string aleatorio muy largo', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
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
    res.status(404).send('Recurso no encontrado'); //Manda error al no existir la ruta
});

//Activando el servidor desde express
app.listen(PORT, () => console.log('Servidor corriendo en el puerto ' + PORT))

