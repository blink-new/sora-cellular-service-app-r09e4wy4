import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Vibration,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';

const { width } = Dimensions.get('window');

interface NavItem {
  name: string;
  icon: string;
  route: string;
}

const navItems: NavItem[] = [
  { name: 'Home', icon: 'home', route: '/(tabs)/home' },
  { name: 'Plans', icon: 'cellular', route: '/(tabs)/plans' },
  { name: 'Settings', icon: 'settings', route: '/(tabs)/settings' },
];

export default function FloatingNavigation() {
  const pathname = usePathname();
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const [scaleAnims] = useState(
    navItems.map(() => new Animated.Value(1))
  );
  const [floatAnim] = useState(new Animated.Value(0));
  const [containerScale] = useState(new Animated.Value(1));
  const [containerFloat] = useState(new Animated.Value(0));
  
  // Floating animation effect
  useEffect(() => {
    const floatingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    
    floatingAnimation.start();
    
    return () => floatingAnimation.stop();
  }, []);

  const handlePress = (route: string, index: number) => {
    setPressedIndex(index);
    
    // Add stronger haptic feedback
    Vibration.vibrate([0, 50, 50, 50]);
    
    // Enhanced floating animation for individual button
    Animated.sequence([
      Animated.timing(scaleAnims[index], {
        toValue: 0.6,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnims[index], {
        toValue: 1.2,
        tension: 400,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnims[index], {
        toValue: 1,
        tension: 300,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setPressedIndex(null);
    });

    // Enhanced container floating effect with more dramatic movement
    Animated.parallel([
      Animated.sequence([
        Animated.spring(containerScale, {
          toValue: 1.1,
          tension: 200,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.spring(containerScale, {
          toValue: 1,
          tension: 300,
          friction: 10,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.spring(containerFloat, {
          toValue: 1,
          tension: 300,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(containerFloat, {
          toValue: 0,
          tension: 200,
          friction: 10,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Navigate with slight delay for animation
    setTimeout(() => {
      router.push(route);
    }, 100);
  };

  const isActive = (route: string) => {
    return pathname === route;
  };

  const floatTranslateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });

  const containerFloatY = containerFloat.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          transform: [
            { translateY: Animated.add(floatTranslateY, containerFloatY) },
            { scale: containerScale },
          ],
        },
      ]}
    >
      <BlurView intensity={40} style={styles.navContainer}>
        <LinearGradient
          colors={['rgba(15, 15, 35, 0.9)', 'rgba(30, 27, 75, 0.9)']}
          style={styles.navGradient}
        >
          <View style={styles.navContent}>
            {navItems.map((item, index) => {
              const active = isActive(item.route);
              
              return (
                <Animated.View
                  key={item.name}
                  style={[
                    styles.navItem,
                    {
                      transform: [{ scale: scaleAnims[index] }],
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={[
                      styles.navButton,
                      active && styles.activeNavButton,
                    ]}
                    onPress={() => handlePress(item.route, index)}
                    activeOpacity={0.7}
                  >
                    {active ? (
                      <LinearGradient
                        colors={['#6366F1', '#8B5CF6']}
                        style={styles.activeBackground}
                      >
                        <Ionicons
                          name={item.icon as any}
                          size={24}
                          color="#FFFFFF"
                        />
                      </LinearGradient>
                    ) : (
                      <View style={styles.inactiveBackground}>
                        <Ionicons
                          name={item.icon as any}
                          size={24}
                          color="#9CA3AF"
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                  
                  {active && (
                    <View style={styles.activeIndicator}>
                      <LinearGradient
                        colors={['#6366F1', '#8B5CF6']}
                        style={styles.indicatorGradient}
                      />
                    </View>
                  )}
                </Animated.View>
              );
            })}
          </View>
        </LinearGradient>
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 34,
    left: 24,
    right: 24,
    zIndex: 1000,
  },
  navContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  navGradient: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  navContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    position: 'relative',
  },
  navButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeNavButton: {
    // Additional styles for active state if needed
  },
  activeBackground: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  inactiveBackground: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -8,
    width: 24,
    height: 3,
    borderRadius: 2,
    overflow: 'hidden',
  },
  indicatorGradient: {
    flex: 1,
  },
});