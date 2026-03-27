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
    gap: 20,
  },
  card: {
    backgroundColor: '#fff',
    gap: 5,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffe3d9',
  },

  sectionTitle: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },

  addressName: {
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },

  addressText: {
    color: '#555',

    fontFamily: 'Poppins-Regular',
  },

 
  changeText: {
    color: '#2874f0',
    fontWeight: '600',
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    alignItems: 'center',
    gap: 10,
  },
  productImageContainer: {
    height: 60,
    width: 60,
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
  itemName: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
  },

  itemQty: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },

  itemPrice: {
    flex: 1,
    textAlign: 'right',
    fontFamily: 'Poppins-Regular',
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },

  totalText: {
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },

  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 50,
    backgroundColor: '#fff',
    elevation: 10,
  },

  totalLabel: {
    color: '#555',
    fontFamily: 'Poppins-Regular',
  },

  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  payBtn: {
    backgroundColor: '#fb641b',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  payText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
});
export default styles;
