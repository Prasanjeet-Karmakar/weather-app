import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';


export default function App() {
    const [corr, setCorr] = useState({lat: 23.3700501, lon: 85.3250387})
    const [data, setData] = useState({
        "coord":{"lon":85.325,"lat":23.3701},
        "weather":[{"id":721,"main":"Haze","description":"haze","icon":"50n"}],
        "base":"stations",
        "main":{"temp":301.07,"feels_like":306.48,"temp_min":301.07,"temp_max":301.07,"pressure":1006,"humidity":89},
        "visibility":4000,
        "wind":{"speed":2.06,"deg":150},
        "clouds":{"all":75},"dt":1688401580,
        "sys":
            {"type":1,"id":9131,"country":"IN","sunrise":1688340982,"sunset":1688389736},
        "timezone":19800,
        "id":1258526,
        "name":"Ranchi",
        "cod":200
    })    
    const [location, setLocation] = useState('Ranchi')

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${corr.lat}&lon=${corr.lon}&appid=d544ae835ced48d0fa50e196cef6de23`
    const corUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=d544ae835ced48d0fa50e196cef6de23`


    function getLocation() {    
        axios.get(corUrl).then((response) => {
            const newData = response.data
            setCorr({
                lat: newData[0].lat,
                lon: newData[0].lon
            })
            axios.get(url).then((response) => {
                const newData = response.data
                console.log(newData)
                setData(newData)
            }).catch((promise) => {
                console.log(promise);
            })
        }).catch((promise) => {
            console.log(promise);
        })
    }

    function handleChange(event) {
        setLocation(event.target.value)
    }

    var today = new Date();

    return (
        <div className="app-section">
            <div className="header-section">
                <div className="loc-date">
                    <h5 className="location">{location}</h5>
                    <h5 className="date">{today.getDate()} - {today.getMonth() + 1} - {today.getFullYear()}</h5>
                </div>
                <form className="search-box" onSubmit={(event) => {
                    event.preventDefault();
                }}>
                    <input 
                        type="text" 
                        placeholder="Search a location"
                        value={location}
                        id="search-location"
                        onChange={handleChange}
                    />
                    <button type="button" onClick={getLocation} >
                        <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
                    </button>
                </form>
            </div>

            <div className="main-section">
                <div className="main-details">
                    <h1 className="temp">{Math.floor(data.main.temp - 273.15)} °C</h1>
                    <h3 className="main-desc">{data.weather[0].main}</h3>
                    <p className="description">{data.weather[0].description}</p>
                </div>
                <div className="side-details">
                    <p>Humidity: {data.main.humidity}%</p>
                    <p>Wind: {data.wind.speed} mph</p>
                    <p>Feels Like: {(data.main.feels_like - 273.15).toFixed(2)} °C</p>
                </div>
            </div>
            <div className="footer">
                <p>Visibility: {data.visibility/1000} KM</p>
                <p>Min Temp: {Math.floor(data.main.temp_min - 273.15)} °C</p>
                <p>Max Temp: {Math.floor(data.main.temp_max - 273.15)} °C</p>
            </div>
        </div>  
    )
}