const request = require("request")

const forecast = (latitude, longitude, callback) => {
    // const url = 'http://api.weatherstack.com/current?access_key=a3c78029dd53f21b7e778486ed6959e4&query=' + longitude + ',' + latitude +'&units=m'
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + longitude + '&lon=' + latitude + '&appid=154305757025d6e41d837d2eb263345c&units=metric'


    request({ url, json: true}, (error, { body }) => {
        console.log(body);
        if(error){
            callback('Could not connect to the weather service.', undefined)
        }else if(body.error){
            callback('Could not find location.', undefined)            
        }else{
            callback(undefined, "The temperature will range from "  +  body.main.temp_min + "°C to "  + body.main.temp_max +  "°C. It is currently " + body.main.temp + "°C (feels like " + body.main.feels_like + "°C) with " + body.main.humidity + "% humidity and " + body.wind.speed + "km/h wind.") + "\nLink: " + url          
        }
    })
}


module.exports = forecast