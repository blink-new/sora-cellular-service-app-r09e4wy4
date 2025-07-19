import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  Animated,
  Vibration,
  Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function More() {
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

  const handleReferFriend = () => {
    animatePress(() => {
      Share.share({
        message: 'Join me on Sora Cellular! Get premium data service with amazing plans. Use my referral code: SORA2025',
        title: 'Join Sora Cellular',
      });
    });
  };

  const handleRateApp = () => {
    animatePress(() => {
      Alert.alert(
        'Rate Sora Cellular',
        'Love using our app? Rate us on the App Store!',
        [
          { text: 'Later', style: 'cancel' },
          { text: 'Rate Now', onPress: () => Alert.alert('Thank You!', 'Thanks for your feedback!') }
        ]
      );
    });
  };

  const handleFeedback = () => {
    animatePress(() => {
      Alert.alert(
        'Send Feedback',
        'Help us improve Sora Cellular with your suggestions.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Bug Report', onPress: () => Alert.alert('Bug Report', 'Bug reporting feature coming soon!') },
          { text: 'Feature Request', onPress: () => Alert.alert('Feature Request', 'Feature request form coming soon!') }
        ]
      );
    });
  };

  const handleSocialMedia = (platform: string) => {
    animatePress(() => {
      const urls = {
        twitter: 'https://twitter.com/soracellular',
        instagram: 'https://instagram.com/soracellular',
        facebook: 'https://facebook.com/soracellular',
        linkedin: 'https://linkedin.com/company/soracellular',
      };
      
      Alert.alert(
        `Follow us on ${platform}`,
        `Stay updated with the latest news and updates!`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open', onPress: () => Linking.openURL(urls[platform as keyof typeof urls]) }
        ]
      );
    });
  };

  const handleRewards = () => {
    animatePress(() => {
      Alert.alert(
        'Sora Rewards',
        'Earn points for every referral and get exclusive benefits!',
        [
          { text: 'Learn More', onPress: () => Alert.alert('Rewards Program', 'Detailed rewards program coming soon!') },
          { text: 'My Points', onPress: () => Alert.alert('Your Points', 'You have 150 reward points!') }
        ]
      );
    });
  };

  const handleNetworkStatus = () => {
    animatePress(() => {
      Alert.alert(
        'Network Status',
        'Check the current status of Sora network coverage.',
        [
          { text: 'Coverage Map', onPress: () => Alert.alert('Coverage Map', 'Interactive coverage map coming soon!') },
          { text: 'Network Health', onPress: () => Alert.alert('Network Health', 'All systems operational ✅') }
        ]
      );
    });
  };

  const moreOptions = [
    {
      title: 'Account & Services',
      items: [
        {
          id: 'refer-friend',
          icon: 'people',
          title: 'Refer a Friend',
          subtitle: 'Earn rewards for every referral',
          onPress: handleReferFriend,
          badge: 'Earn $10',
        },
        {
          id: 'rewards',
          icon: 'gift',
          title: 'Sora Rewards',
          subtitle: 'View your points and benefits',
          onPress: handleRewards,
          badge: '150 pts',
        },
        {
          id: 'network-status',
          icon: 'cellular',
          title: 'Network Status',
          subtitle: 'Check coverage and network health',
          onPress: handleNetworkStatus,
        },
        {
          id: 'family-plan',
          icon: 'home',
          title: 'Family Plans',
          subtitle: 'Manage family members and shared data',
          onPress: () => animatePress(() => {
            Alert.alert('Family Plans', 'Family plan management coming soon!');
          }),
        },
      ],
    },
    {
      title: 'App & Feedback',
      items: [
        {
          id: 'rate-app',
          icon: 'star',
          title: 'Rate Our App',
          subtitle: 'Share your experience with others',
          onPress: handleRateApp,
        },
        {
          id: 'feedback',
          icon: 'chatbubble-ellipses',
          title: 'Send Feedback',
          subtitle: 'Help us improve with your suggestions',
          onPress: handleFeedback,
        },
        {
          id: 'beta-features',
          icon: 'flask',
          title: 'Beta Features',
          subtitle: 'Try experimental features early',
          onPress: () => animatePress(() => {
            Alert.alert('Beta Features', 'Join our beta program to test new features!', [
              { text: 'Not Now', style: 'cancel' },
              { text: 'Join Beta', onPress: () => Alert.alert('Welcome!', 'You\'re now part of our beta program!') }
            ]);
          }),
        },
        {
          id: 'accessibility',
          icon: 'accessibility',
          title: 'Accessibility',
          subtitle: 'Customize app for better accessibility',
          onPress: () => animatePress(() => {
            Alert.alert('Accessibility Settings', 'Accessibility options coming soon!');
          }),
        },
      ],
    },
    {
      title: 'Connect With Us',
      items: [
        {
          id: 'twitter',
          icon: 'logo-twitter',
          title: 'Twitter',
          subtitle: '@soracellular',
          onPress: () => handleSocialMedia('twitter'),
        },
        {
          id: 'instagram',
          icon: 'logo-instagram',
          title: 'Instagram',
          subtitle: '@soracellular',
          onPress: () => handleSocialMedia('instagram'),
        },
        {
          id: 'facebook',
          icon: 'logo-facebook',
          title: 'Facebook',
          subtitle: 'Sora Cellular',
          onPress: () => handleSocialMedia('facebook'),
        },
        {
          id: 'linkedin',
          icon: 'logo-linkedin',
          title: 'LinkedIn',
          subtitle: 'Sora Technologies',
          onPress: () => handleSocialMedia('linkedin'),
        },
      ],
    },
    {
      title: 'Legal & Security',
      items: [
        {
          id: 'privacy-center',
          icon: 'shield-checkmark',
          title: 'Privacy Center',
          subtitle: 'Manage your privacy settings',
          onPress: () => animatePress(() => {
            Alert.alert('Privacy Center', 'Comprehensive privacy controls coming soon!');
          }),
        },
        {
          id: 'security',
          icon: 'lock-closed',
          title: 'Security Settings',
          subtitle: 'Two-factor auth and security options',
          onPress: () => animatePress(() => {
            Alert.alert('Security Settings', 'Advanced security features coming soon!');
          }),
        },
        {
          id: 'data-export',
          icon: 'download',
          title: 'Export My Data',
          subtitle: 'Download your account data',
          onPress: () => animatePress(() => {
            Alert.alert('Data Export', 'Data export feature coming soon!');
          }),
        },
      ],
    },
  ];

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
            <Text style={styles.title}>More</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity style={styles.quickAction} onPress={handleReferFriend}>
                <LinearGradient
                  colors={['#6366F1', '#8B5CF6']}
                  style={styles.quickActionGradient}
                >
                  <Ionicons name="people" size={24} color="#FFFFFF" />
                  <Text style={styles.quickActionText}>Refer & Earn</Text>
                  <Text style={styles.quickActionSubtext}>Get $10 for each friend</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity style={styles.quickAction} onPress={handleRewards}>
                <LinearGradient
                  colors={['#F59E0B', '#F97316']}
                  style={styles.quickActionGradient}
                >
                  <Ionicons name="gift" size={24} color="#FFFFFF" />
                  <Text style={styles.quickActionText}>Rewards</Text>
                  <Text style={styles.quickActionSubtext}>150 points available</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* More Options */}
          {moreOptions.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              
              <BlurView intensity={20} style={styles.sectionCard}>
                {section.items.map((item, itemIndex) => (
                  <Animated.View
                    key={itemIndex}
                    style={{
                      transform: [{ scale: scaleAnim }],
                    }}
                  >
                    <TouchableOpacity
                      style={[
                        styles.moreItem,
                        itemIndex === section.items.length - 1 && styles.lastItem,
                      ]}
                      onPress={item.onPress}
                      activeOpacity={0.7}
                    >
                      <View style={styles.moreItemContent}>
                        <View style={styles.moreItemIcon}>
                          <Ionicons 
                            name={item.icon as any} 
                            size={20} 
                            color="#6366F1" 
                          />
                        </View>
                        
                        <View style={styles.moreItemText}>
                          <View style={styles.moreItemTitleRow}>
                            <Text style={styles.moreItemTitle}>{item.title}</Text>
                            {item.badge && (
                              <View style={styles.badge}>
                                <Text style={styles.badgeText}>{item.badge}</Text>
                              </View>
                            )}
                          </View>
                          <Text style={styles.moreItemSubtitle}>{item.subtitle}</Text>
                        </View>
                        
                        <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                      </View>
                    </TouchableOpacity>
                  </Animated.View>
                ))}
              </BlurView>
            </View>
          ))}

          {/* App Version */}
          <View style={styles.appVersion}>
            <Text style={styles.appVersionText}>Sora Cellular v1.0.0</Text>
            <Text style={styles.appVersionSubtext}>Build 2025.01.18</Text>
            <Text style={styles.appVersionSubtext}>Made with ❤️ by Sora Technologies</Text>
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
  placeholder: {
    width: 40,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 32,
    gap: 16,
  },
  quickAction: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  quickActionGradient: {
    padding: 20,
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  quickActionSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
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
  sectionCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  moreItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  moreItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  moreItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  moreItemText: {
    flex: 1,
  },
  moreItemTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  moreItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    flex: 1,
  },
  moreItemSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  badge: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  appVersion: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  appVersionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  appVersionSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  bottomSpacing: {
    height: 100,
  },
});