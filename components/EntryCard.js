import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MOODS } from '../context/MoodContext';

export default function EntryCard({ entry, onPress }) {
  const mood = MOODS.find((item) => item.id === entry.mood) || MOODS[2];
  return (
    <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.8}>
      <View style={[styles.emojiBox, { backgroundColor: mood.color }]}>
        <Text style={styles.emoji}>{mood.emoji}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{entry.title || mood.label}</Text>
        <Text style={styles.date}>{entry.date}</Text>
        <Text style={styles.preview} numberOfLines={2}>{entry.note || 'Запись без заметки'}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 14, borderRadius: 18, marginBottom: 11 },
  emojiBox: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 26 },
  content: { flex: 1, marginLeft: 13 },
  title: { fontSize: 15, fontWeight: '700', color: '#302B40' },
  date: { fontSize: 11, color: '#9993A8', marginTop: 3 },
  preview: { fontSize: 12, color: '#777184', marginTop: 5 },
  arrow: { color: '#A49CB8', fontSize: 25, marginLeft: 8 }
});