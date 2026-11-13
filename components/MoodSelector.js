import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MOODS } from '../context/MoodContext';

export default function MoodSelector({ value, onChange }) {
  return (
    <View style={styles.wrap}>
      {MOODS.map((mood) => (
        <TouchableOpacity key={mood.id} onPress={() => onChange(mood.id)}
          style={[styles.item, { backgroundColor: mood.color }, value === mood.id && styles.selected]}>
          <Text style={styles.emoji}>{mood.emoji}</Text>
          <Text style={styles.label}>{mood.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 9, justifyContent: 'space-between' },
  item: { width: '18.5%', minWidth: 58, paddingVertical: 12, borderRadius: 15, alignItems: 'center', borderWidth: 2, borderColor: 'transparent' },
  selected: { borderColor: '#7965C8' },
  emoji: { fontSize: 25, marginBottom: 5 },
  label: { fontSize: 10, color: '#403B50', fontWeight: '600' }
});