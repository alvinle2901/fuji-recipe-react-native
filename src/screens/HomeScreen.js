import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

import Recipes from '../components/Recipes'
import { StatusBar } from 'expo-status-bar'

const HomeScreen = () => {
  const navigation = useNavigation()

  const [searchTerm, setSearchTerm] = useState('')
  const handleSearchTerm = (text) => {
    setSearchTerm(text)

    // setFiltered(feeds?.feeds.filter((item) => item.title.includes(text)));
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar />
      <ScrollView showsVerticalScrollIndicator={false} className="space-y-6">
        {/* avatar */}
        <View className="mx-5 flex-row justify-between items-center mb-3 mt-6">
          <Text
            style={{ fontSize: wp(6) }}
            className="font-bold text-neutral-700"
          >
            Fujifilm Recipes
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Add')}>
            <Image
              source={require('../../assets/focus.png')}
              style={{ height: wp(8), width: wp(8) }}
            ></Image>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-between px-4 py-2 w-full space-x-6">
          <View className="px-4 py-2 bg-[#f0eff2] rounded-xl flex-1 flex-row items-center justify-center space-x-2">
            <MaterialIcons name="search" size={24} color="#7f7f7f" />
            <TextInput
              className="text-base text=[#555] flex-1"
              placeholder="Search here..."
              value={searchTerm}
              onChangeText={handleSearchTerm}
            />
          </View>

          <TouchableOpacity className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#f0eff2]">
            <FontAwesome name="filter" size={24} color="#7f7f7f" />
          </TouchableOpacity>
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
