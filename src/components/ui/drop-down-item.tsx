import React from 'react';
import { Image, StyleSheet, View } from '../ui';
import { SelectList } from 'react-native-dropdown-select-list';
import { wp } from '@/lib/dimensions';

export const DropDownItem = ({ data, field, icon, value, setValue }) => {
  return (
    <View
      className="flex-row py-3 w-full"
      style={{
        borderRadius: 1,
        borderBottomWidth: 1,
        borderColor: '#f0eff2',
      }}
    >
      <Image source={icon} style={{ height: wp(7), width: wp(7), marginTop: 12 }}></Image>
      <View className="ml-3 flex-1">
        <SelectList
          setSelected={(val) => setValue(val)}
          data={data}
          search={false}
          placeholder={field}
          boxStyles={styles.dropdown}
          inputStyles={{ fontSize: wp(4) }}
          dropdownTextStyles={{ fontSize: wp(4.4) }}
          dropdownItemStyles={{ paddingVertical: 10 }}
          defaultOption={{ key: value, value: value }}
        />
      </View>
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
    alignItems: 'center',
  },
});
