import { Image, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { HeartIcon } from 'react-native-heroicons/solid'

const RecipeCard = ({ item }) => {
  const [isFavourite, toggleFavourite] = useState(false)
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detail', { ...item })}
      style={{ width: wp(44), height: wp(55) }}
      className="flex justify-end relative p-4 py-6 space-y-2 mb-5"
    >
      <Image
        source={item.image}
        style={{ width: wp(44), height: wp(55), borderRadius: 35 }}
        className="absolute"
      />

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={{
          width: wp(44),
          height: hp(15),
          borderBottomLeftRadius: 35,
          borderBottomRightRadius: 35
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className="absolute bottom-0"
      />

      <TouchableOpacity
        onPress={() => toggleFavourite(!isFavourite)}
        style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
        className="absolute top-1 right-3 rounded-full p-3"
      >
        <HeartIcon size={wp(5)} color={isFavourite ? 'red' : 'white'} />
      </TouchableOpacity>

      <Text style={{ fontSize: wp(4) }} className="text-white font-semibold">
        {item.title}
      </Text>
    </TouchableOpacity>
  )
}

export default RecipeCard
