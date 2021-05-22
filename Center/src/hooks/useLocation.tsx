import React, {useState, useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';
import { Platform } from 'react-native';

import {Alert, PermissionsAndroid} from 'react-native'

const useLocation = () => {
const [errorMsg, setErrorMsg] = useState(null)
  const [coords, setCoords] = useState(null)
  const [currentLatitude, setCurrentLatitude] = useState(0)
  const [currentLongitude, setCurrentLongitude] = useState(0)
  const [watchID, setWatchID] = useState(0)

  useEffect(() => {
    if(Platform.OS === 'ios') {
      try { 
        const requestLocationIniOS = async() => {
          const auth = await Geolocation.requestAuthorization('whenInUse');
          if(auth === "granted") {
            getLocation();         
            console.log('Permissão concedida');   
          } else {
            Alert.alert('Permissão de Localização negada');
          }
        }; requestLocationIniOS()
      } 
      catch (err) {
        console.warn(err);
      } 
    } else {
      try {
        const requestLocationPermission = async () => {
        
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Permissão de Acesso à Localização",
              message: "Este aplicativo precisa acessar sua localização.",
              buttonNeutral: "Pergunte-me depois",
              buttonNegative: "Cancelar",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getLocation();
          } else {
            Alert.alert('Permissão de Localização negada');
          }
        };
        requestLocationPermission();
      } catch (err) {
        console.warn(err);
      }
    } 
  },[])
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLatitude = position.coords.latitude;
        const currentLongitude = position.coords.longitude;
        setCurrentLatitude(currentLatitude);
        setCurrentLongitude(currentLongitude);
        console.log(currentLatitude, currentLongitude)
      },
      (error) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  return {currentLatitude, currentLongitude}
}

export default useLocation;