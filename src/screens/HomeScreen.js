import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  StyleSheet,
  RefreshControl
} from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { FunnelIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { StatusBar } from 'expo-status-bar'
import { db } from '../../firebase.config'
import { collection, getDocs, onSnapshot, query } from 'firebase/firestore'
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView
} from '@gorhom/bottom-sheet'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { filter } from '../utils/filter'
import { filmSimulationData, sensorData } from '../constants'
import Recipes from '../components/Recipes'
import DropDownItem from '../components/DropDownItem'
import Checkbox from '../components/Checkbox'

const HomeScreen = () => {
  const navigation = useNavigation()
  const [data, setData] = useState([])
  const [fetchedData, setFetchedData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterFilm, setFilterFilm] = useState('')
  const [filterSensor, setFilterSensor] = useState('')
  const [filterBar, setFilterBar] = useState(false)
  const [checkedFav, setCheckedFav] = useState(false)
  const [checkedBW, setCheckedBW] = useState(false)
  const [checkedColor, setCheckedColor] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  // fetch data from firebase
  const fetchData = async () => {
    // const querySnapshot = await getDocs(collection(db, 'FujiRecipe'))
    const q = query(collection(db, 'FujiRecipe'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const recipes = []
      querySnapshot.forEach((doc) => {
        const recipe = doc.data()
        recipes.push({
          film_simulation: recipe.film_simulation,
          sensor: recipe.sensor,
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
          bw: recipe.bw,
          id: doc.id
        })
      })
      setData(recipes)
      setFetchedData(recipes)
    })
  }

  // handle search function
  const handleSearchTerm = (text) => {
    setSearchTerm(text)

    if (text != '') {
      setData([
        ...fetchedData.filter((item) =>
          item.title.toLowerCase().includes(text.toLowerCase())
        )
      ])
    } else {
      setData(fetchedData)
    }
  }

  // handle backdrop for bottom sheet
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    []
  )

  // handle filter function
  const handleFilter = (sensor, film, favorite, bw, color) => {
    if (
      film == '' &&
      sensor == '' &&
      favorite === false &&
      bw === false &&
      color === false
    ) {
      setData(fetchedData)
    } else {
      let result = fetchedData
      result = filter(result, film, 'film_simulation')
      result = filter(result, sensor, 'sensor')
      setData([
        ...result
          .filter((item) => item.favorite === favorite)
          .filter((item) => item.bw === bw)
      ])
    }
  }

  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    fetchData()
    setTimeout(() => {
      setRefreshing(false)
    }, 900)
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="space-y-6"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="mx-4 flex-row justify-between items-center mt-4 -mb-1">
          {/* Title */}
          <Text
            style={{
              fontSize: wp(12.5),
              fontFamily: 'fin_thin'
            }}
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
              style={{ height: wp(5), width: wp(5) }}
            ></Image>
          </TouchableOpacity>
        </View>
        {/* Search Bar */}
        <View className="flex-row items-center justify-between px-4 pb-2 w-full space-x-6 mb-5">
          <View className="px-4 py-2 bg-[#f0eff2] rounded-xl flex-1 flex-row items-center justify-center space-x-2">
            <MagnifyingGlassIcon name="search" size={20} color="#7f7f7f" />
            <TextInput
              className="text-base text=[#555] flex-1"
              placeholder="Search..."
              value={searchTerm}
              onChangeText={handleSearchTerm}
            />
          </View>
          <TouchableOpacity
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#f0eff2]"
            onPress={() => setFilterBar(true)}
          >
            <FunnelIcon name="filter" size={20} color="#7f7f7f" />
          </TouchableOpacity>
        </View>
        {/* Recipes */}
        <Recipes data={data} />
      </ScrollView>
      {/* filter bottom sheet */}
      {filterBar && (
        <BottomSheet
          style={styles.bottomSheet}
          snapPoints={[hp(60)]}
          enableOverDrag={false}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          onChange={(index) => {
            if (index == -1) {
              setFilterBar(false)
            }
          }}
        >
          <BottomSheetView>
            <View>
              <View
                className="pb-2 mb-1"
                style={{
                  borderRadius: 1,
                  borderBottomWidth: 0.7,
                  borderColor: 'grey'
                }}
              >
                <Text
                  style={{
                    fontSize: wp(10),
                    fontFamily: 'fin_thin'
                  }}
                >
                  Filter
                </Text>
              </View>
              <DropDownItem
                data={sensorData}
                icon={require('../../assets/recipe_icon/sensor.png')}
                field={'Sensor'}
                value={filterSensor}
                setValue={setFilterSensor}
              />
              <DropDownItem
                data={filmSimulationData}
                icon={require('../../assets/recipe_icon/film.png')}
                field={'Film Simulation'}
                value={filterFilm}
                setValue={setFilterFilm}
              />
              {/* Checkbox-es */}
              <View className="flex-row py-4 w-full">
                <Checkbox
                  text={'Favorite'}
                  checked={checkedFav}
                  onPress={() => {
                    setCheckedFav(!checkedFav)
                  }}
                />
              </View>
              <View
                className="flex-row w-full pb-3"
                style={{
                  borderRadius: 1,
                  borderBottomWidth: 1,
                  borderColor: '#f0eff2'
                }}
              >
                <Checkbox
                  text={'Color'}
                  checked={checkedColor}
                  onPress={() => {
                    setCheckedColor(!checkedColor)
                    setCheckedBW(checkedColor)
                  }}
                />
                <Checkbox
                  text={'B&W'}
                  checked={checkedBW}
                  onPress={() => {
                    setCheckedBW(!checkedBW)
                    setCheckedColor(checkedBW)
                  }}
                />
              </View>
              {/* Filter buttons */}
              <View className="flex-row items-center justify-center my-4 mt-4">
                <TouchableOpacity
                  className="flex-1 items-center my-2 rounded-xl bg-[#9e9ca3] py-2 mx-3"
                  onPress={() => {
                    setCheckedBW(false)
                    setCheckedColor(false)
                    setCheckedFav(false)
                    setFilterFilm('')
                    setFilterSensor('')
                  }}
                >
                  <Text
                    style={{
                      fontSize: wp(8),
                      color: 'white',
                      fontFamily: 'fin_thin'
                    }}
                  >
                    Reset
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 items-center my-2 rounded-xl bg-black py-2 mx-3"
                  onPress={() => {
                    handleFilter(
                      filterSensor,
                      filterFilm,
                      checkedFav,
                      checkedBW,
                      checkedColor
                    )
                    setFilterBar(!filterBar)
                  }}
                >
                  <Text
                    style={{
                      fontSize: wp(8),
                      color: 'white',
                      fontFamily: 'fin_thin'
                    }}
                  >
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheet>
      )}
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  bottomSheet: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flex: 1,
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20
  }
})
