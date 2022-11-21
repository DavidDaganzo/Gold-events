const axios = require('axios')


class ApiService {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://app.ticketmaster.com/discovery/v2/'
        })
    }
    //List
    getAllEvents = () => {
        return this.axiosApp.get('/events?apikey=mFQPxtqEblvuddFJONKnXwmIICVMgMoh&countryCode=ES')

    }

}

module.exports = ApiService