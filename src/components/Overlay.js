import React from 'react';
import { View, StyleSheet } from 'react-native';

const Overlay = () => {
  return (
    <View
      style={styles.overlay}
    />
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Adjust the opacity (last value) as needed
  },
});

export default Overlay;