import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useMood, MOODS } from '../context/MoodContext';

export default function CalendarScreen() {
  const { entries } = useMood();
  const [monthOffset, setMonthOffset] = useState(0);
  const date = new Date(); date.setDate(1); date.setMonth(date.getMonth() + monthOffset);
  const year = date.getFullYear(), month = date.getMonth();
  const days = new Date(year, month + 1, 0).getDate();
  const start = (new Date(year, month, 1).getDay() + 6) % 7;
  const monthName = date.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });
  const moodByDay = useMemo(() => {
    const map = {};
    entries.forEach((e) => {
      const [d, m, y] = e.date.split('.');
      if (Number(m) - 1 === month && Number(y) === year) map[Number(d)] = e.mood;
    });
    return map;
  }, [entries, month, year]);
  const cells = [...Array(start).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Календарь настроения</Text>
      <View style={styles.monthRow}><TouchableOpacity onPress={() => setMonthOffset(monthOffset - 1)}><Text style={styles.arrow}>‹</Text></TouchableOpacity><Text style={styles.month}>{monthName}</Text><TouchableOpacity onPress={() => setMonthOffset(monthOffset + 1)}><Text style={styles.arrow}>›</Text></TouchableOpacity></View>
      <View style={styles.grid}>{['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map((d) => <Text key={d} style={styles.week}>{d}</Text>)}
        {cells.map((day, i) => { const mood = MOODS.find((m) => m.id === moodByDay[day]); return <View key={i} style={[styles.cell, mood && { backgroundColor: mood.color }]}><Text style={styles.day}>{day || ''}</Text>{mood && <Text style={styles.mood}>{mood.emoji}</Text>}</View>; })}
      </View>
      <Text style={styles.hint}>Добавляй ежедневные записи, чтобы видеть эмоциональную картину месяца.</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F4FF', padding: 20 }, title: { fontSize: 23, fontWeight: '800', color: '#302B40', marginBottom: 24 },
  monthRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }, month: { fontSize: 17, fontWeight: '800', color: '#403B50', textTransform: 'capitalize' }, arrow: { fontSize: 32, color: '#7965C8', paddingHorizontal: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 5 }, week: { width: '13.5%', textAlign: 'center', color: '#9A93A9', fontSize: 11, fontWeight: '700', marginBottom: 8 },
  cell: { width: '13.5%', aspectRatio: 0.9, borderRadius: 12, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }, day: { color: '#4D475D', fontSize: 12 }, mood: { fontSize: 17, marginTop: 1 },
  hint: { color: '#91899F', fontSize: 12, lineHeight: 19, marginTop: 24, textAlign: 'center' }
});