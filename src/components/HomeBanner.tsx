import React, { useRef, useEffect, useState } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const banners = [
  require('../assets/images/intro.jpg'),
  require('../assets/images/intro.jpg'),
  require('../assets/images/intro.jpg'),
  require('../assets/images/intro.jpg'),
];

const HomeBanner = () => {
  const flatListRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % banners.length;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={banners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        onMomentumScrollEnd={e => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          setIndex(newIndex);
        }}
        renderItem={({ item }) => <Image source={item} style={styles.banner} />}
        style={styles.Container}
        contentContainerStyle={styles.flatList}
      />

      <View style={styles.dots}>
        {banners.map((_, i) => (
          <View key={i} style={[styles.dot, index === i && styles.activeDot]} />
        ))}
      </View>
    </View>
  );
};

export default HomeBanner;

const styles = StyleSheet.create({
  Container: {
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffe3d9',
  },
  banner: {
    width: 366,
    height: 180,
    resizeMode: 'cover',
    borderRadius: 12,
    marginRight: 10,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffe3d9',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#ff5b27',
  },
  flatList: {
    alignContent: 'center',
  },
});
