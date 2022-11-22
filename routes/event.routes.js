const router = require("express").Router();
const axios = require("axios");
const ticketmasterApi = require('./../sevices/events-api.service')
const api = new ticketmasterApi()

//List
router.get("/events", (req, res, next) => {

    api
        .getAllEvents()
        .then(response => {
            res.render('events/events-list', { event: response.data._embedded.events })
        })
        .catch(err => console.log(err))
})

router.get("/events/:genre", (req, res, next) => {

    api
        .getAllEvents()
        .then(response => {
            console.log(response.data._embedded.events)
            const result = response.data._embedded.events.filter(evento => {
                return evento.classifications[0].genre.name === "Rock"
            })
            console.log({ result })
            res.render('events/rock-events', { result })
        })
        .catch(err => console.log(err))
})

module.exports = router;