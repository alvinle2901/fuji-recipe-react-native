import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { ScrollView } from 'react-native-gesture-handler'
import { PlusCircleIcon, XCircleIcon } from 'react-native-heroicons/outline'
import { storage } from '../../firebase.config'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

const ImageSlider = ({ images, setImages }) => {
  const [pickedImages, setPickedImages] = useState(images)

  useEffect(() => {
    // set images to upload
    setImages(pickedImages)
  })

  //upload images to storage
  const uploadImage = async (uri) => {
    const fetchResponse = await fetch(uri)
    const theBlob = await fetchResponse.blob()

    const storageRef = ref(storage, `files/${Date.now()}`)
    const uploadTask = uploadBytesResumable(storageRef, theBlob)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
      },
      (error) => {
        alert(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //set images with url from database
          setPickedImages([...pickedImages, { uri: downloadURL }])
        })
      }
    )
  }

  // pick image from local
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1
    })

    if (!result.canceled) {
      await uploadImage(result.assets[0].uri)
    }
  }

  // remove images
  const removeImage = (index) => {
    const updatedImages = [...pickedImages]
    updatedImages.splice(index, 1)
    setPickedImages(updatedImages)
  }

  return (
    <View
      style={{
        borderRadius: 1,
        borderBottomWidth: 1,
        borderColor: '#f0eff2'
      }}
    >
      <Text className="mt-3">Images</Text>
      <ScrollView
        className="py-3"
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {pickedImages.map((item, index) => {
          return (
            <View className="flex-row" key={index}>
              <Image
                className="items-center justify-center -mr-3 mt-2"
                source={item}
                style={styles.imageContainer}
              />
              <TouchableOpacity onPress={() => removeImage(index)}>
                <XCircleIcon size={wp(6)} color="gray" strokeWidth={1} />
              </TouchableOpacity>
            </View>
          )
        })}
        <View
          className="items-center justify-center mt-2"
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
