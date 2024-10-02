import React, { useContext, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'; // Importing FontAwesome and Ionicons for icons
import { UserContext } from '../context/UserContext';
import CustomHeader from '../components/CustomHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const UserDetailsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { user, updateUser } = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [addressName, setAddressName] = useState(user.address.name);
  const [residential, setResidential] = useState(user.address.residential);
  const [phone, setPhone] = useState(user.address.phone);

  // Password update state
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSave = () => {
    updateUser({
      name,
      email,
      address: {
        name: addressName,
        residential,
        phone,
      },
    });
  };

  const handleUpdatePassword = () => {
    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);
  };

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: "#F5F3F3" }, { paddingTop: insets.top }]}>
      <CustomHeader title="stack" navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          style={styles.container}
          keyboardShouldPersistTaps="handled"
        >

          <View style={styles.section}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholder="Enter your name"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Address Name</Text>
            <TextInput
              value={addressName}
              onChangeText={setAddressName}
              style={styles.input}
              placeholder="Enter address name"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Residential Address</Text>
            <TextInput
              value={residential}
              onChangeText={setResidential}
              style={styles.input}
              placeholder="Enter residential address"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
              keyboardType="phone-pad"
              placeholder="Enter phone number"
            />
          </View>

          {/* Password Update Section */}
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.passwordToggle}
          >
            <FontAwesome name="lock" size={20} color="#FA4A0C" />
            <Text style={styles.passwordToggleText}>Update Password</Text>
          </TouchableOpacity>

          {isPasswordVisible && (
            <View style={styles.passwordContainer}>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  placeholder="Current Password"
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  style={styles.input}
                  secureTextEntry={!showCurrentPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showCurrentPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color="#555"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  placeholder="New Password"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  style={styles.input}
                  secureTextEntry={!showNewPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowNewPassword(!showNewPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showNewPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color="#555"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={handleUpdatePassword}
                style={styles.updatePasswordButton}
              >
                <Text style={styles.updatePasswordText}>Change Password</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Save Changes Button */}
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 50,
  },
  // header: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   marginBottom: 10,
  //   color: '#333',
  // },
  section: {
    marginBottom: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#FA4A0C',
    borderRadius: 22,
    paddingVertical: 15,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  saveText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  passwordToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 20,
  },
  passwordToggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FA4A0C',
    marginLeft: 10,
  },
  passwordContainer: {
    marginBottom: 20,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 15,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  updatePasswordButton: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#FA4A0C',
    alignItems: 'center',
    marginVertical: 10,
  },
  updatePasswordText: {
    color: '#FA4A0C',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserDetailsScreen;
