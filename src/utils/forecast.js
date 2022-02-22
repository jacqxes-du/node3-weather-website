const chalk = require("chalk")
const request = require("request")

const forecast = (latitude, longitude, callback) => {
    // const url = 'http://api.weatherstack.com/current?access_key=a3c78029dd53f21b7e778486ed6959e4&query=' + longitude + ',' + latitude +'&units=m'
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + longitude + '&lon=' + latitude + '&appid=154305757025d6e41d837d2eb263345c&units=metric'


    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Could not connect to the weather service.', undefined)
        }else if(body.error){
            callback('Could not find location.', undefined)            
        }else{
            // callback(undefined, {
            //     Location: response.body.name,
            //     Temperature: response.body.main.temp + ' degrees Celcius',
            //     Humidity: response.body.main.humidity + '%',
            //     Url: url
            // }) 
            callback(undefined, " It is currently " + body.main.temp + " degrees Celsius with " + body.main.humidity + "% humidity.") + "\nLink: " + url          
        }
    })
}

module.exports = forecast