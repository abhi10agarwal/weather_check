const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('../src/utils/geoCode')
const forecast = require('../src/utils/forecast')

const app = express()

const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Abhi'
	})
})
app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Abhi'
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({ error: 'Please provide address' })
	}
	console.log(req.query)
	let actualAdd = req.query.address
	geoCode(actualAdd, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error })
		}
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error })
			}
			res.send({
				latitude,
				longitude,
				location,
				forecastData
			})
		})
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Abhi',
		errormessage: 'Page not found'
	})
})

app.listen(3000, () => {
	console.log('Server started')
})
