import React, { useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { events } from '../src/data/schedule';
import { EventCard } from '../src/components/EventCard';

const CATEGORIES = ['All', 'Music', 'Tech', 'Dance', 'Misc'];

type SortOption = 'none' | 'day-asc' | 'regs-desc';

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('none');
  const [selectedEventIds, setSelectedEventIds] = useState<number[]>([]);

  const toggleCategory = (category: string) => {
  if (category === 'All') {
    setSelectedCategory([]); 
    return;
  }

  setSelectedCategory((prev) =>
    prev.includes(category)
      ? prev.filter((c) => c !== category) 
      : [...prev, category]                
  );
};

  const toggleEventSelection = (id: number) => {
  setSelectedEventIds((prev) => {
    if (prev.includes(id)) {
      return prev.filter((eventId) => eventId !== id);
    } else {
      return [...prev, id];
    }
  });
};

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory([]);
    setSortBy('none');
  
  };

  const totalEvents = events.length;

  const categoryStats = events.reduce((acc, event) => {
    acc[event.category] =
      (acc[event.category] || 0) + event.registrations;
    return acc;
  }, {} as Record<string, number>);

  const mostPopularCategory =
    Object.keys(categoryStats).length > 0   
      ? Object.keys(categoryStats).reduce((a, b) =>
          categoryStats[a] > categoryStats[b] ? a : b
        )
      : 'N/A';
  
  const processedEvents = [...events]
    .filter((event) => {
      const matchesCategory =
        selectedCategory.length === 0 ||
        selectedCategory.includes(event.category);
      const matchesSearch = event.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'day-asc') return a.day - b.day;
      if (sortBy === 'regs-desc')
        return b.registrations - a.registrations;
      return 0;
    });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <View style={styles.container}>
        <Text style={styles.headerTitle}>
          Fest Schedule Explorer
        </Text>

        
        <View style={styles.statsCard}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>
              Total Events
            </Text>
            <Text style={styles.statValue}>
              {totalEvents}
            </Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statBox}>
            <Text style={styles.statLabel}>
              Top Category
            </Text>
            <Text style={styles.statValue}>
              {mostPopularCategory}
            </Text>
          </View>
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Search for an event..."
          placeholderTextColor="#6B7280"
          value={searchQuery}
          onChangeText={setSearchQuery}></TextInput>

        <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
          <Text style={styles.resetBtnText}>Clear All Filters</Text>
        </TouchableOpacity>
        
        <View style={styles.filterWrapper}>
          <ScrollView    //for scrolling categories
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.filterChip,
                  (category === 'All' 
                    ? selectedCategory.length === 0 
                    : selectedCategory.includes(category)) &&
                    styles.filterChipActive,
                ]}
                onPress={() => toggleCategory(category)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.filterText,
                    (category === 'All' 
                      ? selectedCategory.length === 0 
                      : selectedCategory.includes(category)) &&
                      styles.filterTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        
        <View style={styles.sortWrapper}>
          <Text style={styles.sortLabel}>
            SORT BY
          </Text>

          <ScrollView     //used as Registration (descending) wasnt coming in same line
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sortScroll}
          >
            <TouchableOpacity   //sort
              style={[
                styles.sortBtn,
                sortBy === 'day-asc' &&
                  styles.sortBtnActive,
              ]}
              onPress={() =>
                setSortBy(
                  sortBy === 'day-asc'
                    ? 'none'
                    : 'day-asc'
                )
              }
            >
              <Text
                style={[
                  styles.sortBtnText,
                  sortBy === 'day-asc' &&
                    styles.sortBtnTextActive,
                ]}
              >
                Day (Ascending)
              </Text>
            </TouchableOpacity>
              
            <TouchableOpacity  //sorting
              style={[
                styles.sortBtn,
                sortBy === 'regs-desc' &&
                  styles.sortBtnActive,
              ]}
              onPress={() =>
                setSortBy(
                  sortBy === 'regs-desc'
                    ? 'none'
                    : 'regs-desc'
                )
              }
            >
              <Text
                style={[
                  styles.sortBtnText,
                  sortBy === 'regs-desc' &&
                    styles.sortBtnTextActive,
                ]}
              >
                Registrations (Descending)
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

      
        <ScrollView   
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {processedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isSelected={selectedEventIds.includes(event.id)} 
              onToggle={() => toggleEventSelection(event.id)} 
            />
          ))}

          {processedEvents.length === 0 && (    //if no event matched
            <Text style={styles.emptyText}>
              No events match your current filters.
            </Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B1120',
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  headerTitle: {
  fontSize: 34,
  fontWeight: '900',
  color: '#FFFFFF',
  letterSpacing: -1.2,
  marginTop: 35,
  marginBottom: 20,
  textShadowColor: 'rgba(77, 171, 247, 0.6)', 
  textShadowOffset: { width: 0, height: 0 },
  textShadowRadius: 15,
},

  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#30187d',
    paddingVertical: 26,
    paddingHorizontal: 24,
    borderRadius: 28,
    marginBottom: 24,

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 10,
  },

  statBox: {
    flex: 1,
    alignItems: 'center',
  },

  statDivider: {
    width: 2,
    height: '100%',
    backgroundColor: 'rgba(19, 13, 85, 0.55)',
    marginHorizontal: 18,
  },

  statLabel: {
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
  },

  statValue: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
  },

  searchInput: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 22,
    paddingVertical: 18,
    borderRadius: 18,
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 22,
  },

  filterWrapper: {
    marginBottom: 20,
  },

  filterScroll: {
    paddingRight: 20,
    gap: 12,
  },

  filterChip: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: '#1F2937',
  },

  filterChipActive: {
    backgroundColor: '#30187d',
    shadowColor: '#30187d',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },

  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D1D5DB',
  },

  filterTextActive: {
    color: '#FFFFFF',
  },

  sortWrapper: {
    marginBottom: 20,
  },

  sortLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#a5b0c2',
    marginBottom: 10,
    letterSpacing: 1.5,
  },

  sortScroll: {
    gap: 10,
  },

  sortBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#1F2937',
  },

  sortBtnActive: {
    backgroundColor: '#30187d',
  },

  sortBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#D1D5DB',
  },

  sortBtnTextActive: {
    color: '#FFFFFF',
  },

  scrollContent: {
    paddingBottom: 50,
  },

  emptyText: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginTop: 50,
    fontSize: 16,
    fontWeight: '500',
  },

resetBtn: {
  alignSelf: 'flex-end',
  marginBottom: 10,
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 8,
  backgroundColor: 'rgba(255, 59, 48, 0.1)',
  borderWidth: 1,
  borderColor: 'rgba(255, 59, 48, 0.3)',
},
resetBtnText: {
  color: '#FF3B30',
  fontSize: 12,
  fontWeight: '700',
},
});
