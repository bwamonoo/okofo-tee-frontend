import { View, Text, StyleSheet } from 'react-native';
import Toast, { BaseToast, ErrorToast, SuccessToast }  from 'react-native-toast-message';

export const toastConfig = {
  success: (props) => (
    <SuccessToast
      {...props}
      text1Style={styles.successText1}
      text2Style={styles.successText2}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props} // Pass default props to ErrorToast
      text1Style={styles.errorText1}
      text2Style={styles.errorText2}
    />
  ),

  info: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'blue' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={styles.infoText1}
      text2Style={styles.infoText2}
    />
  ),
};

export const toast = {
	success: (message2, message1 = 'Success!') => {
		Toast.show({
      type: 'success',
      text1: message1,
      text2: message2,
      position: 'top',
      visibilityTime: 1700,
      autoHide: true,
    })
	},
	error: (message2, message1 = 'Oops!') => {
		Toast.show({
      type: 'error',
      text1: message1,
      text2: message2,
      position: 'top',
      visibilityTime: 1500,
      autoHide: true,
    })
	}
};

const styles = StyleSheet.create({
  successText1: {
		fontSize: 17,
		fontWeight: 'bold',
	},
	successText2: {
		fontSize: 15,
	},
  errorText1: {
		fontSize: 14,
		color: 'white'
	},
	errorText2: {
		fontSize: 15,
	},
  infoText1: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	infoText2: {
		fontSize: 14,
	},
});
