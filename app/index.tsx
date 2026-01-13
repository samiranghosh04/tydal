import { CalendarView } from '@/components/calendar-view';
import { DayDetail } from '@/components/day-detail';
import { EducationTab } from '@/components/education-tab';
import { PrivacyPolicy } from '@/components/legal/privacy-policy';
import { TermsOfService } from '@/components/legal/tos';
import { SettingsTab } from '@/components/settings-tab';
import {
  addSymptomToLog,
  DailyLog,
  deleteAllUserData,
  getLogForDate,
  getLogsForMonth,
  getSymptomsForLog,
  logPeriodDay,
  removeSymptomFromLog,
} from '@/lib/data-service';
import { exportToCsv, generatePdfReport } from '@/lib/export-service';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Tab = createBottomTabNavigator();

function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedLog, setSelectedLog] = useState<DailyLog | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<number[]>([]);
  const [showDayDetail, setShowDayDetail] = useState(false);

  useEffect(() => {
    const logsData = getLogsForMonth(currentDate.getFullYear(), currentDate.getMonth() + 1);
    setLogs(logsData);
  }, [currentDate]);

  useEffect(() => {
    const log = getLogForDate(selectedDate);
    setSelectedLog(log);
    if (log) {
      const symptoms = getSymptomsForLog(log.id);
      setSelectedSymptoms(symptoms.map((s) => s.symptom_id));
    } else {
      setSelectedSymptoms([]);
    }
  }, [selectedDate]);

  const handleSaveLog = (flowRate: number, notes: string, mood: string, symptoms: number[]) => {
    try {
      const log = logPeriodDay(selectedDate, flowRate, notes || null, mood || null);

      // Update symptoms
      const oldSymptoms = selectedLog ? getSymptomsForLog(selectedLog.id) : [];
      const oldSymptomIds = oldSymptoms.map((s) => s.symptom_id);

      // Remove symptoms that were unselected
      oldSymptomIds.forEach((id) => {
        if (!symptoms.includes(id)) {
          removeSymptomFromLog(log.id, id);
        }
      });

      // Add new symptoms
      symptoms.forEach((id) => {
        if (!oldSymptomIds.includes(id)) {
          addSymptomToLog(log.id, id);
        }
      });

      // Reload logs for the month
      const logsData = getLogsForMonth(currentDate.getFullYear(), currentDate.getMonth() + 1);
      setLogs(logsData);
      setSelectedLog(log);
      Alert.alert('Success', 'Period log saved');
    } catch (error) {
      Alert.alert('Error', 'Failed to save log');
      console.error(error);
    }
  };

  const handleDeleteLog = () => {
    // Reload logs for the month
    const logsData = getLogsForMonth(currentDate.getFullYear(), currentDate.getMonth() + 1);
    setLogs(logsData);
    setShowDayDetail(false);
    Alert.alert('Success', 'Period entry deleted');
  };

  const handleMonthChange = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  const handleDayPressed = (date: string) => {
    // Prevent selecting future dates
    const today = new Date().toISOString().split('T')[0];
    if (date > today) {
      Alert.alert('Invalid Date', 'You can only log periods for today or past dates');
      return;
    }
    setSelectedDate(date);
    setShowDayDetail(true);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.calendarHeader}>
          <Text style={styles.calendarHeaderTitle}>Your Cycle</Text>
        </View>
        <CalendarView
          logs={logs}
          onDateSelected={setSelectedDate}
          currentDate={currentDate}
          onMonthChange={handleMonthChange}
          onDayPressed={handleDayPressed}
          disableModal={true}
        />
      </View>

      <DayDetail
        date={selectedDate}
        log={selectedLog}
        symptoms={selectedSymptoms}
        onEdit={handleSaveLog}
        onDelete={handleDeleteLog}
        onClose={() => setShowDayDetail(false)}
        isVisible={showDayDetail}
      />
    </>
  );
}

function ExportScreen() {
  const handleExportCsv = async () => {
    try {
      const now = new Date();
      const allLogs = getLogsForMonth(now.getFullYear(), now.getMonth() + 1);
      await exportToCsv(allLogs);
      Alert.alert('Success', 'Data exported to CSV');
    } catch (error) {
      Alert.alert('Error', 'Failed to export CSV');
      console.error(error);
    }
  };

  const handleExportPdf = async () => {
    try {
      const now = new Date();
      const allLogs = getLogsForMonth(now.getFullYear(), now.getMonth() + 1);
      await generatePdfReport(allLogs);
      Alert.alert('Success', 'Report generated');
    } catch (error) {
      Alert.alert('Error', 'Failed to generate report');
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenHeaderTitle}>Export Data</Text>
      </View>

      <View style={styles.exportSection}>
        <View style={styles.exportCard}>
          <MaterialCommunityIcons name="file-document" size={40} color="#E91E63" />
          <Text style={styles.exportTitle}>Export as CSV</Text>
          <Text style={styles.exportDescription}>
            Download your data in spreadsheet format for analysis
          </Text>
          <TouchableOpacity style={styles.exportButton} onPress={handleExportCsv}>
            <Text style={styles.exportButtonText}>Export CSV</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.exportCard}>
          <MaterialCommunityIcons name="file-pdf-box" size={40} color="#E91E63" />
          <Text style={styles.exportTitle}>Generate PDF Report</Text>
          <Text style={styles.exportDescription}>
            Create a beautiful report with charts and summaries
          </Text>
          <TouchableOpacity style={styles.exportButton} onPress={handleExportPdf}>
            <Text style={styles.exportButtonText}>Generate PDF</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

function SettingsScreen() {
  const [showTOS, setShowTOS] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          await SecureStore.deleteItemAsync('period_tracker_password');
          // Navigate to login - this would be handled by root navigation
          Alert.alert('Logged Out', 'You have been logged out successfully');
        },
        style: 'destructive',
      },
    ]);
  };

  const handleDeleteAllData = () => {
    try {
      deleteAllUserData();
      Alert.alert('Success', 'All your data has been permanently deleted');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete data');
      console.error(error);
    }
  };

  return (
    <>
      <SettingsTab
        onShowTOS={() => setShowTOS(true)}
        onShowPrivacy={() => setShowPrivacy(true)}
        onDeleteData={handleDeleteAllData}
        onLogout={handleLogout}
      />

      <Modal visible={showTOS} animationType="slide" onRequestClose={() => setShowTOS(false)}>
        <View style={styles.legalContainer}>
          <TouchableOpacity style={styles.legalClose} onPress={() => setShowTOS(false)}>
            <MaterialCommunityIcons name="close" size={24} color="#666" />
          </TouchableOpacity>
          <TermsOfService />
        </View>
      </Modal>

      <Modal visible={showPrivacy} animationType="slide" onRequestClose={() => setShowPrivacy(false)}>
        <View style={styles.legalContainer}>
          <TouchableOpacity style={styles.legalClose} onPress={() => setShowPrivacy(false)}>
            <MaterialCommunityIcons name="close" size={24} color="#666" />
          </TouchableOpacity>
          <PrivacyPolicy />
        </View>
      </Modal>
    </>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#E91E63',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopColor: '#E0E0E0',
          borderTopWidth: 1,
          paddingBottom: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Learn"
        component={EducationTab}
        options={{
          tabBarLabel: 'Learn',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-open-variant" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Export"
        component={ExportScreen}
        options={{
          tabBarLabel: 'Export',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="download" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Index() {
  return <MainTabs />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  calendarHeader: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  calendarHeaderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  screenHeader: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  screenHeaderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  exportSection: {
    padding: 16,
    gap: 16,
  },
  exportCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  exportTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginTop: 12,
  },
  exportDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  exportButton: {
    backgroundColor: '#E91E63',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
    minWidth: 150,
    alignItems: 'center',
  },
  exportButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  legalContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: 16,
  },
  legalClose: {
    alignSelf: 'flex-end',
    marginRight: 16,
    padding: 8,
    marginBottom: 8,
  },
});
