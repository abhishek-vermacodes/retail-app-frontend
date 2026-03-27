import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff5f0',
  },
  headerContainer: {
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
  searchBtn: {
    backgroundColor: 'white',
    borderColor: '#ffe3d9',
    borderWidth: 1,
    height: 40,
    width: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
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
  },

  cardHeaderTitle: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 5,
  },
  cardContainer: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderColor: '#ffe3d9',
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 16,
  },
  CardSubContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'column',
    gap: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#000',
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
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#ffe3d9',
  },
  scrollView: {
    paddingBottom: 200,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});

export default styles