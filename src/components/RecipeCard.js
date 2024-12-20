import React, { useState } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { HeartIcon } from 'react-native-heroicons/outline';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { LinearGradient } from 'expo-linear-gradient';

import { useNavigation } from '@react-navigation/native';

import { useUpdateRecipeField } from '../hooks/useRecipe';

const RecipeCard = ({ item }) => {
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(item.favorite);

  const updateRecipeFieldMutation = useUpdateRecipeField();
  // update favorite
  const updateFavorite = async (state) => {
    updateRecipeFieldMutation.mutate({
      id: item.id,
      field: 'favorite',
      value: state,
    });
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detail', { item: item, isDataToImport: false })}
      style={{ width: wp(44), height: wp(55) }}
      className="flex justify-end relative p-4 py-6 space-y-2 mb-4"
    >
      <Image
        source={{ uri: item.images[0] }}
        style={{ width: wp(44), height: wp(55), borderRadius: 20 }}
        className="absolute"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={{
          width: wp(44),
          height: hp(15),
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className="absolute bottom-0"
      />
      <TouchableOpacity
        style={{ backgroundColor: 'white' }}
        className="absolute top-1 right-3 rounded-full p-2"
        onPress={() => {
          toggleFavourite(!isFavourite);
          updateFavorite(!isFavourite);
        }}
      >
        <HeartIcon size={wp(5)} color={item.favorite ? 'red' : 'black'} />
      </TouchableOpacity>

      <Text style={{ fontSize: wp(4) }} className="text-white font-semibold">
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export default RecipeCard;
