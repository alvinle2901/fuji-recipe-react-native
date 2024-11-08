import React from 'react';
import { View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Checkbox = ({ text, checked, onPress }) => {
  return (
    <View className="flex-1">
      <BouncyCheckbox
        size={20}
        fillColor="black"
        unfillColor="#FFFFFF"
        text={text}
        innerIconStyle={{ borderWidth: 1.5, borderColor: 'gray' }}
        textStyle={{
          textDecorationLine: 'none',
          fontSize: wp(4),
        }}
        onPress={onPress}
        isChecked={checked}
        disableBuiltInState
      />
    </View>
  );
};

export default Checkbox;
