import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { storage } from '../../firebase.config';
import { ScrollView } from './ui';
import { wp } from '@/lib/dimensions';
import { Icons } from './ui/icons';

const ImageSlider = ({ images, setImages }) => {
  const [pickedImages, setPickedImages] = useState(images);

  useEffect(() => {
    // set images to upload
    setImages(pickedImages);
  });

  //upload images to storage
  const uploadImage = async (uri) => {
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();

    const storageRef = ref(storage, `files/${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, theBlob);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //set images with url from database
          setPickedImages([...pickedImages, downloadURL]);
        });
      }
    );
  };

  // pick image from local
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      await uploadImage(result.assets[0].uri);
    }
  };

  // remove images
  const removeImage = (index) => {
    const updatedImages = [...pickedImages];
    updatedImages.splice(index, 1);
    setPickedImages(updatedImages);
  };

  return (
    <View
      style={{
        borderRadius: 1,
        borderBottomWidth: 1,
        borderColor: '#f0eff2',
      }}
    >
      <Text className="mt-3">Images</Text>
      <ScrollView className="py-3" horizontal showsHorizontalScrollIndicator={false}>
        {pickedImages.map((item, index) => {
          return (
            <View className="flex-row" key={index}>
              <Image
                className="items-center justify-center -mr-3 mt-2"
                source={{ uri: item }}
                style={styles.imageContainer}
              />
              <TouchableOpacity onPress={() => removeImage(index)}>
                <Icons.close size={wp(6)} color="gray" strokeWidth={1} />
              </TouchableOpacity>
            </View>
          );
        })}
        <View className="items-center justify-center mt-2" style={[styles.imageContainer]}>
          <TouchableOpacity onPress={pickImage}>
            <Icons.add color={'gray'} size={wp(10)} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  imageContainer: {
    width: wp(44),
    height: wp(55),
    borderRadius: 20,
    marginLeft: 10,
    borderColor: 'gray',
    borderWidth: 0.5,
  },
});
