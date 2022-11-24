const router = require('express').Router()
const Event = require('../models/Event.model')
const { isLoggedIn, checkRoles } = require('./../middleware/route-guard')
const fileUploader = require('../config/cloudinary.config')

//Create
router.get('/crear-evento', isLoggedIn, checkRoles('ADMIN', 'EDITOR'), (req, res, next) => {
    res.render('our-events/create-event')
})

router.post("/crear-evento", isLoggedIn, checkRoles('ADMIN', 'EDITOR'), fileUploader.single('eventImg'), (req, res, next) => {

    const { eventName, category, eventUrl, date, price, city, description } = req.body
    const { path: eventImg } = req.file
    const createdBy = req.session.currentUser._id


    Event
        .create({ eventName, category, eventImg, eventUrl, date, price, createdBy, city, description })
        .then(() => res.redirect("/nuestros-eventos/lista-eventos"))
        .catch(err => next(err))
})

//List
router.get("/nuestros-eventos/lista-eventos", (req, res, next) => {

    Event
        .find()
        .select({ eventName: 1, eventUrl: 1, eventImg: 1 })
        .then(events => res.render('our-events/events-list', { events }))
        .catch(err => next(err))
})

// Details
router.get('/detalles-evento/:event_id', isLoggedIn, (req, res) => {

    const { event_id } = req.params

    Event
        .findById(event_id)
        .populate('createdBy')
        .then(event => {
            res.render('our-events/event-details', {
                event,
                isADMIN: req.session.currentUser.role === 'ADMIN',
                isEDITOR: req.session.currentUser.role === 'EDITOR'
            })
        })
        .catch(err => next(err))
})

// Edit
router.get("/detalles-evento/:event_id/editar", isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {

    const { event_id } = req.params

    Event
        .findById(event_id)
        .then(event => res.render("our-events/edit-event", { event }))
        .catch(err => next(err))
})

router.post("/detalles-evento/:event_id/editar", isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {

    const { event_id } = req.params
    const { eventName, category, eventImg, eventUrl, date, price, createdBy, city, description } = req.body

    Event
        .findByIdAndUpdate(event_id, { eventName, category, eventImg, eventUrl, date, price, createdBy, city, description })
        .then(() => res.redirect('/nuestros-eventos/lista-eventos'))
        .catch(err => next(err))
})

// Delete 
router.post('/detalles-evento/:event_id/eliminar/', isLoggedIn, checkRoles('ADMIN'), (req, res) => {

    const { event_id } = req.params

    Event
        .findByIdAndDelete(event_id)
        .then(() => res.redirect('/nuestros-eventos/lista-eventos'))
        .catch(err => next(err))
})

module.exports = router

