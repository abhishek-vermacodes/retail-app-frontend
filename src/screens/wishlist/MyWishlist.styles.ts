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
  productcardContainer: {
    paddingHorizontal: 20,
    gap: 14,
  },
  productcard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ffe3d9',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    gap: 14,
    marginVertical: 8,
  },
  ImageContainer: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Image: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  shopContentContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  productNameText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,

    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    marginBottom: -2,
    fontFamily: 'Poppins-Regular',
    color: '#000000a3',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
  },
  emptyText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    marginTop: 10,
  },
  emptyTextdesc: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
});

export default styles;
