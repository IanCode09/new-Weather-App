// const url = 'http://localhost:3000/weather?address='

/*
fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error);
        } else {
            console.log(data);
        }
        
    })
})
*/

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const weather = document.querySelector('#weather')
const address = document.querySelector('#location')
const temperature = document.querySelector('#temperature')
const time = document.querySelector('#time')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const url = '/weather?address='
    const location = search.value

    weather.textContent = 'Loading...'
    address.textContent = ''
    temperature.textContent = ''
    time.textContent = ''

    fetch(url + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                // console.log(data.error);
                weather.textContent = data.error
            } else {
                temperature.textContent = data.temperature
                address.textContent = data.location
                weather.textContent = data.weather_description
                time.textContent = data.time
                console.log(data);
            }
        })
    })

})

