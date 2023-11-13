import { useState, useEffect, useCallback } from "react";

const useWeatherAPI = (authorizationKey, locationName, cityName) => {
    const [ currentWeather, setCurrentWeather ] = useState({
        locationName: '',
        description: '',
        temperature: 0,
        windSpeed: 0,
        rainPossibility: 0,
        observationTime: new Date(),
        comfortability: '',
        weatherCode: 0,
        isLoading: true,
    });

    const fetchCurrentWeather = () => {
        return fetch(`https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${authorizationKey}&locationName=${locationName}`)
          .then((response) => response.json())
          .then((data) => {
            const locationData = data.records.location[0];
            const refreshData = locationData.weatherElement.reduce((neededData, recievedData) => { // reduce作法!!!
              if (['WDSD', 'TEMP'].includes(recievedData.elementName)) {
                neededData[recievedData.elementName] = recievedData.elementValue;
              }
              return neededData;
            }, {});
            return {
              temperature: refreshData.TEMP,
              windSpeed: refreshData.WDSD,
              observationTime: locationData.time.obsTime,
              locationName: locationData.locationName,
              isLoading: false,
            };
          })
          .catch((error) => console.error('error', error));
      }
      
      const fetchForecastWeather = () => {
        return fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${authorizationKey}&format=JSON&locationName=${cityName}`)
          .then((response) => response.json())
          .then((data) => {
            const forecastData = data.records.location[0];
            const forecastWeather = forecastData.weatherElement.reduce((neededForecast, forecastItem) => {
              if (['PoP', 'Wx', 'CI'].includes(forecastItem.elementName)) {
                neededForecast[forecastItem.elementName] = forecastItem.time[0].parameter;
              }
              return neededForecast;
            }, {});
            return {
              description: forecastWeather.Wx.parameterName,
              weatherCode: forecastWeather.Wx.parameterValue,
              rainPossibility: forecastWeather.PoP.parameterName,
              comfortability: forecastWeather.CI.parameterName,
              isLoading: false,
            };
          });
      };
    const fetchData = useCallback(async () => {
        setCurrentWeather(prevState => {
            return { ...prevState, isLoading: true };
        });
        const [currentData, forecastData] = await Promise.all([fetchCurrentWeather(), fetchForecastWeather()]);
        setCurrentWeather({
            ...currentData,
            ...forecastData,
        });
    }, [authorizationKey, locationName, cityName]);

    useEffect(() => {
      fetchData()}, [fetchData]);

    return [currentWeather, fetchData];
}

export default useWeatherAPI;