import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useMood } from '../context/MoodContext';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AddEntryScreen from '../screens/AddEntryScreen';
import EntryDetailsScreen from '../screens/EntryDetailsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import CalendarScreen from '../screens/CalendarScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: '#7965C8',
      tabBarInactiveTintColor: '#A6A0B3',
      tabBarStyle: { height: 64, paddingTop: 7, paddingBottom: 8, borderTopColor: '#EEEAF5', backgroundColor: '#FFFFFF' },
      tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
      tabBarIcon: ({ focused }) => {
        const icons = { Главная: '⌂', История: '▤', Календарь: '▦', Статистика: '▥', Профиль: '○' };
        return <Text style={{ fontSize: 20, color: focused ? '#7965C8' : '#A6A0B3' }}>{icons[route.name]}</Text>;
      }
    })}>
      <Tab.Screen name="Главная" component={HomeScreen} />
      <Tab.Screen name="История" component={HistoryScreen} />
      <Tab.Screen name="Календарь" component={CalendarScreen} />
      <Tab.Screen name="Статистика" component={StatisticsScreen} />
      <Tab.Screen name="Профиль" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user, ready } = useMood();
  if (!ready) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F7F4FF' }}><ActivityIndicator size="large" color="#7965C8" /></View>;
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F7F4FF' } }}>
        {!user ? (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="AddEntry" component={AddEntryScreen} options={{ headerShown: true, title: 'Новая запись', headerTintColor: '#403B50', headerStyle: { backgroundColor: '#F7F4FF' } }} />
            <Stack.Screen name="EntryDetails" component={EntryDetailsScreen} options={{ headerShown: true, title: 'Запись', headerTintColor: '#403B50', headerStyle: { backgroundColor: '#F7F4FF' } }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: true, title: 'Настройки', headerTintColor: '#403B50', headerStyle: { backgroundColor: '#F7F4FF' } }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}