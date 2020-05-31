const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id);
    done(null, user);
});
// validacion para el email del usuario
passport.use('local-signup', new localStrategy({

    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {

    const user = await User.findOne({ email: email });
    if (user) {
        return done(null, false, req.flash('signupMessage', 'el email ya existe'));
    } else {

        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptpassword(password);
        await newUser.save();
        done(null, newUser);
    }
}));
// proceso para validacion de usuario y contraseña 
passport.use('local-signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    console.log('local-signin executed');
    const user = await User.findOne({ email: email });
    if (!user) {
        return done(null, false, req.flash('signinMessage', 'usuario no encontrado'));
    }
    if (!user.comparePassword(password)) {
        return done(null, false, req.flash('signinMessage', 'contraseña incorrecta'));
    }
    done(null, user);
}));