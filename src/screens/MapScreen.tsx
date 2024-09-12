import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types'; 
 
type MapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreateAccount'>;

const MapScreen = () => {
  const navigation = useNavigation<MapScreenNavigationProp>();
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: string, longitude: string } | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão de localização necessária', 'Para usar este recurso, permita o acesso à localização.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    getLocation();
  }, []);

  const handlePress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    Alert.alert(
      'Confirmar Localização',
      `Você selecionou:\nLatitude: ${latitude}\nLongitude: ${longitude}`,
      [
        {
          text: 'Cancelar',
          onPress: () => {
            console.log('Seleção cancelada');
            setSelectedLocation(null);
          },
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            setSelectedLocation({
              latitude: latitude.toString(),
              longitude: longitude.toString()
            });
            
            navigation.navigate('CreateAccount', {
              newLocation: {
                latitude: latitude.toString(),
                longitude: longitude.toString()
              }
            });
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={
          currentLocation ? {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          } : undefined
        }
        onPress={handlePress}
      >
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude
            }}
            title="Sua Localização"
          />
        )}
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: parseFloat(selectedLocation.latitude),
              longitude: parseFloat(selectedLocation.longitude)
            }}
            title="Localização Selecionada"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
