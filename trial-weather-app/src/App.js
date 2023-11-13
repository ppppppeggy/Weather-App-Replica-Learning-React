import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { availableLocations, getMoment } from './utils/helpers';
import WeatherCard from './views/WeatherCard';
import WeatherSetting from './views/WeatherSetting';
import useWeatherAPI from './hooks/useWeatherAPI';

const Container = styled.div`
  background-color: ${({theme}) => theme.backgroundColor };
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const theme = {
  light: {
    backgroundColor: '#ededed',
    foregroundColor: '#f9f9f9',
    boxShadow: '0 1px 3px 0 #999999',
    titleColor: '#212121',
    temperatureColor: '#757575',
    textColor: '#828282',
  },
  dark: {
    backgroundColor: '#1F2022',
    foregroundColor: '#121416',
    boxShadow:
      '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
    titleColor: '#f9f9fa',
    temperatureColor: '#dddddd',
    textColor: '#cccccc',
  },
}

const AUTHORIZATION_KEY = 'CWA-DFD35A08-84E6-45BC-91EE-3D9F49FDA15B';

const findLocation = (cityName) => {
  const data = availableLocations.find((data) =>
    data.cityName === cityName
  );
  return data.locationName;
};

function App() {
  const [ currentTheme, setCurrentTheme ] = useState('light');
  const [ currentPage, setCurrentPage ] = useState('weatherCard');
  const [ currentCity, setCurrentCity ] = useState(() => localStorage.getItem('cityName') || '臺北市');
  const locationName = useMemo(() => findLocation(currentCity), [currentCity]);
  const [currentWeather, fetchData] = useWeatherAPI(AUTHORIZATION_KEY, locationName, currentCity);
  const moment = getMoment(currentCity);

  const handleCurrentPage = (pageName) => {
    setCurrentPage(pageName);
  }
  const handleCurrentCity = (cityName) => {
    setCurrentCity(cityName);
  }

  useEffect(() => { setCurrentTheme((moment === 'day' ? 'light' : 'dark'));
  }, [moment]);

  return (
    <ThemeProvider theme={theme[currentTheme]}>
    <Container>
      {currentPage === 'setting' && <WeatherSetting 
        handleCurrentPage={handleCurrentPage} 
        handleCurrentCity={handleCurrentCity}
      />}
      {currentPage === 'weatherCard' && <WeatherCard 
        moment={moment} 
        fetchData={fetchData} 
        weatherElement={currentWeather} 
        handleCurrentPage={handleCurrentPage}
        cityName={currentCity}
      />}
    </Container>
    </ThemeProvider>
  );
}

export default App;
