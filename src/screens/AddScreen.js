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
import { collection, addDoc } from 'firebase/firestore'
import Toast from 'react-native-root-toast'

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

const AddScreen = ({ navigation }) => {
  const [images, setImages] = useState([])
  const [cc, setCC] = useState('')
  const [wb, setWB] = useState('')
  const [temp, setTemp] = useState('')
  const [film, setFilm] = useState('')
  const [grain, setGrain] = useState('')
  const [dRange, setDRange] = useState('')
  const [red, setRed] = useState(0)
  const [blue, setBlue] = useState(0)
  const [color, setColor] = useState(0)
  const [shadow, setShadow] = useState(0)
  const [exposure, setExposure] = useState(0)
  const [sharpness, setSharpness] = useState(0)
  const [highlight, setHighlight] = useState(0)
  const [noiseReduction, setNoiseReduction] = useState(0)

  return (
    <Formik
      initialValues={{
        title: '',
        film: '',
        sharpness: '',
        iso: '',
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
        try {
          const docRef = await addDoc(collection(db, 'FujiRecipe'), {
            film_simulation: film,
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
            temp: temp,
            favorite: false
          })
          console.log('Document written with ID: ', docRef.id)
          Toast.show('New item added successfully!', {
            duration: Toast.durations.SHORT,
            backgroundColor: 'white',
            textColor: 'black'
          })
          navigation.navigate('Home')
        } catch (e) {
          console.error('Error adding document: ', e)
          Toast.show('There was an error while uploading', {
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
              Add New Recipe
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

export default AddScreen
