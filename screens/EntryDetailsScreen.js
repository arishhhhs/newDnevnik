import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MOODS } from '../context/MoodContext';

export default function EntryDetailsScreen({ route }) {
  const { entry } = route.params;
  const mood = MOODS.find((m) => m.id === entry.mood) || MOODS[2];
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.mood, { backgroundColor: mood.color }]}><Text style={styles.emoji}>{mood.emoji}</Text><Text style={styles.moodLabel}>{mood.label}</Text></View>
      <Text style={styles.date}>{entry.date}</Text><Text style={styles.title}>{entry.title || 'Моя запись'}</Text>
      <Text style={styles.note}>{entry.note || 'Для этой записи не добавлен текст.'}</Text>
      {!!entry.tags && <View style={styles.tags}><Text style={styles.tagText}>#{entry.tags.split(',').map((t) => t.trim()).filter(Boolean).join('  #')}</Text></View>}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F4FF' }, content: { padding: 22 }, mood: { alignSelf: 'flex-start', padding: 18, borderRadius: 20, alignItems: 'center', minWidth: 110 }, emoji: { fontSize: 42 }, moodLabel: { color: '#403B50', fontWeight: '800', marginTop: 5 },
  date: { color: '#9992A7', marginTop: 25, fontSize: 13 }, title: { color: '#302B40', fontSize: 24, fontWeight: '800', marginTop: 8 }, note: { color: '#5F596D', fontSize: 15, lineHeight: 25, marginTop: 18, backgroundColor: '#FFFFFF', padding: 18, borderRadius: 17, minHeight: 120 },
  tags: { backgroundColor: '#EEEAFB', padding: 13, borderRadius: 13, alignSelf: 'flex-start', marginTop: 17 }, tagText: { color: '#7965C8', fontWeight: '600' }
});