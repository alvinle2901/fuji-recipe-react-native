import React from 'react';

import { Dropdown, Image, StyleSheet, View } from '@/components/ui';

import { wp } from '@/lib/dimensions';
import { getField } from '@/lib/string';

export const FilterDropdown = ({ data, field, icon, value, setValue }) => {
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

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    flex: 1,
    marginLeft: 10,
  },
  placeholderStyle: {
    fontSize: wp(4),
    color: 'grey',
  },
  selectedTextStyle: {
    fontSize: wp(4),
  },
});
