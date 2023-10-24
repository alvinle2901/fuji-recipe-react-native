import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React from 'react'
import { Dropdown } from 'react-native-element-dropdown'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { colorData, wbData } from '../constants'

const WhiteBalance = ({
  icon,
  wb,
  setWB,
  temp,
  setTemp,
  red,
  setRed,
  blue,
  setBlue
}) => {
  return (
    <View
      style={{
        borderRadius: 1,
        borderBottomWidth: 1,
        borderColor: '#f0eff2'
      }}
    >
      {/* WB */}
      <View className="flex-row py-3 items-center w-full justify-between">
        <Image source={icon} style={{ height: wp(7), width: wp(7) }}></Image>
        <Dropdown
          className="ml-3 flex-1"
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={wbData}
          maxHeight={300}
          labelField={'label'}
          valueField={'value'}
          placeholder={'White Balance'}
          value={wb}
          onChange={(item) => {
            setWB(item.value)
          }}
        />
      </View>
      {/* Temp */}
      {wb == 'Color Temperature' ? (
        <View className="flex-row items-center">
          <TextInput
            className="ml-3 mr-1"
            style={styles.tempContainer}
            value={temp}
            placeholder={'Temperature'}
            keyboardType="numeric"
            onChangeText={setTemp}
          />
          <Text>K</Text>
        </View>
      ) : (
        <></>
      )}

      {/* Shift */}
      <View className="flex-row py-3 items-center">
        <View className="flex-row flex-1 items-center">
          {/* Red */}
          <Text className="text-gray-500">Red:</Text>
          <Dropdown
            className="ml-3"
            style={styles.colorDropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={colorData}
            maxHeight={300}
            labelField={'label'}
            valueField={'value'}
            placeholder={'0'}
            value={red}
            onChange={(item) => {
              setRed(item.value)
            }}
          />
        </View>
        {/* Blue */}
        <View className="flex-row flex-1 items-center">
          <Text className="text-gray-500">Blue:</Text>
          <Dropdown
            className="ml-3"
            style={styles.colorDropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={colorData}
            maxHeight={300}
            labelField={'label'}
            valueField={'value'}
            placeholder={'0'}
            value={blue}
            onChange={(item) => {
              setBlue(item.value)
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default WhiteBalance

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8
  },
  colorDropdown: {
    height: 40,
    width: wp(18),
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8
  },
  tempContainer: {
    height: 40,
    width: wp(30),
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginLeft: wp(11)
  },
  placeholderStyle: {
    fontSize: wp(4),
    color: 'grey'
  },
  selectedTextStyle: {
    fontSize: wp(4)
  }
})
