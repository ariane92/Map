import React, {useState, useEffect} from 'react';
import { Platform, PermissionsAndroid, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker} from 'react-native-maps'
import useLocation from './hooks/useLocation'

const App: React.FC = () => {
  const {currentLatitude, currentLongitude} = useLocation();
  return (
    <>
    <MapView
      showsUserLocation={true}
      showsMyLocationButton={false}
      moveOnMarkerPress={true}
      style={{position: 'absolute', bottom: 0, top: 0, right: 0, left:0}}
      region={{
        latitude: currentLatitude,
        longitude: currentLongitude,
        latitudeDelta: 0.0999,
        longitudeDelta: 0.0500,
      }}
      
    >
      
      <Marker
          coordinate={{latitude: -20.2579087, longitude: -40.2717859}}
          title='Mercadinho do seu Zé' 
          description='Rua Bandeira, 530'
       />

      <Marker
          coordinate={{latitude: -20.25216, longitude:-40.2685197}}
          title='Mercadinho Dona Helena' 
          description='Av. Ribeiro, 272'
       />

    </MapView>
   
    </>
    
  );
};

export default App;
