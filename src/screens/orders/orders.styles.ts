import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff5f0',
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    position: 'relative',
  },
  backBtn: {
    borderColor: '#ffe3d9',
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
  categoryContainer: {
    marginTop: 20,
    paddingBottom: 20,
  },
  categoryBtn: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 24,
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
  orderContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  orderCardContainer: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#ffe3d9',
    borderWidth: 1,
    borderRadius: 16,
  },
  orderCardSubContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flexDirection: 'column',
    gap: 20,
    marginBottom: 16,
  },
  cardHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardHeaderTitle: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 2,
  },
  cardHeaderTime: {
    fontSize: 12,
    color: '#aaa',
    fontFamily: 'Poppins-Regular',
  },
  cardProfileContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardAvatarContainer: {
    height: 50,
    width: 50,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  profileName: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  items: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 12,
    color: '#aaa',
    fontFamily: 'Poppins-Regular',
  },
  cardFooter: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    marginBottom: -2,
    fontSize: 16,
    color: '#000',
    fontFamily: 'Poppins-Bold',
  },
  orderStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#277a0022',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  orderStatus: {
    fontSize: 12,
    color: '#277a00',
    fontFamily: 'Poppins-Medium',
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#ffe3d9',
  },
  scrollView: {
    paddingBottom: 200,
  },
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },

  noDataText: {
    fontSize: 14,
    color: '#aaa',
    fontFamily: 'Poppins-Regular',
  },

  /* Items List Inside Order Card */
  itemsList: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
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

  /* Order Action Buttons Container */
  actionContainer: {
    width: '100%',
    padding: 12,
    alignItems: 'center',
  },
  actionBtn: {
    backgroundColor: '#ff5b27',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Poppins-Bold',
  },
});

export default styles;
