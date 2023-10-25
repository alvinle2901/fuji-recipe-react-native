import { Text, View, Image, TextInput } from 'react-native'
import React from 'react'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue } from 'react-native-reanimated'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

const SliderItem = ({
  title,
  icon,
  value,
  setValue,
  minimumSliderValue,
  maximumSliderValue
}) => {
  const progress = useSharedValue(2)

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
            placeholderTextColor={"black"}
          />
        </View>
        <Text style={{ fontSize: wp(5) }}>{value}</Text>
      </View>
      <View>
        <Slider
          className="mt-5 mb-2"
          progress={progress}
          minimumValue={useSharedValue(minimumSliderValue)}
          maximumValue={useSharedValue(maximumSliderValue)}
          step={maximumSliderValue - minimumSliderValue}
          onValueChange={(val) => setValue(val)}
          thumbWidth={12}
          cache={useSharedValue(value)}
          theme={{
            disableMinTrackTintColor: 'fff',
            maximumTrackTintColor: '#f0eff2',
            minimumTrackTintColor: '#403f44',
            cacheTrackTintColor: '#333',
            bubbleBackgroundColor: 'black'
          }}
        />
      </View>
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
