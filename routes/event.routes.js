const router = require("express").Router();
const axios = require("axios");

const ticketmasterApi = require('./../sevices/events-api.service')
const api = new ticketmasterApi()

//List
router.get("/events", (req, res, next) => {

    api
        .getAllEvents()
        .then(response => {
            const valorDePrueba = response.data._embedded.events
            console.log(valorDePrueba)
            res.render('events/events-list', { event: valorDePrueba })

        })


        .catch(err => console.log(err))

})

module.exports = router;