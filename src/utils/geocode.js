const request = require('postman-request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + decodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiaWFubG9tYnUiLCJhIjoiY2tlZHlsYTh4MHg5cjMzc2IzY2Fra3IybSJ9.xBQfS5GUgbD8Xj5BEf92zg'

    request({ url, json: true}, (error, { body } = {undefined}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name,
            })
        }
    })
}


module.exports = geocode