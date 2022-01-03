
import humiImg from '../icons/humedad.png';
import presureImg from '../icons/presion.png';
import windImg from '../icons/viento.png';

const Card = ({temp, icon, city, description, press, humidity, wSpeed}) => {
    return (
        <div className='card'>
        <h1>The Weather</h1>
        <>
        <span>{`${temp}`}</span>
        </>
        <div className='details'>
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='img-weather' />
        <ul>
            <li>{city}</li>
            <li>{description}</li>
            <li><img src={presureImg} alt='pressure'/>{`Pressure: ${press} mb`}</li>
            <li><img src={humiImg} alt='humidity'/>{`Humidity: ${humidity}`}</li>
            <li><img src={windImg} alt='wing'/>{`Wind speed: ${wSpeed} m/s`}</li>
        </ul>
        </div>
        </div>
    );
};

export default Card;