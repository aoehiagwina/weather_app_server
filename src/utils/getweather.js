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
            let weather_description = body.current.weather_descriptions[0];
            let weather_icon = body.current.weather_icons[0];
            let humidity = body.current.humidity

            let place = body.location.name;
            let country = body.location.country;
            let lat = body.location.lat;
            let lon = body.location.lon;
            let region = body.location.region
            const update = `This is The current tmeprature is ${temp} degrees, however, it feels like ${feels_like} degrees. It is ${weather_description} and the humidity is ${humidity}%.`;

            const data = {
                place,
                country,
                lat,
                lon,
                region,
                weather_icon,
                message: update
            }
            callback(undefined, data);
        }
    })
}

module.exports = getWeather_details