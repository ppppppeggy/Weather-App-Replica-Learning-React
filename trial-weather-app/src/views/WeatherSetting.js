import { useState } from "react";
import styled from '@emotion/styled';
import { availableLocations } from '../utils/helpers';

const SettingWrapper = styled.div`
position: relative;
  min-width: 360px; 
  font-size: 120%;
  padding: 1% 3%;
  box-sizing:border-box;
  box-shadow: ${({ theme }) => theme.boxShadow };
  background-color: ${({theme}) => theme.foregroundColor };
  color: ${({theme}) => theme.textColor };
`;
const Title = styled.div`
  color: ${({theme}) => theme.titleColor};
  font-size: 150%;
  margin: 8% 0;
`;
const Label = styled.label`
  display: flex;
  flex-direction: column;  
`;
const Select = styled.select`
  font-size: 90%;
  width: 100%;
  max-width: 100%;
  margin: 6% 0;
  padding: 2%;
  border-radius: 4px;
  appearance: none;
  margin: 5% 0;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.textColor};
  color: ${({theme}) => theme.textColor };
  -webkit-appearance: none;
  -moz-appearance: none;
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5% 0;
  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    width: 80px;
    font-size: 16px;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 5px;
    letter-spacing: 1px;
    cursor: pointer;
    user-select: none;
    overflow: visible;
  }
`;
const Back = styled.button`
  && {
    color: ${({ theme }) => theme.textColor};
    border-color: ${({ theme }) => theme.textColor};
  }
`;
const Save = styled.button`
  && {
    color: white;
    background-color: #40a9f3;
  }
`;

const WeatherSetting = ({handleCurrentPage, handleCurrentCity}) => {
    const [locationName, setLocationName] = useState('臺北市');

    const handleLocationChange = (location) => {
        setLocationName(location);
    }
    const handleLocationSave = () => {
      handleCurrentCity(locationName);
        handleCurrentPage('weatherCard');
        localStorage.setItem('cityName', locationName);
    }

    return (
        <SettingWrapper>
            <Title>設定</Title>
            <Label htmlFor='location'>
            地區
            </Label>
            <Select id='location' onChange={(e) => handleLocationChange(e.target.value)}> 
                {availableLocations.map((location) => 
                <option key={location.cityName} value={location.cityName}>{location.cityName}</option>
                )}
            </Select>
            <Button>
            <Back onClick={() => setCurrentPage('weatherCard')}>返回</Back>
            <Save onClick={handleLocationSave}>儲存</Save>
            </Button>
        </SettingWrapper>
    )
}

export default WeatherSetting;