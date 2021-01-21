const cityForm = document.querySelector('form')
const card = document.querySelector('.card')
const details = document.querySelector('.details')
const time = document.querySelector('img.time')
const icon = document.querySelector('.icon img')



const updateUI = data => {

    console.log(data);
    // const cityDets = data.cityDets
    // const weather = data.weather

    //same as above comment but with destructure properties
    const {cityDets, weather} = data

    // update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}, ${cityDets.Country.ID}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="my-3 region">${cityDets.Region.EnglishName}</div>
        <p class="my-3">Geo location:- ${cityDets.GeoPosition.Latitude} , ${cityDets.GeoPosition.Longitude}</p>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `
    // update the night/day & icons 
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc)

    //Ternary Operator doing exact same as below comment
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg'
    // if(weather.IsDayTime) {
    //     timeSrc = 'img/day.svg'
    // } else {
    //     timeSrc = 'img/night.svg'
    // }
    time.setAttribute('src', timeSrc)


    //remove d-none class if present 
    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none')
    }
}

const updateCity = async city => {
    //get city details
    const cityDets = await getCity(city)
    //get weather
    const weather = await getWeather(cityDets.Key)

    return {cityDets, weather}
}

cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault()

    //get city text value
    const city = cityForm.city.value.trim()
    cityForm.reset()

    //update the UI with new city
    updateCity(city)
        .then(data => {
            updateUI(data)
        })
        .catch(err => console.log(err))
})
