import { useRef } from 'react';

import { hp, wp } from '@/lib/dimensions';
import { Recipe } from '@/types';

import { Animated, Image, StyleSheet, View } from './ui';

type ImageCarouselProps = {
  item: Recipe;
};

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ item }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const ITEM_HEIGHT = wp(130);

  return (
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
  );
};

const styles = StyleSheet.create({
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
