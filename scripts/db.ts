import bcrypt from 'bcryptjs';
import * as SecureStore from 'expo-secure-store';
import * as SQLite from 'expo-sqlite';
import { getRandomBytes } from 'react-native-get-random-values';

// Set bcrypt random fallback for React Native environment
bcrypt.setRandomFallback((len: number) => {
  return Array.from(getRandomBytes(len));
});

export const db = SQLite.openDatabaseSync('period_tracker.db');

const PASSWORD_KEY = 'period_tracker_password';

export function initDb() {
  db.execSync(`
    PRAGMA foreign_keys = ON;
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;

    CREATE TABLE IF NOT EXISTS app_settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );

    CREATE TABLE IF NOT EXISTS cycles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      start_date TEXT NOT NULL,
      end_date TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS daily_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL UNIQUE,
      cycle_id INTEGER,
      flow_rate INTEGER NOT NULL,
      notes TEXT,
      mood TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT,
      FOREIGN KEY (cycle_id) REFERENCES cycles(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS symptoms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      category TEXT,
      is_active INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS daily_symptoms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      daily_log_id INTEGER NOT NULL,
      symptom_id INTEGER NOT NULL,
      severity INTEGER,
      FOREIGN KEY (daily_log_id) REFERENCES daily_logs(id) ON DELETE CASCADE,
      FOREIGN KEY (symptom_id) REFERENCES symptoms(id) ON DELETE CASCADE,
      UNIQUE (daily_log_id, symptom_id)
    );

    CREATE INDEX IF NOT EXISTS idx_daily_logs_date
    ON daily_logs(date);

    CREATE INDEX IF NOT EXISTS idx_daily_logs_cycle
    ON daily_logs(cycle_id);
  `);

  // Initialize default symptoms if not present
  const symptoms = [
    { name: 'Cramps', category: 'Pain' },
    { name: 'Headache', category: 'Pain' },
    { name: 'Back pain', category: 'Pain' },
    { name: 'Bloating', category: 'Physical' },
    { name: 'Fatigue', category: 'Physical' },
    { name: 'Acne', category: 'Physical' },
    { name: 'Breast tenderness', category: 'Physical' },
    { name: 'Mood swings', category: 'Emotional' },
    { name: 'Anxiety', category: 'Emotional' },
    { name: 'Irritability', category: 'Emotional' },
  ];

  for (const symptom of symptoms) {
    try {
      db.execSync(`
        INSERT OR IGNORE INTO symptoms (name, category, is_active)
        VALUES ('${symptom.name}', '${symptom.category}', 1)
      `);
    } catch {
      // Symptom already exists
    }
  }
}

export async function setupPassword(password: string): Promise<void> {
  if (!password || password.length < 4) {
    throw new Error('Password must be at least 4 characters');
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  await SecureStore.setItemAsync(PASSWORD_KEY, hashedPassword);

  db.execSync(`
    INSERT OR REPLACE INTO app_settings (key, value)
    VALUES ('initialized', '1')
  `);
}

export async function verifyPassword(password: string): Promise<boolean> {
  try {
    const hashedPassword = await SecureStore.getItemAsync(PASSWORD_KEY);
    if (!hashedPassword) return false;
    return bcrypt.compareSync(password, hashedPassword);
  } catch {
    return false;
  }
}

export async function isAppInitialized(): Promise<boolean> {
  try {
    const hashedPassword = await SecureStore.getItemAsync(PASSWORD_KEY);
    return !!hashedPassword;
  } catch {
    return false;
  }
}

