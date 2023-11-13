import React from "react";
import dayjs from "dayjs";
import styled from '@emotion/styled';
import { ReactComponent as RainSVG } from '../images/rain.svg';
import { ReactComponent as AirFlowIcon } from '../images/airFlow.svg';
import { ReactComponent as RefreshIcon } from '../images/refresh.svg';
import { ReactComponent as LoadingIcon } from '../images/loading.svg';
import { ReactComponent as CogIcon } from '../images/cog.svg';
import WeatherIcon from '../components/WeatherIcon';

const WeatherCardWrapper = styled.div`
  background-color: ${(props) => props.theme.foregroundColor};
  position: relative;
  min-width: 360px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  box-sizing: border-box;
  padding: 30px 15px;
`;
const Location = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 20px;
`;
const Description = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 30px;
`;
const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;
const Temperature = styled.div`
  color: ${({ theme }) => theme.temperatureColor};
  font-size: 96px;
  font-weight: 300;
  display: flex;
`;
const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`;
const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 20px;
  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;
const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
`;
const RainIcon = styled(RainSVG)`
  width: 25px;
  height: auto;
  margin-right: 30px;
`;
const Refresh = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.textColor};
  @keyframes rotate {
    from {
      transform : rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    animation: rotate infinite 1.5s linear;
    animation-duration: ${ ({isLoading}) => (isLoading) ? '1.5s' : '0s' };
  }
`;

const SettingIcon = styled(CogIcon)`
  position: absolute;
  width: 20px;
  height: 20px;
  right: 10px;
  cursor: pointer;
  :hover {
    animation: rotate infinite 3.5s linear;
  }
`;



const WeatherCard = ({weatherElement, fetchData, moment, handleCurrentPage, cityName}) => {
    const {
        isLoading,
        description,
        comfortability,
        temperature,
        windSpeed,
        rainPossibility,
        observationTime,
        weatherCode,
    } = weatherElement;

    return(
        <WeatherCardWrapper>
        <SettingIcon onClick={() => handleCurrentPage('setting')} />
        <Location>{ cityName }</Location>
        <Description>{ description } { comfortability }</Description>
        <CurrentWeather>
          <Temperature>{ Math.round(temperature) }<Celsius>°C</Celsius></Temperature>
          <WeatherIcon 
            weatherCode={ weatherCode } 
            moment={ moment }/>
        </CurrentWeather>
        <AirFlow>
            <AirFlowIcon />{ windSpeed } m/h
        </AirFlow>
        <Rain>
            <RainIcon />{ rainPossibility }%
        </Rain>
        <Refresh 
          onClick={fetchData}
          isLoading={ isLoading }>
          最後觀測時間：{ new Intl.DateTimeFormat('zh-TW', {
            hour: 'numeric',
            minute: 'numeric',
          }).format(dayjs(observationTime))}
          { (isLoading) ? <LoadingIcon/> : <RefreshIcon /> }
        </Refresh>
      </WeatherCardWrapper>
    );
};

export default WeatherCard;