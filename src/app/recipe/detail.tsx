import React, { useState } from 'react';
import Toast from 'react-native-root-toast';

import { Stack, router } from 'expo-router';

import BottomSheet from '@gorhom/bottom-sheet';

import { ImageCarousel } from '@/components/image-carousel';
import { DetailItem } from '@/components/recipe';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from '@/components/ui';
import { Icons } from '@/components/ui/icons';
import { hp, wp } from '@/lib/dimensions';
import {
  useDeleteRecipe,
  useNavigationProps,
  useSaveRecipe,
  useUpdateRecipeField,
} from '@/lib/hooks';
import { updateWB } from '@/lib/string';
import { DetailScreenProps } from '@/types';

const DetailScreen = () => {
  const { getScreenProps, setScreenProps } = useNavigationProps();
  const screenProps = getScreenProps<DetailScreenProps>('detail');
  const { item, isImported, isDataToImport } = screenProps.data;

  const saveRecipe = useSaveRecipe();
  const deleteRecipe = useDeleteRecipe();
  const updateRecipeFieldMutation = useUpdateRecipeField();

  const [isFavourite, toggleFavourite] = useState(item.favorite);
  const [imported, setImported] = useState(isImported);
  const [func, setFunc] = useState(false);
  const [dialog, setDialog] = useState(false);

  const renderedDetailItems = [];

  // delete item
  const handleDeleteRecipe = (item) => {
    deleteRecipe.mutate(item.id);
    Toast.show('Delete successfully!', {
      duration: Toast.durations.SHORT,
      backgroundColor: 'white',
      textColor: 'black',
    });
    setDialog(false);

    router.push('/');
  };

  // update favorite item
  const updateFavorite = async (state: boolean) => {
    updateRecipeFieldMutation.mutate({
      id: item.id,
      field: 'favorite',
      value: state,
    });
  };

  // handle save recipe
  const handleSaveRecipe = () => {
    const newRecipe = {
      id: `id_${Date.now()}`,
      ...item,
    };
    saveRecipe.mutate(newRecipe);
    setImported(true);
    Toast.show('Recipe Imported!', {
      duration: Toast.durations.SHORT,
      backgroundColor: 'white',
      textColor: 'black',
    });
  };

  // handle navigating to Edit screen
  const handleEditNavigation = () => {
    const dataToNavigate = { item: item };
    setScreenProps('edit', { data: dataToNavigate });
    router.push('/recipe/edit');
  };

  // render item details
  for (const [key, value] of Object.entries(item)) {
    if (key == 'white_balance') {
      const whiteBalance = updateWB(item.white_balance, item.blue, item.red, item.temp);
      renderedDetailItems.push(<DetailItem title={key} detail={whiteBalance} key={key} />);
    } else if (
      key == 'red' ||
      key == 'blue' ||
      key == 'images' ||
      key == 'title' ||
      key == 'temp' ||
      key == 'id' ||
      key == 'favorite' ||
      key == 'bw' ||
      key == 'db_id' ||
      value === undefined ||
      value === null
    ) {
      continue;
    } else {
      renderedDetailItems.push(<DetailItem title={key} detail={value} key={key} />);
    }
  }

  return (
    <View className="bg-white flex-1">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Images Carousel */}
      <ImageCarousel item={item} />

      {/* Header Buttons */}
      <View className="flex-row justify-between w-full absolute mt-10">
        {/* Back button */}
        <TouchableOpacity
          className="p-2 h-10 rounded-full ml-4 bg-white"
          onPress={() => router.back()}
        >
          <Icons.back size={wp(6)} color="black" />
        </TouchableOpacity>

        {/* Favorite */}
        {!isDataToImport && (
          <View>
            <TouchableOpacity
              className="p-2 rounded-full bg-white"
              onPress={() => {
                toggleFavourite(!isFavourite);
                updateFavorite(!isFavourite);
              }}
            >
              <Icons.heart size={wp(6)} color={isFavourite ? 'red' : 'black'} />
            </TouchableOpacity>
          </View>
        )}

        {/* Options */}
        {!isDataToImport ? (
          <View>
            <TouchableOpacity
              className="p-2 rounded-full mr-4 bg-white"
              onPress={() => setFunc(!func)}
            >
              <Icons.more size={wp(6)} color="black" />
            </TouchableOpacity>
            {func && (
              <>
                {/* Edit */}
                <TouchableOpacity
                  className="p-2 rounded-full mr-4 mt-1"
                  style={{ backgroundColor: 'white' }}
                  onPress={handleEditNavigation}
                >
                  <Icons.edit size={wp(6)} color="black" />
                </TouchableOpacity>
                {/* Delete */}
                <TouchableOpacity
                  className="p-2 rounded-full mr-4 mt-1"
                  style={{ backgroundColor: 'white' }}
                  onPress={() => setDialog(true)}
                >
                  <Icons.delete size={wp(6)} color="black" />
                  <Modal
                    title={'Recipe Delete'}
                    description={'Do you want to delete this recipe? You cannot undo this action.'}
                    visible={dialog}
                    setVisible={setDialog}
                    handler={() => handleDeleteRecipe(item)}
                    handlerLabel={'Delete'}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
        ) : (
          <>
            {!imported && (
              <TouchableOpacity
                className="p-2 rounded-full mr-4 bg-white"
                onPress={() => {
                  handleSaveRecipe();
                }}
              >
                <Icons.import size={wp(6)} color={'black'} />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
      {/* Bottom Sheet */}
      <BottomSheet style={styles.bottomSheet} snapPoints={[hp(100) - wp(123), hp(75)]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{ fontSize: wp(7) }} className="font-bold flex-1 text-neutral-700 mb-4 mt-3">
            {item.title}
          </Text>
          {renderedDetailItems}
        </ScrollView>
      </BottomSheet>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  bottomSheet: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flex: 1,
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
});
