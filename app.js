const express = require('express');
const ejs = require('ejs');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3030;
const path = require('path');


// ************ Template Engine ************
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));


const mainRouter = require('./routes/Main');
const muestrasRouter = require('./routes/Muestras');
const usuariosRouter = require('./routes/Usuarios');


app.use('/', mainRouter);
app.use('/Muestras', muestrasRouter);
app.use('/Usuarios', usuariosRouter);

//Activando el servidor desde express
app.listen(PORT, () => console.log('Servidor corriendo en el puerto ' + PORT))

