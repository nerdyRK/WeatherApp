  // 4e1e01ebf0c0b0501d1e2342a5d14429
        // https://api.openweathermap.org/data/2.5/weather?q=poland&appid=4e1e01ebf0c0b0501d1e2342a5d14429
        let select = (element => document.querySelector(element)) //made function coz querySelector became repetitive
        let input = select('input')
        let btn = select('.btn')
        let city = select('.city')
        let desc = select('.desc')
        let temp = select('.tempAvg')
        let failure = select('.below')
        let body = select('body')
        let country = select('.country')
        let time = select('.time')
        // console.log(cityList);
        let clock = setInterval(t, 1000)

        let cityList = select('#cityList')

        function t() {
            let dat = new Date()
            let curr = dat.toLocaleString()
            time.innerHTML = curr
        }



      // Function to display the weather data
function display(data) {
    if (data.cod == '200') {
        city.textContent = `${data.name}, `;
        country.textContent = ` ${data.sys.country}`;
        desc.textContent = data.weather[0].description;
        temp.innerHTML = Math.round(data.main.temp - 273.15) + '&deg';
        changingIcon(data.weather[0].description);
        input.value = '';
        failure.textContent = '';
    } else {
        failure.textContent = 'No city Found';
    }
}

// Function to fetch weather data
async function getData(cityName) {
    let res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4e1e01ebf0c0b0501d1e2342a5d14429`
    );
    let data = await res.json();
    console.log(data);
    display(data);
    return data
}

// Set the default city name to Bhagwada City
const defaultCity = 'phagwara';

// Call getData initially with the default city name
getData(defaultCity);



//Function to populate the datalist with city names from local storage
function populateCityList() {
    const cityList = document.getElementById('cityList');
    const storedCities = JSON.parse(localStorage.getItem('cities')) || [];

    // Clear existing options
    cityList.innerHTML = '';

    // Add valid city names to the datalist
    storedCities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        cityList.appendChild(option);
    });
}

// Function to save a city name to local storage
function saveCityToLocalStorage(cityName) {
    const storedCities = JSON.parse(localStorage.getItem('cities')) || [];
    
    // Check if the city name is valid by fetching weather data (you can modify this logic)
    getData(cityName).then(data => {
        if (data.cod == '200') {
            // City name is valid, save it to local storage
            storedCities.push(cityName);
            localStorage.setItem('cities', JSON.stringify(storedCities));
            
            // Repopulate the datalist
            populateCityList();
        }
    });
}

// Call populateCityList initially
populateCityList();









// Add event listener to the button
btn.addEventListener('click', (e) => {
    e.preventDefault();
    const cityName = input.value.trim();
    if (cityName) {
        getData(cityName);
        saveCityToLocalStorage(cityName)
    } else {
        failure.textContent = 'Type any city name';
    }
});



        function changingIcon(data) {
            if (["snow", "mist", "cloud"].some(des => data.includes(des))) {
                // icon.setAttribute('class', 'fa fa-cloud fa-4x ')
                body.classList.remove('sunny')
                body.classList.remove('rainy')
                document.body.classList.add('cloudy')

            } else if (["rain", "drizzle", "downpour"].some(des => data.includes(des))) {
                body.classList.remove('cloudy')
                body.classList.remove('sunny')
                body.classList.add('rainy')
            } else {
                // icon.setAttribute('class', 'fa fa-sun fa-4x ')
                body.classList.remove('rainy')
                body.classList.remove('cloudy')
                body.classList.add('sunny')
            }
        }