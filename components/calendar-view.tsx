import { DailyLog } from '@/lib/data-service';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface CalendarViewProps {
  logs: DailyLog[];
  onDateSelected: (date: string) => void;
  currentDate: Date;
  onMonthChange: (date: Date) => void;
  onDayPressed?: (date: string) => void;
  disableModal?: boolean;
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface CalendarDay {
  date: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  log?: DailyLog;
}

export function CalendarView({
  logs,
  onDateSelected,
  currentDate,
  onMonthChange,
  onDayPressed,
  disableModal,
}: CalendarViewProps) {
  const logsMap = useMemo(() => {
    const map = new Map<string, DailyLog>();
    logs.forEach((log) => {
      map.set(log.date, log);
    });
    return map;
  }, [logs]);

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);

    const days: CalendarDay[] = [];

    // Previous month days
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(prevLastDay);
      date.setDate(prevLastDay.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      days.push({
        date: dateStr,
        dayOfMonth: date.getDate(),
        isCurrentMonth: false,
        log: logsMap.get(dateStr),
      });
    }

    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      const dateStr = date.toISOString().split('T')[0];
      days.push({
        date: dateStr,
        dayOfMonth: i,
        isCurrentMonth: true,
        log: logsMap.get(dateStr),
      });
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 weeks
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      const dateStr = date.toISOString().split('T')[0];
      days.push({
        date: dateStr,
        dayOfMonth: i,
        isCurrentMonth: false,
        log: logsMap.get(dateStr),
      });
    }

    return days;
  }, [currentDate, logsMap]);

  const handlePrevMonth = () => {
    onMonthChange(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    onMonthChange(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getFlowColor = (flowRate: number) => {
    switch (flowRate) {
      case 1:
        return '#FFE0E6';
      case 2:
        return '#FFB3D9';
      case 3:
        return '#FF80C1';
      case 4:
        return '#FF4D94';
      case 5:
        return '#E91E63';
      default:
        return '#f0f0f0';
    }
  };

  return (
    <View style={styles.container}>
      {/* Month Header */}
      <View style={styles.monthHeaderCard}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={handlePrevMonth}
          activeOpacity={0.6}
        >
          <MaterialCommunityIcons name="chevron-left" size={28} color="#E91E63" />
        </TouchableOpacity>

        <View>
          <Text style={styles.monthTitle}>
            {MONTHS[currentDate.getMonth()]}
          </Text>
          <Text style={styles.yearTitle}>{currentDate.getFullYear()}</Text>
        </View>

        <TouchableOpacity
          style={styles.navButton}
          onPress={handleNextMonth}
          activeOpacity={0.6}
        >
          <MaterialCommunityIcons name="chevron-right" size={28} color="#E91E63" />
        </TouchableOpacity>
      </View>

      {/* Week Header */}
      <View style={styles.weekHeader}>
        {DAYS_OF_WEEK.map((day) => (
          <Text key={day} style={styles.weekDayLabel}>
            {day.charAt(0).toUpperCase()}
          </Text>
        ))}
      </View>

      {/* Days Grid */}
      <View style={styles.daysGrid}>
        {calendarDays.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayCell,
              !day.isCurrentMonth && styles.otherMonthDay,
            ]}
            onPress={() => {
              onDateSelected(day.date);
              // If clicking on a date from another month, change the displayed month
              if (!day.isCurrentMonth) {
                const clickedDate = new Date(day.date);
                onMonthChange(clickedDate);
              }
              onDayPressed?.(day.date);
            }}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.dayContent,
                day.log && {
                  backgroundColor: getFlowColor(day.log.flow_rate),
                  shadowColor: getFlowColor(day.log.flow_rate),
                },
              ]}
            >
              <Text
                style={[
                  styles.dayNumber,
                  !day.isCurrentMonth && styles.otherMonthText,
                ]}
              >
                {day.dayOfMonth}
              </Text>
              {day.log && (
                <View style={styles.flowBadge}>
                  <MaterialCommunityIcons
                    name="water"
                    size={12}
                    color="white"
                  />
                  <Text style={styles.flowBadgeText}>{day.log.flow_rate}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Legend */}
      <View style={styles.legendCard}>
        <View style={styles.legendHeader}>
          <MaterialCommunityIcons
            name="information-outline"
            size={16}
            color="#E91E63"
          />
          <Text style={styles.legendTitle}>Flow Intensity</Text>
        </View>
        <View style={styles.legendItems}>
          {[
            { level: 1, label: 'Light' },
            { level: 2, label: 'Light-Med' },
            { level: 3, label: 'Medium' },
            { level: 4, label: 'Heavy' },
            { level: 5, label: 'V. Heavy' },
          ].map(({ level, label }) => (
            <View key={level} style={styles.legendItem}>
              <View
                style={[
                  styles.legendColor,
                  { backgroundColor: getFlowColor(level) },
                ]}
              />
              <Text style={styles.legendLabel}>{label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FAFAFA',
  },
  monthHeaderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  navButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  yearTitle: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 2,
  },
  weekHeader: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  weekDayLabel: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    color: '#E91E63',
    fontSize: 12,
    paddingVertical: 8,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 6,
    paddingHorizontal: 4,
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayContent: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  otherMonthDay: {
    opacity: 0.3,
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  otherMonthText: {
    color: '#ccc',
  },
  flowBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: '#E91E63',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  flowBadgeText: {
    color: 'white',
    fontSize: 9,
    fontWeight: '700',
  },
  legendCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  legendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
  },
  legendTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333',
  },
  legendItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  legendItem: {
    alignItems: 'center',
    gap: 4,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  legendLabel: {
    fontSize: 9,
    color: '#666',
    fontWeight: '600',
    maxWidth: 40,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalClose: {
    alignSelf: 'flex-end',
    padding: 4,
    marginBottom: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  modalDate: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E91E63',
  },
  modalDayName: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  modalInfoCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  modalInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  modalLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalLabelText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  modalValue: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  modalButton: {
    backgroundColor: '#E91E63',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});
