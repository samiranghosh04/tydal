import { db } from '@/scripts/db';

export interface DailyLog {
  id: number;
  date: string;
  cycle_id: number | null;
  flow_rate: number; // 1-5
  notes: string | null;
  mood: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface Cycle {
  id: number;
  start_date: string;
  end_date: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface Symptom {
  id: number;
  name: string;
  category: string;
  is_active: number;
}

export interface DailySymptom {
  id: number;
  daily_log_id: number;
  symptom_id: number;
  severity: number | null;
}

export function logPeriodDay(
  date: string,
  flowRate: number,
  notes: string | null = null,
  mood: string | null = null
): DailyLog {
  const now = new Date().toISOString();
  
  try {
    // Check if already logged
    const existing = db.getFirstSync<DailyLog>(
      'SELECT * FROM daily_logs WHERE date = ?',
      [date]
    );

    if (existing) {
      db.runSync(
        'UPDATE daily_logs SET flow_rate = ?, notes = ?, mood = ?, updated_at = ? WHERE date = ?',
        [flowRate, notes, mood, now, date]
      );
      return {
        ...existing,
        flow_rate: flowRate,
        notes,
        mood,
        updated_at: now,
      };
    }

    // Find or create cycle
    let cycleId: number | null = null;
    const lastLog = db.getFirstSync<DailyLog>(
      'SELECT * FROM daily_logs ORDER BY date DESC LIMIT 1'
    );

    if (lastLog) {
      const lastDate = new Date(lastLog.date);
      const currentDate = new Date(date);
      const daysDiff = Math.floor(
        (currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      // If within 7 days, continue cycle, else start new
      if (daysDiff <= 7 && lastLog.cycle_id) {
        cycleId = lastLog.cycle_id;
      }
    }

    if (!cycleId) {
      const cycleResult = db.runSync(
        'INSERT INTO cycles (start_date, created_at) VALUES (?, ?)',
        [date, now]
      );
      cycleId = Number(cycleResult.lastInsertRowId);
    }

    const result = db.runSync(
      'INSERT INTO daily_logs (date, cycle_id, flow_rate, notes, mood, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      [date, cycleId, flowRate, notes, mood, now]
    );

    return {
      id: Number(result.lastInsertRowId),
      date,
      cycle_id: cycleId,
      flow_rate: flowRate,
      notes,
      mood,
      created_at: now,
      updated_at: null,
    };
  } catch (error) {
    console.error('Error logging period day:', error);
    throw error;
  }
}

export function getLogsForDateRange(startDate: string, endDate: string): DailyLog[] {
  try {
    return db.getAllSync<DailyLog>(
      `SELECT * FROM daily_logs 
       WHERE date BETWEEN ? AND ? 
       ORDER BY date DESC`,
      [startDate, endDate]
    );
  } catch (error) {
    console.error('Error fetching logs:', error);
    return [];
  }
}

export function getLogForDate(date: string): DailyLog | null {
  try {
    return db.getFirstSync<DailyLog>(
      'SELECT * FROM daily_logs WHERE date = ?',
      [date]
    ) || null;
  } catch (error) {
    console.error('Error fetching log:', error);
    return null;
  }
}

export function addSymptomToLog(
  dailyLogId: number,
  symptomId: number,
  severity: number | null = null
): DailySymptom {
  try {
    const result = db.runSync(
      'INSERT OR REPLACE INTO daily_symptoms (daily_log_id, symptom_id, severity) VALUES (?, ?, ?)',
      [dailyLogId, symptomId, severity]
    );

    return {
      id: Number(result.lastInsertRowId),
      daily_log_id: dailyLogId,
      symptom_id: symptomId,
      severity,
    };
  } catch (error) {
    console.error('Error adding symptom:', error);
    throw error;
  }
}

export function getSymptomsForLog(dailyLogId: number): DailySymptom[] {
  try {
    return db.getAllSync<DailySymptom>(
      `SELECT ds.* FROM daily_symptoms ds
       WHERE ds.daily_log_id = ?
       ORDER BY ds.id`,
      [dailyLogId]
    );
  } catch (error) {
    console.error('Error fetching symptoms:', error);
    return [];
  }
}

export function removeSymptomFromLog(
  dailyLogId: number,
  symptomId: number
): void {
  try {
    db.runSync(
      'DELETE FROM daily_symptoms WHERE daily_log_id = ? AND symptom_id = ?',
      [dailyLogId, symptomId]
    );
  } catch (error) {
    console.error('Error removing symptom:', error);
    throw error;
  }
}

export function getAllSymptoms(): Symptom[] {
  try {
    return db.getAllSync<Symptom>(
      'SELECT * FROM symptoms WHERE is_active = 1 ORDER BY category, name'
    );
  } catch (error) {
    console.error('Error fetching symptoms:', error);
    return [];
  }
}

export function getCycles(): Cycle[] {
  try {
    return db.getAllSync<Cycle>(
      'SELECT * FROM cycles ORDER BY start_date DESC'
    );
  } catch (error) {
    console.error('Error fetching cycles:', error);
    return [];
  }
}

export function deleteDailyLog(logId: number): void {
  try {
    db.runSync('DELETE FROM daily_logs WHERE id = ?', [logId]);
  } catch (error) {
    console.error('Error deleting log:', error);
    throw error;
  }
}

export function deleteAllUserData(): void {
  try {
    // Delete all related data
    db.runSync('DELETE FROM daily_symptoms');
    db.runSync('DELETE FROM daily_logs');
    db.runSync('DELETE FROM cycles');
  } catch (error) {
    console.error('Error deleting all user data:', error);
    throw error;
  }
}

export function getLogsForMonth(year: number, month: number): DailyLog[] {
  const startDate = new Date(year, month - 1, 1).toISOString().split('T')[0];
  const endDate = new Date(year, month, 0).toISOString().split('T')[0];
  return getLogsForDateRange(startDate, endDate);
}
