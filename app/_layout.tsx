import AuthLogin from '@/components/auth-login';
import AuthSetup from '@/components/auth-setup';
import { BackgroundLock } from '@/components/background-lock';
import { SplashScreen } from '@/components/splash-screen';
import { initDb, isAppInitialized } from '@/scripts/db';
import { Stack } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export default function RootLayout() {
  const [initialized, setInitialized] = useState<boolean | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [appState, setAppState] = useState(AppState.currentState);
  const [showBackgroundLock, setShowBackgroundLock] = useState(false);
  const appStateRef = useRef(appState);

  useEffect(() => {
    const checkInitialization = async () => {
      try {
        initDb();
        const isInit = await isAppInitialized();
        setInitialized(isInit);
        if (isInit) {
          setAuthenticated(false);
        } else {
          setAuthenticated(true); // Setup mode
        }
        // Show splash for 2 seconds
        setTimeout(() => setShowSplash(false), 2000);
      } catch (error) {
        console.error('Failed to initialize:', error);
        setInitialized(false);
        setShowSplash(false);
      }
    };

    checkInitialization();
  }, []);

  // Handle app state changes (background/foreground)
  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [authenticated]);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    // If the user was already authenticated and the app goes from inactive/background to active
    if (
      appStateRef.current.match(/inactive|background/) &&
      nextAppState === 'active' &&
      authenticated
    ) {
      // App has come to foreground
      setShowBackgroundLock(true);
    }

    appStateRef.current = nextAppState;
    setAppState(nextAppState);
  };

  if (showSplash) {
    return <SplashScreen visible={true} />;
  }

  if (initialized === null) {
    return null; // Loading
  }

  if (!initialized) {
    return (
      <AuthSetup
        onSuccess={() => {
          setInitialized(true);
          setAuthenticated(false);
        }}
      />
    );
  }

  if (!authenticated) {
    return <AuthLogin onSuccess={() => setAuthenticated(true)} />;
  }

  if (showBackgroundLock) {
    return <BackgroundLock onUnlock={() => setShowBackgroundLock(false)} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
