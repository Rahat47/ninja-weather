const key = '4ZFYU2QGCYPEIdzUawgfSfgAz4NrtcT9'

//get weather info
const getWeather = async (id) => {
    //setting up base URL
    const base = 'https://dataservice.accuweather.com/currentconditions/v1/'
    const query = `${id}?apikey=${key}`


    //sending request parsing data and returning
    const response = await fetch(base + query)
    const data = await response.json()
    return data[0]
}


//get city information
const getCity = async (city) => {
    //setting up base URL
    const base = 'https://dataservice.accuweather.com/locations/v1/cities/search'
    const query = `?apikey=${key}&q=${city}`

    //sending request parsing data and returning
    const response = await fetch(base + query)
    const data = await response.json()
    return data[0]
}

