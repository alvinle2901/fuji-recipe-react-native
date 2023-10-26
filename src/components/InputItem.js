import { Image, View, TextInput } from 'react-native'
import React from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

const InputItem = ({ title, icon, handleChange, value }) => {
  return (
    <View
      className="flex-row py-3 items-center"
      style={{
        borderRadius: 1,
        borderBottomWidth: 1,
        borderColor: '#f0eff2'
      }}
    >
      <Image source={icon} style={{ height: wp(7), width: wp(7) }}></Image>
      <TextInput
        className="ml-3 w-full"
        style={{ fontSize: wp(4) }}
        onChangeText={handleChange}
        value={value}
        placeholder={title}
        placeholderTextColor={"black"}
      />
    </View>
  )
}

export default InputItem
