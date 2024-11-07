import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { colorData, wbData } from '../constants';
import ErrorText from './ErrorText';

const WhiteBalance = ({
  icon,
  wb,
  setWB,
  temp,
  setTemp,
  red,
  setRed,
  blue,
  setBlue,
  errorWB,
  errorTemp
}) => {
  return (
    <View
      style={{
        borderRadius: 1,
        borderBottomWidth: 1,
        borderColor: '#f0eff2'
      }}>
      {/* WB */}
      <View className="flex-row py-3 w-full">
        <Image
          source={icon}
          style={{ height: wp(7), width: wp(7), marginTop: 12 }}></Image>
        <View className="ml-3 flex-1">
          <SelectList
            setSelected={(val) => setWB(val)}
            data={wbData}
            search={false}
            placeholder={'White Balance'}
            boxStyles={styles.dropdown}
            inputStyles={{ fontSize: wp(4) }}
            dropdownTextStyles={{ fontSize: wp(4.4) }}
            dropdownItemStyles={{ paddingVertical: 10 }}
            defaultOption={{ key: wb, value: wb }}
          />
        </View>
      </View>
      {errorWB && <ErrorText text={errorTemp} />}
      {/* Temp */}
      {wb == 'Color Temperature' && (
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
      )}
      {errorTemp && <ErrorText text={errorTemp} />}
      {/* Shift */}
      <View className="flex-row py-3">
        <View className="flex-row flex-1">
          {/* Red */}
          <Text className="text-gray-500 mt-3">Red:</Text>
          <View className="ml-3">
            <SelectList
              setSelected={(val) => setRed(val)}
              data={colorData}
              search={false}
              boxStyles={styles.colorDropdown}
              inputStyles={{ fontSize: wp(4) }}
              dropdownTextStyles={{ fontSize: wp(4.4) }}
              dropdownItemStyles={{ paddingVertical: 7 }}
              defaultOption={{ key: red, value: red }}
            />
          </View>
        </View>
        {/* Blue */}
        <View className="flex-row flex-1">
          <Text className="text-gray-500 mt-3">Blue:</Text>
          <View className="ml-3">
            <SelectList
              setSelected={(val) => setBlue(val)}
              data={colorData}
              search={false}
              boxStyles={styles.colorDropdown}
              inputStyles={{ fontSize: wp(4) }}
              dropdownTextStyles={{ fontSize: wp(4.4) }}
              dropdownItemStyles={{ paddingVertical: 7 }}
              defaultOption={{ key: blue, value: blue }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default WhiteBalance;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    alignItems: 'center'
  },
  colorDropdown: {
    height: 45,
    width: wp(18),
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    alignItems: 'center'
  },
  tempContainer: {
    height: 40,
    width: wp(30),
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginLeft: wp(11)
  }
});
