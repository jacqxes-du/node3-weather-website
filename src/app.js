const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { title } = require('process')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Jacques Prieur du Plessis'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jacques Prieur du Plessis'
    })
})

app.get('/help/', (req, res) => {
    res.render('help',{
        title: 'Help Page',
        helpArticleTitle: 'First Help Article',
        helpText: 'This paragraph will contain the help text.',
        name: 'Jacques Prieur du Plessis'
    })
})

//create weather page
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })



    // res.send({
    //     forecast: '20 Degrees Celcius',
    //     location: 'Springs',
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: 'Error 404 Help Article does not exist!',
        name: 'Jacques Prieur du Plessis',
        helpText: 'The help article you are looking for could not be found.'
    })
})

app.get('/products', (req, res) => {
    // if(!req.query.search){
    //     return res.send({
    //         error: 'You must provide a search term'
    //     })
    // }

    console.log(req.query.rating);
    // console.log(req.query.search);
    // res.send({
    //     products: []
    // })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: 'Error 404 Page does not exist!',
        name: 'Jacques Prieur du Plessis',
        helpText: 'The page you are looking for could not be found.'
    })
})


//start server
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})