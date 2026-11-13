import AsyncStorage from '@react-native-async-storage/async-storage';

const ENTRIES_KEY = '@mood_diary_entries';
const USER_KEY = '@mood_diary_user';

export async function loadEntries() {
  try {
    const raw = await AsyncStorage.getItem(ENTRIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveEntries(entries) {
  await AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
}

export async function loadUser() {
  try {
    const raw = await AsyncStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function saveUser(user) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function clearUser() {
  await AsyncStorage.removeItem(USER_KEY);
}