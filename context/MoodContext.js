import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const MoodContext = createContext(null);

export const MOODS = [
  { id: 'great', label: 'Отлично', emoji: '😁', color: '#FFE6A7', score: 5 },
  { id: 'good', label: 'Хорошо', emoji: '😊', color: '#DDF3D8', score: 4 },
  { id: 'okay', label: 'Нормально', emoji: '😐', color: '#E8E2FF', score: 3 },
  { id: 'sad', label: 'Грустно', emoji: '😔', color: '#DCEBFF', score: 2 },
  { id: 'bad', label: 'Плохо', emoji: '😣', color: '#FFDCDC', score: 1 }
];

function mapEntry(row) {
  return {
    id: row.id,
    mood: row.mood,
    title: row.title || '',
    note: row.note || '',
    tags: Array.isArray(row.tags) ? row.tags.join(', ') : '',
    date: new Date(row.created_at).toLocaleDateString('ru-RU'),
    createdAt: row.created_at,
  };
}

export function MoodProvider({ children }) {
  const [entries, setEntries] = useState([]);
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  const refreshEntries = async (userId) => {
    if (!userId) {
      setEntries([]);
      return;
    }

    const { data, error } = await supabase
      .from('mood_entries')
      .select('id, user_id, mood, title, note, tags, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    setEntries((data || []).map(mapEntry));
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const authUser = session?.user || null;

        if (!authUser) {
          setUser(null);
          setEntries([]);
          setReady(true);
          return;
        }

        setUser({
          id: authUser.id,
          email: authUser.email || '',
          name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Пользователь',
        });
        setReady(false);

        // Запрос к БД выполняем после callback авторизации, чтобы не блокировать Auth.
        Promise.resolve().then(async () => {
          try {
            await refreshEntries(authUser.id);
          } catch (error) {
            console.error('Не удалось загрузить записи:', error.message);
            setEntries([]);
          } finally {
            setReady(true);
          }
        });
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const addEntry = async (entry) => {
    if (!user?.id) throw new Error('Сначала войдите в аккаунт.');

    const tags = typeof entry.tags === 'string'
      ? entry.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
      : [];

    const { data, error } = await supabase
      .from('mood_entries')
      .insert({
        user_id: user.id,
        mood: entry.mood,
        title: entry.title || '',
        note: entry.note || '',
        tags,
        created_at: entry.createdAt || new Date().toISOString(),
      })
      .select('id, user_id, mood, title, note, tags, created_at')
      .single();

    if (error) throw error;
    setEntries((current) => [mapEntry(data), ...current]);
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <MoodContext.Provider value={{
      entries,
      addEntry,
      user,
      logout,
      ready,
      refreshEntries: () => refreshEntries(user?.id),
    }}>
      {children}
    </MoodContext.Provider>
  );
}

export const useMood = () => useContext(MoodContext);
