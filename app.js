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


app.set('port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000)