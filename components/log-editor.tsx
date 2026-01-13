import { DailyLog, Symptom, getAllSymptoms } from '@/lib/data-service';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface LogEditorProps {
  log: DailyLog | null;
  onSave: (flowRate: number, notes: string, mood: string, selectedSymptoms: number[]) => void;
  selectedSymptoms: number[];
  onSymptomChange: (symptomId: number, selected: boolean) => void;
}

export function LogEditor({
  log,
  onSave,
  selectedSymptoms,
  onSymptomChange,
}: LogEditorProps) {
  const [flowRate, setFlowRate] = useState(log?.flow_rate.toString() || '3');
  const [notes, setNotes] = useState(log?.notes || '');
  const [mood, setMood] = useState(log?.mood || '');
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [showFlowPicker, setShowFlowPicker] = useState(false);

  useEffect(() => {
    const loadSymptoms = async () => {
      const symp = getAllSymptoms();
      setSymptoms(symp);
    };
    loadSymptoms();
  }, []);

  const handleSave = () => {
    const flow = parseInt(flowRate, 10) || 3;
    if (flow < 1 || flow > 5) {
      alert('Flow rate must be between 1 and 5');
      return;
    }
    onSave(flow, notes, mood, selectedSymptoms);
  };

  const getSymptomsByCategory = () => {
    const grouped: { [key: string]: Symptom[] } = {};
    symptoms.forEach((symptom) => {
      if (!grouped[symptom.category]) {
        grouped[symptom.category] = [];
      }
      grouped[symptom.category].push(symptom);
    });
    return grouped;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Flow Rate</Text>
        <TouchableOpacity
          style={styles.flowPicker}
          onPress={() => setShowFlowPicker(true)}
        >
          <Text style={styles.flowValue}>{flowRate}</Text>
          <Text style={styles.flowLabel}>/ 5</Text>
        </TouchableOpacity>

        <View style={styles.flowGuide}>
          <Text style={styles.guideTitle}>Guide:</Text>
          <Text style={styles.guideText}>1 = Spotting | 2 = Light | 3 = Medium | 4 = Heavy | 5 = Very Heavy</Text>
        </View>

        <Modal visible={showFlowPicker} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.pickerContent}>
              <Text style={styles.pickerTitle}>Select Flow Rate</Text>
              <FlatList
                data={[1, 2, 3, 4, 5]}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.pickerOption,
                      flowRate === item.toString() && styles.pickerOptionSelected,
                    ]}
                    onPress={() => {
                      setFlowRate(item.toString());
                      setShowFlowPicker(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.pickerOptionText,
                        flowRate === item.toString() && styles.pickerOptionTextSelected,
                      ]}
                    >
                      Level {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowFlowPicker(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Symptoms</Text>
        {Object.entries(getSymptomsByCategory()).map(([category, symp]) => (
          <View key={category} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category}</Text>
            {symp.map((symptom) => (
              <TouchableOpacity
                key={symptom.id}
                style={styles.symptomCheckbox}
                onPress={() =>
                  onSymptomChange(symptom.id, !selectedSymptoms.includes(symptom.id))
                }
              >
                <View
                  style={[
                    styles.checkbox,
                    selectedSymptoms.includes(symptom.id) && styles.checkboxChecked,
                  ]}
                >
                  {selectedSymptoms.includes(symptom.id) && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
                <Text style={styles.symptomLabel}>{symptom.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mood</Text>
        <TextInput
          style={[styles.input, styles.moodInput]}
          placeholder="How are you feeling today?"
          value={mood}
          onChangeText={setMood}
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          placeholder="Any additional notes..."
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Log</Text>
      </TouchableOpacity>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  flowPicker: {
    backgroundColor: '#f9f9f9',
    borderWidth: 2,
    borderColor: '#e91e63',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  flowValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#e91e63',
  },
  flowLabel: {
    fontSize: 16,
    color: '#999',
  },
  flowGuide: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  guideTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  guideText: {
    fontSize: 12,
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  pickerContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingTop: 16,
    paddingBottom: 24,
    maxHeight: '70%',
  },
  pickerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  pickerOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  pickerOptionSelected: {
    backgroundColor: '#FFE0E6',
  },
  pickerOptionText: {
    fontSize: 14,
    color: '#333',
  },
  pickerOptionTextSelected: {
    color: '#e91e63',
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#e91e63',
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    marginLeft: 4,
  },
  symptomCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#e91e63',
    borderColor: '#e91e63',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  symptomLabel: {
    fontSize: 14,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    textAlignVertical: 'top',
  },
  moodInput: {
    minHeight: 80,
  },
  notesInput: {
    minHeight: 100,
  },
  saveButton: {
    backgroundColor: '#e91e63',
    marginHorizontal: 16,
    marginVertical: 20,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  spacer: {
    height: 20,
  },
});
