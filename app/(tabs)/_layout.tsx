import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import FloatingNavigation from '@/components/FloatingNavigation';

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" />
        <Stack.Screen name="plans" />
        <Stack.Screen name="settings" />
      </Stack>
      <FloatingNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});