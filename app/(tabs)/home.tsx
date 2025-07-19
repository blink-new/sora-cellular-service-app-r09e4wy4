import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function Home() {
  const [userEmail, setUserEmail] = useState('');
  const [currentPlan, setCurrentPlan] = useState('Sora Starter');
  const [dataUsed, setDataUsed] = useState(3.2);
  const [dataLimit, setDataLimit] = useState(10);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const session = await AsyncStorage.getItem('userSession');
      if (session) {
        const userData = JSON.parse(session);
        setUserEmail(userData.email);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getDataPercentage = () => {
    return (dataUsed / dataLimit) * 100;
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
            <View>
              <Text style={styles.greeting}>{getGreeting()}</Text>
              <Text style={styles.userEmail}>{userEmail}</Text>
            </View>
            <TouchableOpacity style={styles.profileButton}>
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                style={styles.profileGradient}
              >
                <Ionicons name="person" size={24} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Current Plan Card */}
          <BlurView intensity={20} style={styles.planCard}>
            <LinearGradient
              colors={['rgba(99, 102, 241, 0.2)', 'rgba(139, 92, 246, 0.2)']}
              style={styles.planCardGradient}
            >
              <View style={styles.planHeader}>
                <Text style={styles.planTitle}>Current Plan</Text>
                <View style={styles.planBadge}>
                  <Text style={styles.planBadgeText}>ACTIVE</Text>
                </View>
              </View>
              <Text style={styles.planName}>{currentPlan}</Text>
              <Text style={styles.planPrice}>$30.34/month</Text>
            </LinearGradient>
          </BlurView>

          {/* Data Usage Card */}
          <BlurView intensity={20} style={styles.dataCard}>
            <View style={styles.dataCardContent}>
              <View style={styles.dataHeader}>
                <Text style={styles.dataTitle}>Data Usage</Text>
                <Text style={styles.dataPercentage}>{getDataPercentage().toFixed(0)}%</Text>
              </View>
              
              <View style={styles.dataProgressContainer}>
                <View style={styles.dataProgressBackground}>
                  <LinearGradient
                    colors={['#6366F1', '#8B5CF6']}
                    style={[styles.dataProgress, { width: `${getDataPercentage()}%` }]}
                  />
                </View>
              </View>
              
              <View style={styles.dataStats}>
                <Text style={styles.dataUsed}>{dataUsed} hrs used</Text>
                <Text style={styles.dataLimit}>of {dataLimit} hrs</Text>
              </View>
            </View>
          </BlurView>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              <TouchableOpacity style={styles.actionButton}>
                <BlurView intensity={20} style={styles.actionBlur}>
                  <Ionicons name="add-circle" size={32} color="#6366F1" />
                  <Text style={styles.actionText}>Add Data</Text>
                </BlurView>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <BlurView intensity={20} style={styles.actionBlur}>
                  <Ionicons name="card" size={32} color="#F59E0B" />
                  <Text style={styles.actionText}>Billing</Text>
                </BlurView>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <BlurView intensity={20} style={styles.actionBlur}>
                  <Ionicons name="headset" size={32} color="#10B981" />
                  <Text style={styles.actionText}>Support</Text>
                </BlurView>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <BlurView intensity={20} style={styles.actionBlur}>
                  <Ionicons name="analytics" size={32} color="#8B5CF6" />
                  <Text style={styles.actionText}>Usage</Text>
                </BlurView>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.recentActivity}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <BlurView intensity={20} style={styles.activityCard}>
              <View style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Ionicons name="wifi" size={20} color="#6366F1" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Data Session Started</Text>
                  <Text style={styles.activityTime}>2 hours ago</Text>
                </View>
              </View>
              
              <View style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Ionicons name="card" size={20} color="#F59E0B" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Payment Processed</Text>
                  <Text style={styles.activityTime}>1 day ago</Text>
                </View>
              </View>
              
              <View style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>Plan Activated</Text>
                  <Text style={styles.activityTime}>3 days ago</Text>
                </View>
              </View>
            </BlurView>
          </View>

          {/* Bottom Spacing for Floating Navigation */}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  profileButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileGradient: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  planCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
  },
  planCardGradient: {
    padding: 24,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  planTitle: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  planBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  planBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 18,
    color: '#6366F1',
    fontWeight: '600',
  },
  dataCard: {
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 20,
    overflow: 'hidden',
  },
  dataCardContent: {
    padding: 24,
  },
  dataHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dataPercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366F1',
  },
  dataProgressContainer: {
    marginBottom: 16,
  },
  dataProgressBackground: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  dataProgress: {
    height: '100%',
    borderRadius: 4,
  },
  dataStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataUsed: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  dataLimit: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  quickActions: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: (width - 72) / 2,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionBlur: {
    padding: 20,
    alignItems: 'center',
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
  recentActivity: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  activityCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  bottomSpacing: {
    height: 100,
  },
});