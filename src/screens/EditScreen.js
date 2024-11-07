import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';

import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-root-toast';
import { HideWithKeyboard } from 'react-native-hide-with-keyboard';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

import DropDownItem from '../components/DropDownItem';
import InputItem from '../components/InputItem';
import SliderItem from '../components/SliderItem';
import WhiteBalance from '../components/WhiteBalance';
import ImageSlider from '../components/ImageSlider';
import ErrorText from '../components/ErrorText';
import DialogModal from '../components/DialogModal';
import { validateSchema } from '../utils/validation';
import { checkBW } from '../utils/string';
import {
  ccData,
  dynamicRangeData,
  filmSimulationData,
  grainEffectData,
  sensorData
} from '../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { useUpdateRecipe } from '../hooks/useRecipe';

const EditScreen = (props) => {
  const item = props.route.params;
  const navigation = useNavigation();
  const updateRecipeMutation = useUpdateRecipe();

  const handleUpdateRecipe = (id, item) => {
    updateRecipeMutation.mutate({ id: id, updatedRecipe: item });
  };

  const [dialog, setDialog] = useState(false);
  const [images, setImages] = useState(item.images);
  const [color, setColor] = useState(item.color);
  const [shadow, setShadow] = useState(item.shadow);
  const [exposure, setExposure] = useState(item.exposure_compensation);
  const [sharpness, setSharpness] = useState(item.sharpness);
  const [highlight, setHighlight] = useState(item.highlight);
  const [noiseReduction, setNoiseReduction] = useState(item.noise_reduction);

  return (
    <Formik
      initialValues={{
        title: item.title,
        film: item.film_simulation,
        sensor: item.sensor,
        iso: item.iso,
        dynamicRange: item.dynamic_range,
        grainEffect: item.grain_effect,
        ccfx: item.color_chrome_fx,
        wb: item.white_balance,
        temp: item.temp,
        red: item.red,
        blue: item.blue
      }}
      validationSchema={validateSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values) => {
        try {
          handleUpdateRecipe(item.id, {
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
            bw: checkBW(values.film)
          });
          Toast.show('Update successfully!', {
            duration: Toast.durations.SHORT,
            backgroundColor: 'white',
            textColor: 'black'
          });
          navigation.navigate('Home');
        } catch (e) {
          console.log(e);
          Toast.show('There was an error while updating', {
            duration: Toast.durations.SHORT,
            backgroundColor: 'white',
            textColor: 'black'
          });
        }
      }}>
      {({ handleChange, handleSubmit, values, errors }) => (
        <SafeAreaView className="flex-1 bg-white">
          {/* Header */}
          <View className="items-center mb-2 mt-11 justify-between flex-row">
            <TouchableOpacity
              className="p-2 h-9 ml-3"
              style={{ backgroundColor: 'white' }}
              onPress={() => navigation.goBack()}>
              <ChevronLeftIcon size={wp(6)} color="black" />
              <DialogModal
                title={'Exit Editing'}
                description={
                  'Do you want to go back to home screen? You cannot undo this action.'
                }
                visible={dialog}
                setVisible={setDialog}
                handler={() => navigation.goBack()}
                handlerLabel={'Yes'}
              />
            </TouchableOpacity>
            <Text
              style={{ fontSize: wp(8.5), fontFamily: 'fin_thin' }}
              className="font-semibold text-neutral-700">
              Edit Recipe
            </Text>
            <TouchableOpacity className="p-2 h-9 mr-6"></TouchableOpacity>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="space-y-6">
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
                temp={values.temp.toString()}
                setTemp={handleChange('temp')}
                red={values.red.toString()}
                setRed={handleChange('red')}
                blue={values.blue.toString()}
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
              {/* Exposure Compensation */}
              {/* <SliderItem
                title={'Exposure Compensation'}
                icon={require('../../assets/recipe_icon/exposure.png')}
                value={exposure}
                setValue={setExposure}
                minimumSliderValue={-3}
                maximumSliderValue={3}
              /> */}
            </View>
          </ScrollView>
          {/* Submit */}
          <HideWithKeyboard>
            <TouchableOpacity
              className="items-center mt-2 mb-2 mx-20 rounded-md bg-black py-2"
              onPress={handleSubmit}>
              <Text style={{ fontSize: wp(4.5), color: 'white' }}>Save</Text>
            </TouchableOpacity>
          </HideWithKeyboard>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default EditScreen;
