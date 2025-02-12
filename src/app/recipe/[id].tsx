import React, { useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  ChevronLeftIcon,
  EllipsisVerticalIcon,
  HeartIcon,
  InboxArrowDownIcon,
  PencilSquareIcon,
  TrashIcon,
} from 'react-native-heroicons/outline';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-root-toast';

import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';

import { useDeleteRecipe, useSaveRecipe, useUpdateRecipeField } from '@/lib/hooks';
import { updateWB } from '@/lib/string';
import { DetailItem } from '@/components/recipe';
import { Modal } from '@/components/ui/modal';

function DetailScreen(props) {
  const { item, isDataToImport, isImported } = props.route.params;
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;

  const saveRecipe = useSaveRecipe();
  const deleteRecipe = useDeleteRecipe();
  const updateRecipeFieldMutation = useUpdateRecipeField();

  const [isFavourite, toggleFavourite] = useState(item.favorite);
  const [imported, setImported] = useState(isImported);
  const [func, setFunc] = useState(false);
  const [dialog, setDialog] = useState(false);

  const renderedDetailItems = [];
  const ITEM_HEIGHT = wp(130);

  // delete item
  const handleDeleteRecipe = (item) => {
    deleteRecipe.mutate(item.id);
    Toast.show('Delete successfully!', {
      duration: Toast.durations.SHORT,
      backgroundColor: 'white',
      textColor: 'black',
    });
    setDialog(false);
    navigation.navigate('Home');
  };

  // update favorite item
  const updateFavorite = async (state) => {
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
      {/* <StatusBar style={'light'} /> */}
      {/* Images Carousel */}
      <View style={{ height: ITEM_HEIGHT, overflow: 'hidden' }}>
        <Animated.FlatList
          data={item.images}
          keyExtractor={(_, index) => index.toString()}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate={'fast'}
          showsVerticalScrollIndicator={false}
          bounces={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: true,
          })}
          renderItem={({ item }) => {
            return (
              <View>
                <Image source={{ uri: item }} style={{ width: wp(100), height: hp(65) }} />
              </View>
            );
          }}
        />
        <View className="absolute" style={{ top: ITEM_HEIGHT / 2, left: 15 }}>
          {item.images.map((_, index) => {
            return <View key={index} style={styles.dot} />;
          })}
          <Animated.View
            style={[
              styles.dotIndicator,
              {
                transform: [
                  {
                    translateY: Animated.divide(scrollY, wp(130)).interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 16],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </View>
      {/* Header Buttons */}
      <View className="flex-row justify-between w-full absolute mt-10">
        {/* Back button */}
        <TouchableOpacity
          className="p-2 h-9 rounded-full ml-4"
          style={{ backgroundColor: 'white' }}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={wp(6)} color="black" />
        </TouchableOpacity>

        {/* Favorite */}
        {!isDataToImport && (
          <View>
            <TouchableOpacity
              className="p-2 h-9 rounded-full"
              style={{ backgroundColor: 'white' }}
              onPress={() => {
                toggleFavourite(!isFavourite);
                updateFavorite(!isFavourite);
              }}
            >
              <HeartIcon size={wp(6)} color={isFavourite ? 'red' : 'black'} />
            </TouchableOpacity>
          </View>
        )}

        {/* Options */}
        {!isDataToImport ? (
          <View>
            <TouchableOpacity
              className="p-2 rounded-full mr-4"
              style={{ backgroundColor: 'white' }}
              onPress={() => setFunc(!func)}
            >
              <EllipsisVerticalIcon size={wp(6)} color="black" />
            </TouchableOpacity>
            {func && (
              <>
                {/* Edit */}
                <TouchableOpacity
                  className="p-2 rounded-full mr-4 mt-1"
                  style={{ backgroundColor: 'white' }}
                  onPress={() => navigation.navigate('Edit', { ...item })}
                >
                  <PencilSquareIcon size={wp(6)} color="black" />
                </TouchableOpacity>
                {/* Delete */}
                <TouchableOpacity
                  className="p-2 rounded-full mr-4 mt-1"
                  style={{ backgroundColor: 'white' }}
                  onPress={() => setDialog(true)}
                >
                  <TrashIcon size={wp(6)} color="black" />
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
                className="p-2 h-9 rounded-full mr-4"
                style={{ backgroundColor: 'white' }}
                onPress={() => {
                  handleSaveRecipe();
                }}
              >
                <InboxArrowDownIcon size={wp(6)} color={'black'} />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
      {/* Bottom Sheet */}
      <BottomSheet style={styles.bottomSheet} snapPoints={[hp(100) - wp(123), hp(75)]}>
        <BottomSheetScrollView showsVerticalScrollIndicator={false}>
          <Text style={{ fontSize: wp(7) }} className="font-bold flex-1 text-neutral-700 mb-4 mt-3">
            {item.title}
          </Text>
          {renderedDetailItems}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

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
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  dotIndicator: {
    width: 16,
    height: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'white',
    position: 'absolute',
    top: -4,
    left: -4,
  },
});
