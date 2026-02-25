import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  form: {
    flexDirection: 'column',
    gap: 24,
  },
  imageUploadCard: {
    backgroundColor: '#FFF5F0',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: theme.BORDER_RADIUS.inputField,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffe3d9',
  },
  previewImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    backgroundColor: '#ffe3d9',
    padding: 12,
    borderRadius: 100,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginTop: 16,
    color: '#ff5b27',
  },
  cardSubTitle: {
    fontSize: 12,
    color: '#000000a3',
    textAlign: 'center',
    marginTop: -2,
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
    gap: 2,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: theme.BORDER_RADIUS.inputField,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: theme.BORDER_RADIUS.categoryBtn,
    borderWidth: 1,
    borderColor: '#00000061',
  },
  categoryBtnActive: {
    backgroundColor: '#ff5b27',
    borderColor: '#ff5b27',
  },
  categoryText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#000',
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
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});

export default styles;
