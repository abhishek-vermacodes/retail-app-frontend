import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff5f0',
    paddingHorizontal: 20,
    paddingVertical: 50
  },
  header: {
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
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  profileCardContainer: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderColor: '#ffe3d9',
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 16,
  },

  orderCardSubContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'column',
    gap: 20,
  },

  Row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cardProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  profileName: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },

  profileRole: {
    color: '#000000a3',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    padding: 2,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bbb',
  },
  avatar: { width: '100%', height: '100%', borderRadius: 100 },

  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#ffe3d9',
  },
  cardFooter: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box: {
    alignItems: 'center',
  },
  cardHeaderTitle: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 5,
  },

  Text: {
    fontFamily: 'Poppins-Regular',
    color: '#000000a3',
    fontSize: 13,
  },
  shopDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  Edit: {
    fontFamily: 'Poppins-Regular',
    color: '#ff5b27',
  },
  shopContainer: {
    width: 50,
    height: 50,
    borderRadius: 6,
    padding: 2,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bbb',
  },

  shop: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  storeDetails: {
    width: '70%',
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 6,
    padding: 3,
    backgroundColor: '#ffe7dd',
    borderWidth: 1,
    borderColor: '#ff5b27',
    alignItems: 'center',
    justifyContent: 'center',
  },

  settings: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  scrollView: {
    paddingBottom: 200,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  drawer: {
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  drawerHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  drawerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
    color: '#ff5b27',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffe3d9',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: '#fffcfb',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    paddingVertical: 0,
  },
  modalBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 10,
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: '#ff5b27',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#ff5b27',
    borderWidth: 1,
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#ff5b27',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f7f7f7',
  },
  switchTextWrapper: {
    flex: 1,
    paddingRight: 16,
  },
  switchTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  switchDesc: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#888',
    marginTop: 2,
  },
});

export default styles;