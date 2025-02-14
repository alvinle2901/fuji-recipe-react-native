import React, { useState } from 'react';
import { router } from 'expo-router';

import { hp, wp } from '@/lib/dimensions';
import { useNavigationProps, useUpdateRecipeField } from '@/lib/hooks';
import { Recipe } from '@/types';

import { Image, Text, TouchableOpacity, LinearGradient } from '../ui';
import { Icons } from '../ui/icons';

type RecipeCardProps = {
  recipe: Recipe;
};

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { setScreenProps } = useNavigationProps();
  const [isFavourite, toggleFavourite] = useState(recipe.favorite);

  const updateRecipeFieldMutation = useUpdateRecipeField();
  // update favorite
  const updateFavorite = async (state: boolean) => {
    updateRecipeFieldMutation.mutate({
      id: recipe.id,
      field: 'favorite',
      value: state,
    });
  };

  // handle navigate to Detail screen
  const handleNavigation = () => {
    const dataToNavigate = { item: recipe, isDataToImport: false };
    setScreenProps('detail', { data: dataToNavigate });

    router.push('/recipe/detail');
  };

  return (
    <TouchableOpacity
      onPress={handleNavigation}
      style={{ width: wp(44), height: hp(30) }}
      className="flex justify-end relative p-4 py-6 space-y-2 mb-4"
    >
      <Image
        source={{ uri: recipe.images[0] }}
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
        className="absolute top-3 right-3 rounded-full p-2 bg-white"
        onPress={() => {
          toggleFavourite(!isFavourite);
          updateFavorite(!isFavourite);
        }}
      >
        <Icons.heart size={wp(5)} color={recipe.favorite ? 'red' : 'black'} />
      </TouchableOpacity>

      <Text style={{ fontSize: wp(4) }} className="text-white font-semibold">
        {recipe.title}
      </Text>
    </TouchableOpacity>
  );
};
