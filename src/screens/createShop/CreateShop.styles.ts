import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    borderWidth: 1,
    borderColor: '#bbb',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 50,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
  scrollView: {
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  form: {
    flexDirection: 'column',
    gap: 24,
    marginTop: 40,
  },
  logoInputContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 110,
    width: 110,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#bbb',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  previewImage: {
    width: 110,
    height: 110,
    borderRadius: 100,
  },
  cardTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    marginTop: 2,
  },
  cardText: {
    fontSize: 12,
    color: '#ff5b27',
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  inputContainer: {
    flexDirection: 'column',
    gap: 6,
  },
  inputLabel: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Poppins-Medium',
  },
  inputSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: theme.BORDER_RADIUS.inputField,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  shopIcon: {
    height: 25,
    width: 25,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    color: '#000',
    marginBottom: -4
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryChip: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: theme.BORDER_RADIUS.categoryBtn,
    borderWidth: 1,
    borderColor: '#bbb',
  },
  categoryChipActive: {
    backgroundColor: '#ff5b27',
    borderColor: '#ff5b27',
  },
  categoryText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#888',
    marginBottom: -2
  },
  categoryTextActive: {
    color: '#fff',
  },
  textAreaContainer: {
    height: 120,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: theme.BORDER_RADIUS.inputField,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  textArea: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  button: {
    height: 60,
    backgroundColor: '#ff5b27',
    borderRadius: theme.BORDER_RADIUS.inputField,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
});

export default styles;
