import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useMood } from '../context/MoodContext';

export default function ProfileScreen({ navigation }) {
  const { user, entries } = useMood();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Мой профиль</Text>
      <View style={styles.profile}><Text style={styles.avatar}>🧑🏻‍💻</Text><Text style={styles.name}>{user?.name || 'Пользователь'}</Text><Text style={styles.email}>{user?.email}</Text></View>
      <View style={styles.stats}><View style={styles.stat}><Text style={styles.number}>{entries.length}</Text><Text style={styles.caption}>Записей</Text></View><View style={styles.line} /><View style={styles.stat}><Text style={styles.number}>💜</Text><Text style={styles.caption}>Забота о себе</Text></View></View>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Settings')}><Text style={styles.optionIcon}>⚙️</Text><Text style={styles.optionText}>Настройки</Text><Text style={styles.arrow}>›</Text></TouchableOpacity>
      <View style={styles.privacy}><Text style={styles.privacyTitle}>Твоё пространство</Text><Text style={styles.privacyText}>Записи хранятся локально на устройстве. Не забывай бережно относиться к себе.</Text></View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F4FF', padding: 20 }, title: { fontSize: 25, fontWeight: '800', color: '#302B40', marginBottom: 22 },
  profile: { alignItems: 'center', backgroundColor: '#EAE4FF', borderRadius: 22, padding: 24 }, avatar: { fontSize: 48, marginBottom: 8 }, name: { color: '#39334A', fontSize: 20, fontWeight: '800' }, email: { color: '#89819E', fontSize: 12, marginTop: 5 },
  stats: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 18, padding: 18, marginTop: 17, justifyContent: 'space-around', alignItems: 'center' }, stat: { alignItems: 'center', flex: 1 }, number: { color: '#7965C8', fontSize: 23, fontWeight: '800' }, caption: { color: '#928BA3', fontSize: 11, marginTop: 4 }, line: { height: 35, width: 1, backgroundColor: '#EEEAF5' },
  option: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 17, borderRadius: 16, marginTop: 17 }, optionIcon: { fontSize: 20 }, optionText: { color: '#4A445A', fontWeight: '700', marginLeft: 12, flex: 1 }, arrow: { color: '#A49CB8', fontSize: 24 },
  privacy: { backgroundColor: '#FFF4DF', borderRadius: 17, padding: 16, marginTop: 22 }, privacyTitle: { color: '#6B5630', fontWeight: '800' }, privacyText: { color: '#897653', fontSize: 12, lineHeight: 18, marginTop: 5 }
});