import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Weather = () => {
  const [weather, setweather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const ref = useRef(null);
  const closeRef = useRef(null);
  const { cityname } = useParams();

  const getWeather = useCallback(async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=e402ff2b2185d2c22f3bd21f4e920110`;
      setLoading(true);
      let response = await fetch(url);
      const result = await response.json();
      if (result.list && result.list.length > 0) {
        setweather(result.list[0]);
      } else if (response.status === 404) {
        setError(`Oops , Weather data not available for the city ${cityname}`);
      } else {
        setError("Weather data not available");
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, [cityname]);

  useEffect(() => {
    getWeather();
  }, [getWeather]);

  useEffect(() => {
    if (error && ref.current) {
      ref.current.click();
    }
  }, [error]);

  const closeModal = () => {
    setError(null);
    navigate("/");
  };

  return (
    <>
      <div className="fullscreen">
        {loading && <Spinner />}
        {weather && weather.main && weather.weather && (
          <div className="items">
            <div className="forecast my-5">
              <div className="card">
                <h4>{`Weather for City: ${cityname}`}</h4>
                <img
                  src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                  className="card-img-top"
                  alt="Weather Icon"
                />
                <div className="card-body">
                  <p className="card-text">{`Date & Time: ${new Date(
                    weather.dt * 1000
                  ).toLocaleString()}`}</p>
                  <p className="card-text">{`Temperature: ${weather.main.temp} Kelvin`}</p>
                  <p className="card-text">{`Feels Like: ${weather.main.feels_like} Kelvin`}</p>
                  <p className="card-text">{`Weather: ${weather.weather[0].main} - ${weather.weather[0].description}`}</p>
                  <p className="card-text">{`Cloudiness: ${weather.clouds.all}%`}</p>
                  <p className="card-text">{`Wind Speed: ${weather.wind.speed} m/s`}</p>
                  <p className="card-text">{`Visibility: ${weather.visibility} meters`}</p>
                  <p className="card-text">{`Probability of Precipitation: ${weather.pop}`}</p>
                  {weather.rain && (
                    <p className="card-text">{`Rain (last 3 hours): ${weather.rain["3h"]} mm`}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="error">
            <button
              type="button"
              className="btn btn-primary d-none"
              data-bs-toggle="modal"
              ref={ref}
              data-bs-target="#exampleModal"
              onClick={() => {
                ref.current.click();
              }}
            >
              Launch demo modal
            </button>

            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Message
                    </h5>
                  </div>
                  <div className="modal-body">{error}</div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      ref={closeRef}
                      onClick={closeModal}
                      data-bs-dismiss="modal"
                    >
                      ok
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Weather;
