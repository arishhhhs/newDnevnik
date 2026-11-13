import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useMood } from '../context/MoodContext';
import EntryCard from '../components/EntryCard';
import CustomButton from '../components/CustomButton';

export default function HomeScreen({ navigation }) {
  const { user, entries } = useMood();
  const today = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.top}><View><Text style={styles.date}>{today}</Text><Text style={styles.greeting}>Привет, {user?.name || 'друг'}! ☀️</Text></View><Text style={styles.avatar}>🌸</Text></View>
      <View style={styles.hero}><Text style={styles.heroTitle}>Как ты себя чувствуешь сегодня?</Text><Text style={styles.heroSub}>Любое чувство — нормально. Давай отметим его.</Text><CustomButton title="Записать настроение  ＋" onPress={() => navigation.navigate('AddEntry')} style={{ marginTop: 18 }} /></View>
      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Последние записи</Text><TouchableOpacity onPress={() => navigation.navigate('История')}><Text style={styles.more}>Все записи</Text></TouchableOpacity></View>
      {entries.length ? entries.slice(0, 3).map((entry) => <EntryCard key={entry.id} entry={entry} onPress={() => navigation.navigate('EntryDetails', { entry })} />) : <View style={styles.empty}><Text style={styles.emptyEmoji}>📖</Text><Text style={styles.emptyTitle}>Твоя история начинается здесь</Text><Text style={styles.emptyText}>Добавь первую запись — это займёт всего пару минут.</Text></View>}
      <View style={styles.tip}><Text style={styles.tipTitle}>Маленькое напоминание 💜</Text><Text style={styles.tipText}>Не обязательно чувствовать себя хорошо каждый день. Важно быть честным с собой.</Text></View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F4FF' }, content: { padding: 20, paddingTop: 24, paddingBottom: 30 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }, date: { color: '#928BA3', fontSize: 13 }, greeting: { color: '#302B40', fontSize: 25, fontWeight: '800', marginTop: 4 }, avatar: { fontSize: 38, backgroundColor: '#EEE9FF', borderRadius: 18, overflow: 'hidden', padding: 8 },
  hero: { backgroundColor: '#EAE4FF', padding: 21, borderRadius: 23, marginBottom: 27 }, heroTitle: { fontSize: 21, fontWeight: '800', color: '#39324E', lineHeight: 27 }, heroSub: { fontSize: 13, color: '#77708E', marginTop: 8, lineHeight: 19 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 }, sectionTitle: { color: '#302B40', fontSize: 18, fontWeight: '800' }, more: { color: '#7965C8', fontWeight: '700', fontSize: 12 },
  empty: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 23, alignItems: 'center' }, emptyEmoji: { fontSize: 34 }, emptyTitle: { color: '#39334A', fontWeight: '700', marginTop: 10 }, emptyText: { color: '#9690A3', textAlign: 'center', fontSize: 12, marginTop: 6, lineHeight: 18 },
  tip: { marginTop: 22, padding: 17, borderRadius: 18, backgroundColor: '#FFF4DF' }, tipTitle: { color: '#6B5630', fontWeight: '800' }, tipText: { color: '#897653', fontSize: 12, lineHeight: 18, marginTop: 6 }
});