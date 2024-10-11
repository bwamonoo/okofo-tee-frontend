import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { UserContext } from '../context/UserContext';

const VerifyEmailScreen = ({ navigation, route }) => {
  const { handleVerifyEmail } = useContext(UserContext);
  const { id } = route.params;
  const [token, setToken] = useState('');

  console.log("userId: ", id);

  const handleChangeText = (text) => {
    // Limit to 6 characters (verification code length)
    if (text.length <= 6) {
      setToken(text);
    }
  };

  const confirmEmail = async () => {
    if (token.length === 6) {
      console.log(`Verification token: ${token}`);
      const response = await handleVerifyEmail({ userId: id, type: "email", token });
      if (response.success) {
        navigation.navigate('Login');
      } else {
        alert('Invalid verification code.');
      }
    } else {
      alert('Please enter a 6-digit verification code.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Enter verification code sent to email</Text>
        <TextInput
          style={styles.input}
          maxLength={6}
          value={token}
          onChangeText={handleChangeText}
          placeholder="Enter verification code"
          textAlign="center"
        />
        <TouchableOpacity style={styles.button} onPress={confirmEmail}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: { width: '90%', alignItems: 'center' },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 130,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default VerifyEmailScreen;
