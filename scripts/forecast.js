class Forecast {
    constructor() {
        this.key = 'KNVKqdg8dJyG3WRXFqw8NndcASZLtAm0'
        this.weatherURI = 'https://dataservice.accuweather.com/currentconditions/v1/'
        this.cityURI = 'https://dataservice.accuweather.com/locations/v1/cities/search'
    }
    async updateCity(city) {
        //get city details
        const cityDets = await this.getCity(city)
        //get weather
        const weather = await this.getWeather(cityDets.Key)

        return { cityDets, weather }
    }

    async getCity(city) {
        const query = `?apikey=${this.key}&q=${city}`

        //sending request parsing data and returning
        const response = await fetch(this.cityURI + query)
        const data = await response.json()
        return data[0]
    }
    async getWeather(id) {

        const query = `${id}?apikey=${this.key}`


        //sending request parsing data and returning
        const response = await fetch(this.weatherURI + query)
        const data = await response.json()
        return data[0]
    }
}
