const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=59a423726d127df5066d9009f7c21561&query=' + latitude + ',' + longitude

    request({url, json:true}, (error, { body }) => {
        if(error) {
            callback('Unable to Find Location', undefined);
        } else if(body.error) {
            callback('Unable connect to Weather Service', undefined)
        } else {
            callback(undefined, {
                weather_description : body.current.weather_descriptions[0], 
                temperature : body.current.temperature + '°C'
            })
        }
    })
}

module.exports = forecast