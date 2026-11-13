import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CustomButton({ title, onPress, secondary = false, style }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}
      style={[styles.button, secondary && styles.secondary, style]}>
      <Text style={[styles.text, secondary && styles.secondaryText]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: '#7965C8', paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
  secondary: { backgroundColor: '#EEEAFB' },
  text: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  secondaryText: { color: '#6652B4' }
});