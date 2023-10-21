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
import SliderItem from '../components/SliderItem'
import WhiteBalance from '../components/WhiteBalance'
import ImageSlider from '../components/ImageSlider'
import {
  ccData,
  dynamicRangeData,
  filmSimulationData,
  grainEffectData
} from '../constants'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

const EditScreen = (props) => {
  const item = props.route.params
  const [images, setImages] = useState(item.images)
  const [cc, setCC] = useState(item.specs['color chrome effect'])
  const [wb, setWB] = useState(item.specs['white balance'])
  const [film, setFilm] = useState(item.specs['film simulation'])
  const [grain, setGrain] = useState(item.specs['grain effect'])
  const [dRange, setDRange] = useState(item.specs['dynamic range'])
  const [color, setColor] = useState(item.specs['color'])
  const [shadow, setShadow] = useState(item.specs['shadow'])
  const [exposure, setExposure] = useState(item.specs['exposure compensation'])
  const [sharpness, setSharpness] = useState(item.specs['sharpness'])
  const [highlight, setHighlight] = useState(item.specs['highlight'])
  const [noiseReduction, setNoiseReduction] = useState(item.specs['nr'])

  return (
    <Formik
      initialValues={{
        title: item.title,
        film: '',
        sharpness: '',
        iso: item.specs['iso'],
        dynamicRange: '',
        color: '',
        highlight: '',
        noiseReduction: '',
        shadow: '',
        sharpness: '',
        exposure: '',
        grainEffect: '',
        ccfx: ''
      }}
      onSubmit={(values) => {
        values.sharpness = sharpness
        console.log(values)
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <SafeAreaView className="flex-1 bg-white">
          {/* Header */}
          <View className="items-center mb-3 mt-12">
            <Text
              style={{ fontSize: wp(5.5) }}
              className="font-semibold text-neutral-700"
            >
              Edit
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
              {/* Film Simulation */}
              <DropDownItem
                data={filmSimulationData}
                icon={require('../../assets/recipe_icon/film.png')}
                field={'Film Simulation'}
                value={film}
                setValue={setFilm}
              />
              {/* Image Slider */}
              <ImageSlider images={images} setImages={setImages} />
              {/* White Balance */}
              <WhiteBalance
                icon={require('../../assets/recipe_icon/white-balance.png')}
                value={wb}
                setValue={setWB}
              />
              {/* Dynamic Range */}
              <DropDownItem
                data={dynamicRangeData}
                icon={require('../../assets/recipe_icon/hdr.png')}
                field={'Dynamic Range'}
                value={dRange}
                setValue={setDRange}
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
                icon={require('../../assets/recipe_icon/highlight.png')}
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
                icon={require('../../assets/recipe_icon/nr.png')}
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
                data={grainEffectData}
                icon={require('../../assets/recipe_icon/grain.png')}
                field={'Grain Effect'}
                value={grain}
                setValue={setGrain}
              />
              {/* Color Chrome Effect */}
              <DropDownItem
                data={ccData}
                icon={require('../../assets/recipe_icon/cc.png')}
                field={'Color Chrome Effect'}
                value={cc}
                setValue={setCC}
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
