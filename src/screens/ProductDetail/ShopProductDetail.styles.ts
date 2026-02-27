import { StyleSheet } from 'react-native';

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
    position: 'relative',
  },
  backBtn: {
    borderColor: '#000000a3',
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
  menuBtn: {
    position: 'absolute',
    right: 0,
  },

  productImage: {
    width: '100%',
    height: 260,
    borderRadius: 20,
    marginTop: 10,
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  productName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },
  price: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#ff5b27',
  },

  statusRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
    alignItems: 'center',
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
