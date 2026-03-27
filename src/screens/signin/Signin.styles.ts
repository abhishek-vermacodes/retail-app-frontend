import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 32,
    marginTop: 45,
    color: '#000000',
    fontFamily: 'Poppins-SemiBold',
  },
  subtitle: {
    fontSize: 14,
    color: '#000000a3',
    lineHeight: 20,
    marginBottom: 40,
    marginTop: -6,
    fontFamily: 'Poppins-Regular',
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00000061',
    paddingHorizontal: 10,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  button: {
    height: 50,
    backgroundColor: '#ff5b27',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  terms: {
    fontSize: 13,
    color: '#000000a3',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  extraButtonWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    height: 80,
    marginTop: 30,
  },
  extraButton: {
    width: '48%',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderColor: '#00000016',
  },
  link: {
    color: '#ff5b27',
    fontWeight: '700',
  },
  forgotText: {
    textAlign: 'right',
    fontFamily: 'Poppins-Medium',
    color: '#ff5b27',
  },
  headerBtn: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bbb',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 30,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    marginBottom: 40,
    gap:20
  },
});

export default styles;
