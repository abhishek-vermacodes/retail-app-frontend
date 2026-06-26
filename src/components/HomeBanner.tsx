import React, { useRef, useEffect, useState } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const bannerWidth = width - 40; // Parent container has paddingHorizontal: 20

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
    <View style={styles.mainContainer}>
      <FlatList
        ref={flatListRef}
        data={banners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        onMomentumScrollEnd={e => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / bannerWidth);
          setIndex(newIndex);
        }}
        renderItem={({ item }) => (
          <Image source={item} style={[styles.banner, { width: bannerWidth }]} />
        )}
        style={{ width: bannerWidth }}
      />

      <View style={styles.dotsContainer}>
        {banners.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              index === i ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default HomeBanner;

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    // Premium soft shadow to elevate the banner card
    shadowColor: '#ff5b27',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
    position: 'relative',
    height: 180,
  },
  banner: {
    height: 180,
    resizeMode: 'cover',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  inactiveDot: {
    width: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeDot: {
    width: 18,
    backgroundColor: '#ffffff',
  },
});
