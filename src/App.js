import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';

function WeatherApp() {
  const [ data, setData ] = useState(null);
  const [ isCelcius , setisCelcius ] = useState(true);
  const celciusDegrees = (data?.main.temp -273.15).toFixed();
  const fahrenheitDegrees = (celciusDegrees * 1.8000 + 32).toFixed();
  const description= data?.weather[0].description;
  // const description='few clouds';
  const weatherDescription = [
    'clear sky',
    'few clouds',
    'scattered clouds',
    'broken clouds',
    'shower rain',
    'rain',
    'thunderstorm',
    'snow',
    'mist'
  ];
  const imgUrl = [
    'https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?cs=srgb&dl=pexels-francesco-ungaro-281260.jpg&fm=jpg',
    'https://images.pexels.com/photos/5696877/pexels-photo-5696877.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/7256209/pexels-photo-7256209.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    'https://images.pexels.com/photos/9469243/pexels-photo-9469243.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    'https://images.pexels.com/photos/459439/pexels-photo-459439.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    'https://images.pexels.com/photos/1463530/pexels-photo-1463530.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/268782/pexels-photo-268782.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    'https://images.pexels.com/photos/1866711/pexels-photo-1866711.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    'https://images.pexels.com/photos/845619/pexels-photo-845619.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
  ];

  const index = weatherDescription.indexOf(description)
  const image = imgUrl[index];
  

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
    <div className="App" style={{backgroundImage: `url(${image})`}} >
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
