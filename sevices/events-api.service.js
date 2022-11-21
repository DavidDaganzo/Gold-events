const axios = require('axios')


class ApiService {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://app.ticketmaster.com/discovery/v2/'
        })
    }
    //List
    getAllEvents = () => {
        return this.axiosApp.get('/events?apikey=NDVfD3G1CGgccK1MAGeBcFPYlL9BGRC3&countryCode=ES&classificationName=music')

    }

}

module.exports = ApiService