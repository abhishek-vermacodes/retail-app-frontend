import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

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
    gap: 10,
  },
  productSubContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productNameContainer: {
    flexDirection: 'column',
  },
  productName: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 14,
  },
  decreamentBtn: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ffe3d9',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 30,
  },
  increamentBtn: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff5b27',
    borderRadius: 30,
  },
  quantityText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginBottom: -2,
  },
  descritpionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  // nameContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  // productTitle: {
  //   fontFamily: 'Poppins-Bold',
  //   fontSize: 20,
  // },
  // productPrice: {
  //   fontSize: 16,
  //   fontFamily: 'Poppins-SemiBold',
  //   color: '#ff5b27',
  // },
  // stockContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   gap: 10,
  // },
  // stockStatusBadge: {
  //   backgroundColor: '#277a0022',
  //   paddingVertical: 6,
  //   paddingHorizontal: 14,
  //   borderRadius: 8,
  // },
  // stockStatusBadgeText: {
  //   color: '#277a00',
  //   fontFamily: 'Poppins-Medium',
  //   fontSize: 12,
  // },
  // stockBadge: {
  //   backgroundColor: '#dddddd',
  //   paddingVertical: 6,
  //   paddingHorizontal: 14,
  //   borderRadius: 8,
  // },
  // stockBadgeText: {
  //   fontFamily: 'Poppins-Medium',
  //   fontSize: 12,
  // },
  // infoGrid: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   gap: 12,
  //   marginTop: 16,
  // },
  // infoCard: {
  //   width: '48%',
  //   backgroundColor: '#fff',
  //   borderRadius: 12,
  //   padding: 12,
  // },
  // infoLabel: {
  //   fontSize: 12,
  //   color: '#000000a3',
  //   fontFamily: 'Poppins-Regular',
  // },
  // infoValue: {
  //   fontSize: 14,
  //   fontFamily: 'Poppins-SemiBold',
  //   marginTop: 4,
  // },
  // sectionTitle: {
  //   fontSize: 16,
  //   fontFamily: 'Poppins-SemiBold',
  //   marginTop: 20,
  // },
  // description: {
  //   fontSize: 13,
  //   color: '#000000a3',
  //   marginTop: 6,
  //   lineHeight: 20,
  //   fontFamily: 'Poppins-Regular',
  // },
  // actionRow: {
  //   flexDirection: 'row',
  //   gap: 12,
  //   marginTop: 20,
  //   marginBottom: 40,
  // },
  // moreBtn: {
  //   flex: 1,
  //   backgroundColor: '#ffe3d9',
  //   paddingVertical: 14,
  //   borderRadius: 30,
  //   alignItems: 'center',
  // },
  // moreText: {
  //   color: '#ff5b27',
  //   fontFamily: 'Poppins-SemiBold',
  // },
  // editBtn: {
  //   flex: 1,
  //   backgroundColor: '#ff5b27',
  //   paddingVertical: 14,
  //   borderRadius: 30,
  //   alignItems: 'center',
  // },
  // editText: {
  //   color: '#fff',
  //   fontFamily: 'Poppins-SemiBold',
  // },

  // headerContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   gap: 20,
  //   marginBottom: 10,
  //   position: 'relative',
  // },
  // menuBtn: {
  //   position: 'absolute',
  //   right: 0,
  // },

  // productImage: {
  //   width: '100%',
  //   height: 260,
  //   borderRadius: 20,
  //   marginTop: 10,
  // },

  // titleRow: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginTop: 16,
  // },
  // productName: {
  //   fontFamily: 'Poppins-Bold',
  //   fontSize: 20,
  // },
  // price: {
  //   fontSize: 18,
  //   fontFamily: 'Poppins-SemiBold',
  //   color: '#ff5b27',
  // },

  // statusRow: {
  //   flexDirection: 'row',
  //   gap: 10,
  //   marginTop: 6,
  //   alignItems: 'center',
  // },

  // stockStatusBadge: {
  //   backgroundColor: '#277a0022',
  //   paddingVertical: 6,
  //   paddingHorizontal: 14,
  //   borderRadius: 8,
  // },
  // stockStatusBadgeText: {
  //   color: '#277a00',
  //   fontFamily: 'Poppins-Medium',
  //   fontSize: 12,
  // },
  // stockBadge: {
  //   backgroundColor: '#dddddd',
  //   paddingVertical: 6,
  //   paddingHorizontal: 14,
  //   borderRadius: 8,
  // },
  // stockBadgeText: {
  //   fontFamily: 'Poppins-Medium',
  //   fontSize: 12,
  // },

  // infoGrid: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   gap: 12,
  //   marginTop: 16,
  // },
  // infoCard: {
  //   width: '48%',
  //   backgroundColor: '#fff',
  //   borderRadius: 12,
  //   padding: 12,
  // },
  // infoLabel: {
  //   fontSize: 12,
  //   color: '#000000a3',
  //   fontFamily: 'Poppins-Regular',
  // },
  // infoValue: {
  //   fontSize: 14,
  //   fontFamily: 'Poppins-SemiBold',
  //   marginTop: 4,
  // },

  // sectionTitle: {
  //   fontSize: 16,
  //   fontFamily: 'Poppins-SemiBold',
  //   marginTop: 20,
  // },
  // description: {
  //   fontSize: 13,
  //   color: '#000000a3',
  //   marginTop: 6,
  //   lineHeight: 20,
  //   fontFamily: 'Poppins-Regular',
  // },

  // variantRow: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingVertical: 10,
  //   borderBottomWidth: 1,
  //   borderColor: '#eee',
  // },
  // variantText: {
  //   fontSize: 14,
  //   fontFamily: 'Poppins-Regular',
  // },
  // variantStock: {
  //   fontSize: 14,
  //   color: '#000000a3',
  //   fontFamily: 'Poppins-Regular',
  // },

  // actionRow: {
  //   flexDirection: 'row',
  //   gap: 12,
  //   marginTop: 20,
  //   marginBottom: 40,
  // },
  // moreBtn: {
  //   flex: 1,
  //   backgroundColor: '#ffe3d9',
  //   paddingVertical: 14,
  //   borderRadius: 30,
  //   alignItems: 'center',
  // },
  // moreText: {
  //   color: '#ff5b27',
  //   fontFamily: 'Poppins-SemiBold',
  // },
  // editBtn: {
  //   flex: 1,
  //   backgroundColor: '#ff5b27',
  //   paddingVertical: 14,
  //   borderRadius: 30,
  //   alignItems: 'center',
  // },
  // editText: {
  //   color: '#fff',
  //   fontFamily: 'Poppins-SemiBold',
  // },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 40,
    position: 'absolute',
    bottom: 0,
  },
  cartButton: {
    height: 60,
    width: '100%',
    backgroundColor: '#ff5b27',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  cartButtonText: {
    fontFamily: 'Poppins-Medium',
    color: '#fff',
    marginBottom: -2,
  },
});

export default styles;
