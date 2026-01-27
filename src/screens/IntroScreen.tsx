import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

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

const IntroScreen = () => {
  const navigation = useNavigation<any>();
  const [activeIndex, setActiveIndex] = useState(0);

  const { width } = useWindowDimensions();
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
          onPress={() => navigation.navigate('MyShop')}
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

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  image: {
    width: '100%',
    height: '50%',
    resizeMode: 'cover',
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 24,
    alignItems: 'center',
    marginTop: -24,
  },
  badge: {
    backgroundColor: '#ffded4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ff5b27',
    letterSpacing: 0.5,
    fontFamily: 'Poppins-SemiBold',
  },
  title: {
    fontSize: 28,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 12,
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#000000a3',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
  dots: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 20,
    backgroundColor: '#ff5b27',
    borderRadius: 20,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#ff5b27',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    marginBottom: 16,
  },
  secondaryButtonText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  terms: {
    fontSize: 11,
    color: '#000000a3',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    marginBottom: 70,
  },
});
