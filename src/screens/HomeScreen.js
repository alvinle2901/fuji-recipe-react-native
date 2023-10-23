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
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { FunnelIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { StatusBar } from 'expo-status-bar'
import { db } from '../../firebase.config'
import { collection, getDocs } from 'firebase/firestore'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

import Recipes from '../components/Recipes'

const HomeScreen = () => {
  const navigation = useNavigation()
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState([])

  // handle search function
  const handleSearchTerm = (text) => {
    setSearchTerm(text)

    if (text != '') {
      setData([
        ...data.filter((item) =>
          item.title.toLowerCase().includes(text.toLowerCase())
        )
      ])
    } else {
      setData(searchData)
    }

    // setFiltered(feeds?.feeds.filter((item) => item.title.includes(text)));
  }
  // fetch data from firebase
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'FujiRecipe'))
    const recipes = []
    querySnapshot.forEach((doc) => {
      const recipe = doc.data()
      recipes.push({
        film_simulation: recipe.film_simulation,
        dynamic_range: recipe.dynamic_range,
        white_balance: recipe.white_balance,
        color: recipe.color,
        highlight: recipe.highlight,
        shadow: recipe.shadow,
        sharpness: recipe.sharpness,
        noise_reduction: recipe.noise_reduction,
        grain_effect: recipe.grain_effect,
        color_chrome_fx: recipe.color_chrome_fx,
        iso: recipe.iso,
        exposure_compensation: recipe.exposure,
        red: recipe.red,
        blue: recipe.blue,
        images: recipe.images,
        title: recipe.title,
        temp: recipe.temp,
        favorite: recipe.favorite,
        id: doc.id
      })
    })
    setData(recipes)
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchData() // Fetch or update data every time the screen is focused
    }, [])
  )

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar />
      <ScrollView showsVerticalScrollIndicator={false} className="space-y-6">
        <View className="mx-4 flex-row justify-between items-center mt-4 -mb-1">
          {/* Title */}
          <Text
            style={{ fontSize: wp(12.5), fontFamily: 'fin_thin', color: 'black' }}
          >
            fujifilm recipes
          </Text>
          {/* Add */}
          <TouchableOpacity
            className="p-3 rounded-full"
            style={{ backgroundColor: '#f0eff2' }}
            onPress={() => navigation.navigate('Add')}
          >
            <Image
              source={require('../../assets/focus.png')}
              style={{ height: wp(5), width: wp(5)}}
            ></Image>
          </TouchableOpacity>
        </View>
        {/* Search Bar */}
        <View className="flex-row items-center justify-between px-4 pb-2 w-full space-x-6">
          <View className="px-4 py-2 bg-[#f0eff2] rounded-xl flex-1 flex-row items-center justify-center space-x-2">
            <MagnifyingGlassIcon name="search" size={20} color="#7f7f7f" />
            <TextInput
              className="text-base text=[#555] flex-1"
              placeholder="Search..."
              value={searchTerm}
              onChangeText={handleSearchTerm}
            />
          </View>
          <TouchableOpacity className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#f0eff2]">
            <FunnelIcon name="filter" size={20} color="#7f7f7f" />
          </TouchableOpacity>
        </View>
        {/* Recipes */}
        <View>
          <Recipes data={data} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen
