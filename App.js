import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { MoodProvider } from './context/MoodContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <MoodProvider>
      <StatusBar style="dark" backgroundColor="#F7F4FF" />
      <AppNavigator />
    </MoodProvider>
  );
}