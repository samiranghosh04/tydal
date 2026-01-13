import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface SplashScreenProps {
  visible: boolean;
  onHide?: () => void;
}

export function SplashScreen({ visible }: SplashScreenProps) {
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      // Reset animations
      titleOpacity.setValue(0);
      scaleAnim.setValue(0.8);

      // Sequence of animations
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.back(1)),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [titleOpacity, scaleAnim, visible]);

  if (!visible) return null;

  return (
    <View style={styles.container}>
      {/* Wave Background Pattern */}
      <View style={styles.waveContainer}>
        <Svg viewBox="0 0 1200 120" style={styles.wave}>
          <Path
            d="M0,64L100,69.3C200,75,400,85,600,85.3C800,85,1000,75,1100,69.3L1200,64L1200,120L1100,120C1000,120,800,120,600,120C400,120,200,120,100,120L0,120Z"
            fill="#B71C1C"
            opacity="0.8"
          />
        </Svg>
        <Svg viewBox="0 0 1200 120" style={styles.wave2}>
          <Path
            d="M0,32L100,37.3C200,43,400,53,600,56C800,59,1000,53,1100,48.3L1200,43L1200,120L1100,120C1000,120,800,120,600,120C400,120,200,120,100,120L0,120Z"
            fill="#A01010"
            opacity="0.6"
          />
        </Svg>
        <Svg viewBox="0 0 1200 120" style={styles.wave3}>
          <Path
            d="M0,96L100,90.7C200,85,400,75,600,74.7C800,75,1000,85,1100,90.7L1200,96L1200,120L1100,120C1000,120,800,120,600,120C400,120,200,120,100,120L0,120Z"
            fill="#E91E63"
            opacity="0.4"
          />
        </Svg>
      </View>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: titleOpacity,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.title}>Tydal</Text>
        <Text style={styles.subtitle}>Period Tracker</Text>

        <View style={styles.loadingContainer}>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.dot}>•</Text>
        </View>
      </Animated.View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Your privacy matters</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C41C3B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 140,
    overflow: 'hidden',
  },
  wave: {
    position: 'absolute',
    width: '100%',
    height: 140,
  },
  wave2: {
    position: 'absolute',
    width: '100%',
    height: 140,
    top: 20,
  },
  wave3: {
    position: 'absolute',
    width: '100%',
    height: 140,
    top: 40,
  },
  content: {
    alignItems: 'center',
    zIndex: 10,
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 32,
    letterSpacing: 0.5,
  },
  loadingContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    zIndex: 10,
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontStyle: 'italic',
  },
});
