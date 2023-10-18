import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'

function DetailScreen(props) {
  const [isFavourite, toggleFavourite] = useState(false)

  const item = props.route.params
  const navigation = useNavigation()

  return (
    <View className="bg-white flex-1">
      <Image source={item.image} style={{ width: wp(100), height: hp(45) }} />
      <StatusBar style={'light'} />

      <SafeAreaView className="flex-row justify-between items-center w-full absolute mt-5">
        <TouchableOpacity
          className="p-2 rounded-full ml-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 rounded-full mr-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
          onPress={() => toggleFavourite(!isFavourite)}
        >
          <HeartIcon size={wp(7)} strokeWidth={4} color="white" />
        </TouchableOpacity>
      </SafeAreaView>

      <View
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="px-5 flex flex-1 justify-between bg-white pt-8 -mt-14"
      >
        <ScrollView showsVerticalScrollIndicator={false} className="space-y-5">
          <View className="flex-row justify-between items-start">
            <Text
              style={{ fontSize: wp(7) }}
              className="font-bold flex-1 text-neutral-700"
            >
              {item.title}
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default DetailScreen
