import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Animated,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function SoftwareUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  
  const progressAnim = new Animated.Value(0);
  const restartAnim = new Animated.Value(0);

  const updateInfo = {
    version: '1.1.0',
    currentVersion: '1.0.0',
    size: '45.2 MB',
    releaseDate: 'January 18, 2025',
    changes: [
      'Improved data usage tracking accuracy',
      'Enhanced network connectivity',
      'New premium plan features',
      'Bug fixes and performance improvements',
      'Updated security protocols',
      'Better battery optimization',
    ],
  };

  const handleUpdate = () => {
    setIsUpdating(true);
    setUpdateProgress(0);

    // Simulate download progress
    const interval = setInterval(() => {
      setUpdateProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        
        Animated.timing(progressAnim, {
          toValue: newProgress,
          duration: 200,
          useNativeDriver: false,
        }).start();

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowRestartModal(true);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const handleRestart = () => {
    setIsRestarting(true);
    
    // Animate restart
    Animated.sequence([
      Animated.timing(restartAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(restartAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowRestartModal(false);
      setIsRestarting(false);
      setShowWelcome(true);
      
      // Show welcome message then redirect
      setTimeout(() => {
        setShowWelcome(false);
        router.replace('/(tabs)/home');
      }, 3000);
    });
  };

  const handleSkipUpdate = () => {
    Alert.alert(
      'Skip Update',
      'Are you sure you want to skip this update? You can always update later from settings.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Skip', 
          onPress: () => router.back(),
          style: 'destructive' 
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0F0F23', '#1E1B4B', '#312E81']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Software Update</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Update Content */}
        <View style={styles.content}>
          {updateAvailable && !isUpdating ? (
            <BlurView intensity={20} style={styles.updateCard}>
              <View style={styles.updateHeader}>
                <View style={styles.updateIcon}>
                  <Ionicons name="download" size={32} color="#6366F1" />
                </View>
                <View style={styles.updateInfo}>
                  <Text style={styles.updateTitle}>Update Available</Text>
                  <Text style={styles.updateVersion}>
                    Version {updateInfo.version} • {updateInfo.size}
                  </Text>
                </View>
              </View>

              <View style={styles.updateDetails}>
                <Text style={styles.sectionTitle}>What's New</Text>
                {updateInfo.changes.map((change, index) => (
                  <View key={index} style={styles.changeItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                    <Text style={styles.changeText}>{change}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.updateActions}>
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={handleUpdate}
                >
                  <LinearGradient
                    colors={['#6366F1', '#8B5CF6']}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>Update Now</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.skipButton}
                  onPress={handleSkipUpdate}
                >
                  <Text style={styles.skipText}>Skip This Update</Text>
                </TouchableOpacity>
              </View>
            </BlurView>
          ) : isUpdating ? (
            <BlurView intensity={20} style={styles.updateCard}>
              <View style={styles.progressContainer}>
                <View style={styles.progressIcon}>
                  <Ionicons name="download" size={48} color="#6366F1" />
                </View>
                
                <Text style={styles.progressTitle}>Downloading Update</Text>
                <Text style={styles.progressSubtitle}>
                  {updateProgress.toFixed(0)}% complete
                </Text>

                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBarBackground}>
                    <Animated.View
                      style={[
                        styles.progressBar,
                        {
                          width: progressAnim.interpolate({
                            inputRange: [0, 100],
                            outputRange: ['0%', '100%'],
                            extrapolate: 'clamp',
                          }),
                        },
                      ]}
                    />
                  </View>
                </View>

                <Text style={styles.progressNote}>
                  Please don't close the app during update
                </Text>
              </View>
            </BlurView>
          ) : null}
        </View>

        {/* Restart Modal */}
        <Modal
          visible={showRestartModal}
          transparent
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <BlurView intensity={40} style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.modalIcon}>
                  <Ionicons name="refresh-circle" size={64} color="#6366F1" />
                </View>
                
                <Text style={styles.modalTitle}>Update Complete</Text>
                <Text style={styles.modalSubtitle}>
                  The app needs to restart to apply the update
                </Text>

                <TouchableOpacity
                  style={styles.restartButton}
                  onPress={handleRestart}
                  disabled={isRestarting}
                >
                  <LinearGradient
                    colors={['#6366F1', '#8B5CF6']}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>
                      {isRestarting ? 'Restarting...' : 'Restart App'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </BlurView>
          </View>
        </Modal>

        {/* Restart Animation */}
        {isRestarting && (
          <Animated.View
            style={[
              styles.restartOverlay,
              {
                opacity: restartAnim,
              },
            ]}
          >
            <LinearGradient
              colors={['#0F0F23', '#1E1B4B']}
              style={styles.restartGradient}
            >
              <View style={styles.restartContent}>
                <Animated.View
                  style={{
                    transform: [{
                      rotate: restartAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      }),
                    }],
                  }}
                >
                  <Ionicons name="refresh" size={64} color="#6366F1" />
                </Animated.View>
                <Text style={styles.restartText}>Restarting...</Text>
              </View>
            </LinearGradient>
          </Animated.View>
        )}

        {/* Welcome Modal */}
        <Modal
          visible={showWelcome}
          transparent
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <BlurView intensity={40} style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.welcomeIcon}>
                  <Ionicons name="checkmark-circle" size={64} color="#10B981" />
                </View>
                
                <Text style={styles.welcomeTitle}>Welcome to Sora Cellular Data +</Text>
                <Text style={styles.welcomeSubtitle}>
                  Your app has been successfully updated with new features and improvements
                </Text>
              </View>
            </BlurView>
          </View>
        </Modal>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  updateCard: {
    borderRadius: 20,
    overflow: 'hidden',
    padding: 24,
  },
  updateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  updateIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  updateInfo: {
    flex: 1,
  },
  updateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  updateVersion: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  updateDetails: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  changeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  changeText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 12,
    flex: 1,
  },
  updateActions: {
    gap: 16,
  },
  updateButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  skipText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressIcon: {
    marginBottom: 24,
  },
  progressTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  progressSubtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 32,
  },
  progressBarContainer: {
    width: '100%',
    marginBottom: 24,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 4,
  },
  progressNote: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    margin: 24,
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalContent: {
    padding: 32,
    alignItems: 'center',
  },
  modalIcon: {
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 32,
  },
  restartButton: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
  },
  restartOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  restartGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  restartContent: {
    alignItems: 'center',
  },
  restartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
  },
  welcomeIcon: {
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});