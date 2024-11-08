import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { CheckIcon, InboxArrowDownIcon } from 'react-native-heroicons/outline';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { useNavigation } from '@react-navigation/native';

import { useSaveRecipe } from '../hooks/useRecipe';

const RecipeImport = ({ item, isImported }) => {
  const navigation = useNavigation();
  const saveRecipe = useSaveRecipe();

  const handleSaveRecipe = () => {
    const newRecipe = {
      id: `id_${Date.now()}`,
      ...item,
    };
    saveRecipe.mutate(newRecipe);
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Detail', { item: item, isDataToImport: true, isImported: isImported })
      }
      className="flex-row p-2 bg-white w-full border-gray-100 border-b items-center justify-between"
    >
      <View className="flex-row">
        <Image
          source={{ uri: item.images[0] }}
          style={{ width: 60, height: 60 }}
          className="rounded-lg mr-2"
        />
        <View>
          <Text style={{ fontSize: wp(4) }} className="text-black font-semibold">
            {item.title}
          </Text>
          <Text style={{ fontSize: wp(3) }} className="text-gray-500">
            {item.sensor}
          </Text>
        </View>
      </View>

      {isImported ? (
        <TouchableOpacity className="p-2 h-9 ml-3">
          <CheckIcon size={wp(6)} color="green" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="p-2 h-9 ml-3"
          style={{ backgroundColor: 'white' }}
          onPress={() => {
            handleSaveRecipe();
          }}
        >
          <InboxArrowDownIcon size={wp(6)} color="grey" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default RecipeImport;
