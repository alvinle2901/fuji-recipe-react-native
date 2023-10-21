import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import * as ImagePicker from 'expo-image-picker'
import { PlusCircleIcon } from 'react-native-heroicons/outline'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

const imageData = []

const ImageSlider = ({data, images, setImages}) => {

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1
    })

    console.log(result)

    if (!result.canceled) {
      imageData.push(result.assets[0].uri)
      setImages(imageData)
    }
  }

  return (
    <View
      style={{
        borderRadius: 1,
        borderBottomWidth: 1,
        borderColor: '#f0eff2'
      }}
    >
      <Text className="mt-3 text-gray-500">Images</Text>
      <ScrollView
        className="py-3"
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {imageData.map((item, index) => {
          return <Image source={{ uri: item }} style={styles.imageContainer} key={index} />
        })}
        <View
          className="items-center justify-center"
          style={[
            styles.imageContainer,
            {
              borderColor: 'gray',
              borderWidth: 0.5
            }
          ]}
        >
          <TouchableOpacity onPress={pickImage}>
            <PlusCircleIcon color={'gray'} size={wp(10)} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default ImageSlider

const styles = StyleSheet.create({
  imageContainer: {
    width: wp(44),
    height: wp(55),
    borderRadius: 20,
    marginLeft: 10
  }
})
