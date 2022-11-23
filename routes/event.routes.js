const router = require("express").Router();
const ticketmasterApi = require('./../sevices/events-api.service')
const api = new ticketmasterApi()
const Event = require('../models/Event.model')

//List
router.get("/", (req, res, next) => {

    api
        .getAllEvents()
        .then(response => {
            const allEvents = response.data._embedded.events
            const filtedArr = allEvents.map(event => {
                return {
                    name: event.name,
                    url: event.url,
                    images: event.images[0].url,
                    location: event._embedded.venues[0].name
                }
            })
            res.render('events/events-list', { event: allEvents })
        })
        .catch(err => next(err))
})

router.get("/:genre", (req, res, next) => {

    const { genre } = req.params

    let apiEvents = undefined
    let ownEvents = undefined

    api
        .getAllEvents()
        .then(response => {
            const result = response.data._embedded.events.filter(event => {
                return event.classifications[0].genre.name === genre
            })
            apiEvents = result

            Event
                .find()
                .select({ eventName: 1, eventUrl: 1, eventImg: 1 })
                .then(events => {
                    ownEvents = events
                    res.render('events/rock-events', { ownEvents, apiEvents })
                })
                .catch(err => next(err))

        })
        .catch(err => next(err))
})

router.get("/:genre/:subgenre", (req, res, next) => {

    const { genre, subgenre } = req.params

    let apiEvents = undefined
    let ownEvents = undefined

    api
        .getAllEvents()
        .then(response => {
            const result = response.data._embedded.events.filter(event => {
                return event.classifications[0].genre.name === `${genre}/${subgenre}`
            })
            apiEvents = result

            Event
                .find()
                .select({ eventName: 1, eventUrl: 1, eventImg: 1 })
                .then(events => {
                    ownEvents = events
                    res.render('events/rock-events', { ownEvents, apiEvents })
                })
                .catch(err => next(err))

        })
        .catch(err => next(err))


})






module.exports = router;