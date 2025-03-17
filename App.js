import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { MapView, Camera, PointAnnotation } from "@maplibre/maplibre-react-native";
import { Image } from 'react-native';

const App = () => {
  // Initial marker coordinates [longitude, latitude]
  const [markerCoords, setMarkerCoords] = useState([-122.4324, 37.78825]);

  // Update marker position when dragging ends
  const onDragEnd = (e) => {
    const newCoords = e.geometry.coordinates;
    console.log('Marker dragged to:', newCoords);
    setMarkerCoords(newCoords);
  };

  // Update marker position when the map is tapped
  const onMapPress = (e) => {
    const newCoords = e.geometry.coordinates;
    console.log('Map pressed at:', newCoords);
    setMarkerCoords(newCoords);
  };

  return (
    <View style={styles.page}>
      <StatusBar barStyle="dark-content" />
      <MapView style={styles.map} onPress={onMapPress}>
        {/* Camera to keep the marker centered */}
        <Camera
          centerCoordinate={markerCoords}
          zoomLevel={14}  // Set a fixed zoom level
          animationMode="flyTo"
          animationDuration={1000}
        />
        <PointAnnotation
          id="marker"
          coordinate={markerCoords}
          onDragEnd={onDragEnd}
        >
          <View style={styles.markerContainer}>
            <Image
              source={require('./src/assets/marker.png')}
              style={styles.marker}
            />
          </View>
        </PointAnnotation>
      </MapView>

      {/* Coordinates Display */}
      <View style={styles.coordinates}>
        <Text>Longitude: {markerCoords[0].toFixed(6)}</Text>
        <Text>Latitude: {markerCoords[1].toFixed(6)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  coordinates: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 10,
    borderRadius: 8,
  },
  markerContainer: {
    // No fixed width/height; let the Image determine its own size
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 80,   // Fixed pixel size
    height: 40,  // Fixed pixel size
    resizeMode: 'contain',
  },
});

export default App;