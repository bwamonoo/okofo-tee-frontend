import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { UserContext } from '../context/UserContext';

const ForgotPasswordScreen = ({ navigation }) => {
  const { handleForgotPassword } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [countdown, setCountdown] = useState(0); // Countdown for resending token
  const [isTokenSent, setIsTokenSent] = useState(false);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    };
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSendToken = async () => {
    console.log(`Token sent to ${email}`);
    const response = await handleForgotPassword(email); 

    if (response.success) {
      setIsTokenSent(true);
      setCountdown(30); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Reset Your Password</Text>
        <Text style={styles.description}>
          Please enter your email address to receive a verification token.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity
          style={[styles.button, countdown > 0 && styles.disabledButton]}
          onPress={handleSendToken}
          disabled={countdown > 0}
        >
          <Text style={styles.buttonText}>
            {countdown > 0 ? `Resend Token in ${countdown}s` : 'Send Token'}
          </Text>
        </TouchableOpacity>

        {isTokenSent && (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate('ResetPassword', { email })}
          >
            <Text style={styles.buttonText}>Enter Token</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  content: { width: '90%' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  description: { fontSize: 16, marginBottom: 20, textAlign: 'center', color: '#666' },
  input: { borderBottomWidth: 1, paddingVertical: 10, marginBottom: 30, fontSize: 16, borderColor: '#ddd' },
  button: { backgroundColor: '#FA4A0C', paddingVertical: 15, alignItems: 'center', borderRadius: 10 },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  disabledButton: { backgroundColor: '#ddd' },
  nextButton: { backgroundColor: '#4A90E2', marginTop: 20, paddingVertical: 15, alignItems: 'center', borderRadius: 10 }
});

export default ForgotPasswordScreen;
