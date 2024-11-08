import React from 'react';
import { Image, TextInput, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const InputItem = ({ title, icon, handleChange, value }) => {
  return (
    <View
      className="flex-row py-3 items-center"
      style={{
        borderRadius: 1,
        borderBottomWidth: 1,
        borderColor: '#f0eff2',
      }}
    >
      <Image source={icon} style={{ height: wp(7), width: wp(7) }}></Image>
      <TextInput
        className="ml-3 w-full"
        style={{ fontSize: wp(4) }}
        onChangeText={handleChange}
        value={value}
        placeholder={title}
        placeholderTextColor={'black'}
      />
    </View>
  );
};

export default InputItem;
