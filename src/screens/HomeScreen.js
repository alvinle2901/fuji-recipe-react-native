import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'

import Recipes from '../components/Recipes'

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="space-y-6">
        {/* avatar */}
        <View className="mx-5 flex-row justify-between items-center mb-4 mt-6">
          <Text
            style={{ fontSize: wp(7) }}
            className="font-bold text-neutral-700"
          >
            Let's Discover
          </Text>
          <TouchableOpacity>
            <Image
              source={require('../../assets/avatar.png')}
              style={{ height: wp(12), width: wp(12) }}
            ></Image>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="mx-5 mb-4">
          <View className="flex-row items-center bg-neutral-100 rounded-full p-4 space-x-2 pl-6">
            <MagnifyingGlassIcon size={20} strokeWidth={3} color="gray" />
            <TextInput
              placeholder="Search recipes"
              placeholderTextColor={'gray'}
              className="flex-1 text-base mb-1 pl-1 tracking-wider"
            />
          </View>
        </View>

        {/* Recipes */}
        <View>
          <Recipes />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
