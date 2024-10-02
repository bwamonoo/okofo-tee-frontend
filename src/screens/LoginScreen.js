import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../constants/images';

const LoginScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [focusedField, setFocusedField] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: "#F5F3F3" }, { paddingTop: insets.top }]}>

      <View style={styles.upperDiv}>
        <Image source={images.okofoTee} />
        <View style={styles.upperDivText}>
          <TouchableOpacity style={styles.login} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signup} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.text}>Sign-up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.lowerDiv}>
        <View style={styles.form}>

          <TouchableOpacity 
            style={[styles.formField, { borderBottomColor: focusedField === 'email' ? '#FA4A0C' : '#B1B1B3' }]} 
            onPress={() => {
              setFocusedField('email');
              emailRef.current.focus();
            }}>
            <TextInput
              ref={emailRef}
              style={styles.formTextInput}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="Email address"
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              keyboardType="email-address"
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.formField, { borderBottomColor: focusedField === 'password' ? '#FA4A0C' : '#B1B1B3' }]} 
            onPress={() => {
              setFocusedField('password');
              passwordRef.current.focus();
            }}>
            <TextInput
              ref={passwordRef}
              style={styles.formTextInput}
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              placeholder="Password"
              secureTextEntry={!passwordVisible}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Text style={styles.eyeIcon}>{passwordVisible ? '👁️' : '🙈'}</Text>
            </TouchableOpacity>
          </TouchableOpacity>

        </View>

        <View style={styles.loginButtonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.replace('Main')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  upperDiv: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  upperDivText: {
    flexDirection: "row",
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 15,
  },
  text: {
    fontWeight: "bold",
  },
  login: {
    borderBottomWidth: 2,
    borderBottomColor: '#FA4A0C',
    paddingHorizontal: 40,
    paddingBottom: 10,
  },
  signup: {
    paddingHorizontal: 40,
    paddingBottom: 10,
  },
  lowerDiv: {
    flex: 2,
    backgroundColor: "#F5F3F3",
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  form: {
    // Contains form fields
  },
  formField: {
    borderBottomWidth: 1,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  formTextInput: {
    flex: 1,
    paddingBottom: 5,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  loginButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    backgroundColor: "#FA4A0C",
    paddingHorizontal: 100,
    paddingVertical: 15,
    borderRadius: 22,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  loginText: {
    fontWeight: "bold",
    color: "white",
  }
});

export default LoginScreen;
