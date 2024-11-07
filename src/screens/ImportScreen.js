import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  ChevronLeftIcon,
  FunnelIcon,
  MagnifyingGlassIcon
} from 'react-native-heroicons/outline';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import FilterBottomSheet from '../components/FilterBottomSheet';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRESETS } from '../graphql/queries/preset.query';
import Imports from '../components/Imports';
import { checkBW, getTemp, updateGrain } from '../utils/string';

const ImportScreen = () => {
  const { loading, error, data } = useQuery(GET_ALL_PRESETS);

  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFilm, setFilterFilm] = useState('');
  const [filterSensor, setFilterSensor] = useState('');
  const [filterBar, setFilterBar] = useState(false);
  const [checkedFav, setCheckedFav] = useState(null);
  const [checkedBW, setCheckedBW] = useState(null);
  const [checkedColor, setCheckedColor] = useState(null);

  // handle search function
  const handleSearchTerm = (text) => {
    setSearchTerm(text);

    if (text != '') {
      setRecipes([
        ...fetchedData.filter((item) =>
          item.title.toLowerCase().includes(text.toLowerCase())
        )
      ]);
    } else {
      setRecipes(fetchedData);
    }
  };

  useEffect(() => {
    if (data && data.getAllPresets) {
      fetchData();
    }
  }, [data]);

  const fetchData = async () => {
    const recipes = [];
    const recipeList = data.getAllPresets;

    recipeList.forEach((recipe) => {
      const grain = updateGrain(
        recipe.settings.grainEffect.strength,
        recipe.settings.grainEffect.size
      );
      const bw = checkBW(recipe.settings.filmSimulation);
      const iso =
        recipe.settings.iso.mode + ', up to ' + recipe.settings.iso.maxIso;

      const temp = recipe.settings.whiteBalance.mode.endsWith('K')
        ? getTemp(recipe.settings.whiteBalance.mode)
        : 0;

      const wb = recipe.settings.whiteBalance.mode.endsWith('K')
        ? 'Color Temperature'
        : recipe.settings.whiteBalance.mode;

      recipes.push({
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
        color_chrome_fx: recipe.settings.color_chrome_fx,
        color_chrome_fx_blue: recipe.settings.color_chrome_fx_blue,
        iso: iso,
        exposure_compensation: recipe.settings.exposure_compensation?.max,
        red: recipe.settings.whiteBalance.redShift,
        blue: recipe.settings.whiteBalance.blueShift,
        images: recipe.images,
        title: recipe.name,
        temp: temp,
        favorite: false,
        bw: bw,
        db_id: recipe.id
      });
    });
    setRecipes(recipes);
    setFetchedData(recipes);
  };

  // if (loading) return <Text>Loading...</Text>;
  // if (error) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="items-center mb-3 mt-4 justify-between flex-row">
        <TouchableOpacity
          className="p-2 h-9 ml-3"
          style={{ backgroundColor: 'white' }}
          onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={wp(6)} color="black" />
        </TouchableOpacity>
        <Text
          style={{ fontSize: wp(8.5), fontFamily: 'fin_thin' }}
          className="font-semibold text-neutral-700">
          Import Recipe
        </Text>
        <TouchableOpacity className="p-2 h-9 mr-6"></TouchableOpacity>
      </View>
      {/* Search Bar */}
      <View className="flex-row items-center justify-between px-4 pb-2 w-full space-x-6 mb-3">
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
      <ScrollView showsVerticalScrollIndicator={false} className="space-y-6">
        {/* Recipes */}
        <Imports data={recipes} />
      </ScrollView>
      {/* filter bottom sheet */}
      {filterBar && (
        <FilterBottomSheet
          fetchedData={fetchedData}
          setRecipes={setRecipes}
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

export default ImportScreen;
