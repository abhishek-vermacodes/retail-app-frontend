import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
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
  menuBtn: {
    position: 'absolute',
    right: 0,
  },

  itemContainer: {
    height: '50%',
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
  scrollViewStyle: {
    paddingBottom: 200,
  },
});

export default styles