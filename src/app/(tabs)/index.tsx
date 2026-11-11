import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/core/theme/colors';
import { radius } from '@/core/theme/radius';
import { spacing } from '@/core/theme/spacing';
import { AppText, Card } from '@/shared/components';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText variant="h2" color="text">
            EcoSave
          </AppText>
          <AppText variant="body" color="textMuted">
            Chào mừng bạn trở lại
          </AppText>
        </View>

        <Card style={styles.heroCard} elevated>
          <AppText variant="caption" color="primary">
            Tóm tắt hôm nay
          </AppText>
          <AppText variant="h2" color="text" style={styles.heroTitle}>
            84%
          </AppText>
          <AppText variant="body" color="textMuted">
            Mức hiệu quả trong việc giảm lãng phí thực phẩm tuần này.
          </AppText>
        </Card>

        <View style={styles.grid}>
          <Card style={styles.metricCard}>
            <AppText variant="caption" color="textMuted">
              Tiết kiệm
            </AppText>
            <AppText variant="subhead" color="text" style={styles.metricValue}>
              1.2M
            </AppText>
          </Card>

          <Card style={styles.metricCard}>
            <AppText variant="caption" color="textMuted">
              Món được cứu
            </AppText>
            <AppText variant="subhead" color="text" style={styles.metricValue}>
              86
            </AppText>
          </Card>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  header: {
    marginBottom: spacing.lg,
  },
  heroCard: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    backgroundColor: colors.surface,
  },
  heroTitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  grid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  metricCard: {
    flex: 1,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  metricValue: {
    marginTop: spacing.xs,
  },
});
