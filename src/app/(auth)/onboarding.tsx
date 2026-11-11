import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/core/theme/colors';
import { spacing } from '@/core/theme/spacing';
import { AppText, Button, Icon } from '@/shared/components';

type SlideItem = {
  id: string;
  name: string;
  meta: string;
  badge: string;
  badgeColor: string;
  badgeTextColor: string;
  tint: string;
  icon: 'leaf' | 'food-apple' | 'chart-line' | 'gift' | 'clock-outline';
};

type Slide = {
  id: number;
  title: string;
  description: string;
  status: string;
  items: SlideItem[];
};

const slides: Slide[] = [
  {
    id: 0,
    title: 'Quản lý tủ lạnh & Nhắc nhở hạn dùng',
    description:
      'EcoSave tự động phân loại thực phẩm theo ngăn mát, ngăn đông và nhắc bạn trước khi đồ ăn hết hạn, giúp gia đình bạn tiết kiệm đến 30% chi phí thực phẩm mỗi tháng.',
    status: 'Đang kết nối',
    items: [
      {
        id: 'item-1',
        name: 'Rau xà lách thủy canh',
        meta: 'Ngăn rau củ quả',
        badge: 'Hết hạn hôm nay',
        badgeColor: '#D92D20',
        badgeTextColor: '#FFFFFF',
        tint: '#FEE4E2',
        icon: 'leaf',
      },
      {
        id: 'item-2',
        name: 'Sữa tươi Đà Lạt',
        meta: 'Cánh cửa trên',
        badge: 'Còn 2 ngày',
        badgeColor: '#7C4A00',
        badgeTextColor: '#FFFFFF',
        tint: '#FFF1D6',
        icon: 'food-apple',
      },
      {
        id: 'item-3',
        name: 'Trứng gà Ba Huân',
        meta: 'Kệ giữa tầng 2',
        badge: 'Còn 10 ngày',
        badgeColor: '#006C49',
        badgeTextColor: '#FFFFFF',
        tint: '#DDF7ED',
        icon: 'chart-line',
      },
    ],
  },
  {
    id: 1,
    title: 'Giải cứu thực phẩm giảm giá & 0đ',
    description:
      'Nhận ưu đãi chất lượng, món gần hết hạn và cơ hội nhận đồ ăn giá rẻ hoặc miễn phí để giảm lãng phí và tiết kiệm chi phí mỗi ngày.',
    status: 'Hôm nay',
    items: [
      {
        id: 'item-1',
        name: 'Bánh mì mới nướng',
        meta: 'Hết hạn sau 4h',
        badge: 'Giảm 50%',
        badgeColor: '#C2410C',
        badgeTextColor: '#FFFFFF',
        tint: '#FEF3C7',
        icon: 'gift',
      },
      {
        id: 'item-2',
        name: 'Bữa ăn chay',
        meta: 'Đã được cứu',
        badge: 'Miễn phí',
        badgeColor: '#15803D',
        badgeTextColor: '#FFFFFF',
        tint: '#DCFCE7',
        icon: 'leaf',
      },
      {
        id: 'item-3',
        name: 'Trái cây sạch',
        meta: 'Giá tốt hôm nay',
        badge: '0đ cho thành viên',
        badgeColor: '#1D4ED8',
        badgeTextColor: '#FFFFFF',
        tint: '#DBEAFE',
        icon: 'chart-line',
      },
    ],
  },
  {
    id: 2,
    title: 'Tích lũy điểm xanh EcoPoints & Giảm CO₂',
    description:
      'Mỗi lần bạn chọn thực phẩm đúng cách, cứu món ăn và chia sẻ thực phẩm lành mạnh sẽ giúp bạn tích lũy điểm và giảm khí thải carbon.',
    status: 'EcoPoints',
    items: [
      {
        id: 'item-1',
        name: 'Đổi điểm lấy quà',
        meta: 'Tích lũy 320 XP',
        badge: '+320 EcoPoints',
        badgeColor: '#166534',
        badgeTextColor: '#FFFFFF',
        tint: '#DCFCE7',
        icon: 'gift',
      },
      {
        id: 'item-2',
        name: 'Giảm CO₂',
        meta: 'Phòng ngừa lãng phí',
        badge: 'Giảm 2.5kg',
        badgeColor: '#0F766E',
        badgeTextColor: '#FFFFFF',
        tint: '#CCFBF1',
        icon: 'chart-line',
      },
      {
        id: 'item-3',
        name: 'Mẹo bảo quản',
        meta: 'Lưu trữ tối ưu',
        badge: 'Mỗi ngày tốt hơn',
        badgeColor: '#7C3AED',
        badgeTextColor: '#FFFFFF',
        tint: '#EDE9FE',
        icon: 'clock-outline',
      },
    ],
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const currentSlide = slides[activeIndex];
  const isLastSlide = activeIndex === slides.length - 1;

  const handleContinue = () => {
    if (isLastSlide) {
      router.replace('/(auth)/register' as Parameters<typeof router.replace>[0]);
      return;
    }

    setActiveIndex((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const handleBack = () => {
    if (activeIndex === 0) {
      router.back();
      return;
    }

    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.screen}>
        <View style={styles.topBar}>
          <Pressable style={styles.iconButton} onPress={handleBack}>
            <Icon name="chevron-left" family="material-community" size={18} color={colors.text} />
          </Pressable>

          <Pressable onPress={() => router.replace('/(auth)/register' as Parameters<typeof router.replace>[0])}>
            <AppText variant="body" color="textMuted" style={styles.skipText}>
              Bỏ qua
            </AppText>
          </Pressable>
        </View>

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
                {currentSlide.status}
              </AppText>
            </View>
          </View>

          <View style={styles.itemsWrap}>
            {currentSlide.items.map((item) => (
              <View key={item.id} style={[styles.itemRow, { backgroundColor: item.tint }]}>
                <View style={styles.itemLeft}>
                  <View style={styles.itemThumb}>
                    <Icon name={item.icon} family="material-community" size={22} color={colors.primary} />
                  </View>

                  <View style={styles.itemTextWrap}>
                    <AppText variant="body" color="text" style={styles.itemName}>
                      {item.name}
                    </AppText>
                    <AppText variant="caption" color="textMuted" style={styles.itemMeta}>
                      {item.meta}
                    </AppText>
                  </View>
                </View>

                <View style={[styles.badge, { backgroundColor: item.badgeColor }]}>
                  <AppText variant="caption" color="white" style={styles.badgeText}>
                    {item.badge}
                  </AppText>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoIconWrap}>
              <Icon name="shield-check" family="material-community" size={18} color={colors.primary} />
            </View>
            <AppText variant="body" color="text" style={styles.infoText}>
              Bảo quản chuẩn giúp giảm 30% hư hỏng
            </AppText>
            <AppText variant="caption" color="primary" style={styles.infoValue}>
              100% Tươi
            </AppText>
          </View>
        </View>

        <View style={styles.dotRow}>
          {slides.map((slide, index) => (
            <Pressable
              key={slide.id}
              onPress={() => setActiveIndex(index)}
              style={[
                styles.indicatorDot,
                index === activeIndex ? styles.dotActive : styles.dotInactive,
              ]}
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
            label="Tiếp tục"
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
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
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
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
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
    backgroundColor: '#E7EEFF',
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
  itemsWrap: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  itemRow: {
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm,
  },
  itemThumb: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTextWrap: {
    flex: 1,
  },
  itemName: {
    fontWeight: '600',
    marginBottom: 2,
  },
  itemMeta: {
    lineHeight: 18,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    maxWidth: 122,
  },
  badgeText: {
    lineHeight: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#F0F3FF',
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  infoIconWrap: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EAF3F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    flex: 1,
    fontWeight: '500',
  },
  infoValue: {
    fontWeight: '700',
  },
  dotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
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
    marginBottom: spacing.lg,
  },
  title: {
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: spacing.sm,
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