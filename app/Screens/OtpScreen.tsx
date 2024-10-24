import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

export default function OtpScreen() {
    const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = () => {
    console.log('OTP submitted:', otp.join(''));
    // Add your submit logic here
  };

  const handleResend = () => {
    console.log('Resending OTP');
    // Add your resend logic here
  };

  const handleTryAnotherMethod = () => {
    console.log('Trying another method');
    // Add your navigation logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      </View>
      <Text style={styles.title}>Verify Your Identity</Text>
      <Text style={styles.subtitle}>
        Enter OTP code sent to email:{'\n'}
        <Text style={styles.email}>emmynono2013@gmail.com</Text>
      </Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
            keyboardType="number-pad"
            maxLength={1}
            ref={(ref) => (inputRefs.current[index] = ref)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}onPress={()=>router.push("/(tabs)/")}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleResend}>
        <Text style={styles.resendText}>
          Didn't receive a code? <Text style={styles.resendLink}>RESEND</Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleTryAnotherMethod}>
        <Text style={styles.tryAnotherMethodText}>Try another method</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
    
  },
  header: {
    alignItems: 'center',
    marginBottom: "40%",
  },
  pill: {
    width: 60,
    height: 6,
    backgroundColor: '#000000',
    borderRadius: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#4A5568',
  },
  email: {
    color: '#2B6CB0',
    fontWeight: 'bold',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    fontSize: 24,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#2B6CB0',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resendText: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 10,
  },
  resendLink: {
    color: '#2B6CB0',
    fontWeight: 'bold',
  },
  tryAnotherMethodText: {
    fontSize: 14,
    color: '#2B6CB0',
  },
});