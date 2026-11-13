import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useMood, MOODS } from '../context/MoodContext';

export default function StatisticsScreen() {
  const { entries } = useMood();
  const counts = MOODS.map((m) => ({ ...m, count: entries.filter((e) => e.mood === m.id).length }));
  const average = entries.length ? (entries.reduce((sum, e) => sum + (MOODS.find((m) => m.id === e.mood)?.score || 3), 0) / entries.length).toFixed(1) : '—';
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Твоя статистика 📊</Text><Text style={styles.sub}>Наблюдай за своими эмоциями без оценок и критики</Text>
      <View style={styles.average}><Text style={styles.averageLabel}>Средняя оценка настроения</Text><Text style={styles.averageNumber}>{average}<Text style={styles.outOf}> / 5</Text></Text><Text style={styles.averageNote}>На основе {entries.length} {entries.length === 1 ? 'записи' : 'записей'}</Text></View>
      <Text style={styles.section}>Распределение настроений</Text>
      {counts.map((m) => <View key={m.id} style={styles.row}><Text style={styles.emoji}>{m.emoji}</Text><Text style={styles.label}>{m.label}</Text><View style={styles.track}><View style={[styles.fill, { width: `${entries.length ? (m.count / entries.length) * 100 : 0}%`, backgroundColor: m.color }]} /></View><Text style={styles.count}>{m.count}</Text></View>)}
      {!entries.length && <Text style={styles.empty}>Когда появятся записи, здесь отобразится статистика.</Text>}
      <View style={styles.tip}><Text style={styles.tipTitle}>Помни 💜</Text><Text style={styles.tipText}>Статистика — это способ замечать закономерности, а не оценивать себя. Любое настроение имеет право быть.</Text></View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F4FF' }, content: { padding: 20 }, title: { fontSize: 25, fontWeight: '800', color: '#302B40' }, sub: { color: '#928BA3', marginTop: 6, lineHeight: 19, marginBottom: 20, fontSize: 13 },
  average: { backgroundColor: '#EAE4FF', borderRadius: 20, padding: 20, alignItems: 'center' }, averageLabel: { color: '#766D91', fontSize: 12 }, averageNumber: { color: '#51418F', fontSize: 42, fontWeight: '800', marginTop: 5 }, outOf: { fontSize: 17, color: '#877CB1' }, averageNote: { color: '#8D83B3', fontSize: 11 },
  section: { color: '#302B40', fontSize: 17, fontWeight: '800', marginTop: 27, marginBottom: 17 }, row: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 }, emoji: { fontSize: 20, width: 32 }, label: { color: '#625C70', fontSize: 12, width: 78 }, track: { height: 10, flex: 1, borderRadius: 10, backgroundColor: '#E9E5EF', overflow: 'hidden' }, fill: { height: 10, borderRadius: 10 }, count: { width: 24, textAlign: 'right', color: '#777084', fontSize: 12 },
  empty: { color: '#928BA3', fontSize: 12, marginTop: 4 }, tip: { backgroundColor: '#FFF4DF', padding: 17, borderRadius: 17, marginTop: 24 }, tipTitle: { color: '#6B5630', fontWeight: '800' }, tipText: { color: '#897653', fontSize: 12, lineHeight: 18, marginTop: 5 }
});