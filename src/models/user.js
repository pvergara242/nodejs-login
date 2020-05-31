// requerimos las dependencias
        const mongoose = require('mongoose');
        const bcrypt = require('bcrypt-nodejs');
        const { Schema } = mongoose;

 // esquema de los datos que se le piden al usuario para registrarse y para loguearse
        const userShema = new Schema({
            email: String,
            password: String
        });

        userShema.methods.encryptpassword = (password) => {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        };

        userShema.methods.comparePassword = function(password) {
            return bcrypt.compareSync(password, this.password);

        };

 // exportamos el modelo
        module.exports = mongoose.model('users', userShema);