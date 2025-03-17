import {View, Text} from 'react-native';
import React from 'react';
import DraggableMarkerMap from './src/DraggableMarkerMap';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <DraggableMarkerMap />
    </View>
  );
};

export default App;
