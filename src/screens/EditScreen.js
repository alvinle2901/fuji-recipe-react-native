import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import { db } from '../../firebase.config'
import { doc, updateDoc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'

import DropDownItem from '../components/DropDownItem'
import InputItem from '../components/InputItem'
import SliderItem from '../components/SliderItem'
import WhiteBalance from '../components/WhiteBalance'
import ImageSlider from '../components/ImageSlider'
import {
  ccData,
  dynamicRangeData,
  filmSimulationData,
  grainEffectData,
  sensorData
} from '../constants'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import Toast from 'react-native-root-toast'

const EditScreen = (props) => {
  const item = props.route.params
  const navigation = useNavigation()

  const [images, setImages] = useState(item.images)
  const [cc, setCC] = useState(item.color_chrome_fx)
  const [wb, setWB] = useState(item.white_balance)
  const [temp, setTemp] = useState(item.temp)
  const [film, setFilm] = useState(item.film_simulation)
  const [grain, setGrain] = useState(item.grain_effect)
  const [sensor, setSensor] = useState(item.sensor)
  const [dRange, setDRange] = useState(item.dynamic_range)
  const [red, setRed] = useState(item.red)
  const [blue, setBlue] = useState(item.blue)
  const [color, setColor] = useState(item.color)
  const [shadow, setShadow] = useState(item.shadow)
  const [exposure, setExposure] = useState(item.exposure_compensation)
  const [sharpness, setSharpness] = useState(item.sharpness)
  const [highlight, setHighlight] = useState(item.highlight)
  const [noiseReduction, setNoiseReduction] = useState(item.noise_reduction)

  return (
    <Formik
      initialValues={{
        title: item.title,
        film: '',
        sharpness: '',
        iso: item.iso,
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
      onSubmit={async (values) => {
        console.log(values)
        try {
          const ref = doc(db, 'FujiRecipe', item.id)

          await updateDoc(ref, {
            film_simulation: film,
            sensor: sensor,
            white_balance: wb,
            dynamic_range: dRange,
            color: color,
            highlight: highlight,
            shadow: shadow,
            sharpness: sharpness,
            noise_reduction: noiseReduction,
            grain_effect: grain,
            color_chrome_fx: cc,
            iso: values.iso,
            exposure: exposure,
            red: red,
            blue: blue,
            images: images,
            title: values.title,
            temp: temp
          })
          Toast.show('Update successfully!', {
            duration: Toast.durations.SHORT,
            backgroundColor: 'white',
            textColor: 'black'
          })
          navigation.navigate('Home')
        } catch (e) {
          Toast.show('There was an error while updating', {
            duration: Toast.durations.SHORT,
            backgroundColor: 'white',
            textColor: 'black'
          })
        }
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
              {/* Sensor */}
              <DropDownItem
                data={sensorData}
                icon={require('../../assets/recipe_icon/sensor.png')}
                field={'Sensor'}
                value={sensor}
                setValue={setSensor}
              />
              {/* Image Slider */}
              <ImageSlider images={images} setImages={setImages} />
              {/* White Balance */}
              <WhiteBalance
                icon={require('../../assets/recipe_icon/white-balance.png')}
                wb={wb}
                setWB={setWB}
                temp={temp}
                setTemp={setTemp}
                red={red}
                setRed={setRed}
                blue={blue}
                setBlue={setBlue}
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
