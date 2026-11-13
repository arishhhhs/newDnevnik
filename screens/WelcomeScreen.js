import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.art}><Text style={styles.bigEmoji}>🌈</Text><Text style={styles.sparkle}>✦</Text><Text style={styles.cloud}>☁️</Text></View>
      <Text style={styles.title}>Твой день. Твои эмоции</Text>
      <Text style={styles.subtitle}>Небольшое пространство, где можно быть собой, замечать чувства и лучше понимать себя</Text>
      <CustomButton title="Начать" onPress={() => navigation.navigate('Register')} style={styles.button} />
      <CustomButton title="У меня уже есть аккаунт" secondary onPress={() => navigation.navigate('Login')} style={styles.button2} />
      <Text style={styles.note}>Твои чувства важны 💜</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 28, justifyContent: 'center', backgroundColor: '#F7F4FF' },
  art: { height: 240, borderRadius: 35, backgroundColor: '#EAE4FF', alignItems: 'center', justifyContent: 'center', marginBottom: 38 },
  bigEmoji: { fontSize: 100 }, sparkle: { position: 'absolute', top: 32, right: 45, color: '#A18DEB', fontSize: 35 }, cloud: { position: 'absolute', bottom: 25, left: 40, fontSize: 35 },
  title: { fontSize: 30, lineHeight: 37, fontWeight: '800', color: '#302B40', textAlign: 'center' },
  subtitle: { fontSize: 15, lineHeight: 23, color: '#817B91', textAlign: 'center', marginTop: 14, marginBottom: 28 },
  button: { marginBottom: 12 }, button2: { marginBottom: 20 }, note: { textAlign: 'center', color: '#9A91B1', fontSize: 12 }
});