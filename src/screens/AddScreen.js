import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  Image
} from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { filmElements } from '../constants'
import { Slider } from '@miblanchard/react-native-slider'
import { Dropdown } from 'react-native-element-dropdown';

const AddScreen = () => {
  const [sharpness, setSharpness] = useState('')
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="space-y-6">
        {/* avatar */}
        <View className="items-center mb-3 mt-12">
          <Text
            style={{ fontSize: wp(6) }}
            className="font-semibold text-neutral-700"
          >
            Add New Recipe
          </Text>
        </View>
        {/* items */}

        <Formik
          initialValues={{ title: '', film: '', sharpness: '' }}
          onSubmit={(values) => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View className="mx-5">
              {/* Title */}
              <View
                className="flex-row py-3 items-center"
                style={{
                  borderRadius: 1,
                  borderBottomWidth: 1,
                  borderColor: '#f0eff2'
                }}
              >
                <Image
                  source={require('../../assets/recipe_icon/film.png')}
                  style={{ height: wp(7), width: wp(7) }}
                ></Image>
                <TextInput
                  className="ml-3 w-full"
                  style={{ fontSize: wp(4) }}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title}
                  placeholder={'Title'}
                />
              </View>
              {/* Film simulation */}
              <View
                className="flex-row py-3 items-center"
                style={{
                  borderRadius: 1,
                  borderBottomWidth: 1,
                  borderColor: '#f0eff2'
                }}
              >
                <Image
                  source={require('../../assets/recipe_icon/film.png')}
                  style={{ height: wp(7), width: wp(7) }}
                ></Image>
                <TextInput
                  className="ml-3 w-full"
                  style={{ fontSize: wp(4) }}
                  onChangeText={handleChange('film')}
                  onBlur={handleBlur('film')}
                  value={values.film}
                  placeholder={'Film Simulation'}
                />
              </View>
              {/* ISO */}
              <View
                className="flex-row py-3 items-center"
                style={{
                  borderRadius: 1,
                  borderBottomWidth: 1,
                  borderColor: '#f0eff2'
                }}
              >
                <Image
                  source={require('../../assets/recipe_icon/iso.png')}
                  style={{ height: wp(7), width: wp(7) }}
                ></Image>
                <TextInput
                  className="ml-3 w-full"
                  style={{ fontSize: wp(4) }}
                  onChangeText={handleChange('film')}
                  onBlur={handleBlur('film')}
                  value={values.film}
                  placeholder={'ISO'}
                />
              </View>
              {/* Highlight */}
              <View
                className="flex-row py-3 items-center"
                style={{
                  borderRadius: 1,
                  borderBottomWidth: 1,
                  borderColor: '#f0eff2'
                }}
              >
                <Image
                  source={require('../../assets/recipe_icon/triangle.png')}
                  style={{ height: wp(7), width: wp(7) }}
                ></Image>
                <TextInput
                  className="ml-3 w-full"
                  style={{ fontSize: wp(4) }}
                  onChangeText={handleChange('sharpness')}
                  onBlur={handleBlur('sharpness')}
                  value={sharpness.toString()}
                  placeholder={'Sharpness'}
                />
              </View>
              <Slider
                style={{ width: 200, height: 40 }}
                animateTransitions={true}
                animationType={'spring'}
                minimumValue={-2}
                maximumValue={4}
                step={1}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#000000"
                value={sharpness}
                onValueChange={(e) => {
                  setSharpness(e[0])
                }}
              />
              <View className="flex-row w-full justify-between">
                <Text>-2</Text>
                <Text>+4</Text>
              </View>

              {/* Dropdown */}
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setValue(item.value)
                  setIsFocus(false)
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? 'blue' : 'black'}
                    name="Safety"
                    size={20}
                  />
                )}
              />

              <TouchableOpacity
                onPress={handleSubmit}
                className="items-center mt-4"
              >
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
