import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  backBtn: {
    backgroundColor: 'white',
    borderColor: '#ffe3d9',
    borderWidth: 1,
    height: 40,
    width: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  likeButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ffe3d9',
    borderWidth: 1,
    borderRadius: 30,
  },
  scrollView: {
    paddingBottom: 160,
    paddingHorizontal: 20,
  },
  productMainContainer: {
    margin: 0,
  },
  productImgContainer: {
    width: '100%',
    height: 360,
    resizeMode: 'center',
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ffe3d9',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  productImg: {
    width: '80%',
    height: '80%',
    borderRadius: 20,
    zIndex: 1000,
  },
  productContentContainer: {
    marginTop: 20,
    flexDirection: 'column',
  },
  productSubContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productNameContainer: {
    flexDirection: 'column',
  },
  productCategory: {
    color: '#000000a3',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  productName: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  descritpionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginBottom: 20,
  },
  offerContainer: {
    backgroundColor: '#fff5f0',
    position: 'absolute',
    bottom: -20,
    right: 26,
    padding: 4,
    borderRadius: 30,
  },
  offer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 30,
    backgroundColor: '#ff5b27',
  },
  offerText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    marginBottom: -3,
    color: '#fff',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceSubContainer: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Poppins-Medium',
    color: '#000000a3',
    fontSize: 14,
    marginBottom: -4,
  },
  price: {
    textDecorationLine: 'line-through',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#000000a3',
  },
  offerPrice: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    margin: 0,
    padding: 0,
    color: '#ff5b27',
  },
  rating: {
    fontSize: 14,
    color: '#ff5b27',
    fontFamily: 'Poppins-Medium',
    marginTop: 10,
  },
});

export default styles;
