const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn, checkRoles } = require('./../middleware/route-guard')


// User list
router.get('/lista-usuarios', (req, res) => {

  User
    .find()
    .select({ username: 1 })
    .then(user => {
      res.render('user/user-list', { user })
    })
    .catch(err => next(err))
})

// User details
router.get('/detalles/:user_id', isLoggedIn, (req, res) => {

  const { user_id } = req.params

  User
    .findById(user_id)
    .then(user => {
      res.render('user/user-details', {
        user,
        isADMIN: req.session.currentUser.role === 'ADMIN',
        iscurrentUser: req.session.currentUser._id === user_id,
      })
    })
    .catch(err => next(err))
})

// Edit user
router.get('/detalles/:user_id/editar', isLoggedIn, checkRoles('ADMIN'), (req, res) => {

  const { user_id } = req.params

  User
    .findById(user_id)
    .then(user => {
      res.render('user/user-edit', user)
    })
    .catch(err => next(err))
})

router.post('/detalles/:user_id/editar', isLoggedIn, checkRoles('ADMIN'), (req, res) => {

  const { username, email, profileImg } = req.body
  const { user_id } = req.params

  User
    .findByIdAndUpdate(user_id, { username, email, profileImg })
    .then(() => res.redirect(`/lista-usuarios`))
    .catch(err => next(err))
})

// Delete user
router.post('/detalles/:user_id/eliminar', isLoggedIn, checkRoles('ADMIN'), (req, res) => {

  const { user_id } = req.params

  User
    .findByIdAndDelete(user_id)
    .then(() => res.redirect('/lista-usuarios'))
    .catch(err => next(err))
})

// Upgrade to Editor
router.post('/detalles/:user_id/mejorar/:role', isLoggedIn, checkRoles('ADMIN'), (req, res) => {

  const { user_id, role } = req.params

  // role === 'ADMIN' && next()

  User
    .findByIdAndUpdate(user_id, { role })
    .then(() => res.redirect('/lista-usuarios'))
    .catch(err => next(err))
})

// Edit my user profile
router.get('/detalles/:user_id/auto-edicion', isLoggedIn, (req, res, next) => {

  const { user_id } = req.params

  if (req.session.currentUser._id === user_id) {
    User
      .findById(user_id)
      .then(user => {
        res.render('user/user-edit-me', user)
      })
      .catch(err => next(err))
  } else {
    res.redirect('/lista-usuarios')
  }
})

router.post('/detalles/:user_id/auto-edicion', isLoggedIn, (req, res) => {

  const { username, email, profileImg } = req.body
  const { user_id } = req.params

  if (req.session.currentUser._id === user_id) {
    User
      .findByIdAndUpdate(user_id, { username, email, profileImg })
      .then(() => res.redirect(`/lista-usuarios`))
      .catch(err => next(err))
  } else {
    res.redirect('/lista-usuarios')
  }
})

module.exports = router