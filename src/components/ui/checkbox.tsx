import { wp } from '@/lib/dimensions';

import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import { View } from 'react-native';

type CheckboxProps = {
  text: string;
  checked: boolean;
  onPress: () => void;
};

export const Checkbox: React.FC<CheckboxProps> = ({ text, checked, onPress }) => {
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
