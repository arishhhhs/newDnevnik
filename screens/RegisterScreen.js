import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import CustomButton from '../components/CustomButton';
import { supabase } from '../lib/supabase';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!name.trim() || !email.trim() || password.length < 6) {
      return Alert.alert(
        'Проверь данные',
        'Заполни все поля. Пароль должен содержать минимум 6 символов.'
      );
    }

    setBusy(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: { full_name: name.trim() },
        },
      });

      if (error) throw error;

      if (data.session) {
        // При выключенном подтверждении email пользователь войдёт сразу.
        Alert.alert('Аккаунт создан', 'Добро пожаловать в твой дневник!');
      } else {
        // При включённом подтверждении email сначала нужно подтвердить адрес.
        Alert.alert(
          'Почти готово!',
          'Мы отправили письмо для подтверждения регистрации. Подтверди адрес электронной почты, затем войди в аккаунт.',
          [{ text: 'Понятно', onPress: () => navigation.navigate('Login') }]
        );
      }
    } catch (error) {
      Alert.alert('Не удалось зарегистрироваться', error.message || 'Попробуй ещё раз.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🌷</Text>
      <Text style={styles.title}>Создадим твой дневник</Text>
      <Text style={styles.sub}>Это личное пространство для твоих мыслей</Text>
      <Text style={styles.label}>Как тебя зовут?</Text>
      <TextInput style={styles.input} placeholder="Твоё имя" value={name} onChangeText={setName} />
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
      <Text style={styles.label}>Придумай пароль</Text>
      <TextInput
        style={styles.input}
        placeholder="Минимум 6 символов"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <CustomButton
        title={busy ? 'Создаём аккаунт…' : 'Зарегистрироваться'}
        onPress={submit}
        disabled={busy}
        style={{ marginTop: 24 }}
      />
      {busy && <ActivityIndicator color="#7965C8" style={{ marginTop: 10 }} />}
      <TouchableOpacity onPress={() => navigation.navigate('Login')} disabled={busy}>
        <Text style={styles.link}>Уже есть аккаунт? Войти</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 26, justifyContent: 'center', backgroundColor: '#F7F4FF' },
  emoji: { fontSize: 48, textAlign: 'center', marginBottom: 10 },
  title: { fontSize: 26, fontWeight: '800', color: '#302B40', textAlign: 'center' },
  sub: { color: '#8B849A', textAlign: 'center', marginTop: 8, marginBottom: 22 },
  label: { color: '#514B60', fontWeight: '700', marginBottom: 7, marginTop: 11 },
  input: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 15, fontSize: 15, color: '#302B40' },
  link: { color: '#7965C8', textAlign: 'center', marginTop: 20, fontWeight: '600' }
});
