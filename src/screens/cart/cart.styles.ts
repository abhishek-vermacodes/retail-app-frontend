import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
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
  scrollViewStyle: {
    paddingBottom: 160,
    paddingHorizontal: 20,
  },
  cartCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 10,
    height: 120,
    borderWidth: 1,
    borderColor: '#ffe3d9',
  },
  productImageContainer: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  productPrice: {
    fontSize: 14,
    color: '#ff5b27',
    fontFamily: 'Poppins-Bold',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  qtyBtn: {
    width: 33,
    height: 33,
    borderRadius: 30,
    backgroundColor: '#fff2ec',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#ff5b27',
    marginBottom: -2,
  },
  qtyValue: {
    marginHorizontal: 10,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  deleteAnimation: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    borderRadius: 10,
    height: 120,
  },
  emptyCartContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyCartText: {
    fontSize: 16,
    color: '#888',
  },
  summaryCard: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    
    borderWidth: 1,
    borderColor: '#ffe3d9',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#444',
  },
  value: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  total: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  checkoutBtn: {
    backgroundColor: '#ff5b27',
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  scrollWrapper: {
    height: '54%',
  },
});

export default styles;
