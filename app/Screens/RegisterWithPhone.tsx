import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal } from 'react-native';
import CountryPicker, { CountryCode, Country } from 'react-native-country-picker-modal';
import { useRouter } from 'expo-router';

export default function RegisterWithPhone() {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [countryCode, setCountryCode] = useState<CountryCode>('RW');
  const [callingCode, setCallingCode] = useState<string>('250');
  const [isCountryPickerVisible, setIsCountryPickerVisible] = useState(false);
  const router = useRouter();

  const onSelectCountry = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    setIsCountryPickerVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Text style={styles.title}>Register Your Identity</Text>

      <TouchableOpacity
        style={styles.countryPickerContainer}
        onPress={() => setIsCountryPickerVisible(true)}
      >
        <Text style={styles.countryPickerText}>Select Country</Text>
        <CountryPicker
          countryCode={countryCode}
          withFlag
          withCallingCode
          withFilter
          withAlphaFilter
          onSelect={onSelectCountry}
          modalProps={{
            visible: isCountryPickerVisible,
            onRequestClose: () => setIsCountryPickerVisible(false),
            animationType: 'slide',
          }}
        />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.callingCode}>+{callingCode}</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>

      <Text style={styles.counter}>{phoneNumber.length}/9</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/Screens/OtpScreen')}>
        <Text style={styles.buttonText}>Get One Time Password (OTP)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: '30%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  countryPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  countryPickerText: {
    marginRight: 10,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
  },
  callingCode: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  counter: {
    alignSelf: 'flex-end',
    color: '#6B7280',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1D4ED8',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
