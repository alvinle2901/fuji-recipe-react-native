import { Text, View, Image, TextInput } from 'react-native'
import React from 'react'

import { Slider } from '@miblanchard/react-native-slider'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

const SliderItem = ({
  title,
  icon,
  value,
  setValue,
  step,
  minimumSliderValue,
  maximumSliderValue
}) => {
  return (
    <View
      className="flex-col"
      style={{
        borderRadius: 1,
        borderBottomWidth: 1,
        borderColor: '#f0eff2'
      }}
    >
      <View className="flex-row justify-between items-center pt-3">
        <View className="flex-row">
          <Image source={icon} style={{ height: wp(7), width: wp(7) }}></Image>
          <TextInput
            className="ml-3"
            style={{ fontSize: wp(4) }}
            placeholder={title.toString()}
            editable={false}
          />
        </View>
        <Text style={{ fontSize: wp(5) }}>{value}</Text>
      </View>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={minimumSliderValue}
        maximumValue={maximumSliderValue}
        step={step ? step : 1}
        minimumTrackTintColor="grey"
        maximumTrackTintColor="grey"
        value={value}
        onValueChange={(e) => {
          setValue(e[0])
        }}
      />
      <View className="flex-row w-full justify-between mb-3">
        <Text style={{ fontSize: wp(3.5), color: 'grey' }}>
          {minimumSliderValue}
        </Text>
        <Text style={{ fontSize: wp(3.5), color: 'grey' }}>
          {maximumSliderValue}
        </Text>
      </View>
    </View>
  )
}

export default SliderItem
