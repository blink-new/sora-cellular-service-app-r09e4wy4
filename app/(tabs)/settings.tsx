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
  Switch,
  Animated,
  Vibration,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [autoRenewal, setAutoRenewal] = useState(true);
  const [dataAlerts, setDataAlerts] = useState(true);
  
  // Animation refs for each setting item
  const animationRefs = useRef<{ [key: string]: Animated.Value }>({});
  
  const getAnimationValue = (key: string) => {
    if (!animationRefs.current[key]) {
      animationRefs.current[key] = new Animated.Value(1);
    }
    return animationRefs.current[key];
  };

  const animatePress = (key: string, callback?: () => void) => {
    const animValue = getAnimationValue(key);
    
    // Add haptic feedback
    Vibration.vibrate(50);
    
    // Enhanced floating animation with bounce effect
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(animValue, {
        toValue: 1.05,
        tension: 300,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(animValue, {
        toValue: 1,
        tension: 300,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (callback) callback();
    });
  };

  const handleBillingAndPayments = () => {
    Alert.alert(
      'Billing & Payments',
      'Redirecting to billing portal...',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Continue',
          onPress: () => {
            Linking.openURL('https://creditnest2025.lovable.app/');
          },
        },
      ]
    );
  };

  const handleSoftwareUpdate = () => {
    router.push('/update');
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('userSession');
            router.replace('/(auth)/signin');
          },
        },
      ]
    );
  };

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        {
          id: 'profile',
          icon: 'person-circle',
          title: 'Profile',
          subtitle: 'Manage your account information',
          onPress: () => animatePress('profile', () => {
            router.push('/profile');
          }),
        },
        {
          id: 'billing',
          icon: 'card',
          title: 'Billing & Payments',
          subtitle: 'Manage your billing and payment methods',
          onPress: () => animatePress('billing', handleBillingAndPayments),
        },
        {
          id: 'data-usage',
          icon: 'cellular',
          title: 'Data Usage',
          subtitle: 'View your data usage history',
          onPress: () => animatePress('data-usage', () => {
            router.push('/data-usage');
          }),
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          id: 'notifications',
          icon: 'notifications',
          title: 'Notifications',
          subtitle: 'Push notifications',
          toggle: true,
          value: notifications,
          onToggle: (value: boolean) => {
            animatePress('notifications', () => {
              setNotifications(value);
              Alert.alert('Notifications', value ? 'Push notifications enabled' : 'Push notifications disabled');
            });
          },
        },
        {
          id: 'auto-renewal',
          icon: 'refresh-circle',
          title: 'Auto Renewal',
          subtitle: 'Automatically renew your plan',
          toggle: true,
          value: autoRenewal,
          onToggle: (value: boolean) => {
            animatePress('auto-renewal', () => {
              setAutoRenewal(value);
              Alert.alert('Auto Renewal', value ? 'Your plan will automatically renew' : 'Auto renewal disabled - you\'ll need to manually renew');
            });
          },
        },
        {
          id: 'data-alerts',
          icon: 'warning',
          title: 'Data Alerts',
          subtitle: 'Get notified when approaching data limit',
          toggle: true,
          value: dataAlerts,
          onToggle: (value: boolean) => {
            animatePress('data-alerts', () => {
              setDataAlerts(value);
              Alert.alert('Data Alerts', value ? 'You\'ll receive alerts at 80% and 95% usage' : 'Data usage alerts disabled');
            });
          },
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help-center',
          icon: 'help-circle',
          title: 'Help Center',
          subtitle: 'Get help and support',
          onPress: () => animatePress('help-center', () => {
            Alert.alert('Help Center', 'Browse FAQs, troubleshooting guides, and tutorials.', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Browse FAQs', onPress: () => Alert.alert('FAQs', 'Frequently asked questions coming soon!') },
              { text: 'Troubleshooting', onPress: () => Alert.alert('Troubleshooting', 'Step-by-step guides coming soon!') }
            ]);
          }),
        },
        {
          id: 'contact-support',
          icon: 'chatbubble',
          title: 'Contact Support',
          subtitle: 'Chat with our support team',
          onPress: () => animatePress('contact-support', () => {
            Alert.alert('Contact Support', 'Get help from our 24/7 support team.', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Live Chat', onPress: () => Alert.alert('Live Chat', 'Live chat support coming soon!') },
              { text: 'Email Support', onPress: () => Alert.alert('Email', 'Email support: support@soracellular.com') }
            ]);
          }),
        },
        {
          id: 'terms-privacy',
          icon: 'document-text',
          title: 'Terms & Privacy',
          subtitle: 'Read our terms and privacy policy',
          onPress: () => animatePress('terms-privacy', () => {
            Alert.alert('Legal Documents', 'Review our terms of service and privacy policy.', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Terms of Service', onPress: () => Alert.alert('Terms', 'Terms of service coming soon!') },
              { text: 'Privacy Policy', onPress: () => Alert.alert('Privacy', 'Privacy policy coming soon!') }
            ]);
          }),
        },
      ],
    },
    {
      title: 'App',
      items: [
        {
          id: 'software-updates',
          icon: 'download',
          title: 'Software Updates',
          subtitle: 'Check for app updates',
          onPress: () => animatePress('software-updates', handleSoftwareUpdate),
        },
        {
          id: 'about',
          icon: 'information-circle',
          title: 'About',
          subtitle: 'App version and information',
          onPress: () => animatePress('about', () => {
            Alert.alert('About Sora Cellular', 'Version: 1.0.0\nBuild: 2025.01.18\nDeveloper: Sora Technologies\n\nPremium cellular data service with unlimited possibilities.', [
              { text: 'OK' },
              { text: 'Check for Updates', onPress: handleSoftwareUpdate }
            ]);
          }),
        },
        {
          id: 'more',
          icon: 'ellipsis-horizontal',
          title: 'More',
          subtitle: 'Additional features and options',
          onPress: () => animatePress('more', () => {
            router.push('/more');
          }),
        },
        {
          id: 'sign-out',
          icon: 'log-out',
          title: 'Sign Out',
          subtitle: 'Sign out of your account',
          onPress: () => animatePress('sign-out', handleSignOut),
          destructive: true,
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
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.subtitle}>Manage your account and preferences</Text>
          </View>

          {/* Settings Groups */}
          {settingsGroups.map((group, groupIndex) => (
            <View key={groupIndex} style={styles.settingsGroup}>
              <Text style={styles.groupTitle}>{group.title}</Text>
              
              <BlurView intensity={20} style={styles.groupCard}>
                {group.items.map((item, itemIndex) => (
                  <Animated.View
                    key={itemIndex}
                    style={{
                      transform: [{ scale: getAnimationValue(item.id) }],
                    }}
                  >
                    <TouchableOpacity
                      style={[
                        styles.settingItem,
                        itemIndex === group.items.length - 1 && styles.lastItem,
                      ]}
                      onPress={item.onPress}
                      disabled={item.toggle}
                      activeOpacity={0.7}
                    >
                    <View style={styles.settingContent}>
                      <View style={[
                        styles.settingIcon,
                        item.destructive && styles.destructiveIcon,
                      ]}>
                        <Ionicons 
                          name={item.icon as any} 
                          size={24} 
                          color={item.destructive ? '#EF4444' : '#6366F1'} 
                        />
                      </View>
                      
                      <View style={styles.settingText}>
                        <Text style={[
                          styles.settingTitle,
                          item.destructive && styles.destructiveText,
                        ]}>
                          {item.title}
                        </Text>
                        <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                      </View>
                      
                      {item.toggle ? (
                        <Switch
                          value={item.value}
                          onValueChange={item.onToggle}
                          trackColor={{ false: '#374151', true: '#6366F1' }}
                          thumbColor={item.value ? '#FFFFFF' : '#9CA3AF'}
                        />
                      ) : (
                        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                      )}
                    </View>
                    </TouchableOpacity>
                  </Animated.View>
                ))}
              </BlurView>
            </View>
          ))}

          {/* App Info */}
          <View style={styles.appInfo}>
            <Text style={styles.appInfoText}>Sora Cellular Data Service</Text>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>

          {/* Bottom Spacing */}
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
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  settingsGroup: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  groupCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  destructiveIcon: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  destructiveText: {
    color: '#EF4444',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  appInfo: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  appInfoText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  versionText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  bottomSpacing: {
    height: 100,
  },
});