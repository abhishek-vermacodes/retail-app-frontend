import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff5f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    position: 'relative',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  backBtn: {
    borderColor: '#bbb',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 50,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  scrollView: {
    paddingBottom: 160,
    paddingHorizontal: 20,
  },
  productMainContainer: {
    marginTop: 20,
  },
  productImgContainer: {
    width: '100%',
    height: 360,
    resizeMode: 'center',
    borderRadius: 20,
    backgroundColor: '#fff',

    borderWidth: 1,
    borderColor: '#ffe3d9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImg: {
    width: '80%',
    height: '80%',
    borderRadius: 20,
    zIndex: 1000,
  },
  productContentContainer: {
    marginTop: 20,
    flexDirection: 'column',
    gap: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },
  productPrice: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#ff5b27',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stockStatusBadge: {
    backgroundColor: '#277a0022',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  stockStatusBadgeText: {
    color: '#277a00',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  stockBadge: {
    backgroundColor: '#dddddd',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  stockBadgeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
  infoCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#000000a3',
    fontFamily: 'Poppins-Regular',
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20,
  },
  description: {
    fontSize: 13,
    color: '#000000a3',
    marginTop: 6,
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
  },

  variantRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  variantText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  variantStock: {
    fontSize: 14,
    color: '#000000a3',
    fontFamily: 'Poppins-Regular',
  },

  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 40,
  },
  moreBtn: {
    flex: 1,
    backgroundColor: '#ffe3d9',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  moreText: {
    color: '#ff5b27',
    fontFamily: 'Poppins-SemiBold',
  },
  editBtn: {
    flex: 1,
    backgroundColor: '#ff5b27',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  editText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default styles;
