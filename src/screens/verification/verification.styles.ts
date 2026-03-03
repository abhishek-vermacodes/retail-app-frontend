import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 30,
    backgroundColor: '#FFF5F0',
  },
  title: {
    fontSize: 32,
    marginTop: 45,
    textAlign: 'center',
    marginBottom: 6,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
  },
  subtitle: {
    fontSize: 15,
    color: '#000000a3',
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  email: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFB3A0',
    marginHorizontal: 8,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#FFF',
    marginTop: 30,
  },
  activeInput: {
    borderColor: '#ff5b27',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#4a4a4a',
    marginBottom: 5,
    fontFamily: 'Poppins-Medium',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00000016',
    paddingHorizontal: 10,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  timer: {
    color: '#0000006d',
    marginTop: 30,
    textAlign: 'center',
  },
  resend: {
    color: '#FF5A1F',
    marginTop: 30,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  button: {
    height: 50,
    backgroundColor: '#ff5b27',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 480,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});

export default styles