import { Dimensions, StyleSheet } from 'react-native';
import { responsive } from '../../theme/responsive';
const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f0',
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
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ffe3d9',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchText: {
    fontFamily: 'Poppins-Regular',
    color: '#000',
    marginBottom: -3,
  },
  categoryContainer: {
    paddingBottom: 20,
    paddingHorizontal: 20,
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
  scrollView: {
    paddingBottom: 160,
    paddingHorizontal: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 10,
    width: '100%',
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
  productImageContainer: {
    alignItems: 'center',
    borderRadius: 10,
  },
  productImage: {
    width: '100%',
 height: screenWidth > 500
      ? responsive.height(160)
      : responsive.height(150),
    resizeMode: 'cover',
    borderRadius: 10,
  },
  productContentContainer: {
    flexDirection: 'column',
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#ff5b27',
  },
  productcategory: {
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
    color: '#000000a3',
    marginTop: -2,
  },
  productSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#ff5b27',
  },
  stockBadge: {
    backgroundColor: '#dddddd',
    paddingVertical: 2,
    paddingHorizontal: 6,
    width: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  stockText: {
    marginTop: 2,
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
  },
  outOfStockStatus: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#ff0000',
  },
  lowStockStatus: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#fda500',
  },
  inStockStatus: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#277a00',
  },
});

export default styles;
