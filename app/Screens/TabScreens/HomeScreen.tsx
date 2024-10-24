import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const menuItems = [
  { icon: 'people', label: 'Customers' },
  { icon: 'pricetag', label: 'Products' },
  { icon: 'cart', label: 'Orders' },
  { icon: 'receipt', label: 'Invoices' },
  { icon: 'cube', label: 'Inventory' },
  { icon: 'people', label: 'Employees' },
  { icon: 'people', label: 'Users' },
  { icon: 'chatbubbles', label: 'Chat' },
  { icon: 'person', label: 'My Account' },
  { icon: 'settings', label: 'Settings' },
];

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const renderMenuItem = (item: { icon: string; label: string }, index: number) => (
    <TouchableOpacity key={index} style={styles.menuItem}>
      <Ionicons name={item.icon as any} size={24} color="black" />
      <Text style={styles.menuItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0052A4" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => router.push("/")}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerName}>Emmanuel Nono 👋</Text>
          <Text style={styles.headerGreeting}>How are you today?</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {menuItems.map(renderMenuItem)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: STATUSBAR_HEIGHT,
  },
  header: {
    backgroundColor: '#0052A4',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: 16,
  },
  headerName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerGreeting: {
    color: 'white',
    fontSize: 14,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '30%',
    aspectRatio: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    margin: '1.5%',
  },
  menuItemText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
  },
});

export default HomeScreen;