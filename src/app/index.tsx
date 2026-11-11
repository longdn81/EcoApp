import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/shared/components';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/(auth)/welcome');
    }, 1500);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.screen}>
        <View style={styles.logoBlock}>
          <Image
            source={require('../../assets/images/logo_ecosave.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <AppText variant="h2" color="white" style={styles.brandName}>
            EcoSave
          </AppText>
        </View>

        <AppText variant="caption" color="white" style={styles.statusText}>
          TÌM KIẾM ĐIỂM CỨU TRỢ XANH...
        </AppText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#005236',
  },
  screen: {
    flex: 1,
    backgroundColor: '#005236',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  logoBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  logo: {
    width: 120,
    height: 120,
  },
  brandName: {
    textAlign: 'center',
    letterSpacing: -0.7,
  },
  statusText: {
    marginTop: 34,
    textAlign: 'center',
    letterSpacing: 0.8,
    opacity: 0.8,
  },
});

