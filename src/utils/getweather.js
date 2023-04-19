const request = require('postman-request');
require('dotenv').config();

const getWeather_details = (location, callback) => {
    const link = 'http://api.weatherstack.com/current';
    const apiKey = process.env.WEATHER_API_KEY;
    const access = 'access_key='+ apiKey;
    const query = 'query='+ location
    const unit = 'units=m'

    const url = `${link}?${access}&${query}&${unit}`

    request({url, json:true}, (error, {body})=> {
        if (error) {
            callback(error, undefined);
        } 
        else if (body.error) {
            let error_message = body.error.info
            error_message = `${error_message} That specify the location you are searching for.`;
            callback(error_message, undefined);
        }
        else {
            let feels_like = body.current.feelslike;
            let temp = body.current.temperature;
            let weather_description = body.current.weather_descriptions;
            const update = `The current tmeprature is ${temp} degrees. However, it feels like ${feels_like} degrees, although its a bit ${weather_description[0]}.`;
            callback(undefined, update);
        }
    })
}

module.exports = getWeather_details