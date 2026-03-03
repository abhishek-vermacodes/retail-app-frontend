import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from './intro.styles';

const SLIDES = [
  {
    id: '1',
    title: 'Manage Your Shop Like\na Pro',
    subtitle:
      'Track inventory, manage employees, and analyze sales performance all in one place.',
  },
  {
    id: '2',
    title: 'Track Sales in Real Time',
    subtitle:
      'Monitor daily sales, profits, and trends to make smarter decisions.',
  },
  {
    id: '3',
    title: 'Grow Your Business Faster',
    subtitle: 'Powerful insights and tools designed for modern retailers.',
  },
];

const Intro = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<any>();
  const [activeIndex, setActiveIndex] = useState(0);

  const CARD_PADDING = 24;
  const SLIDE_WIDTH = width - CARD_PADDING * 2;

  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems?.length) {
      setActiveIndex(viewableItems[0].index ?? 0);
    }
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Image
        source={require('../assets/images/intro.jpg')}
        style={styles.image}
      />

      <View style={styles.card}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Retail Pro</Text>
        </View>

        <FlatList
          data={SLIDES}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          style={{ height: 140 }}
          contentContainerStyle={{
            alignContent: 'center',
          }}
          renderItem={({ item }) => (
            <View style={{ width: SLIDE_WIDTH, alignItems: 'center' }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
          )}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        />

        <View style={styles.dots}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === activeIndex && styles.activeDot]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Signin')}
        >
          <Text style={styles.secondaryButtonText}>
            I already have an account
          </Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          By continuing you agree to our Terms of Service.
        </Text>
      </View>
    </View>
  );
};

export default Intro;

