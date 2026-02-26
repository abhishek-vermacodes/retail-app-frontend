import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F0',
    paddingVertical: 70,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    marginLeft: -6,
    gap: 4,
  },
  priLocationText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  },
  secLocationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  profileContainer: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 30,
    backgroundColor: '#ff6a32',
  },
  avatarText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#ffe3d9',
    marginBottom: -2,
  },
  scrollContent: {
    paddingBottom: 200,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },

  noShopFound: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewLink: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#ff5b27',
    marginBottom: -2,
  },
  shopnotFound: {
    marginTop: 20,
  },
  shopFlatListcontentContainerStyle: {
    marginTop: 16,
  },
  categoryContainer: {
    marginTop: 14,
    gap: 20,
  },
  categoryBtnContainer: {
    alignItems: 'center',
    gap: 8,
  },
  categoryBtn: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#ffe3d9',
  },
  categoryBtnActive: {
    backgroundColor: '#ffe3d9',
    borderColor: '#ff5b27',
  },
  categoryImage: {
    width: 26,
    height: 26,
  },
  categoryText: {
    fontSize: 12,
    color: '#000000a3',
    fontFamily: 'Poppins-Regular',
  },
  productContainer: {
    marginTop: 16,
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productItem: {
    width: '48%',
  },
  arrowDownIcon: {
    marginLeft: 2,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  drawer: {
    backgroundColor: '#fff',
    paddingVertical: 26,
    paddingHorizontal: 18,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 'auto',
  },
  mapContainer: {
    backgroundColor: '#fff',
    height: 200,
    borderWidth: 1,
    borderColor: '#ffe3d9',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    right: '30%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    zIndex: 9999,
  },
  primaryBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ff5b27',
    borderRadius: 14,
    paddingVertical: 16,
    gap: 6,
    marginBottom: 20,
  },
  primaryBtnText: {
    color: '#ff5b27',
    fontFamily: 'Poppins-Regular',
    marginBottom: -2,
  },
  secondaryBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff5b27',
    borderRadius: 14,
    paddingVertical: 16,
    marginBottom: 20,
  },
  secondaryBtnText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  streetAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: -6,
  },
  streetText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#000000',
    marginBottom: -2,
  },
  addressText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#000000',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#00000061',
    paddingHorizontal: 14,
    height: 56,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  addressContainer: {
    flexDirection: 'column',
    gap: 6,
    borderWidth: 1,
    borderColor: '#ffe3d9',
    backgroundColor: '#fff5f0',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 20,
  },
});


export default styles;