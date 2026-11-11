import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/core/theme/colors';
import { spacing } from '@/core/theme/spacing';
import { AppText, Button, Icon } from '@/shared/components';

type SlideVariant = 'fridge' | 'savings' | 'eco';

type Slide = {
  id: string;
  title: string;
  description: string;
  variant: SlideVariant;
  status?: string;
};

const slides: Slide[] = [
  {
    id: 'step-1',
    title: 'Quản lý tủ lạnh & Nhắc nhở hạn dùng',
    description:
      'EcoSave tự động phân loại thực phẩm theo ngăn mát, ngăn đông và nhắc bạn trước khi đồ ăn hết hạn.',
    variant: 'fridge',
    status: 'Đang kết nối',
  },
  {
    id: 'step-2',
    title: 'Giải cứu món ngon mỗi ngày & Nhận quà 0đ từ cộng đồng',
    description:
      'Nhận ưu đãi chất lượng, món gần hết hạn và cơ hội nhận đồ ăn giá rẻ hoặc miễn phí để giảm lãng phí.',
    variant: 'savings',
    status: 'Hôm nay',
  },
  {
    id: 'step-3',
    title: 'Tích lũy Điểm Xanh EcoPoints, chung tay vì Trái Đất',
    description:
      'Mỗi lần bạn chọn thực phẩm đúng cách, cứu món ăn và chia sẻ thực phẩm lành mạnh sẽ giúp bạn tích lũy điểm.',
    variant: 'eco',
    status: 'EcoPoints',
  },
];

const fridgeItems = [
  { name: 'Rau xà lách thủy canh', detail: 'Ngăn rau củ quả', badge: 'Hết hạn hôm nay', bg: '#FDE7E7', text: '#D92D20' },
  { name: 'Sữa tươi Đà Lạt', detail: 'Cánh cửa trên', badge: 'Còn 2 ngày', bg: '#FFF1D6', text: '#B45309' },
  { name: 'Trứng gà Ba Huân', detail: 'Kệ giữa tầng 2', badge: 'Còn 10 ngày', bg: '#E3F7EE', text: '#157F5B' },
] as const;

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const currentSlide = slides[currentStep];

  const nextButtonLabel = useMemo(() => {
    if (currentStep === slides.length - 1) {
      return 'Bắt đầu ngay – Nhận 50 Điểm';
    }

    return 'Tiếp tục';
  }, [currentStep]);

  const handleContinue = () => {
    if (currentStep === slides.length - 1) {
      router.replace('/(auth)/register');
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const handleBack = () => {
    if (currentStep === 0) {
      router.back();
      return;
    }

    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const renderSlideCard = (slide: Slide) => {
    switch (slide.variant) {
      case 'fridge':
        return (
          <View style={styles.cardShell}>
            <View style={styles.statusRow}>
              <View style={styles.brandRow}>
                <View style={styles.brandIcon}>
                  <Icon name="fridge" family="material-community" size={18} color={colors.primary} />
                </View>
                <View style={styles.brandTextWrap}>
                  <AppText variant="subhead" color="text" style={styles.brandName}>
                    Tủ Lạnh Nhà Tôi
                  </AppText>
                  <AppText variant="caption" color="textMuted" style={styles.brandMeta}>
                    Ngăn mát • 4°C tối ưu
                  </AppText>
                </View>
              </View>

              <View style={styles.connectionBadge}>
                <View style={styles.statusDot} />
                <AppText variant="caption" color="primary" style={styles.connectionText}>
                  {slide.status}
                </AppText>
              </View>
            </View>

            <View style={styles.itemList}>
              {fridgeItems.map((item) => (
                <View key={item.name} style={[styles.itemRow, { backgroundColor: item.bg }]}>
                  <View style={styles.itemInfo}>
                    <View style={styles.itemThumb}>
                      <View style={styles.thumbCircle} />
                    </View>
                    <View style={styles.itemTextWrap}>
                      <AppText variant="body" color="text" style={styles.itemName}>
                        {item.name}
                      </AppText>
                      <AppText variant="caption" color="textMuted" style={styles.itemMeta}>
                        {item.detail}
                      </AppText>
                    </View>
                  </View>

                  <View style={[styles.badgePill, { backgroundColor: item.text }]}>
                    <AppText variant="caption" color="white" style={styles.badgeText}>
                      {item.badge}
                    </AppText>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.progressCard}>
              <View style={styles.progressHeaderRow}>
                <Icon name="shield-check" family="material-community" size={18} color={colors.primary} />
                <AppText variant="body" color="text" style={styles.progressText}>
                  Bảo quản chuẩn giúp giảm 30% hư hỏng
                </AppText>
              </View>
              <View style={styles.progressTrack}>
                <View style={styles.progressFill} />
              </View>
              <AppText variant="caption" color="primary" style={styles.progressValue}>
                100% Tươi
              </AppText>
            </View>
          </View>
        );

      case 'savings':
        return (
          <View style={styles.cardShell}>
            <View style={styles.heroPanel}>
              <View style={styles.foodScene}>
                <View style={styles.foodTopRow}>
                  <View style={styles.foodCardLarge} />
                  <View style={styles.foodCardSmall} />
                </View>
                <View style={styles.foodBottomRow}>
                  <View style={styles.foodCardWide} />
                  <View style={styles.foodCardAccent} />
                </View>
              </View>

              <View style={styles.heroTagRow}>
                <View style={styles.heroTagGreen}>
                  <AppText variant="caption" color="white" style={styles.heroTagText}>
                    Giảm tới 70%
                  </AppText>
                </View>
                <View style={styles.heroTagSoft}>
                  <AppText variant="caption" color="text" style={styles.heroTagText}>
                    Bánh mì tiệm Pháp 110k 32k
                  </AppText>
                </View>
              </View>

              <View style={styles.heroTagRowBottom}>
                <View style={styles.heroTagSoft}>
                  <AppText variant="caption" color="text" style={styles.heroTagText}>
                    Quà 0đ Thảo Điền
                  </AppText>
                </View>
                <View style={styles.heroTagGreen}>
                  <AppText variant="caption" color="white" style={styles.heroTagText}>
                    Cắt giảm 1.5kg CO₂
                  </AppText>
                </View>
              </View>
            </View>
          </View>
        );

      case 'eco':
        return (
          <View style={styles.cardShell}>
            <View style={styles.ecoHeader}>
              <AppText variant="subhead" color="text" style={styles.ecoHeaderText}>
                Eco Impact Hub
              </AppText>
            </View>

            <View style={styles.metricRow}>
              <View style={styles.metricCard}>
                <AppText variant="caption" color="textMuted" style={styles.metricLabel}>
                  Giảm phát thải
                </AppText>
                <AppText variant="subhead" color="text" style={styles.metricValue}>
                  2.8 kg CO₂e
                </AppText>
              </View>

              <View style={styles.metricCard}>
                <AppText variant="caption" color="textMuted" style={styles.metricLabel}>
                  Điểm tích lũy
                </AppText>
                <AppText variant="subhead" color="text" style={styles.metricValue}>
                  +150 pts
                </AppText>
              </View>
            </View>

            <View style={styles.rewardList}>
              {[
                { label: 'Voucher 20k', value: '100 điểm' },
                { label: 'Trồng 1 cây', value: '250 điểm' },
                { label: 'Huy hiệu Bạc', value: '300 điểm' },
              ].map((reward) => (
                <View key={reward.label} style={styles.rewardButton}>
                  <AppText variant="body" color="text" style={styles.rewardLabel}>
                    {reward.label}
                  </AppText>
                  <AppText variant="caption" color="textMuted" style={styles.rewardValue}>
                    {reward.value}
                  </AppText>
                </View>
              ))}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.screen}>
        <View style={styles.topBar}>
          <Pressable style={styles.iconButton} onPress={handleBack}>
            <Icon name="chevron-left" family="material-community" size={18} color={colors.text} />
          </Pressable>

          <Pressable onPress={() => router.replace('/(auth)/register')}>
            <AppText variant="body" color="textMuted" style={styles.skipText}>
              Bỏ qua
            </AppText>
          </Pressable>
        </View>

        {renderSlideCard(currentSlide)}

        <View style={styles.dotRow}>
          {slides.map((slide, index) => (
            <Pressable
              key={slide.id}
              onPress={() => setCurrentStep(index)}
              style={[styles.indicatorDot, index === currentStep ? styles.dotActive : styles.dotInactive]}
            />
          ))}
        </View>

        <View style={styles.content}>
          <AppText variant="h2" color="text" style={styles.title}>
            {currentSlide.title}
          </AppText>
          <AppText variant="body" color="textMuted" style={styles.description}>
            {currentSlide.description}
          </AppText>
        </View>

        <View style={styles.ctaRow}>
          <Pressable style={styles.smallBackButton} onPress={handleBack}>
            <Icon name="chevron-left" family="material-community" size={18} color={colors.primary} />
          </Pressable>

          <Button
            label={nextButtonLabel}
            variant="primary"
            onPress={handleContinue}
            style={styles.primaryButton}
            rightIcon={<Icon name="arrow-right" family="material-community" size={18} color={colors.white} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F8F5',
  },
  screen: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipText: {
    fontWeight: '600',
  },
  cardShell: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
    gap: spacing.md,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  brandIcon: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: '#EAF3F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTextWrap: {
    gap: 2,
  },
  brandName: {
    fontWeight: '700',
  },
  brandMeta: {
    lineHeight: 16,
  },
  connectionBadge: {
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EAF3F1',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  connectionText: {
    fontWeight: '600',
  },
  itemList: {
    gap: spacing.sm,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    gap: spacing.sm,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm,
  },
  itemThumb: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#D8F0E4',
  },
  itemTextWrap: {
    flex: 1,
    gap: 2,
  },
  itemName: {
    fontWeight: '600',
  },
  itemMeta: {
    lineHeight: 16,
  },
  badgePill: {
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    maxWidth: 120,
  },
  badgeText: {
    textAlign: 'center',
    fontWeight: '600',
  },
  progressCard: {
    backgroundColor: '#F0F3FF',
    borderRadius: 12,
    padding: spacing.sm,
    gap: 8,
  },
  progressHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressText: {
    flex: 1,
    fontWeight: '500',
  },
  progressTrack: {
    height: 10,
    backgroundColor: '#DDE8F8',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    width: '70%',
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 999,
  },
  progressValue: {
    fontWeight: '700',
  },
  heroPanel: {
    backgroundColor: '#EFF6EF',
    borderRadius: 18,
    padding: 14,
    gap: 12,
  },
  foodScene: {
    height: 150,
    borderRadius: 16,
    backgroundColor: '#E7F2E9',
    padding: 12,
    justifyContent: 'space-between',
  },
  foodTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  foodCardLarge: {
    flex: 1,
    height: 72,
    borderRadius: 18,
    backgroundColor: '#F9D8A8',
  },
  foodCardSmall: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: '#E7A56A',
  },
  foodBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  foodCardWide: {
    flex: 1,
    height: 52,
    borderRadius: 18,
    backgroundColor: '#D9A863',
  },
  foodCardAccent: {
    width: 88,
    height: 52,
    borderRadius: 18,
    backgroundColor: '#B9DCC8',
  },
  heroTagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  heroTagRowBottom: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  heroTagGreen: {
    backgroundColor: '#1BA06D',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  heroTagSoft: {
    backgroundColor: '#F7F9FD',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  heroTagText: {
    fontWeight: '600',
  },
  ecoHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 8,
  },
  ecoHeaderText: {
    fontWeight: '700',
  },
  metricRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#F5F7FF',
    borderRadius: 14,
    padding: spacing.sm,
    gap: 4,
  },
  metricLabel: {
    lineHeight: 16,
  },
  metricValue: {
    fontWeight: '700',
  },
  rewardList: {
    gap: spacing.sm,
  },
  rewardButton: {
    backgroundColor: '#F6F9FF',
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  rewardLabel: {
    fontWeight: '600',
  },
  rewardValue: {
    fontWeight: '600',
  },
  dotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  indicatorDot: {
    height: 8,
    borderRadius: 999,
  },
  dotActive: {
    width: 28,
    backgroundColor: colors.primary,
  },
  dotInactive: {
    width: 8,
    backgroundColor: '#D5D9E6',
  },
  content: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    textAlign: 'center',
    lineHeight: 34,
  },
  description: {
    textAlign: 'center',
    lineHeight: 22,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  smallBackButton: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAF3F1',
  },
  primaryButton: {
    flex: 1,
    borderRadius: 14,
    minHeight: 52,
  },
});
