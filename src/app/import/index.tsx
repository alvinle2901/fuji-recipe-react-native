import React, { useEffect, useState } from 'react';

import { Stack, router } from 'expo-router';

import { useQuery } from '@apollo/client';

import FilterBottomSheet from '@/components/filter-bottom-sheet';
import { ImportList } from '@/components/import';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from '@/components/ui';
import { Icons } from '@/components/ui/icons';
import { GET_ALL_PRESETS } from '@/graphql/queries/preset.query';
import { wp } from '@/lib/dimensions';
import { filterAndSearch } from '@/lib/filter';
import { checkBW, getTemp, updateGrain } from '@/lib/string';
import { Recipe } from '@/types';

const ImportScreen = () => {
  const { loading, error, data } = useQuery(GET_ALL_PRESETS);

  const [recipes, setRecipes] = useState([]);
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

  // Fetching the data
  useEffect(() => {
    if (data && data.getAllPresets) {
      fetchData();
    }
  }, [data]);

  const fetchData = async () => {
    const recipes: Recipe[] = [];
    const recipeList = data.getAllPresets;

    recipeList.forEach((recipe) => {
      const grain = updateGrain(
        recipe.settings.grainEffect.strength,
        recipe.settings.grainEffect.size
      );
      const bw = checkBW(recipe.settings.filmSimulation);
      const iso = recipe.settings.iso.mode + ', up to ' + recipe.settings.iso.maxIso;
      const temp = recipe.settings.whiteBalance.mode.endsWith('K')
        ? getTemp(recipe.settings.whiteBalance.mode)
        : 0;
      const wb = recipe.settings.whiteBalance.mode.endsWith('K')
        ? 'Color Temperature'
        : recipe.settings.whiteBalance.mode;

      recipes.push({
        id: `id_${Date.now()}`,
        film_simulation: recipe.settings.filmSimulation,
        sensor: recipe.sensor,
        dynamic_range: recipe.settings.dynamicRange,
        white_balance: wb,
        color: recipe.settings.color,
        highlight: recipe.settings.highlight,
        shadow: recipe.settings.shadow,
        sharpness: recipe.settings.sharpening,
        noise_reduction: recipe.settings.noiseReduction,
        clarity: recipe.settings.clarity,
        grain_effect: grain,
        color_chrome_fx: recipe.settings.colorChromeEffect,
        color_chrome_fx_blue: recipe.settings.colorChromeEffectBlue,
        iso: iso,
        exposure_compensation: recipe.settings.exposureCompensation?.max,
        red: recipe.settings.whiteBalance.redShift,
        blue: recipe.settings.whiteBalance.blueShift,
        images: recipe.images,
        title: recipe.name,
        temp: temp,
        favorite: false,
        bw: bw,
        db_id: recipe.id,
      });
    });
    setRecipes(recipes);
    setFetchedData(recipes);
  };

  // handle search function
  const handleSearchTerm = (text: string) => {
    setSearchTerm(text);
    setRecipes(filterAndSearch(fetchedData, filters, text));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      {/* Title */}
      <View className="items-center mb-3 mt-4 justify-between flex-row">
        <TouchableOpacity className="p-2 h-9 ml-3 bg-white" onPress={() => router.back()}>
          <Icons.back size={wp(6)} color="black" />
        </TouchableOpacity>
        <Text
          style={{ fontSize: wp(8.5), fontFamily: 'fin_thin' }}
          className="font-semibold text-neutral-700"
        >
          Import Recipe
        </Text>
        <TouchableOpacity className="p-2 h-9 mr-6"></TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="flex-row items-center justify-between px-4 pb-2 w-full space-x-6 mb-3">
        <View className="px-4 py-2 bg-[#f0eff2] rounded-xl flex-1 flex-row items-center justify-center space-x-2">
          <Icons.search size={20} color="#7f7f7f" />
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
          <Icons.filter size={20} color="#7f7f7f" />
        </TouchableOpacity>
      </View>

      {/* Recipe list */}
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} className="space-y-6">
          <ImportList importData={recipes} />
        </ScrollView>
      )}

      {/* filter bottom sheet */}
      {isFilterUp && (
        <FilterBottomSheet
          fetchedData={fetchedData}
          setData={setRecipes}
          setIsFilterUp={setIsFilterUp}
          filters={filters}
          setFilters={setFilters}
          searchTerm={searchTerm}
        />
      )}
    </SafeAreaView>
  );
};

export default ImportScreen;
