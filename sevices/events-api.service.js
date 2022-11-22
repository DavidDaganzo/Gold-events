const axios = require('axios')
const key = process.env.APIKEY
class ApiService {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://app.ticketmaster.com/discovery/v2/'
        })
    }

    //List
    getAllEvents = () => {
        return this.axiosApp.get(`/events?apikey=${key}&countryCode=ES`)

    }

    // getRockEvents = () => {
    //     return this.axiosApp.get('/classifications/genres/KnvZfZ7vAeA?apikey=NDVfD3G1CGgccK1MAGeBcFPYlL9BGRC3&countryCode=ES')
    // }
}

module.exports = ApiService