import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const plans = [
  {
    id: 'starter',
    name: 'Sora Starter',
    price: '$30.34',
    period: 'per line',
    hours: '10 hrs',
    description: 'Perfect for light users',
    features: [
      '10 hours wireless time',
      'Basic network coverage',
      'Standard support',
      'Data rollover',
    ],
    color: ['#6366F1', '#8B5CF6'],
    popular: false,
  },
  {
    id: 'middle',
    name: 'Sora Middle',
    price: '$45.99',
    period: 'per line',
    hours: '13 hrs',
    description: 'Great for regular users',
    features: [
      '13 hours wireless time',
      'Enhanced network coverage',
      'Priority support',
      'Data rollover',
      'Hotspot included',
    ],
    color: ['#F59E0B', '#F97316'],
    popular: true,
  },
  {
    id: 'unlimited',
    name: 'Sora Unlimited Ultra',
    price: 'Premium',
    period: 'per line',
    hours: '∞ hrs',
    description: 'The #1 unlimited plan',
    features: [
      'Unlimited wireless time',
      'Premium network coverage',
      '24/7 VIP support',
      'Unlimited hotspot',
      'International roaming',
      'Premium perks',
    ],
    color: ['#8B5CF6', '#EC4899'],
    popular: false,
  },
  {
    id: 'business',
    name: 'Sora Business',
    price: 'Custom',
    period: 'enterprise',
    hours: 'Network Provider',
    description: 'Complete wireless network solution',
    features: [
      'Wireless network provider',
      'Custom infrastructure',
      'Dedicated support team',
      'SLA guarantees',
      'Advanced analytics',
      'White-label options',
    ],
    color: ['#10B981', '#059669'],
    popular: false,
  },
];

export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState('starter');

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    const plan = plans.find(p => p.id === planId);
    Alert.alert(
      'Plan Selected',
      `You've selected the ${plan?.name} plan. This would normally redirect to checkout.`,
      [{ text: 'OK' }]
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
            <Text style={styles.title}>Choose Your Plan</Text>
            <Text style={styles.subtitle}>Select the perfect plan for your needs</Text>
          </View>

          {/* Plans Grid */}
          <View style={styles.plansContainer}>
            {plans.map((plan) => (
              <BlurView key={plan.id} intensity={20} style={styles.planCard}>
                <TouchableOpacity
                  style={styles.planCardContent}
                  onPress={() => handleSelectPlan(plan.id)}
                  activeOpacity={0.8}
                >
                  {plan.popular && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularText}>MOST POPULAR</Text>
                    </View>
                  )}
                  
                  <LinearGradient
                    colors={plan.color}
                    style={styles.planHeader}
                  >
                    <View style={styles.planIcon}>
                      <Ionicons 
                        name={
                          plan.id === 'starter' ? 'flash' :
                          plan.id === 'middle' ? 'rocket' :
                          plan.id === 'unlimited' ? 'infinite' : 'business'
                        } 
                        size={32} 
                        color="#FFFFFF" 
                      />
                    </View>
                  </LinearGradient>

                  <View style={styles.planInfo}>
                    <Text style={styles.planName}>{plan.name}</Text>
                    <Text style={styles.planDescription}>{plan.description}</Text>
                    
                    <View style={styles.planPricing}>
                      <Text style={styles.planPrice}>{plan.price}</Text>
                      <Text style={styles.planPeriod}>{plan.period}</Text>
                    </View>
                    
                    <View style={styles.planHours}>
                      <Text style={styles.planHoursText}>{plan.hours}</Text>
                      <Text style={styles.planHoursLabel}>wireless time</Text>
                    </View>

                    <View style={styles.planFeatures}>
                      {plan.features.map((feature, index) => (
                        <View key={index} style={styles.featureItem}>
                          <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                          <Text style={styles.featureText}>{feature}</Text>
                        </View>
                      ))}
                    </View>

                    <TouchableOpacity
                      style={styles.selectButton}
                      onPress={() => handleSelectPlan(plan.id)}
                    >
                      <LinearGradient
                        colors={plan.color}
                        style={styles.selectButtonGradient}
                      >
                        <Text style={styles.selectButtonText}>
                          {selectedPlan === plan.id ? 'Current Plan' : 'Select Plan'}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </BlurView>
            ))}
          </View>

          {/* Bottom Info */}
          <BlurView intensity={20} style={styles.infoCard}>
            <View style={styles.infoContent}>
              <Ionicons name="information-circle" size={24} color="#6366F1" />
              <View style={styles.infoText}>
                <Text style={styles.infoTitle}>Need Help Choosing?</Text>
                <Text style={styles.infoDescription}>
                  Contact our support team for personalized recommendations
                </Text>
              </View>
            </View>
          </BlurView>

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
    alignItems: 'center',
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
    textAlign: 'center',
  },
  plansContainer: {
    paddingHorizontal: 24,
  },
  planCard: {
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
  },
  planCardContent: {
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    zIndex: 1,
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  planHeader: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  planIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  planInfo: {
    padding: 24,
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  planDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  planPricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
  planPeriod: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  planHours: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  planHoursText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366F1',
    marginBottom: 4,
  },
  planHoursLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  planFeatures: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 12,
    flex: 1,
  },
  selectButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  selectButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoCard: {
    marginHorizontal: 24,
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  infoText: {
    marginLeft: 16,
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  bottomSpacing: {
    height: 100,
  },
});