import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

export default function Employees() {
  return (
    <View>
      <Text style={styles.title}>employers data will be shown here </Text>
    </View>
  )
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