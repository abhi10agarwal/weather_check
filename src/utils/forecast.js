const request = require('request')
const forecast = (lat, long, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=af7e9dd922b0771839ccec85b8fcb019&query=' +
		lat +
		',' +
		long +
		'&units=m'
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect location Services!', undefined)
		} else if (body.error) {
			callback('Unable to find location!, try again', undefined)
		} else {
			callback(undefined, {
				temp: body.current.temperature,
				feelslike: body.current.feelslike,
				description: body.current.weather_descriptions[0],
				weather_icon: body.current.weather_icons[0]
			})
		}
	})
}

module.exports = forecast
