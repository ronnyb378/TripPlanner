const http = require('http')
const express = require('express')
const trips = require('./model/trips');
const { title } = require('process');

const hostname = '127.0.0.1';
const port = 3000;

let id = 3

const app = express();
app.set('view engine', 'ejs')
app.set('views', 'views')

const server = http.createServer(app)

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req,res) => {
    res.render('home', {
        title: "Trips",
        trips: trips,
    })
})

app.get('/new', (req,res) => {
    res.render('new', {
        title: "New Trip"
    })
})

app.post('/new', (req,res) => {
    const newTrip = {
        id: id++,
        title: req.body.city_location,
        departure_date: req.body.departure,
        return_date: req.body.return
    }
    trips.push(newTrip)
    // console.log(newTrip)
    res.redirect('/')
})

server.listen(port, hostname, () => {
    console.log(`Server running: http://${hostname}:${port}`)
})