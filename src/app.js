const path = require('path')
const express = require('express');
const hbs = require('hbs');
//importing my getweather files from utils
const getWeather_details = require('./utils/getweather');

//Define paths
const publicFolderPath = path.join(__dirname, '../public')
// I create a customize path for views
const viewsPath = path.join(__dirname, '../template/views');
// I create a customize path for partials
const partialsPath = path.join(__dirname, '../template/partials');


const app = express();
const PORT = process.env.PORT || 3000;

// I implemented handle bars
app.set('view engine', 'hbs')
// I am setting the new path here
app.set('views', viewsPath);
// Implement partials using handlebars
hbs.registerPartials(partialsPath);





// Setup static direcotry to server
app.use(express.static(publicFolderPath));

// I cresated the name parameter
const name = 'Augustine'
// I am using render to show my views of the home page using handle bars
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name
    });
})

// I am using render to show my views of the about page using handle bars
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name
    })
})


// I am using render to show my views of the about page using handle bars
const help_message = 'This is the help section, please ask your questions'
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Welcome to our help page',
        note: help_message,
        name
    })
})

// app.get('/weather', (req, res) => {
//     res.send([
//         {
//             weather: 'cloudy',
//             location: 'Liverpool'
//         }
//     ])
// })

//setting an extended help error page
app.get('/help/*', (req, res) => {
    res.render('errorPage', {
        title: '404',
        error_message:'This page for help extention not found'
    })
})
// I can set a default parameter for any variable, so the function can run even when a location is not provided
app.get('/weather', (req, res) => {
    let location = req.query.location
    
    if (!location) {
        return res.send({
            error: 'Please add a location value'
        })
    }

    getWeather_details(location, (error, data) => {
        if (error) {
            return res.send({
                error
            })
        } 

        res.send({
            forecast: data,
            location: location
        })
    })

})


// An error page for any request that doesn't match the url above
app.get('*', (req, res) => {
    res.render('errorPage', {
        title: '404',
        error_message: 'This is an error page'
    })
})


app.listen(PORT, () => {
    console.log('Listening at port ' + PORT)
})