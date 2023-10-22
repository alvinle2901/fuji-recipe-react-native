import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

const colorData = [
  { label: '-9', value: '-9' },
  { label: '-8', value: '-8' },
  { label: '-7', value: '-7' },
  { label: '-6', value: '-6' },
  { label: '-5', value: '-5' },
  { label: '-4', value: '-4' },
  { label: '-3', value: '-3' },
  { label: '-2', value: '-2' },
  { label: '-1', value: '-1' },
  { label: '0', value: '0' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' }
]

const wbData = [
  { label: 'Auto', value: 'Auto' },
  { label: 'Color Temperature', value: 'Color Temperature' },
  { label: 'Daylight', value: 'Daylight' },
  { label: 'Shade', value: 'Shade' },
  { label: 'Fluorescent Light-1', value: 'Fluorescent Light-1' },
  { label: 'Fluorescent Light-2', value: 'Fluorescent Light-2' },
  { label: 'Fluorescent Light-3', value: 'Fluorescent Light-3' },
  { label: 'Incadescent', value: 'Incadescent' },
  { label: 'Underwater', value: 'Underwater' }
]

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
