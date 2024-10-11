import React, { useState, useRef, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../constants/images';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { UserContext } from "../context/UserContext";
import { toast } from "../styles/toastStyles";

const SignupScreen = ({ navigation }) => {
  const { user, handleRegister } = useContext(UserContext);

  const insets = useSafeAreaInsets();
  const inputsRef = useRef({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
    userGroupId: 2,
  });

  const [focusedField, setFocusedField] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const onSubmit = async () => {
    setLoading(true);

    let response;

    const { confirmPassword, ...finalFormData } = formData;
    console.log("final data: ", finalFormData);

    formData.password !== confirmPassword && toast.error("Password Mismatch!")

    formData.password === confirmPassword &&(response = await handleRegister(finalFormData)); 

    response && (response.success ? navigation.navigate("EmailVerification", response.data) : console.log(`${response.message}:; `, response.data));
    
    setLoading(false);  
  }

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: "#F5F3F3" }, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >

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

      <ScrollView 
        style={styles.lowerDiv}
        contentContainerStyle={{ paddingBottom: 66 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>

          <TouchableOpacity 
            style={[styles.formField, { borderBottomColor: focusedField === 'name' ? '#FA4A0C' : '#B1B1B3' }]} 
            onPress={() => {
              setFocusedField('name');
              inputsRef.current.name.focus()
            }}>
            <TextInput
              ref={(comp) => (inputsRef.current.name = comp)}
              style={styles.formTextInput}
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholder="Full Name"
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.formField, { borderBottomColor: focusedField === 'phoneNumber' ? '#FA4A0C' : '#B1B1B3' }]} 
            onPress={() => {
              setFocusedField('phoneNumber');
              inputsRef.current.phoneNumber.focus()
            }}>
            <TextInput
              ref={(comp) => (inputsRef.current.phoneNumber = comp)}
              style={styles.formTextInput}
              value={formData.phoneNumber}
              onChangeText={(value) => handleInputChange('phoneNumber', value)}
              placeholder="Phone Number"
              onFocus={() => setFocusedField('phoneNumber')}
              onBlur={() => setFocusedField(null)}
              keyboardType="phone-pad"
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.formField, { borderBottomColor: focusedField === 'email' ? '#FA4A0C' : '#B1B1B3' }]} 
            onPress={() => {
              setFocusedField('email');
              inputsRef.current.email.focus()
            }}>
            <TextInput
              ref={(comp) => (inputsRef.current.email = comp)}
              style={styles.formTextInput}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="Email"
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              keyboardType="email-address"
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.formField, { borderBottomColor: focusedField === 'password' ? '#FA4A0C' : '#B1B1B3' }]} 
            onPress={() => {
              setFocusedField('password');
              inputsRef.current.password.focus()
            }}>
            <TextInput
              ref={(comp) => (inputsRef.current.password = comp)}
              style={styles.formTextInput}
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              placeholder="Password"
              secureTextEntry={!passwordVisible}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Ionicons name={passwordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.formField, { borderBottomColor: focusedField === 'confirmPassword' ? '#FA4A0C' : '#B1B1B3' }]} 
            onPress={() => {
              setFocusedField('email');
              inputsRef.current.confirmPassword.focus()
            }}>
            <TextInput
              ref={(comp) => (inputsRef.current.confirmPassword = comp)}
              style={styles.formTextInput}
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              placeholder="Confirm Password"
              secureTextEntry={!confirmPasswordVisible}
              onFocus={() => setFocusedField('confirmPassword')}
              onBlur={() => setFocusedField(null)}
            />
            <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
            <Ionicons name={confirmPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
            </TouchableOpacity>
          </TouchableOpacity>

        </View>

        <View style={styles.signupButtonContainer}>
          <TouchableOpacity style={styles.signupButton} onPress={onSubmit} disabled={loading}>
          {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.signupText}>Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  upperDiv: {
    flex: .5,
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
    justifyContent: 'space-around',
    borderRadius: 15,
  },
  text: {
    fontWeight: "bold",
  },
  login: {
    paddingHorizontal: 40,
    paddingBottom: 10,
  },
  signup: {
    borderBottomWidth: 2,
    borderBottomColor: '#FA4A0C',
    paddingHorizontal: 40,
    paddingBottom: 10,
  },
  lowerDiv: {
    flex: 2,
    backgroundColor: "#F5F3F3",
    paddingHorizontal: 40,
    paddingTop: 10,
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
    paddingBottom: 3,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  signupButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  signupButton: {
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
  signupText: {
    fontWeight: "bold",
    color: "white",
  }
});

export default SignupScreen;
