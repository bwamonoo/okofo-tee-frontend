import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { UserContext } from '../context/UserContext';

const ResetPasswordScreen = ({ navigation, route }) => {
  const { handleResetPassword } = useContext(UserContext);
  const { email } = route.params;
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  console.log("email with token: ", email);

  const resetPassword = async () => {
    console.log(`Password reset with token: ${token}`);
    const response = await handleResetPassword({email, type: "email", token, password: newPassword })
    response.success && navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Verification Token"
          value={token}
          onChangeText={setToken}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity style={styles.button} onPress={resetPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  content: { width: '90%' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  input: { borderBottomWidth: 1, paddingVertical: 10, marginBottom: 30, fontSize: 16, borderColor: '#ddd' },
  button: { backgroundColor: '#4A90E2', paddingVertical: 15, alignItems: 'center', borderRadius: 10 },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});

export default ResetPasswordScreen;
