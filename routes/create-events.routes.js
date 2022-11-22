const router = require('express').Router()
const Event = require('../models/Event.model')
const { isLoggedIn, checkRoles } = require('./../middleware/route-guard')


//Create
router.get('/event-create', (req, res, next) => {
    res.render('our-events/create-event')
})

router.post("/event-create", (req, res, next) => {

    const { eventName, category, eventImg, eventUrl, date, price, createdBy, city, description } = req.body

    Event
        .createEvent({ eventName, category, eventImg, eventUrl, date, price, createdBy, city, description })
        .then(() => res.redirect("/our-events/events-list"))
        .catch(err => console.log(err))
})

//List
router.get("/our-events/events-list", (req, res, next) => {

    Event
        .getAllEvents()
        .then(response => res.render('/our-events/events-list', { events: response.data }))
        .catch(err => console.log(err))

})

// Edit
router.get("/our-events/:id/edit", (req, res, next) => {

    const { id: event_id } = req.params

    Event
        .getOneEvent(event_id)
        .then(response => res.render("our-events/edit-event", { events: response.data }))
        .catch(err => console.log(err))
})

// Edit
router.post("/our-events/:id/edit", (req, res, next) => {

    const { id: event_id } = req.params
    const { eventName, category, eventImg, eventUrl, date, price, createdBy, city, description } = req.body

    Event
        .editEvent(event_id, { eventName, category, eventImg, eventUrl, date, price, createdBy, city, description })
        .then(() => res.redirect('/our-events/events-list'))
        .catch(err => console.log(err))
})






module.exports = router

