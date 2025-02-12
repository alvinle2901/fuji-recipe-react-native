import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { getField } from '../lib/string';

const FilterDropdown = ({ data, field, icon, value, setValue }) => {
  const filterField = getField(field);
  return (
    <View
      className="flex-row py-3 items-center w-full justify-between"
      style={{
        borderRadius: 1,
        borderBottomWidth: 1,
        borderColor: '#f0eff2',
      }}
    >
      <Image source={icon} style={{ height: wp(7), width: wp(7) }}></Image>
      <Dropdown
        className="ml-3 flex-1"
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={field}
        value={value}
        onChange={(item) => {
          setValue((prevFilters) => ({
            ...prevFilters,
            [filterField]: item.value,
          }));
          // setValue(item.value);
        }}
      />
    </View>
  );
};

export default FilterDropdown;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: wp(4),
    color: 'grey',
  },
  selectedTextStyle: {
    fontSize: wp(4),
  },
});
