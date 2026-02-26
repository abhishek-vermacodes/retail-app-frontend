import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    position: 'relative',
    zIndex: 10,
  },
  subHeader: {
    flexDirection: 'row',
    gap: 20,
  },
  backBtn: {
    borderColor: '#bbb',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 50,
  },
  pageTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  searchBtn: {
    position: 'absolute',
    right: 0,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ffe3d9',
    borderRadius: 50,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginTop: 20,
  },
  searchText: {
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  scrollContent: {
    paddingBottom: 200,
  },

  subContainer: {
    paddingHorizontal: 20,
  },
  storeBanner: {
    height: 280,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ffe3d9',
    backgroundColor: '#fff',
    position: 'relative',
    marginTop: 20,
    marginBottom: 20,
  },
  storeImgContainer: {
    height: '60%',
    width: 'auto',
  },
  storeImg: {
    height: '100%',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  storeContentContainer: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'column',
    borderRadius: 20,

    gap: 6,
    backgroundColor: '#fff',
  },
  storeContentSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storeName: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#ff6a32',
  },
  storeCategory: {
    backgroundColor: '#ff6a32',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeCatgoryText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#fff',
    marginBottom: -1,
  },
  storeAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  storeLocationIcon: {
    marginLeft: -2,
    marginTop: -4,
  },
  storeAddress: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  categoryContainer: {
    paddingBottom: 20,
  },
  categoryBtn: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ffe3d9',
  },
  categoryBtnActive: {
    backgroundColor: '#ff5b27',
    borderColor: '#ff5b27',
  },
  categoryText: {
    fontSize: 12,
    color: '#000000a3',
    fontFamily: 'Poppins-Regular',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 14,
  },
  productCard: {
    width: '48%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ffe3d9',
    borderRadius: 12,
    padding: 10,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 168,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#ff5b27',
  },
  productPrice: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#ff5b27',
  },
});

export default styles;
