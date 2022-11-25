const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const saltRounds = 10
const fileUploader = require('../config/cloudinary.config')

// Signup
router.get('/registro', (req, res, next) => res.render('auth/sign-in'))

router.post('/registro', fileUploader.single('profileImg'), (req, res, next) => {

  const { userPwd } = req.body
  const { path: profileImg } = req.file

  bcrypt
    .genSalt(saltRounds)
    .then(salt => bcrypt.hash(userPwd, salt))
    .then(hashedPassword => User.create({ ...req.body, password: hashedPassword, profileImg }))
    .then(() => res.redirect('/'))
    .catch(err => next(err))
})

// Login
router.get('/iniciar-sesion', (req, res, next) => res.render('auth/login'))

router.post('/login', (req, res, next) => {

  const { email, userPwd } = req.body

  User
    .findOne({ email })
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMessage: 'Email no registrado en la Base de Datos' })
        return
      } else if (bcrypt.compareSync(userPwd, user.password) === false) {
        res.render('auth/login', { errorMessage: 'La contraseña es incorrecta' })
        return
      } else {
        req.session.currentUser = user
        res.redirect('/')
      }
    })
    .catch(err => next(err))
})

// Logout
router.get('/cerrar-sesion', (req, res, next) => {
  req.session.destroy(() => res.redirect('/iniciar-sesion'))
})

module.exports = router
