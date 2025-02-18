import React, { useEffect, useState } from 'react';

import { Stack, router } from 'expo-router';

import { FilterBottomSheet } from '@/components';
import { RecipeList } from '@/components/recipe';
import {
  Image,
  SafeAreaView,
  SearchBar,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from '@/components/ui';
import { Icons } from '@/components/ui/icons';

import { wp } from '@/lib/dimensions';
import { filterAndSearch } from '@/lib/filter';
import { useRecipes } from '@/lib/hooks';

const HomeScreen = () => {
  const { data: recipes, isLoading, isError } = useRecipes();

  const [data, setData] = useState([]);
  // original data
  const [fetchedData, setFetchedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterUp, setIsFilterUp] = useState(false);
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

  // handle search function
  const handleSearchTerm = (text: string) => {
    setSearchTerm(text);
    setData(filterAndSearch(fetchedData, filters, text));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar />
      <View className="m-4 flex-row justify-between items-center">
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
            className="p-3 rounded-full mr-1 bg-[#f0eff2]"
            onPress={() => {
              // clearAllData()
              router.push('./import');
            }}
          >
            <Image
              source={require('../../assets/import.png')}
              style={{ height: wp(5), width: wp(5) }}
            ></Image>
          </TouchableOpacity>

          {/* Add */}
          <TouchableOpacity
            className="p-3 rounded-full bg-[#f0eff2]"
            onPress={() => router.push('/recipe/add-recipe')}
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
        <SearchBar searchTerm={searchTerm} handleSearchTerm={handleSearchTerm} />
        <TouchableOpacity
          className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#f0eff2]"
          onPress={() => setIsFilterUp(true)}
        >
          <Icons.filter size={20} color="#7f7f7f" />
        </TouchableOpacity>
      </View>

      {/* Recipe List */}
      <RecipeList recipes={data} />

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
