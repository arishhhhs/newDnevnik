import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useMood } from '../context/MoodContext';
import EntryCard from '../components/EntryCard';

export default function HistoryScreen({ navigation }) {
  const { entries } = useMood();
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Моя история 📚</Text><Text style={styles.sub}>Все моменты, которые ты сохранил</Text>
      {entries.length ? entries.map((entry) => <EntryCard key={entry.id} entry={entry} onPress={() => navigation.navigate('EntryDetails', { entry })} />) : <View style={styles.empty}><Text style={{ fontSize: 38 }}>📝</Text><Text style={styles.emptyTitle}>Пока записей нет</Text><Text style={styles.emptyText}>Твои записи появятся здесь после сохранения настроения.</Text></View>}
    </ScrollView>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F7F4FF' }, content: { padding: 20 }, title: { fontSize: 25, fontWeight: '800', color: '#302B40' }, sub: { color: '#928BA3', marginTop: 6, marginBottom: 22, fontSize: 13 }, empty: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 25, alignItems: 'center', marginTop: 15 }, emptyTitle: { color: '#39334A', fontWeight: '700', marginTop: 10 }, emptyText: { color: '#9690A3', textAlign: 'center', fontSize: 12, marginTop: 6, lineHeight: 18 } });