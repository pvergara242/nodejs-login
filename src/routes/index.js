// requerimos las dependencias
    const express = require('express');
    const router = express.Router();

    const passport = require('passport');

//manera que se registra el usuario 
    router.get('/', (req, res, next) => {
        res.render('index');
    });


    router.get('/signup', (req, res, next) => {
        res.render('signup');
    });

    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        passReqToCallback: true
    }));

//manera que el usuario se puede loguear

    router.get('/signin', (req, res, next) => {
        res.render('signin');
    });


    router.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        passReqToCallback: true
    }));

 //manera de cerrar sesion 
    router.get('/logout', (req, res, next) => {
        req.logout();
        res.redirect('/');
    })

    router.get('/profile', isAuthenticated, (req, res, next) => {
        res.render('profile');
    });

    function isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    };



// exportar la ruta
    module.exports = router;