import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  RefreshControl
} from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  FunnelIcon,
  MagnifyingGlassIcon
} from 'react-native-heroicons/outline';
import { StatusBar } from 'expo-status-bar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import Recipes from '../components/Recipes';
import FilterBottomSheet from '../components/FilterBottomSheet';
import { useRecipes } from '../hooks/useRecipe';
import { clearAllData } from '../storage/storage';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFilm, setFilterFilm] = useState('');
  const [filterSensor, setFilterSensor] = useState('');
  const [filterBar, setFilterBar] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [checkedFav, setCheckedFav] = useState(null);
  const [checkedBW, setCheckedBW] = useState(null);
  const [checkedColor, setCheckedColor] = useState(null);

  const { data: recipes, isLoading, isError } = useRecipes();

  useEffect(() => {
    if (recipes) {
      setData(recipes);
      setFetchedData(recipes);
    }
  }, [recipes]);

  // pull to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 900);
  }, []);

  // handle search function
  const handleSearchTerm = (text) => {
    setSearchTerm(text);

    if (text != '') {
      setData([
        ...fetchedData.filter((item) =>
          item.title.toLowerCase().includes(text.toLowerCase())
        )
      ]);
    } else {
      setData(fetchedData);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar />
      <View className="mx-4 flex-row justify-between items-center my-4">
        {/* Title */}
        <Text
          style={{
            fontSize: wp(12.5),
            fontFamily: 'fin_thin'
          }}>
          fujifilm recipes
        </Text>
        <View className="flex-row">
          {/* Import */}
          <TouchableOpacity
            className="p-3 rounded-full mr-1"
            style={{ backgroundColor: '#f0eff2' }}
            onPress={() => {
              navigation.navigate('Import');
              // clearAllData()
            }}>
            <Image
              source={require('../../assets/import.png')}
              style={{ height: wp(5), width: wp(5) }}></Image>
          </TouchableOpacity>

          {/* Add */}
          <TouchableOpacity
            className="p-3 rounded-full"
            style={{ backgroundColor: '#f0eff2' }}
            onPress={() => navigation.navigate('Add')}>
            <Image
              source={require('../../assets/focus.png')}
              style={{ height: wp(5), width: wp(5) }}></Image>
          </TouchableOpacity>
        </View>
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
          onPress={() => setFilterBar(true)}>
          <FunnelIcon name="filter" size={20} color="#7f7f7f" />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="space-y-6"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Recipes */}
        <Recipes data={data} />
      </ScrollView>
      {/* filter bottom sheet */}
      {filterBar && (
        <FilterBottomSheet
          fetchedData={fetchedData}
          setData={setData}
          setFilterBar={setFilterBar}
          filterSensor={filterSensor}
          setFilterSensor={setFilterSensor}
          filterFilm={filterFilm}
          setFilterFilm={setFilterFilm}
          checkedFav={checkedFav}
          setCheckedFav={setCheckedFav}
          checkedColor={checkedColor}
          setCheckedColor={setCheckedColor}
          checkedBW={checkedBW}
          setCheckedBW={setCheckedBW}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
