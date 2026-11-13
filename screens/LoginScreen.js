import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import CustomButton from '../components/CustomButton';
import { supabase } from '../lib/supabase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!email.trim() || !password) {
      return Alert.alert('Заполни поля', 'Введи почту и пароль.');
    }

    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      if (error) throw error;
      // MoodContext получит сессию через onAuthStateChange.
    } catch (error) {
      Alert.alert('Не удалось войти', error.message || 'Проверь почту и пароль.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>💜</Text>
      <Text style={styles.title}>С возвращением!</Text>
      <Text style={styles.sub}>Продолжим заботиться о твоём настроении</Text>
      <Text style={styles.label}>Электронная почта</Text>
      <TextInput
        style={styles.input}
        placeholder="name@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Пароль</Text>
      <TextInput
        style={styles.input}
        placeholder="Твой пароль"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <CustomButton title={busy ? 'Входим…' : 'Войти'} onPress={submit} disabled={busy} style={{ marginTop: 20 }} />
      {busy && <ActivityIndicator color="#7965C8" style={{ marginTop: 10 }} />}
      <TouchableOpacity onPress={() => navigation.navigate('Register')} disabled={busy}>
        <Text style={styles.link}>Ещё нет аккаунта? Зарегистрироваться</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 26, justifyContent: 'center', backgroundColor: '#F7F4FF' },
  emoji: { fontSize: 54, textAlign: 'center', marginBottom: 15 },
  title: { fontSize: 28, fontWeight: '800', color: '#302B40', textAlign: 'center' },
  sub: { color: '#8B849A', textAlign: 'center', marginTop: 8, marginBottom: 32 },
  label: { color: '#514B60', fontWeight: '700', marginBottom: 8, marginTop: 12 },
  input: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16, fontSize: 15, color: '#302B40' },
  link: { color: '#7965C8', textAlign: 'center', marginTop: 24, fontWeight: '600' }
});
