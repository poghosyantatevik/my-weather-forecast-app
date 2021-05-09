import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";
import "./Weather.css";
import moment from 'moment';
import Loader from "./Loader/Loader";

export const Weather = (props) => {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState({ init: true });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.name && cityName !== props.name) {
      setCityName(props.name);
      getWeatherInfo(props.name);
    }
  }, [props, cityName]);

  function getWeatherInfo(city) {
    setLoading(true);
    axios
      .get(`https://goweather.herokuapp.com/weather/${city}`)
      .then((response) => {
        setWeather(response.data);
      }).finally(() =>{
          setLoading(false);
      })
  }
  function Forecast() {
    let currentDate = moment(new Date());
    if (weather.init) {
      return (
        <div>
          <h3 className="main-sub"> Please enter a city name. </h3>
        </div>
      );
    } else if (weather.temperature) {
      return (
        <div>
          <Card className="p-3 mb-2">
            <h2 className="current-weather"> Today's Weather</h2>
            <ul>
              <li className="list-item"> <FontAwesomeIcon icon="city" /> : {cityName}</li>
              <li className="list-item"> <FontAwesomeIcon icon="temperature-low" /> : {weather.temperature}</li>
              <li className="list-item"> <FontAwesomeIcon icon="wind" /> : {weather.wind} </li>
              <li className="list-item"> <FontAwesomeIcon icon="info" /> : {weather.description} </li>
            </ul>
          </Card>

          <div className="forecast-div">
            <h2 className="forecast-heading"> The Weather for the upcoming 3 days </h2>
        
         


         
            {weather.forecast.map((cast) => {
              return (
                <ul className="forecast-cards" key={cast.day}> 

                  <li className="forecast-items"> <FontAwesomeIcon icon="calendar-day" /> 
                  {currentDate.add(1, 'days').calendar(cast.day,{
                  nextDay:'[Tomorrow]',
                  sameElse: 'MMM DD, YYYY'
              })}  </li>
                  <li className="forecast-items"> <FontAwesomeIcon icon="temperature-low" />  {cast.temperature} </li>
                  <li className="forecast-items"> <FontAwesomeIcon icon="wind" /> {cast.wind} </li>
                </ul>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h3 className="warning-message"> Sorry! Couldn't find the forecast data for {cityName} </h3>
        </div>
      );
    }
  }

  return (
    <div>
      <Loader loading={loading} />
      <Forecast> </Forecast>
    </div>
  );
};
