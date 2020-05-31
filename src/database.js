// requerimos las dependencias
    const mongoose = require('mongoose');
    const { mongodb } = require('./keys');

// validacion de conexion a la base de datos 
    mongoose.connect(mongodb.url, { useNewUrlParser: true })
        .then(db => console.log('la base de datos esta conectada'))
        .catch(err => console.error(err));