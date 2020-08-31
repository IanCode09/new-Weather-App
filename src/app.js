const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

app.listen(port, () => {
    console.log(`Weather app listening at http://localhost:${port}`);   
})


const viewsPath = path.join(__dirname, '../templates/views');
const publicDirectoryPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'ianCode'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
           error: 'Please provide an address'
       })
   }

   geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
       if(error) {
           return res.send({ error })
       }

       forecast(latitude, longitude, (error, {weather_description, temperature, time} = {}  ) => {
           if(error) {
               return res.send({ error });
           }
        //    console.log(location);
        //    console.log(forecastData);
           res.send({
               location: location,
               address: req.query.address,
               weather_description: weather_description,
               temperature: temperature,
               time:time
           })
       })
   })

})

