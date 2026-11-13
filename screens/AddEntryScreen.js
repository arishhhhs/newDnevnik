import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import MoodSelector from '../components/MoodSelector';
import CustomButton from '../components/CustomButton';
import { useMood } from '../context/MoodContext';

export default function AddEntryScreen({ navigation }) {
  const [mood, setMood] = useState('');
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [tags, setTags] = useState('');
  const { addEntry } = useMood();
  const save = async () => {
    if (!mood) return Alert.alert('Выбери настроение', 'Отметь, как ты себя сегодня чувствуешь.');
    const entry = { id: String(Date.now()), mood, title: title.trim(), note: note.trim(), tags: tags.trim(), date: new Date().toLocaleDateString('ru-RU'), createdAt: new Date().toISOString() };
    await addEntry(entry);
    navigation.goBack();
  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Как прошёл твой день?</Text><Text style={styles.sub}>Выбери эмоцию, которая ближе всего к твоему состоянию.</Text>
      <MoodSelector value={mood} onChange={setMood} />
      <Text style={styles.label}>Название записи (необязательно)</Text><TextInput style={styles.input} placeholder="Например, «Хороший день»" value={title} onChangeText={setTitle} />
      <Text style={styles.label}>Что произошло?</Text><TextInput style={[styles.input, styles.multiline]} placeholder="Запиши свои мысли, события и ощущения..." value={note} onChangeText={setNote} multiline textAlignVertical="top" />
      <Text style={styles.label}>Теги (необязательно)</Text><TextInput style={styles.input} placeholder="работа, друзья, отдых..." value={tags} onChangeText={setTags} />
      <CustomButton title="Сохранить запись" onPress={save} style={{ marginTop: 25 }} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F4FF' }, content: { padding: 20, paddingBottom: 35 }, heading: { fontSize: 23, fontWeight: '800', color: '#302B40' }, sub: { color: '#8B849A', lineHeight: 20, marginTop: 7, marginBottom: 22, fontSize: 13 },
  label: { color: '#514B60', fontWeight: '700', marginTop: 22, marginBottom: 9 }, input: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 15, color: '#302B40', fontSize: 14 }, multiline: { minHeight: 145, paddingTop: 15 }
});