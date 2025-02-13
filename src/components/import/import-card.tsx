import { Image, Text, TouchableOpacity, View } from '../ui';
import { Icons } from '../ui/icons';

import { wp } from '@/lib/dimensions';
import { useSaveRecipe } from '@/lib/hooks';
import { Recipe } from '@/types';

type ImportCardProps = {
  item: Recipe;
  isImported: boolean;
};

export const ImportCard: React.FC<ImportCardProps> = ({ item, isImported }) => {
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
      onPress={
        () => {}
        // navigation.navigate('Detail', { item: item, isDataToImport: true, isImported: isImported })
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
      
      {/* Import button */}
      <TouchableOpacity
        className={`p-2 h-9 ml-3 ${isImported ? '' : 'bg-white'}`}
        onPress={!isImported ? handleSaveRecipe : undefined}
      >
        {isImported ? (
          <Icons.check size={wp(6)} color="green" />
        ) : (
          <Icons.import size={wp(6)} color="grey" />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
