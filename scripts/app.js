const cityForm = document.querySelector('form')
const card = document.querySelector('.card')
const details = document.querySelector('.details')
const time = document.querySelector('img.time')
const icon = document.querySelector('.icon img')
const forecast = new Forecast()


const updateUI = data => {
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
    time.setAttribute('src', timeSrc)


    //remove d-none class if present 
    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none')
    }
}

cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault()

    //get city text value
    const city = cityForm.city.value.trim()

    //special case for wakanda
    if (city.toLowerCase() == 'wakanda'){
        card.classList.remove('d-none')
        details.innerHTML = `<h1> Wakanda Foeva </h1>`
        time.setAttribute('src', 'img/wakanda.jpg')
        cityForm.reset()
        return
    } 
    cityForm.reset()

    //update the UI with new city
    forecast.updateCity(city)
        .then(data => {
            updateUI(data)
        })
        .catch(err => console.log(err))

    //set local storage
    localStorage.setItem('city', city)
})

if(localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
        .then( data => updateUI(data))
        .catch(err => console.log(err))
}