import React from 'react'
import { View } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

const Checkbox = ({ text, checked, setChecked }) => {
  const handleCheckboxPress = () => {
    setChecked((prev) => {
      return !prev
    })
  }

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
          fontSize: wp(4)
        }}
        onPress={handleCheckboxPress}
      />
    </View>
  )
}

export default Checkbox
