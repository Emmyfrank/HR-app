import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
export default function Orders() {
 

  return (
    
      <Text style={styles.title}>Orders data will be shown here </Text>
      
  
  );
}

const styles = StyleSheet.create({
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    marginTop:"60%"
  },
});