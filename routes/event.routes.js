const router = require("express").Router();
const ticketmasterApi = require('./../sevices/events-api.service')
const api = new ticketmasterApi()

//List
router.get("/", (req, res, next) => {

    api
        .getAllEvents()
        .then(response => {
            res.render('events/events-list', { event: response.data._embedded.events })
        })
        .catch(err => next(err))
})

router.get("/:genre", (req, res, next) => {

    const { genre } = req.params
    console.log(genre)
    api
        .getAllEvents()
        .then(response => {
            //console.log(response.data._embedded.events)
            const result = response.data._embedded.events.filter(event => {
                return event.classifications[0].genre.name === genre
            })
            //console.log({ result })
            res.render('events/rock-events', { result })
        })
        .catch(err => next(err))
})

module.exports = router;