import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FestEvent } from '../data/schedule';


interface EventCardProps {
  event: FestEvent;
}

export const EventCard = ({ event }: EventCardProps) => {
  
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const toggleSave = () => {
    setIsSaved(prevState => !prevState);
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <Text style={styles.eventName}>{event.name}</Text>
        <Text style={styles.categoryBadge}>{event.category}</Text>
      </View>
      
      <Text style={styles.detailText}>📍 {event.venue}</Text>
      <Text style={styles.detailText}>🕒 Day {event.day} | {event.time}</Text>
      <Text style={styles.detailText}>👥 {event.registrations} Registrations</Text>

      
      <TouchableOpacity 
        style={[styles.saveButton, isSaved && styles.saveButtonActive]} 
        onPress={toggleSave}
        activeOpacity={0.7}
      >
        <Text style={[styles.saveButtonText, isSaved && styles.saveButtonTextActive]}>
          {isSaved ? "★ Saved" : "☆ Save Event"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  
  cardContainer: {
    backgroundColor: '#111827', 
    padding: 22,
    marginBottom: 22,
    borderRadius: 26,

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 8,
  },

  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },

  eventName: {
    fontSize: 21,
    fontWeight: '900',
    color: '#F8FAFC', 
    letterSpacing: -0.6,
    flexShrink: 1,
  },

 
  categoryBadge: {
    backgroundColor: 'rgba(99,102,241,0.18)',
    color: '#A5B4FC', 
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    fontSize: 12,
    fontWeight: '800',
    overflow: 'hidden',
  },

  
  detailText: {
    fontSize: 15,
    color: '#9CA3AF', 
    fontWeight: '500',
    marginBottom: 8,
    letterSpacing: 0.3,
  },

  
  saveButton: {
    marginTop: 18,
    paddingVertical: 15,
    borderRadius: 16,
    backgroundColor: '#1F2937',
    alignItems: 'center',
  },

  saveButtonActive: {
    backgroundColor: '#6366F1',

    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },

  saveButtonText: {
    color: '#D1D5DB',
    fontWeight: '800',
    fontSize: 15,
    letterSpacing: 0.4,
  },

  saveButtonTextActive: {
    color: '#FFFFFF',
  },
});
