import { wp } from '@/lib/dimensions';
import { useSaveRecipe } from '@/lib/hooks';

import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { Image, Text, TouchableOpacity, View } from '../ui';
import { Icons } from '../ui/icons';

type ImportCardProps = {
  item: any;
  isImported: boolean;
};

export const ImportCard: React.FC<ImportCardProps> = ({ item, isImported }) => {
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
          <Icons.check size={wp(6)} color="green" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="p-2 h-9 ml-3"
          style={{ backgroundColor: 'white' }}
          onPress={() => {
            handleSaveRecipe();
          }}
        >
          <Icons.import size={wp(6)} color="grey" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};
