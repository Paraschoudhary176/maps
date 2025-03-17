import React, { useState } from 'react';
import { View, TextInput, StyleSheet, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const DraggableMarkerMap = () => {
  const [markerCoords, setMarkerCoords] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  // Function to handle marker drag
  const handleDragEnd = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    console.log('New Coordinates:', latitude, longitude);
    setMarkerCoords({ latitude, longitude });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'gray'} />

      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: markerCoords.latitude,
          longitude: markerCoords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        zoomEnabled={true}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {/* Draggable Marker */}
        <Marker
          coordinate={markerCoords}
          draggable
          onDragEnd={handleDragEnd}
          title="Drag Me"
          pinColor="red" // Add pin color for visibility
        />
      </MapView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={markerCoords.latitude.toString()}
          editable={false}
        />
        <TextInput
          style={styles.input}
          value={markerCoords.longitude.toString()}
          editable={false}
        />
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  inputContainer: {
    position: 'absolute',
    top: 10,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 5, 
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default DraggableMarkerMap;
