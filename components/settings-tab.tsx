import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SettingsTabProps {
  onShowTOS?: () => void;
  onShowPrivacy?: () => void;
  onDeleteData?: () => void;
  onLogout?: () => void;
}

export function SettingsTab({
  onShowTOS,
  onShowPrivacy,
  onDeleteData,
  onLogout,
}: SettingsTabProps) {
  const handleDeleteData = () => {
    Alert.alert(
      'Delete All Data',
      'Are you sure? This will permanently delete all your period tracking data. This action cannot be undone.',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            onDeleteData?.();
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="heart-multiple"
          size={40}
          color="#E91E63"
        />
        <Text style={styles.appName}>Tydal</Text>
        <Text style={styles.appSubtitle}>Period Tracker</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.card}>
          <Text style={styles.description}>
            A private, password-protected period tracker app designed to help you understand your cycle better. Track flow rate, symptoms, mood, and notes with complete privacy and security.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal</Text>
        <TouchableOpacity style={styles.menuItem} onPress={onShowTOS}>
          <View style={styles.menuItemLeft}>
            <MaterialCommunityIcons
              name="file-document"
              size={20}
              color="#E91E63"
            />
            <View style={styles.menuItemText}>
              <Text style={styles.menuItemTitle}>Terms of Service</Text>
              <Text style={styles.menuItemSubtitle}>
                Review our terms and conditions
              </Text>
            </View>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color="#CCC"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={onShowPrivacy}>
          <View style={styles.menuItemLeft}>
            <MaterialCommunityIcons
              name="shield-lock"
              size={20}
              color="#E91E63"
            />
            <View style={styles.menuItemText}>
              <Text style={styles.menuItemTitle}>Privacy Policy</Text>
              <Text style={styles.menuItemSubtitle}>
                Learn how we protect your data
              </Text>
            </View>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color="#CCC"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featureGrid}>
          <View style={styles.featureCard}>
            <MaterialCommunityIcons
              name="calendar-heart"
              size={24}
              color="#E91E63"
            />
            <Text style={styles.featureTitle}>Calendar View</Text>
            <Text style={styles.featureDescription}>
              Visual tracking with color-coded flow intensity
            </Text>
          </View>

          <View style={styles.featureCard}>
            <MaterialCommunityIcons
              name="hospital-box"
              size={24}
              color="#E91E63"
            />
            <Text style={styles.featureTitle}>Symptom Tracking</Text>
            <Text style={styles.featureDescription}>
              Log pain, physical, and emotional symptoms
            </Text>
          </View>

          <View style={styles.featureCard}>
            <MaterialCommunityIcons
              name="lock"
              size={24}
              color="#E91E63"
            />
            <Text style={styles.featureTitle}>Password Protected</Text>
            <Text style={styles.featureDescription}>
              Your data stays private on your device
            </Text>
          </View>

          <View style={styles.featureCard}>
            <MaterialCommunityIcons
              name="file-export"
              size={24}
              color="#E91E63"
            />
            <Text style={styles.featureTitle}>Export Data</Text>
            <Text style={styles.featureDescription}>
              Download as PDF or CSV anytime
            </Text>
          </View>

          <View style={styles.featureCard}>
            <MaterialCommunityIcons
              name="fingerprint"
              size={24}
              color="#E91E63"
            />
            <Text style={styles.featureTitle}>Biometric Lock</Text>
            <Text style={styles.featureDescription}>
              Secure with fingerprint or face ID
            </Text>
          </View>

          <View style={styles.featureCard}>
            <MaterialCommunityIcons
              name="book-open"
              size={24}
              color="#E91E63"
            />
            <Text style={styles.featureTitle}>Education</Text>
            <Text style={styles.featureDescription}>
              Learn about your cycle and health
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy Commitment</Text>
        <View style={styles.card}>
          <View style={styles.commitmentItem}>
            <MaterialCommunityIcons
              name="check-circle"
              size={20}
              color="#E91E63"
            />
            <Text style={styles.commitmentText}>
              All data stored locally on your device
            </Text>
          </View>
          <View style={styles.commitmentItem}>
            <MaterialCommunityIcons
              name="check-circle"
              size={20}
              color="#E91E63"
            />
            <Text style={styles.commitmentText}>
              No cloud sync, no external servers
            </Text>
          </View>
          <View style={styles.commitmentItem}>
            <MaterialCommunityIcons
              name="check-circle"
              size={20}
              color="#E91E63"
            />
            <Text style={styles.commitmentText}>
              No tracking, no analytics, no ads
            </Text>
          </View>
          <View style={styles.commitmentItem}>
            <MaterialCommunityIcons
              name="check-circle"
              size={20}
              color="#E91E63"
            />
            <Text style={styles.commitmentText}>
              Password protected & biometric secure
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteData}>
        <MaterialCommunityIcons name="trash-can" size={18} color="white" />
        <Text style={styles.deleteButtonText}>Delete All Data</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <MaterialCommunityIcons name="logout" size={18} color="white" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#333',
    marginTop: 12,
  },
  appSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  version: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E91E63',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
    textAlign: 'center',
    lineHeight: 16,
  },
  commitmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  commitmentText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
    lineHeight: 20,
  },
  logoutButton: {
    backgroundColor: '#E91E63',
    marginHorizontal: 16,
    marginVertical: 20,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },
  deleteButton: {
    backgroundColor: '#D32F2F',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: '#D32F2F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  spacer: {
    height: 20,
  },
});
