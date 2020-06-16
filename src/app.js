const path = require('path')
const express = require('express')
const hbs = require('hbs')
//const casePerPlace = require('./utils/geocode')

const https = require('https')
const url = 'https://api.covid19api.com/summary'

const app = express()

const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs') // Handblebars
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static directory to serve
app.use(express.static(publicDirectoryPath))

const request = https.request(url, (response)=>{
    let data = ''

    response.on('data', (chunk)=>{
        data = data + chunk.toString()
        
    })

    response.on('end', ()=>{
        const body = JSON.parse(data)
        //console.log(body.Global)
        app.get('', (req, res) => {
            res.render('index', {
                title: 'FullWin Covid-19 Tracker ',
                name: 'Philippine Fullwin Group of Companies Inc. IT Department',
                newconfirmed: body.Global.NewConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                totalConfirmed: body.Global.TotalConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                newDeaths: body.Global.NewDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                totalDeaths: body.Global.TotalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                newRecoveries: body.Global.NewRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                totalRecovered: body.Global.TotalRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                totalActiveCase: (body.Global.TotalConfirmed - body.Global.TotalDeaths - body.Global.TotalRecovered).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                confirmedPercent: (body.Global.TotalConfirmed / body.Global.TotalConfirmed) * 100,
                deathsPercent: (body.Global.TotalDeaths / body.Global.TotalConfirmed) * 100,
                recoveryPercent:(body.Global.TotalRecovered / body.Global.TotalConfirmed) * 100
            })
        }) 

        app.get('/philippines', (req, res) => {
            res.render('ph',{
                title: 'FullWin Covid-19 Tracker ',
                name: 'Philippine Fullwin Group of Companies Inc. IT Department',
                newconfirmed: body.Countries[132].NewConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                totalConfirmed: body.Countries[132].TotalConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                newDeaths: body.Countries[132].NewDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                totalDeaths: body.Countries[132].TotalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                newRecoveries: body.Countries[132].NewRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                totalRecovered: body.Countries[132].TotalRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                totalActiveCase: (body.Countries[132].TotalConfirmed - body.Countries[132].TotalDeaths - body.Countries[132].TotalRecovered).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                dateUpdate: body.Countries[132].Date,
                confirmedPercent: (body.Countries[132].TotalConfirmed / body.Countries[132].TotalConfirmed) * 100,
                deathsPercent: (body.Countries[132].TotalDeaths / body.Countries[132].TotalConfirmed) * 100,
                recoveryPercent:(body.Countries[132].TotalRecovered / body.Countries[132].TotalConfirmed) * 100
            })
        })
    })

})
request.on('error', (error) =>{
    console.log('An Error: ', error)
})
request.end()

app.listen(port, ()=>{
    console.log('Server is running on port ' + port)
})

