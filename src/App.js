import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';

function WeatherApp() {
  const [ data, setData ] = useState(null);
  const [ isCelcius , setisCelcius ] = useState(true);
  const celciusDegrees = (data?.main.temp -273.15).toFixed();
  const fahrenheitDegrees = (celciusDegrees * 1.8000 + 32).toFixed();
  useEffect(() => {
    function handleError (){
      console.log('error getting geolocation')
    };
    function success(position){
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0c857f431ed4982bc4769b2aeee331ca`)
      .then(res => {
        console.log(res.data)
        setData(res.data)  
      })
      .catch(err => console.log(err))
    };
    navigator.geolocation.getCurrentPosition( success , handleError);
  }, [ ]);

  function toggleCelcius() {
    setisCelcius(!isCelcius);
  }
  return (
    <div className="App">
    <Card
      temp={ isCelcius ? `${celciusDegrees} ℃` : `${fahrenheitDegrees} ℉`}
      icon={data?.weather[0].icon}
      city={`${data?.name}, ${data?.sys.country}`}
      description= {data?.weather[0].description}
      press={data?.main.pressure}
      humidity={data?.main.humidity}
      wSpeed={data?.wind.speed}
      eventHandle={toggleCelcius}
    />
    </div>
  );
}

export default WeatherApp;
