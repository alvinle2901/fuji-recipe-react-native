import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FunnelIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';

import { useNavigation } from '@react-navigation/native';

import FilterBottomSheet from '../components/FilterBottomSheet';
import Recipes from '../components/Recipes';
import { useRecipes } from '../hooks/useRecipe';
import { clearAllData } from '../storage';
import { filterAndSearch } from '../utils/filter';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { data: recipes, isLoading, isError } = useRecipes();

  const [data, setData] = useState([]);
  // original data
  const [fetchedData, setFetchedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterUp, setIsFilterUp] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState({
    film: '',
    sensor: '',
    checkedFav: null,
    checkedBW: null,
    checkedColor: null,
  });

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
    setData(filterAndSearch(fetchedData, filters, text));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar />
      <View className="mx-4 flex-row justify-between items-center my-4">
        {/* Title */}
        <Text
          style={{
            fontSize: wp(12.5),
            fontFamily: 'fin_thin',
          }}
        >
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
            }}
          >
            <Image
              source={require('../../assets/import.png')}
              style={{ height: wp(5), width: wp(5) }}
            ></Image>
          </TouchableOpacity>

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
          onPress={() => setIsFilterUp(true)}
        >
          <FunnelIcon name="filter" size={20} color="#7f7f7f" />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="space-y-6"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Recipes */}
        <Recipes data={data} />
      </ScrollView>
      {/* filter bottom sheet */}
      {isFilterUp && (
        <FilterBottomSheet
          fetchedData={fetchedData}
          setData={setData}
          setIsFilterUp={setIsFilterUp}
          filters={filters}
          setFilters={setFilters}
          searchTerm={searchTerm}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
