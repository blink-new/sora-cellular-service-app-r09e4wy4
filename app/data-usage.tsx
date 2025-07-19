import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
  Vibration,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function DataUsage() {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animatePress = (callback?: () => void) => {
    Vibration.vibrate(50);
    
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 300,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (callback) callback();
    });
  };

  const currentUsage = {
    used: 3.2,
    total: 10,
    percentage: 32,
    plan: 'Sora Starter',
    renewalDate: 'January 25, 2025',
    daysLeft: 7,
  };

  const dailyUsage = [
    { date: 'Jan 11', hours: 0.5, day: 'Mon' },
    { date: 'Jan 12', hours: 0.8, day: 'Tue' },
    { date: 'Jan 13', hours: 0.3, day: 'Wed' },
    { date: 'Jan 14', hours: 0.6, day: 'Thu' },
    { date: 'Jan 15', hours: 0.4, day: 'Fri' },
    { date: 'Jan 16', hours: 0.2, day: 'Sat' },
    { date: 'Jan 17', hours: 0.4, day: 'Sun' },
  ];

  const periods = [
    { id: 'current', label: 'Current Cycle' },
    { id: 'last', label: 'Last Cycle' },
    { id: 'history', label: 'History' },
  ];

  const handleSetAlert = () => {
    animatePress(() => {
      Alert.alert(
        'Data Usage Alert',
        'Set a custom alert when you reach a certain usage threshold.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: '80% Alert', onPress: () => Alert.alert('Alert Set', 'You\'ll be notified at 80% usage (8 hours)') },
          { text: '90% Alert', onPress: () => Alert.alert('Alert Set', 'You\'ll be notified at 90% usage (9 hours)') },
        ]
      );
    });
  };

  const handleUpgradePlan = () => {
    animatePress(() => {
      router.push('/(tabs)/plans');
    });
  };

  const renderUsageBar = () => {
    const barWidth = width - 48 - 32; // Account for padding
    const usedWidth = (currentUsage.percentage / 100) * barWidth;

    return (
      <View style={styles.usageBarContainer}>
        <View style={styles.usageBarBackground}>
          <View style={[styles.usageBarFill, { width: usedWidth }]} />
        </View>
        <View style={styles.usageLabels}>
          <Text style={styles.usageLabel}>0 hrs</Text>
          <Text style={styles.usageLabel}>{currentUsage.total} hrs</Text>
        </View>
      </View>
    );
  };

  const renderDailyChart = () => {
    const maxHours = Math.max(...dailyUsage.map(d => d.hours));
    
    return (
      <View style={styles.chartContainer}>
        <View style={styles.chartBars}>
          {dailyUsage.map((day, index) => {
            const barHeight = (day.hours / maxHours) * 80;
            return (
              <View key={index} style={styles.chartBarContainer}>
                <View style={styles.chartBarBackground}>
                  <View style={[styles.chartBar, { height: barHeight }]} />
                </View>
                <Text style={styles.chartLabel}>{day.day}</Text>
                <Text style={styles.chartHours}>{day.hours}h</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0F0F23', '#1E1B4B', '#312E81']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.title}>Data Usage</Text>
            <TouchableOpacity 
              style={styles.alertButton}
              onPress={handleSetAlert}
            >
              <Ionicons name="notifications" size={24} color="#F59E0B" />
            </TouchableOpacity>
          </View>

          {/* Period Selector */}
          <View style={styles.periodSelector}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period.id}
                style={[
                  styles.periodButton,
                  selectedPeriod === period.id && styles.periodButtonActive,
                ]}
                onPress={() => setSelectedPeriod(period.id)}
              >
                <Text style={[
                  styles.periodButtonText,
                  selectedPeriod === period.id && styles.periodButtonTextActive,
                ]}>
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Current Usage Overview */}
          <View style={styles.section}>
            <BlurView intensity={20} style={styles.usageCard}>
              <View style={styles.usageHeader}>
                <View>
                  <Text style={styles.usageTitle}>Current Usage</Text>
                  <Text style={styles.usagePlan}>{currentUsage.plan} Plan</Text>
                </View>
                <View style={styles.usageStats}>
                  <Text style={styles.usageHours}>{currentUsage.used}h</Text>
                  <Text style={styles.usageTotal}>of {currentUsage.total}h</Text>
                </View>
              </View>

              {renderUsageBar()}

              <View style={styles.usageDetails}>
                <View style={styles.usageDetailItem}>
                  <Ionicons name="time" size={16} color="#F59E0B" />
                  <Text style={styles.usageDetailText}>
                    {currentUsage.total - currentUsage.used}h remaining
                  </Text>
                </View>
                <View style={styles.usageDetailItem}>
                  <Ionicons name="calendar" size={16} color="#F59E0B" />
                  <Text style={styles.usageDetailText}>
                    Renews in {currentUsage.daysLeft} days
                  </Text>
                </View>
              </View>

              {currentUsage.percentage > 80 && (
                <View style={styles.warningBanner}>
                  <Ionicons name="warning" size={16} color="#F59E0B" />
                  <Text style={styles.warningText}>
                    You're running low on data. Consider upgrading your plan.
                  </Text>
                </View>
              )}
            </BlurView>
          </View>

          {/* Daily Usage Chart */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Daily Usage (Last 7 Days)</Text>
            <BlurView intensity={20} style={styles.chartCard}>
              {renderDailyChart()}
            </BlurView>
          </View>

          {/* Usage Statistics */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Statistics</Text>
            <BlurView intensity={20} style={styles.statsCard}>
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>0.46h</Text>
                  <Text style={styles.statLabel}>Daily Average</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>0.8h</Text>
                  <Text style={styles.statLabel}>Peak Day</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>68%</Text>
                  <Text style={styles.statLabel}>Efficiency</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>Jan 25</Text>
                  <Text style={styles.statLabel}>Next Renewal</Text>
                </View>
              </View>
            </BlurView>
          </View>

          {/* Action Buttons */}
          <View style={styles.section}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgradePlan}>
                <LinearGradient
                  colors={['#6366F1', '#8B5CF6']}
                  style={styles.upgradeButtonGradient}
                >
                  <Ionicons name="arrow-up" size={20} color="#FFFFFF" />
                  <Text style={styles.upgradeButtonText}>Upgrade Plan</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity style={styles.historyButton} onPress={() => {
                animatePress(() => {
                  Alert.alert('Usage History', 'Detailed usage history and analytics coming soon!');
                });
              }}>
                <Text style={styles.historyButtonText}>View Full History</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  alertButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 8,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#6366F1',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  usageCard: {
    borderRadius: 16,
    overflow: 'hidden',
    padding: 20,
  },
  usageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  usageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  usagePlan: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '500',
  },
  usageStats: {
    alignItems: 'flex-end',
  },
  usageHours: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6366F1',
  },
  usageTotal: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  usageBarContainer: {
    marginBottom: 20,
  },
  usageBarBackground: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  usageBarFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 4,
  },
  usageLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  usageLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  usageDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  usageDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  usageDetailText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '500',
  },
  chartCard: {
    borderRadius: 16,
    overflow: 'hidden',
    padding: 20,
  },
  chartContainer: {
    height: 120,
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 80,
    marginBottom: 16,
  },
  chartBarContainer: {
    alignItems: 'center',
    flex: 1,
  },
  chartBarBackground: {
    width: 24,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  chartBar: {
    width: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 12,
    minHeight: 4,
  },
  chartLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
    fontWeight: '500',
  },
  chartHours: {
    fontSize: 10,
    color: '#6366F1',
    marginTop: 2,
    fontWeight: '600',
  },
  statsCard: {
    borderRadius: 16,
    overflow: 'hidden',
    padding: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366F1',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  upgradeButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  upgradeButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  historyButton: {
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  historyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 100,
  },
});