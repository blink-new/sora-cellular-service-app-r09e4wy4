import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Animated,
  Vibration,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    plan: 'Sora Starter',
    joinDate: 'January 2025',
  });
  
  const [editedProfile, setEditedProfile] = useState(profile);
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

  const handleSave = () => {
    animatePress(() => {
      setProfile(editedProfile);
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    });
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    animatePress(() => {
      Alert.alert(
        'Change Password',
        'A password reset link will be sent to your email.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Send Link', onPress: () => Alert.alert('Email Sent', 'Check your email for password reset instructions.') }
        ]
      );
    });
  };

  const handleDeleteAccount = () => {
    animatePress(() => {
      Alert.alert(
        'Delete Account',
        'This action cannot be undone. All your data will be permanently deleted.',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Delete', 
            style: 'destructive',
            onPress: () => Alert.alert('Account Deletion', 'Please contact support to delete your account.')
          }
        ]
      );
    });
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
            <Text style={styles.title}>Profile</Text>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => setIsEditing(!isEditing)}
            >
              <Ionicons 
                name={isEditing ? "close" : "create"} 
                size={24} 
                color="#6366F1" 
              />
            </TouchableOpacity>
          </View>

          {/* Profile Avatar */}
          <View style={styles.avatarSection}>
            <BlurView intensity={20} style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={48} color="#6366F1" />
              </View>
              <TouchableOpacity style={styles.changeAvatarButton}>
                <Ionicons name="camera" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </BlurView>
            <Text style={styles.avatarName}>{profile.name}</Text>
            <Text style={styles.avatarPlan}>{profile.plan} Plan</Text>
          </View>

          {/* Profile Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            
            <BlurView intensity={20} style={styles.card}>
              {/* Name */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Full Name</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.textInput}
                    value={editedProfile.name}
                    onChangeText={(text) => setEditedProfile({...editedProfile, name: text})}
                    placeholder="Enter your name"
                    placeholderTextColor="#9CA3AF"
                  />
                ) : (
                  <Text style={styles.fieldValue}>{profile.name}</Text>
                )}
              </View>

              <View style={styles.divider} />

              {/* Email */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Email Address</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.textInput}
                    value={editedProfile.email}
                    onChangeText={(text) => setEditedProfile({...editedProfile, email: text})}
                    placeholder="Enter your email"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                  />
                ) : (
                  <Text style={styles.fieldValue}>{profile.email}</Text>
                )}
              </View>

              <View style={styles.divider} />

              {/* Phone */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Phone Number</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.textInput}
                    value={editedProfile.phone}
                    onChangeText={(text) => setEditedProfile({...editedProfile, phone: text})}
                    placeholder="Enter your phone"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="phone-pad"
                  />
                ) : (
                  <Text style={styles.fieldValue}>{profile.phone}</Text>
                )}
              </View>

              <View style={styles.divider} />

              {/* Join Date */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Member Since</Text>
                <Text style={styles.fieldValue}>{profile.joinDate}</Text>
              </View>
            </BlurView>
          </View>

          {/* Action Buttons */}
          {isEditing ? (
            <View style={styles.editActions}>
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </Animated.View>
              
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          ) : (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Account Actions</Text>
              
              <BlurView intensity={20} style={styles.card}>
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                  <TouchableOpacity style={styles.actionItem} onPress={handleChangePassword}>
                    <View style={styles.actionIcon}>
                      <Ionicons name="key" size={20} color="#6366F1" />
                    </View>
                    <Text style={styles.actionText}>Change Password</Text>
                    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                </Animated.View>

                <View style={styles.divider} />

                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                  <TouchableOpacity style={styles.actionItem} onPress={handleDeleteAccount}>
                    <View style={[styles.actionIcon, styles.destructiveIcon]}>
                      <Ionicons name="trash" size={20} color="#EF4444" />
                    </View>
                    <Text style={[styles.actionText, styles.destructiveText]}>Delete Account</Text>
                    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                </Animated.View>
              </BlurView>
            </View>
          )}

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
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeAvatarButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  avatarPlan: {
    fontSize: 16,
    color: '#F59E0B',
    fontWeight: '500',
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    padding: 16,
  },
  fieldContainer: {
    paddingVertical: 12,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
    fontWeight: '500',
  },
  fieldValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  textInput: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    borderBottomWidth: 1,
    borderBottomColor: '#6366F1',
    paddingBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 8,
  },
  editActions: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 32,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#6366F1',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  destructiveIcon: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  destructiveText: {
    color: '#EF4444',
  },
  bottomSpacing: {
    height: 100,
  },
});