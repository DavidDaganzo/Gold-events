const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const saltRounds = 10

// Signup
router.get('/sign-in', (req, res, next) => res.render('auth/sign-in'))

router.post('/sign-in', (req, res, next) => {

  const { userPwd } = req.body

  bcrypt
    .genSalt(saltRounds)
    .then(salt => bcrypt.hash(userPwd, salt))
    .then(hashedPassword => User.create({ ...req.body, password: hashedPassword }))
    .then(() => res.redirect('/'))
    .catch(error => next(error))
})

// Login
router.get('/login', (req, res, next) => res.render('auth/login'))

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
    .catch(error => next(error))
})

// Logout
router.post('/logout', (req, res, next) => {
  req.session.destroy(() => res.redirect('/login'))
})

module.exports = router
