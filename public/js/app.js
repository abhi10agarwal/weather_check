const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const image1 = document.querySelector('#image1')
image1.src = ''
image1.alt = ''

weatherForm.addEventListener('submit', e => {
	e.preventDefault()
	const location = search.value

	messageOne.textContent = 'Loading..'
	messageTwo.textContent = ''
	fetch('/weather?address=' + location).then(response => {
		response.json().then(data => {
			if (data.error) {
				messageOne.textContent = data.error
			} else {
				messageOne.textContent = data.location
				messageTwo.textContent =
					'Temperature is around ' +
					data.forecastData.temp +
					' feelslike ' +
					data.forecastData.feelslike +
					' and ' +
					data.forecastData.description
				image1.src = data.forecastData.weather_icon
			}
		})
	})
})
