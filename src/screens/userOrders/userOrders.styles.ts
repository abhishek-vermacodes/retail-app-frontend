import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff5f0',
    paddingHorizontal: 20,
    paddingVertical: 50,
  },

  /* Header */
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
    zIndex: 10,
  },
  backBtn: {
    backgroundColor: 'white',
    borderColor: '#ffe3d9',
    borderWidth: 1,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#1a1a1a',
  },
  likeButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ffe3d9',
    borderWidth: 1,
    borderRadius: 20,
  },

  /* List & Loader */
  listContainer: {
    paddingBottom: 40,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loaderText: {
    marginTop: 12,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#777',
  },

  /* Order Card */
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ffe3d9',
    elevation: 3,
    shadowColor: '#ff5b27',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderDate: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#888',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontFamily: 'Poppins-Bold',
    textTransform: 'capitalize',
  },
  storeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  storeName: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#1a1a1a',
  },
  divider: {
    height: 1,
    backgroundColor: '#ffe3d9',
    marginVertical: 10,
  },

  /* Items */
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  itemImageContainer: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#fff5f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffe3d9',
    marginRight: 10,
  },
  itemImage: {
    width: '90%',
    height: '90%',
    borderRadius: 6,
    resizeMode: 'contain',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#2a2a2a',
  },
  itemQtyPrice: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },

  /* Footer */
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  paymentMethod: {
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    color: '#888',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    textTransform: 'uppercase',
  },
  totalSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  totalLabel: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  totalAmount: {
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
    color: '#ff5b27',
  },

  /* Empty State */
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    paddingHorizontal: 20,
  },
  emptyIconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ffe7dd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ff5b27',
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#777',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
  },
  shopNowBtn: {
    backgroundColor: '#ff5b27',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    elevation: 2,
    shadowColor: '#ff5b27',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  shopNowText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    marginBottom: -2,
  },
});

export default styles;
