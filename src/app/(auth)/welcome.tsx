import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/core/theme/colors';
import { radius } from '@/core/theme/radius';
import { spacing } from '@/core/theme/spacing';
import { AppText, Button, Icon } from '@/shared/components';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.background}>
        <View style={styles.ambient1} />
        <View style={styles.ambient2} />

        <View style={styles.content}>
          <View style={styles.logoShell}>
            <View style={styles.logoBubble}>
              <Icon name="leaf" family="material-community" size={30} color={colors.primary} />
            </View>
            <View style={styles.badge}>
              <Icon name="sparkles" family="ionicons" size={18} color={colors.white} />
            </View>
          </View>

          <AppText variant="h1" color="white" style={styles.title}>
            EcoSave
          </AppText>

          <AppText variant="subhead" color="white" style={styles.subtitle}>
            Tiết kiệm thực phẩm {'\n'}- Lan tỏa điều tốt
          </AppText>

          <View style={styles.indicatorRow}>
            <View style={styles.indicatorActive} />
            <View style={styles.indicatorInactive} />
            <View style={styles.indicatorInactive} />
          </View>

          <View style={styles.ctaWrap}>
            <Button
              label="Bắt đầu"
              variant="primary"
              onPress={() => router.push('/(auth)/onboarding')}
              style={styles.primaryButton}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  background: {
    flex: 1,
    backgroundColor: '#0F9C6B',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  ambient1: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(255,255,255,0.12)',
    top: -60,
    right: -40,
  },
  ambient2: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(255,255,255,0.10)',
    bottom: -80,
    left: -50,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  logoShell: {
    width: 180,
    height: 180,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    marginBottom: spacing.lg,
  },
  logoBubble: {
    width: 138,
    height: 138,
    borderRadius: 69,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  badge: {
    position: 'absolute',
    right: 18,
    top: 22,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F5AE3D',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F8FAFC',
  },
  title: {
    marginTop: spacing.sm,
    textAlign: 'center',
    fontWeight: '700',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: spacing.xs,
    fontWeight: '500',
    opacity: 0.9,
  },
  indicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
    gap: 8,
  },
  indicatorActive: {
    width: 18,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#F8FAFC',
  },
  indicatorInactive: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  ctaWrap: {
    width: '100%',
    maxWidth: 320,
  },
  primaryButton: {
    minHeight: 54,
    borderRadius: radius.lg,
    backgroundColor: '#F8FAFC',
    borderColor: '#F8FAFC',
  },
});
