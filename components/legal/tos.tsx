import { ScrollView, StyleSheet, Text, View } from 'react-native';

export function TermsOfService() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Terms of Service</Text>
        <Text style={styles.lastUpdated}>Last Updated: January 12, 2026</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.text}>
            By using the Tydal Period Tracker app ("Service"), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Use License</Text>
          <Text style={styles.text}>
            Permission is granted to temporarily download one copy of the materials (information or software) on Tydal Period Tracker for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>• Modifying or copying the materials</Text>
            <Text style={styles.listItem}>• Using the materials for any commercial purpose or for any public display</Text>
            <Text style={styles.listItem}>• Attempting to decompile or reverse engineer any software contained on the Service</Text>
            <Text style={styles.listItem}>• Removing any copyright or other proprietary notations from the materials</Text>
            <Text style={styles.listItem}>• Transferring the materials to another person or "mirroring" the materials on any other server</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Disclaimer</Text>
          <Text style={styles.text}>
            The materials on Tydal Period Tracker are provided on an 'as is' basis. Tydal makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Limitations</Text>
          <Text style={styles.text}>
            In no event shall Tydal or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Tydal Period Tracker, even if Tydal or a Tydal authorized representative has been notified orally or in writing of the possibility of such damage.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Accuracy of Materials</Text>
          <Text style={styles.text}>
            The materials appearing on Tydal Period Tracker could include technical, typographical, or photographic errors. Tydal does not warrant that any of the materials on its website are accurate, complete, or current. Tydal may make changes to the materials contained on its website at any time without notice.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Links</Text>
          <Text style={styles.text}>
            Tydal has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Tydal of the site. Use of any such linked website is at the user's own risk.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Modifications</Text>
          <Text style={styles.text}>
            Tydal may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Health Data Notice</Text>
          <Text style={styles.text}>
            Tydal Period Tracker stores your period tracking data locally on your device. This data is sensitive personal health information. You are responsible for maintaining the security of your device and the password you set for this app. Tydal is not responsible for any unauthorized access to your health data.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Governing Law</Text>
          <Text style={styles.text}>
            These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Tydal operates, and you irrevocably submit to the exclusive jurisdiction of the courts located in that location.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Contact Information</Text>
          <Text style={styles.text}>
            If you have any questions about these Terms of Service, please contact us through the app's feedback feature.
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
