import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useMood } from '../context/MoodContext';

export default function SettingsScreen() {
  const { logout } = useMood();
  const confirmLogout = () => Alert.alert('Выйти из аккаунта?', 'Ты сможешь войти снова.', [{ text: 'Отмена', style: 'cancel' }, { text: 'Выйти', style: 'destructive', onPress: logout }]);
  return (
    <View style={styles.container}>
      <View style={styles.card}><Text style={styles.icon}>🔐</Text><Text style={styles.heading}>Личные данные</Text><Text style={styles.text}>В этой демонстрационной версии записи и профиль хранятся на устройстве с помощью AsyncStorage.</Text></View>
      <View style={styles.card}><Text style={styles.icon}>🌱</Text><Text style={styles.heading}>О приложении</Text><Text style={styles.text}>Mood Diary помогает отслеживать настроение и замечать эмоциональные закономерности.</Text><Text style={styles.version}>Версия 1.0.0</Text></View>
      <CustomButton title="Выйти из аккаунта" secondary onPress={confirmLogout} style={{ marginTop: 8 }} />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F7F4FF', padding: 20 }, card: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 18, marginBottom: 14 }, icon: { fontSize: 25 }, heading: { color: '#39334A', fontSize: 16, fontWeight: '800', marginTop: 9 }, text: { color: '#827B91', fontSize: 13, lineHeight: 20, marginTop: 7 }, version: { color: '#AAA3B8', fontSize: 11, marginTop: 12 } });