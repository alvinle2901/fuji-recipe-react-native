import {
  Animated,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native'
import React, { useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeftIcon, HeartIcon, PencilSquareIcon } from 'react-native-heroicons/solid'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

import DetailItem from '../components/DetailItem'

function DetailScreen(props) {
  const navigation = useNavigation()
  const item = props.route.params

  const [isFavourite, toggleFavourite] = useState(false)
  const scrollY = useRef(new Animated.Value(0)).current

  const renderedDetailItems = []
  const ITEM_HEIGHT = wp(130)

  for (const [key, value] of Object.entries(item.specs)) {
    renderedDetailItems.push(<DetailItem title={key} detail={value} />)
  }

  return (
    <View className="bg-white flex-1">
      <StatusBar style={'light'} />

      <View style={{ height: ITEM_HEIGHT, overflow: 'hidden' }}>
        <Animated.FlatList
          data={item.images}
          keyExtractor={(_, index) => index.toString()}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate={'fast'}
          showsVerticalScrollIndicator={false}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          renderItem={({ item }) => {
            return (
              <View>
                <Image
                  source={item}
                  style={{ width: wp(100), height: hp(65) }}
                />
              </View>
            )
          }}
        />
        <View className="absolute" style={{ top: ITEM_HEIGHT / 2, left: 15 }}>
          {item.images.map((_, index) => {
            return <View key={index} style={styles.dot} />
          })}
          <Animated.View
            style={[
              styles.dotIndicator,
              {
                transform: [
                  {
                    translateY: Animated.divide(scrollY, wp(130)).interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 16]
                    })
                  }
                ]
              }
            ]}
          />
        </View>
      </View>
      {/* Header Button */}
      <SafeAreaView className="flex-row justify-between items-center w-full absolute mt-4">
        <TouchableOpacity
          className="p-2 rounded-full ml-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={wp(6)} strokeWidth={4} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 rounded-full mr-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
          onPress={() => toggleFavourite(!isFavourite)}
        >
          <HeartIcon size={wp(6)} strokeWidth={4} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 rounded-full mr-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
          onPress={() => navigation.navigate('Edit', { ...item })}
        >
          <PencilSquareIcon size={wp(6)} strokeWidth={4} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
      {/* Bottom Sheet */}
      <BottomSheet
        style={styles.bottomSheet}
        snapPoints={[hp(100) - wp(123), hp(75)]}
      >
        <BottomSheetScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{ fontSize: wp(7) }}
            className="font-bold flex-1 text-neutral-700 mb-4 mt-3"
          >
            {item.title}
          </Text>
          {renderedDetailItems}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  bottomSheet: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flex: 1,
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 8
  },
  dotIndicator: {
    width: 16,
    height: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'white',
    position: 'absolute',
    top: -4,
    left: -4
  }
})
