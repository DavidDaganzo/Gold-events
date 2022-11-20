const router = require("express").Router()
// const User = require("../models/User.model")
// const { isLoggedIn, checkRoles } = require('./../middleware/route-guard')


// router.get("/", (req, res, next) => {
//   res.render("index")
// })


// // User list
// router.get('/user-list', (req, res) => {

//   User
//     .find()
//     .select({ username: 1 })
//     .then(user => {
//       res.render('user/user-list', { user })
//     })
//     .catch(err => console.log(err))
// })

// // User details
// router.get('/details/:user_id', isLoggedIn, (req, res) => {
//   const { user_id } = req.params
//   User
//     .findById(user_id)
//     .then(user => {
//       res.render('user/user-details', {
//         user,
//         isPM: req.session.currentUser.role === 'PM',
//         isTheuser: req.session.currentUser._id === user_id,
//       })
//     })
//     .catch(err => console.log(err))
// })

// // Edit user

// router.get('/details/:user_id/edit', isLoggedIn, checkRoles('PM'), (req, res) => {

//   const { user_id } = req.params

//   User
//     .findById(user_id)
//     .then(user => {
//       res.render('user/edit-user', user)
//     })
//     .catch(err => console.log(err))
// })



// router.post('/details/:user_id/edit', isLoggedIn, checkRoles('PM'), (req, res) => {

//   const { username, email, profileImg, description } = req.body
//   const { user_id } = req.params

//   console.log(username)
//   console.log(user_id)

//   User
//     .findByIdAndUpdate(user_id, { username, email, profileImg, description })
//     .then(() => res.redirect(`/user/list`))
//     .catch(err => console.log(err))
// })


// // Delete user
// router.post('/details/:user_id/delete', isLoggedIn, checkRoles('PM'), (req, res) => {

//   const { user_id } = req.params

//   User
//     .findByIdAndDelete(user_id)
//     .then(() => res.redirect('/user/list'))
//     .catch(err => console.log(err))

// })
// // Upgrade to DEV
// router.post('/details/:user_id/DEV', isLoggedIn, checkRoles('PM'), (req, res) => {

//   const { user_id } = req.params

//   User
//     .findByIdAndUpdate(user_id, { role: 'DEV' })
//     .then(() => res.redirect('/user/list'))
//     .catch(err => console.log(err))

// })

// router.post('/details/:user_id/TA', isLoggedIn, checkRoles('PM'), (req, res) => {

//   const { user_id } = req.params

//   User
//     .findByIdAndUpdate(user_id, { role: 'TA' })
//     .then(() => res.redirect('/user/list'))
//     .catch(err => console.log(err))

// })








// // Edit my user profile

// router.get('/details/:user_id/edit-me', isLoggedIn, (req, res, next) => {

//   const { user_id } = req.params
//   if (req.session.currentUser._id === user_id) {
//     User
//       .findById(user_id)
//       .then(user => {
//         res.render('user/edit-me', user)
//       })
//       .catch(err => console.log(err))
//   } else {
//     res.redirect('/user/list')
//   }

// })



// router.post('/details/:user_id/edit-me', isLoggedIn, (req, res) => {

//   const { username, email, profileImg, description } = req.body
//   const { user_id } = req.params

//   if (req.session.currentUser._id === user_id) {
//     User
//       .findByIdAndUpdate(user_id, { username, email, profileImg, description })
//       .then(() => res.redirect(`/user/list`))
//       .catch(err => console.log(err))
//   } else {
//     res.redirect('/user/list')
//   }

// })
module.exports = router