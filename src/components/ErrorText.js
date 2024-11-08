import React from 'react';
import { Text } from 'react-native';

const ErrorText = ({ text }) => {
  return <Text style={{ fontSize: 12, color: 'red', marginTop: 3 }}>{text}</Text>;
};

export default ErrorText;
