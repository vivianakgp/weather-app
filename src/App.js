import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';

function WeatherApp() {
  const [ data, setData ] = useState(null);
  const [ temperature, setTemperature ] = useState(0);
  const [ control, setControl ] = useState(false)
  useEffect(() => {
    function handleError (){
      console.log('error')
    };
    function success(position){
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0c857f431ed4982bc4769b2aeee331ca`)
      .then(res => {
        console.log(res.data)
        setData(res.data)
        console.log(`èsta es la data disponible:${res.data.main.temp}`)
        const kelvins = res.data.main.temp;
        const convert = kelvins -273.15;
        const celsius = convert.toFixed(2);
        setTemperature(`${celsius}℃`)
      })
      .catch((err) => {console.log(err)})
    };
    navigator.geolocation.getCurrentPosition( success , handleError);
  }, [ ]);
  function handleChanges() {
    const kelvins = data?.main.temp;
    const cels = kelvins -273.15;
    const celsius = cels.toFixed(2);
    const fahrenheit = cels * 1.8000 + 32;
    control?  setTemperature(`${fahrenheit.toFixed(2)}℉`):setTemperature(`${celsius}℃`);
    setControl(!control);
  }
  return (
    <div className="App">
    <Card
      temp={temperature}
      icon={data?.weather[0].icon}
      city={`${data?.name}, ${data?.sys.country}`}
      description= {data?.weather[0].description}
      press={data?.main.pressure}
      humidity={data?.main.humidity}
      wSpeed={data?.wind.speed}
    />
    <button onClick={handleChanges}>℃ / ℉</button>
    </div>
  );
}

export default WeatherApp;
