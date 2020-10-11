const input = document.querySelector('#input')
const weatherInfo = document.querySelector('.distils')
// const weatherIcon = document.querySelector('.weather-info>img')
// const temperature = document.querySelector('.weather-number>h1')
// const date = document.querySelector('#date')
// const place = document.querySelector('#place')
const timeImg = document.querySelector('#time-img>img')
const recentSearched = document.querySelector('.recent-search')

const key = "7b4f5ff562788cff6754ecec1fbc774c"
const proxy = 'https://cors-anywhere.herokuapp.com/'
const baseUrl = `${proxy}api.openweathermap.org/data/2.5/weather?`
const defaultCity = 'dhaka,bd'

const kelvinToCelsius = kelvin => Math.round(kelvin - 273.15)

const getDate = () => {
    const date = new Date()
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = days[date.getDay()];
    const day = date.getDate()
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];
    const year = date.getFullYear()
    const newDate = `${today}, ${day} ${month} ${year}`
    return newDate.toUpperCase()
}

const timeImgSrc = () => {
    const date = new Date()
    const time = 15

    if (time < 10) {
        return 'morning.jpg'
    } else if (time < 16) {
        return 'morning.jpg'
    } else {
        return 'night.jpg'
    }
}
timeImg.setAttribute('src', `/img/${timeImgSrc()}`)

const displayWeather = (weatherDistils) => {
    weatherInfo.innerHTML = `
                                <div id="current-weather-info">
                                    <div class="weather-info">
                                        <img id="weatherIcon" src=${weatherDistils.icon} alt="">
                                        <h4>${weatherDistils.weather}</h4>
                                    </div>
                                    <samp class="line"></samp>
                                    <div class="weather-number">
                                        <h1>${weatherDistils.temp}</h1>
                                        <samp class="degree ">°</samp>
                                    </div>
                                </div>

                                <h3 id="date">${getDate()}</h3>
                                <h4 id="place">${weatherDistils.city}</h4>
                            `
    console.log(weatherDistils.icon);
}

const searchedHistoryList = (data) => {
    recentSearched.innerHTML +=
        `
            <div class="search-item">
                <div class="left-side">
                <img id="weatherIcon" src=${data.icon} alt="">
                    <p>${data.weather}</p>
                </div>
                <samp class="line2"></samp>
                <div class="right-side">
                    <h6>${data.city}</h6>
                    <div>
                        <h3>${data.temp}</h3>
                        <samp class="">°</samp>
                    </div>
                </div>
            </div>
`
}


const weatherDistilsObj = data => {
    let weatherDistils = {
        weather: data.weather[0].main,
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        temp: kelvinToCelsius(data.main.temp),
        city: data.name

    }
    displayWeather(weatherDistils)
    searchedHistoryList(weatherDistils)

    const previousSearched = JSON.parse(localStorage.getItem('recentSearched') || "[]");
    previousSearched.push(weatherDistils)
    localStorage.setItem('recentSearched', JSON.stringify(previousSearched))
}

const getWeather = (defaultCity, long, lat) => {
    weatherInfo.innerHTML = `<h3 style={color:lighterage}>Loading...</h3>`
    let url = !defaultCity ? `${baseUrl}lat=${lat}&lon=${long}&appid=${key}` : `${baseUrl}q=${defaultCity}&appid=${key}`
    fetch(url)
        .then(res => res.json())
        .then(data => weatherDistilsObj(data))
    // .catch(e => weatherInfo.innerHTML = `<h3>sorry,Place try again</h3>`)
    input.value = ''
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const { longitude, latitude } = position.coords
        getWeather(null, longitude, latitude)
    }, error => {
        getWeather(defaultCity)
    })
}


function handle(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        getWeather(e.target.value)
    }
}
input.addEventListener('blur', getWeather(input.value))



window.onload = (event) => {
    const previousSearched = JSON.parse(localStorage.getItem('recentSearched') || "[]");
    previousSearched.map(data => {
        searchedHistoryList(data)
    })
};




