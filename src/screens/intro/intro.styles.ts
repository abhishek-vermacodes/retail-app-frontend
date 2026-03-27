import { StyleSheet } from "react-native";

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
    marginTop: -54,
  },
  badge: {
    backgroundColor: '#ffded4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 12,
    color: '#ff5b27',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: -2
  },
  title: {
    fontSize: 26,
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
    // marginBottom: 20,
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
    fontSize: 12,
    color: '#000000a3',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    marginBottom: 30,
  },
});

export default styles