import React, { useState } from 'react';

import { LinearGradient } from 'expo-linear-gradient';

import { hp, wp } from '@/lib/dimensions';
import { useNavigationProps, useUpdateRecipeField } from '@/lib/hooks';

import { Image, Text, TouchableOpacity } from '../ui';
import { Icons } from '../ui/icons';
import { router } from 'expo-router';

export const RecipeCard = ({ item }) => {
  const { setScreenProps } = useNavigationProps();
  const [isFavourite, toggleFavourite] = useState(item.favorite);

  const updateRecipeFieldMutation = useUpdateRecipeField();
  // update favorite
  const updateFavorite = async (state: boolean) => {
    updateRecipeFieldMutation.mutate({
      id: item.id,
      field: 'favorite',
      value: state,
    });
  };

  const handleNavigation = () => {
    const dataToNavigate = { item: item, isDataToImport: false };
    setScreenProps('details', { data: dataToNavigate });

    router.push('/recipe/detail');
  };

  return (
    <TouchableOpacity
      onPress={handleNavigation}
      style={{ width: wp(44), height: hp(30) }}
      className="flex justify-end relative p-4 py-6 space-y-2 mb-4"
    >
      <Image
        source={{ uri: item.images[0] }}
        style={{ width: wp(44), height: hp(30), borderRadius: 20 }}
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
        <Icons.heart size={wp(5)} color={item.favorite ? 'red' : 'black'} />
      </TouchableOpacity>

      <Text style={{ fontSize: wp(4) }} className="text-white font-semibold">
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};
