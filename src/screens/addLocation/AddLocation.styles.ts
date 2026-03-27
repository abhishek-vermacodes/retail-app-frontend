import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff5f0',
    paddingHorizontal: 20,
    paddingTop: 80,
   
  },
  pageTitle: {
    fontSize: 26,
    fontFamily: 'Poppins-Bold',
    color: '#ff5b27',
  },
  pageSubTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#000000a3',
    marginBottom: 10,
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
    marginTop: 20,
  },
  searchText: {
    fontFamily: 'Poppins-Regular',
    color: '#000',
    marginBottom: -2,
  },
  mapContainer: {
    backgroundColor: '#fff',
    height: 450,
    borderWidth: 1,
    borderColor: '#ffe3d9',
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 30,
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
  btnContainer: {
    gap: 10,
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
    marginBottom:50
  },
  secondaryBtnText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  drawer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 'auto',
  },
  drawerHandle: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 15,
  },
  drawerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  drawerText: {
    fontSize: 14,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 5,
    fontFamily: 'Poppins-Medium',
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
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  locationContainer: {
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
});


export default styles;