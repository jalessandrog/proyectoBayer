const controller = {

    login:(req, res, next) => {
        console.log("Ruta index")
        res.render('Login');
    },
    
    index: (req, res, next) => {
        console.log("Ruta index")
        res.render('Index');
    }
}
module.exports = controller;
