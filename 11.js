// Created by A J I L


window.onload = function() {
  $("button").click(function() {



    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
      .then(data => updateUI(data))
      .catch(err => console.log(err));
  });

  const key = 'djnAZb2uA9n1ssFC2VkoTeMTsAZvOF1F ';


  const getWeather = async (id) => {
    const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;
    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
  };

  const getCity = async (city) => {
    const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

  };

  //  getCity('mumbai').then(data => {
  //   return getWeather(data.Key)
  // }).then(data =>{
  //   console.log(data);
  // }).catch(err => console.log(err));



  const cityForm = document.querySelector('form');
  const card = document.querySelector('.card');
  const details = document.querySelector('.details');
  const time = document.querySelector('img.time');
  const icon = document.querySelector('.icon img');


  const updateUI = (data) => {

    const cityDets = data.cityDets;
    const weather = data.weather;


    details.innerHTML = `
<h5 class="my-3">${cityDets.EnglishName}</h5>
<div class="my-3">${weather.WeatherText}</div>
<div class="display-4 my-4">
<span>${weather.Temperature.Metric.Value}</span>
<span>&deg;C</span>
</div>
`;

    let timeSrc = null;
    if (weather.IsDayTime) {
      timeSrc = 'https://i.imgur.com/MbcC6II.jpg';
    } else {
      timeSrc = 'https://i.imgur.com/PKf8NXh.jpg';
    }
    time.setAttribute('src', timeSrc);


    if (card.classList.contains('d-none')) {

      card.classList.remove('d-none');
    }
    card.classList.remove('d-none');
  };

  const updateCity = async (city) => {


    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
      cityDets,
      weather
    };
  };

  if (cityForm) {
    cityForm.addEventListener('submit', e => {

      e.preventDefault();

      const city = cityForm.city.value.trim();
      cityForm.reset();

      updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    });
  }
}
