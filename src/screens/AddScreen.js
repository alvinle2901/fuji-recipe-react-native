import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HideWithKeyboard } from 'react-native-hide-with-keyboard';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-root-toast';

import { Formik } from 'formik';

import DialogModal from '../components/DialogModal';
import DropDownItem from '../components/DropDownItem';
import ErrorText from '../components/ErrorText';
import ImageSlider from '../components/ImageSlider';
import InputItem from '../components/InputItem';
import SliderItem from '../components/SliderItem';
import WhiteBalance from '../components/WhiteBalance';
import {
  ccData,
  dynamicRangeData,
  filmSimulationData,
  grainEffectData,
  sensorData,
} from '../constants';
import { useSaveRecipe } from '../hooks/useRecipe';
import { checkBW } from '../utils/string';
import { validateSchema } from '../utils/validation';

const AddScreen = ({ navigation }) => {
  const [dialog, setDialog] = useState(false);
  const [images, setImages] = useState([]);
  const [color, setColor] = useState(0);
  const [shadow, setShadow] = useState(0);
  const [exposure, setExposure] = useState(0);
  const [sharpness, setSharpness] = useState(0);
  const [highlight, setHighlight] = useState(0);
  const [noiseReduction, setNoiseReduction] = useState(0);

  const saveRecipe = useSaveRecipe();

  const handleSaveRecipe = (item) => {
    const newRecipe = {
      id: `id_${Date.now()}`,
      ...item,
    };
    saveRecipe.mutate(newRecipe);
  };

  return (
    <Formik
      initialValues={{
        title: '',
        film: '',
        sensor: '',
        iso: '',
        dynamicRange: '',
        grainEffect: '',
        ccfx: '',
        wb: '',
        temp: '',
        red: '0',
        blue: '0',
      }}
      validationSchema={validateSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values) => {
        console.log(values);
        try {
          handleSaveRecipe({
            film_simulation: values.film,
            sensor: values.sensor,
            white_balance: values.wb,
            dynamic_range: values.dynamicRange,
            color: color,
            highlight: highlight,
            shadow: shadow,
            sharpness: sharpness,
            noise_reduction: noiseReduction,
            grain_effect: values.grainEffect,
            color_chrome_fx: values.ccfx,
            iso: values.iso,
            exposure: exposure,
            red: values.red,
            blue: values.blue,
            images: images,
            title: values.title,
            temp: values.temp,
            favorite: false,
            bw: checkBW(values.film),
          });
          Toast.show('New item added successfully!', {
            duration: Toast.durations.SHORT,
            backgroundColor: 'white',
            textColor: 'black',
          });
          navigation.navigate('Home');
        } catch (e) {
          console.error('Error adding document: ', e);
          Toast.show('There was an error while uploading', {
            duration: Toast.durations.SHORT,
            backgroundColor: 'white',
            textColor: 'black',
          });
        }
      }}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <SafeAreaView className="flex-1 bg-white">
          {/* Header */}
          <View className="items-center justify-between mb-2 mt-11 flex-row">
            <TouchableOpacity
              className="p-2 h-9 ml-3"
              style={{ backgroundColor: 'white' }}
              onPress={() => setDialog(true)}
            >
              <ChevronLeftIcon size={wp(6)} color="black" />
              <DialogModal
                title={'Exit Adding'}
                description={'Do you want to go back to home screen? You cannot undo this action.'}
                visible={dialog}
                setVisible={setDialog}
                handler={() => navigation.goBack()}
                handlerLabel={'Yes'}
              />
            </TouchableOpacity>
            <Text
              style={{ fontSize: wp(8.5), fontFamily: 'fin_thin' }}
              className="font-semibold text-neutral-700"
            >
              Add New Recipe
            </Text>
            <TouchableOpacity className="p-2 h-9 mr-6"></TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} className="space-y-6">
            {/* items */}
            <View className="mx-5">
              {/* Title */}
              <InputItem
                title={'Title'}
                icon={require('../../assets/recipe_icon/film1.png')}
                handleChange={handleChange('title')}
                value={values.title}
              />
              {errors.title && <ErrorText text={errors.title} />}
              {/* Film Simulation */}
              <DropDownItem
                data={filmSimulationData}
                icon={require('../../assets/recipe_icon/film.png')}
                field={'Film Simulation'}
                value={values.film}
                setValue={handleChange('film')}
              />
              {errors.film && <ErrorText text={errors.film} />}
              {/* Sensor */}
              <DropDownItem
                data={sensorData}
                icon={require('../../assets/recipe_icon/sensor.png')}
                field={'Sensor'}
                value={values.sensor}
                setValue={handleChange('sensor')}
              />
              {errors.sensor && <ErrorText text={errors.sensor} />}
              {/* Image Slider */}
              <ImageSlider images={images} setImages={setImages} />
              {/* White Balance */}
              <WhiteBalance
                icon={require('../../assets/recipe_icon/white-balance.png')}
                wb={values.wb}
                setWB={handleChange('wb')}
                temp={values.temp}
                setTemp={handleChange('temp')}
                red={values.red}
                setRed={handleChange('red')}
                blue={values.blue}
                setBlue={handleChange('blue')}
                errorWB={errors.wb}
                errorTemp={errors.temp}
              />
              {/* Dynamic Range */}
              <DropDownItem
                data={dynamicRangeData}
                icon={require('../../assets/recipe_icon/hdr.png')}
                field={'Dynamic Range'}
                value={values.dynamicRange}
                setValue={handleChange('dynamicRange')}
              />
              {errors.dynamicRange && <ErrorText text={errors.dynamicRange} />}
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
                value={values.grainEffect}
                setValue={handleChange('grainEffect')}
              />
              {errors.grainEffect && <ErrorText text={errors.grainEffect} />}
              {/* Color Chrome Effect */}
              <DropDownItem
                data={ccData}
                icon={require('../../assets/recipe_icon/cc.png')}
                field={'Color Chrome Effect'}
                value={values.ccfx}
                setValue={handleChange('ccfx')}
              />
              {errors.ccfx && <ErrorText text={errors.ccfx} />}
              {/* ISO */}
              <InputItem
                title={'ISO'}
                icon={require('../../assets/recipe_icon/iso.png')}
                handleChange={handleChange('iso')}
                value={values.iso}
              />
              {errors.iso && <ErrorText text={errors.iso} />}
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
          <HideWithKeyboard>
            <TouchableOpacity
              className="items-center mt-2 mb-2 mx-20 rounded-md bg-black py-2"
              onPress={handleSubmit}
            >
              <Text style={{ fontSize: wp(4.5), color: 'white' }}>Save</Text>
            </TouchableOpacity>
          </HideWithKeyboard>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default AddScreen;
