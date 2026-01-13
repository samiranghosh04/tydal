import {
  DailyLog,
  deleteDailyLog,
  getAllSymptoms,
  Symptom,
} from '@/lib/data-service';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface DayDetailProps {
  date: string;
  log: DailyLog | null;
  symptoms: number[];
  onEdit?: (
    flowRate: number,
    notes: string,
    mood: string,
    symptoms: number[]
  ) => void;
  onDelete?: () => void;
  onClose?: () => void;
  isVisible?: boolean;
}

export function DayDetail({
  date,
  log,
  symptoms,
  onEdit,
  onDelete,
  onClose,
  isVisible = true,
}: DayDetailProps) {
  const slideAnim = useRef(new Animated.Value(1000)).current;
  const [isEditing, setIsEditing] = useState(false);
  const [flowRate, setFlowRate] = useState(log?.flow_rate.toString() || '3');
  const [notes, setNotes] = useState(log?.notes || '');
  const [mood, setMood] = useState(log?.mood || '');
  const [selectedSymptoms, setSelectedSymptoms] = useState<number[]>(symptoms);
  const [showFlowPicker, setShowFlowPicker] = useState(false);
  const [allSymptoms, setAllSymptoms] = useState<Symptom[]>([]);

  useEffect(() => {
    const loaded = getAllSymptoms();
    setAllSymptoms(loaded);
  }, []);

  useEffect(() => {
    if (isVisible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 12,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 1000,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);

  const handleSave = () => {
    const flow = parseInt(flowRate, 10) || 3;
    onEdit?.(flow, notes, mood, selectedSymptoms);
    setIsEditing(false);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this period entry?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            if (log) {
              deleteDailyLog(log.id);
              onDelete?.();
              onClose?.();
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const dayOfWeek = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
  });

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const getFlowLabel = (flowRate: number) => {
    switch (flowRate) {
      case 1:
        return 'Light';
      case 2:
        return 'Light-Medium';
      case 3:
        return 'Medium';
      case 4:
        return 'Heavy';
      case 5:
        return 'Very Heavy';
      default:
        return '';
    }
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

  const selectedSymptomObjects = useMemo(
    () =>
      allSymptoms.filter((s) =>
        selectedSymptoms.includes(s.id)
      ),
    [selectedSymptoms, allSymptoms]
  );

  const symptomsByCategory = useMemo(() => {
    const grouped: { [key: string]: Symptom[] } = {};
    selectedSymptomObjects.forEach((symptom) => {
      if (!grouped[symptom.category]) {
        grouped[symptom.category] = [];
      }
      grouped[symptom.category].push(symptom);
    });
    return grouped;
  }, [selectedSymptomObjects]);

  const allSymptomsByCategory = useMemo(() => {
    const grouped: { [key: string]: Symptom[] } = {};
    allSymptoms.forEach((symptom) => {
      if (!grouped[symptom.category]) {
        grouped[symptom.category] = [];
      }
      grouped[symptom.category].push(symptom);
    });
    return grouped;
  }, [allSymptoms]);

  if (!isEditing && !log) {
    return (
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.dateSection}>
              <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
              <Text style={styles.date}>{formattedDate}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <MaterialCommunityIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="calendar-plus"
              size={48}
              color="#DDD"
            />
            <Text style={styles.emptyText}>No period log for this day</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setIsEditing(true)}
            >
              <MaterialCommunityIcons name="plus" size={20} color="white" />
              <Text style={styles.addButtonText}>Log Period</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.dateSection}>
            <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <MaterialCommunityIcons name="close" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {!isEditing ? (
          <>
            {/* Flow Rate Card */}
            {log && (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardIcon}>
                    <MaterialCommunityIcons
                      name="water"
                      size={20}
                      color="#E91E63"
                    />
                  </View>
                  <Text style={styles.cardTitle}>Flow Rate</Text>
                </View>
                <View style={[styles.flowDisplay, { backgroundColor: getFlowColor(log.flow_rate) }]}>
                  <Text style={styles.flowValue}>{log.flow_rate}</Text>
                  <Text style={styles.flowLabel}>/5</Text>
                </View>
                <Text style={styles.flowDescription}>
                  {getFlowLabel(log.flow_rate)}
                </Text>
              </View>
            )}

            {/* Mood Card */}
            {log?.mood && (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardIcon}>
                    <MaterialCommunityIcons
                      name="emoticon-happy"
                      size={20}
                      color="#E91E63"
                    />
                  </View>
                  <Text style={styles.cardTitle}>Mood</Text>
                </View>
                <Text style={styles.cardValue}>{log.mood}</Text>
              </View>
            )}

            {/* Symptoms Card */}
            {Object.keys(symptomsByCategory).length > 0 && (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardIcon}>
                    <MaterialCommunityIcons
                      name="hospital-box"
                      size={20}
                      color="#E91E63"
                    />
                  </View>
                  <Text style={styles.cardTitle}>Symptoms</Text>
                </View>
                {Object.entries(symptomsByCategory).map(([category, syms]) => (
                  <View key={category} style={styles.categoryGroup}>
                    <Text style={styles.categoryName}>{category}</Text>
                    <View style={styles.symptomTags}>
                      {syms.map((symptom) => (
                        <View key={symptom.id} style={styles.symptomTag}>
                          <MaterialCommunityIcons
                            name="check-circle"
                            size={14}
                            color="#E91E63"
                          />
                          <Text style={styles.symptomTagText}>
                            {symptom.name}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Notes Card */}
            {log?.notes && (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardIcon}>
                    <MaterialCommunityIcons
                      name="note-text"
                      size={20}
                      color="#E91E63"
                    />
                  </View>
                  <Text style={styles.cardTitle}>Notes</Text>
                </View>
                <Text style={styles.cardValue}>{log.notes}</Text>
              </View>
            )}

            {/* Edit Button */}
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <MaterialCommunityIcons
                name="pencil"
                size={18}
                color="white"
              />
              <Text style={styles.editButtonText}>Edit Log</Text>
            </TouchableOpacity>

            {/* Delete Button */}
            {log && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}
              >
                <MaterialCommunityIcons
                  name="trash-can"
                  size={18}
                  color="white"
                />
                <Text style={styles.deleteButtonText}>Delete Entry</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <>
            {/* Editing Mode */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Flow Rate</Text>
              <TouchableOpacity
                style={styles.flowPicker}
                onPress={() => setShowFlowPicker(true)}
              >
                <Text style={styles.flowPickerValue}>{flowRate}</Text>
                <Text style={styles.flowPickerLabel}>/ 5</Text>
              </TouchableOpacity>

              <Modal visible={showFlowPicker} transparent animationType="fade">
                <View style={styles.pickerOverlay}>
                  <View style={styles.pickerContent}>
                    <Text style={styles.pickerTitle}>Select Flow Rate</Text>
                    <FlatList
                      data={[1, 2, 3, 4, 5]}
                      keyExtractor={(item) => item.toString()}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={[
                            styles.pickerOption,
                            flowRate === item.toString() &&
                              styles.pickerOptionSelected,
                          ]}
                          onPress={() => {
                            setFlowRate(item.toString());
                            setShowFlowPicker(false);
                          }}
                        >
                          <Text
                            style={[
                              styles.pickerOptionText,
                              flowRate === item.toString() &&
                                styles.pickerOptionTextSelected,
                            ]}
                          >
                            {getFlowLabel(item)}
                          </Text>
                        </TouchableOpacity>
                      )}
                    />
                    <TouchableOpacity
                      style={styles.pickerClose}
                      onPress={() => setShowFlowPicker(false)}
                    >
                      <Text style={styles.pickerCloseText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>

            {/* Mood Input */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Mood</Text>
              <TextInput
                style={styles.input}
                placeholder="How are you feeling?"
                value={mood}
                onChangeText={setMood}
                placeholderTextColor="#CCC"
              />
            </View>

            {/* Symptoms Selection */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Symptoms</Text>
              {Object.entries(allSymptomsByCategory).map(([category, syms]) => (
                <View key={category} style={styles.categoryGroup}>
                  <Text style={styles.categoryName}>{category}</Text>
                  {syms.map((symptom) => (
                    <TouchableOpacity
                      key={symptom.id}
                      style={styles.symptomOption}
                      onPress={() => {
                        if (selectedSymptoms.includes(symptom.id)) {
                          setSelectedSymptoms(
                            selectedSymptoms.filter((id) => id !== symptom.id)
                          );
                        } else {
                          setSelectedSymptoms([
                            ...selectedSymptoms,
                            symptom.id,
                          ]);
                        }
                      }}
                    >
                      <View
                        style={[
                          styles.checkbox,
                          selectedSymptoms.includes(symptom.id) &&
                            styles.checkboxChecked,
                        ]}
                      >
                        {selectedSymptoms.includes(symptom.id) && (
                          <MaterialCommunityIcons
                            name="check"
                            size={14}
                            color="white"
                          />
                        )}
                      </View>
                      <Text style={styles.symptomLabel}>{symptom.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>

            {/* Notes Input */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Notes</Text>
              <TextInput
                style={[styles.input, styles.notesInput]}
                placeholder="Add any notes..."
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={4}
                placeholderTextColor="#CCC"
              />
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsEditing(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
              >
                <MaterialCommunityIcons
                  name="check"
                  size={18}
                  color="white"
                />
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <View style={styles.spacer} />
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  dateSection: {
    flex: 1,
  },
  dayOfWeek: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  date: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  closeBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  cardIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFE0E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  flowDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 20,
    marginBottom: 8,
  },
  flowValue: {
    fontSize: 40,
    fontWeight: '800',
    color: '#333',
  },
  flowLabel: {
    fontSize: 16,
    color: '#999',
    marginLeft: 4,
    marginTop: 8,
  },
  flowDescription: {
    textAlign: 'center',
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  cardValue: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  categoryGroup: {
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#E91E63',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  symptomTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  symptomTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE0E6',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  symptomTagText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 12,
    marginBottom: 24,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#E91E63',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    gap: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#E91E63',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  editButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  deleteButton: {
    flexDirection: 'row',
    backgroundColor: '#D32F2F',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  flowPicker: {
    backgroundColor: '#F9F9F9',
    borderWidth: 2,
    borderColor: '#E91E63',
    borderRadius: 8,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  flowPickerValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#E91E63',
  },
  flowPickerLabel: {
    fontSize: 14,
    color: '#999',
  },
  pickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  pickerContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 16,
    maxHeight: '70%',
  },
  pickerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  pickerOption: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  pickerOptionSelected: {
    backgroundColor: '#FFE0E6',
  },
  pickerOptionText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  pickerOptionTextSelected: {
    color: '#E91E63',
    fontWeight: '700',
  },
  pickerClose: {
    backgroundColor: '#E91E63',
    marginHorizontal: 16,
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  pickerCloseText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  notesInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  symptomOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#DDD',
    borderRadius: 6,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#E91E63',
    borderColor: '#E91E63',
  },
  symptomLabel: {
    fontSize: 14,
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#E91E63',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#E91E63',
    fontWeight: '600',
    fontSize: 14,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#E91E63',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  spacer: {
    height: 20,
  },
});
