console.log('Heallo OOOOOOOOOOO')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input');

const message_1 = document.querySelector('#message_1')
const message_2 = document.querySelector('#message_2')

const weather_icon = document.querySelector('#weather_icon')

const place = document.querySelector('#place')
const country = document.querySelector('#country')
const region = document.querySelector('#region')
const latitude = document.querySelector('#lat')
const longitude = document.querySelector('#lon')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    message_1.textContent = 'Loading...'
    message_2.textContent = ''

    fetch('weather?location='+ location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            message_1.textContent = 'Check your Input'
            message_2.textContent = data.error
        }
        else {
            message_1.textContent = data.searched_address
            message_2.textContent = data.forecast

            weather_icon.src = data.icon

            place.textContent = `Place: ${data.place}`
            country.textContent = `Country: ${data.country}`
            latitude.textContent = `Latitude: ${data.latitude}`
            longitude.textContent = `Longitude: ${data.longitude}`
            region.textContent = `Region: ${data.region}`
            
        }
        
    })
})
})