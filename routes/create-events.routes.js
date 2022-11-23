const router = require('express').Router()
const Event = require('../models/Event.model')
const { isLoggedIn, checkRoles } = require('./../middleware/route-guard')
const uploader = require('../config/cloudinary.config')


//Create
router.get('/event-create', isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {
    res.render('our-events/create-event')
})

router.post("/event-create", uploader.single('eventImg'), isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {

    const { eventName, category, eventUrl, date, price, createdBy, city, description } = req.body

    Event
        .create({ eventName, category, eventImg: req.file.path, eventUrl, date, price, createdBy, city, description })
        .then(() => res.redirect("/our-events/events-list"))
        .catch(err => console.log(err))
})

//List
router.get("/our-events/events-list", (req, res, next) => {

    Event
        .find()
        .select({ _id: 1, eventName: 1, eventUrl: 1, eventImg: 1 })
        .then(event => res.render('our-events/events-list', { event }))
        .catch(err => console.log(err))

})

// Details
router.get('/event-details/:event_id', isLoggedIn, (req, res) => {

    const { event_id } = req.params

    Event
        .findById(event_id)
        .then(event => {
            res.render('our-events/event-details', {
                event,
                isADMIN: req.session.currentUser.role === 'ADMIN',
                isEDITOR: req.session.currentUser.role === 'EDITOR'
            })
        })
        .catch(err => console.log(err))
})

// Edit
router.get("/event-details/:event_id/edit", isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {

    const { event_id } = req.params

    Event
        .findById(event_id)
        .then(event => res.render("our-events/edit-event", { event }))
        .catch(err => console.log(err))
})

router.post("/event-details/:event_id/edit", isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {

    const { event_id } = req.params
    const { eventName, category, eventImg, eventUrl, date, price, createdBy, city, description } = req.body

    Event
        .findByIdAndUpdate(event_id, { eventName, category, eventImg, eventUrl, date, price, createdBy, city, description })
        .then(() => res.redirect('/our-events/events-list'))
        .catch(err => console.log(err))
})

// Delete 
router.post('/event-details/:event_id/delete/', isLoggedIn, checkRoles('ADMIN'), (req, res) => {

    const { event_id } = req.params

    Event
        .findByIdAndDelete(event_id)
        .then(() => res.redirect('/our-events/events-list'))
        .catch(err => console.log(err))
})






module.exports = router

