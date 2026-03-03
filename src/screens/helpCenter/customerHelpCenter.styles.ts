import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff5f0',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 10,
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
    color: '#000',
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
  },
});


export default styles;