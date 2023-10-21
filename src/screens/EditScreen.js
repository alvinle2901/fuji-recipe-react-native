import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'

import DropDownItem from '../components/DropDownItem'
import InputItem from '../components/InputItem'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import SliderItem from '../components/SliderItem'

const EditScreen = () => {
  const [sharpness, setSharpness] = useState(0)
  const [highlight, setHighlight] = useState(0)
  const [noiseReduction, setNoiseReduction] = useState(0)
  const [shadow, setShadow] = useState(0)
  const [color, setColor] = useState(0)
  const [exposure, setExposure] = useState(0)

  const dynamicRangedata = [
    { label: 'Auto', value: 'auto' },
    { label: 'DR100', value: 'DR100' },
    { label: 'DR200', value: 'DR200' },
    { label: 'DR400', value: 'DR400' }
  ]

  return (
    <Formik
      initialValues={{ title: '', film: '', sharpness: '', iso: '' }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <SafeAreaView className="flex-1 bg-white">
          {/* Header */}
          <View className="items-center mb-3 mt-12">
            <Text
              style={{ fontSize: wp(5.5) }}
              className="font-semibold text-neutral-700"
            >
              Edit Recipe
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="space-y-6"
          >
            {/* items */}

            <View className="mx-5">
              {/* Title */}
              <InputItem
                title={'Title'}
                icon={require('../../assets/recipe_icon/film1.png')}
                handleBlur={handleBlur('title')}
                handleChange={handleChange('title')}
                value={values.title}
              />
              {/* Film simulation */}
              <DropDownItem
                data={dynamicRangedata}
                icon={require('../../assets/recipe_icon/film.png')}
                field={'Film Simulation'}
              />
              {/* Dynamic Range */}
              <DropDownItem
                data={dynamicRangedata}
                icon={require('../../assets/recipe_icon/hdr.png')}
                field={'Dynamic Range'}
              />
              {/* Color */}
              <SliderItem
                title={'Color'}
                icon={require('../../assets/recipe_icon/colour.png')}
                value={color}
                setValue={setColor}
                minimumSliderValue={-4}
                maximumSliderValue={4}
              />
              {/* Highlight */}
              <SliderItem
                title={'Highlight'}
                icon={require('../../assets/recipe_icon/shadow.png')}
                value={highlight}
                setValue={setHighlight}
                minimumSliderValue={-2}
                maximumSliderValue={4}
              />
              {/* Shadow */}
              <SliderItem
                title={'Shadow'}
                icon={require('../../assets/recipe_icon/shadow.png')}
                value={shadow}
                setValue={setShadow}
                minimumSliderValue={-2}
                maximumSliderValue={4}
              />
              {/* Noise Reduction */}
              <SliderItem
                title={'Noise Reduction'}
                icon={require('../../assets/recipe_icon/triangle.png')}
                value={noiseReduction}
                setValue={setNoiseReduction}
                minimumSliderValue={-4}
                maximumSliderValue={4}
              />
              {/* Sharpness */}
              <SliderItem
                title={'Sharpness'}
                icon={require('../../assets/recipe_icon/triangle.png')}
                value={sharpness}
                setValue={setSharpness}
                minimumSliderValue={-4}
                maximumSliderValue={4}
              />
              {/* Grain Effect */}
              <DropDownItem
                data={dynamicRangedata}
                icon={require('../../assets/recipe_icon/grain.png')}
                field={'Grain Effect'}
              />
              {/* Color Chrome Effect */}
              <DropDownItem
                data={dynamicRangedata}
                icon={require('../../assets/recipe_icon/cc.png')}
                field={'Color Chrome Effect'}
              />
              {/* ISO */}
              <InputItem
                title={'ISO'}
                icon={require('../../assets/recipe_icon/iso.png')}
                handleBlur={handleBlur('iso')}
                handleChange={handleChange('iso')}
                value={values.iso}
              />
              {/* Exposure Compensation */}
              <SliderItem
                title={'Exposure Compensation'}
                icon={require('../../assets/recipe_icon/exposure.png')}
                value={exposure}
                setValue={setExposure}
                minimumSliderValue={-3}
                maximumSliderValue={3}
              />
            </View>
          </ScrollView>
          {/* Submit */}
          <TouchableOpacity
            className="items-center mt-2 mb-2 mx-20 rounded-md bg-black py-2"
            onPress={handleSubmit}
          >
            <Text style={{ fontSize: wp(4.5), color: 'white' }}>Save</Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </Formik>
  )
}

export default EditScreen
