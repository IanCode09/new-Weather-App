const request = require('postman-request')
const geocode  = require('./geocode')
const forecast = require('./forecast')

/*
const url = 'http://api.weatherstack.com/current?access_key=59a423726d127df5066d9009f7c21561&query=-6.21462,106.84513'
request({url, json:true}, (error, response) => {
    if(error) {
        console.log('Unable to Find Location');
    } else if(response.body.error) {
        console.log('Unable connect to Weather Service')
    } else {
        console.log(response.body.current.weather_descriptions[0]);
        console.log(response.body.current.temperature + '°C');
    }
})
*/

/*
const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/wkwkwwkk.json?access_token=pk.eyJ1IjoiaWFubG9tYnUiLCJhIjoiY2tlZHlsYTh4MHg5cjMzc2IzY2Fra3IybSJ9.xBQfS5GUgbD8Xj5BEf92zg"
request({url: geocodeURL, json:true}, (error, response) => {
     if(error) {
         console.log('Unable to connect to weather service!');
     } else if(response.body.features.length === 0) {
         console.log('Unable to find location');
     } else {
        const latitude = response.body.features[0].center[0];
        const longitude = response.body.features[0].center[1];
        console.log('latitude : ' + latitude);
        console.log('longitude : ' + longitude);
     }   
})
*/

const address = process.argv[2]

if(!address) {
    console.log('Please provide an address');
} else {
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return console.log(error);
        } else {
            console.log(location);
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return console.log(error);
            }
            console.log(forecastData);
        })
    }) 
}