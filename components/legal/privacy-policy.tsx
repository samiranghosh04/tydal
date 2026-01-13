import { ScrollView, StyleSheet, Text, View } from 'react-native';

export function PrivacyPolicy() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.lastUpdated}>Last Updated: January 12, 2026</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Introduction</Text>
          <Text style={styles.text}>
            Tydal Period Tracker ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Information Collection</Text>
          <Text style={styles.text}>
            Our app collects health data that you voluntarily provide, including:
          </Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>• Period flow rate information</Text>
            <Text style={styles.listItem}>• Symptoms you experience</Text>
            <Text style={styles.listItem}>• Mood and emotional data</Text>
            <Text style={styles.listItem}>• Personal notes and observations</Text>
            <Text style={styles.listItem}>• Your password (encrypted)</Text>
          </View>
          <Text style={[styles.text, styles.textMarginTop]}>
            We do not collect any information beyond what you explicitly provide to the app.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Data Storage</Text>
          <Text style={styles.text}>
            All your health data is stored locally on your device using encrypted local storage. We do not have access to this data, nor do we send it to any servers or third parties. Your data remains completely under your control.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Password Protection</Text>
          <Text style={styles.text}>
            Your password is hashed using bcryptjs with a strength of 10 salt rounds. We use expo-secure-store to securely store your password locally on your device. Your password is never sent to any server and is only verified locally.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Data Security</Text>
          <Text style={styles.text}>
            We implement security measures designed to protect your information. However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security of your data.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Biometric Authentication</Text>
          <Text style={styles.text}>
            When you enable biometric authentication (fingerprint, face recognition), this information is only used locally on your device through the device's native biometric APIs. Tydal does not store or have access to your biometric data.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Third-Party Services</Text>
          <Text style={styles.text}>
            Our app does not integrate with third-party analytics, tracking, or advertising services. We do not share your data with any external companies or services.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Data Export</Text>
          <Text style={styles.text}>
            You have the right to export your data in CSV or PDF format. This data is generated locally on your device and shared through your device's native sharing mechanism. You have complete control over where this data goes.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Data Deletion</Text>
          <Text style={styles.text}>
            All your data is stored locally on your device. If you uninstall the app or clear the app's data, all your information will be permanently deleted from your device. Once deleted, we cannot recover this data.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Children's Privacy</Text>
          <Text style={styles.text}>
            Tydal Period Tracker is not intended for children under the age of 13. We do not knowingly collect information from children under 13. If we become aware that we have collected personal data from a child under 13, we will delete such information immediately.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. Your Rights</Text>
          <Text style={styles.text}>
            You have the right to:
          </Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>• Access your data at any time</Text>
            <Text style={styles.listItem}>• Export your data</Text>
            <Text style={styles.listItem}>• Delete your data by uninstalling the app</Text>
            <Text style={styles.listItem}>• Disable biometric authentication</Text>
            <Text style={styles.listItem}>• Change your password</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>12. Policy Changes</Text>
          <Text style={styles.text}>
            We may update our Privacy Policy from time to time. We will notify you of any changes by updating the "Last Updated" date of this Privacy Policy. Your continued use of the Service after such modifications constitutes your acknowledgment of the updated Privacy Policy.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>13. Contact Us</Text>
          <Text style={styles.text}>
            If you have any questions about this Privacy Policy, please contact us through the app's feedback feature.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>14. Commitment to Privacy</Text>
          <Text style={styles.text}>
            Your privacy and trust are extremely important to us. Tydal is designed with privacy as a core principle. Your period data is sensitive and personal—it belongs to you and only you. We respect that completely.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#999',
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E91E63',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  textMarginTop: {
    marginTop: 8,
  },
  list: {
    marginTop: 8,
  },
  listItem: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    marginBottom: 6,
  },
});
