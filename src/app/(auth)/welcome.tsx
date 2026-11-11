import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/core/theme/colors';
import { spacing } from '@/core/theme/spacing';
import { AppText, Button, Icon } from '@/shared/components';

const features = [
  {
    title: 'Quản lý tủ lạnh thông minh',
    description: 'Cảnh báo hạn dùng trước 24h, tránh lãng phí',
    tag: 'Tự động',
    tagColor: '#E7F7F1',
    icon: 'leaf',
    iconColor: '#006C49',
    iconBg: '#DDF7ED',
  },
  {
    title: 'Món ngon giảm đến 70%',
    description: 'Giải cứu combo bánh ngọt, cơm trưa nóng hổi',
    tag: '-70%',
    tagColor: '#FFF4D6',
    icon: 'tag',
    iconColor: '#7C4A00',
    iconBg: '#FFF1CC',
  },
  {
    title: 'Chia sẻ thực phẩm 0 đồng',
    description: 'Tủ đồ cộng đồng mở 24/7, gắn kết sẻ chia',
    tag: 'Cộng đồng',
    tagColor: '#E0ECFF',
    icon: 'gift',
    iconColor: '#1D4ED8',
    iconBg: '#E0ECFF',
  },
] as const;

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerWrapper}>
          <View style={styles.brandBlock}>
            <Image source={require('../../../assets/images/logo_ecosave.png')} style={styles.logo} resizeMode="contain" />
          </View>

          <AppText variant="h2" color="text" style={styles.heading}>
            Chào mừng bạn đến với EcoSave
          </AppText>

          <AppText variant="body" color="textMuted" style={styles.subtitle}>
            Cùng hàng ngàn người Việt quản lý tủ lạnh thông minh và giải cứu thực phẩm mỗi ngày.
          </AppText>
        </View>

        <View style={styles.heroCard}>
          <Image source={require('../../../assets/images/welcome_hero.png')} style={styles.heroImage} resizeMode="cover" />
        </View>

        <View style={styles.featureList}>
          {features.map((feature) => (
            <View key={feature.title} style={styles.featureRow}>
              <View style={[styles.featureIconWrap, { backgroundColor: feature.iconBg }]}>
                <Icon name={feature.icon} family="material-community" size={21} color={feature.iconColor} />
              </View>

              <View style={styles.featureTextGroup}>
                <View style={styles.featureTitleRow}>
                  <AppText variant="subhead" color="text" style={styles.featureTitle}>
                    {feature.title}
                  </AppText>

                  <View style={[styles.featureTag, { backgroundColor: feature.tagColor }]}>
                    <AppText variant="caption" color="text" style={styles.featureTagText}>
                      {feature.tag}
                    </AppText>
                  </View>
                </View>

                <AppText variant="caption" color="textMuted" style={styles.featureDescription}>
                  {feature.description}
                </AppText>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.actionStack}>
          <Button
            label="Bắt đầu ngay"
            variant="primary"
            onPress={() => router.push('/(auth)/onboarding')}
            style={styles.primaryButton}
            rightIcon={<Icon name="arrow-right" family="material-community" size={18} color={colors.white} />}
          />

          <View style={styles.loginPromptRow}>
            <AppText variant="body" color="textMuted">
              Tôi đã có tài khoản
            </AppText>
            <Pressable onPress={() => router.push('/(auth)/login')}>
              <AppText variant="body" color="primary" style={styles.loginLink}>
                Đăng nhập
              </AppText>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },
  headerWrapper: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  brandBlock: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EAF4F1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  logo: {
    width: 56,
    height: 56,
  },
  heading: {
    textAlign: 'center',
    fontWeight: '700',
  },
  subtitle: {
    textAlign: 'center',
    maxWidth: 320,
  },
  heroCard: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#F0F3FF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  heroImage: {
    width: '100%',
    height: 190,
  },
  featureList: {
    gap: spacing.sm,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  featureIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTextGroup: {
    flex: 1,
    gap: 6,
  },
  featureTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  featureTitle: {
    flex: 1,
    fontWeight: '700',
  },
  featureTag: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  featureTagText: {
    fontWeight: '700',
    textAlign: 'center',
  },
  featureDescription: {
    lineHeight: 18,
  },
  actionStack: {
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  primaryButton: {
    minHeight: 54,
    borderRadius: 14,
  },
  loginPromptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  loginLink: {
    fontWeight: '700',
  },
});
