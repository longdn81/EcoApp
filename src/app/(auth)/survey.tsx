import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

import { colors } from '@/core/theme/colors';
import { radius } from '@/core/theme/radius';
import { spacing } from '@/core/theme/spacing';
import { AppText, Button, Card, Icon, Input } from '@/shared/components';

const profileSchema = z.object({
  nickname: z.string().trim().min(1, 'Vui lòng nhập biệt danh của bạn.'),
  location: z.string().trim().min(1, 'Vui lòng nhập vị trí hiện tại.'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

type GoalOption = {
  id: string;
  label: string;
  description: string;
  icon: string;
};

type DietOption = {
  id: string;
  label: string;
  description: string;
  icon: string;
};

const primaryGoalOptions: GoalOption[] = [
  {
    id: 'savings',
    label: 'Tiết kiệm chi phí',
    description: 'Săn món ngon giảm 50%–70% và bớt nợ mỗi ngày',
    icon: 'cash-multiple',
  },
  {
    id: 'waste',
    label: 'Giảm lãng phí thực phẩm',
    description: 'Quản lý hàng ngày để hạn chế thực phẩm hỏng',
    icon: 'food-off',
  },
  {
    id: 'healthy',
    label: 'Ăn uống lành mạnh',
    description: 'Tận dụng thực phẩm giàu dinh dưỡng và cân bằng',
    icon: 'leaf',
  },
  {
    id: 'rewards',
    label: 'Tích điểm nhận quà',
    description: 'Tích EcoPoints và đổi voucher, quà từ cộng đồng',
    icon: 'gift-outline',
  },
  {
    id: 'community',
    label: 'Chia sẻ và cộng đồng',
    description: 'Tham gia hành động giúp môi trường tốt hơn',
    icon: 'account-group',
  },
];

const dietOptions: DietOption[] = [
  { id: 'omnivore', label: 'Chế độ ăn uống', description: 'Không giới hạn', icon: 'food-steak' },
  { id: 'vegan', label: 'Thuần chay', description: '100% thức vật', icon: 'leaf' },
  { id: 'vegetarian', label: 'Ăn chay', description: 'Không dùng thịt', icon: 'food-variant' },
  { id: 'keto', label: 'Keto / Low Carb', description: 'Ít carb và giàu chất béo', icon: 'food-apple' },
  { id: 'halal', label: 'Halal Certified', description: 'Chế độ ăn theo chuẩn halal', icon: 'shield-check' },
];

const allergyOptions = ['Hải sản & Giáp xác', 'Đậu phộng & Các hạt', 'Sữa bò / Lactose', 'Gluten / Bột mì', 'Không chứa cay', 'Trứng'];
const shoppingFrequencies = [
  'Hàng ngày',
  '2–3 lần/tuần',
  '1 lần/tuần',
  'Ít hơn 1 lần/tuần',
];

export default function SurveyScreen() {
  const router = useRouter();
  const [step, setStep] = useState<number>(0);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['savings', 'waste']);
  const [selectedDiets, setSelectedDiets] = useState<string[]>(['omnivore']);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(['Hải sản & Giáp xác']);
  const [familySize, setFamilySize] = useState<number>(2);
  const [shoppingFrequency, setShoppingFrequency] = useState<string>('2–3 lần/tuần');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nickname: 'Nguyễn Mai Phương',
      location: 'Thảo Điền, TP. Thủ Đức',
    },
  });

  const progressPercent = useMemo(() => ((step + 1) / 5) * 100, [step]);

  const toggleGoal = (id: string) => {
    setSelectedGoals((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const toggleDiet = (id: string) => {
    setSelectedDiets((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const toggleAllergy = (item: string) => {
    setSelectedAllergies((current) =>
      current.includes(item) ? current.filter((option) => option !== item) : [...current, item],
    );
  };

  const goNext = () => {
    if (step < 4) {
      setStep((current) => current + 1);
      return;
    }

    router.replace('/(tabs)' as Parameters<typeof router.replace>[0]);
  };

  const goBack = () => {
    if (step === 0) {
      router.back();
      return;
    }

    setStep((current) => Math.max(current - 1, 0));
  };

  const handleProfileSubmit = () => {
    setStep(4);
  };

  const finalSummary = useMemo(() => {
    const goalLabels = selectedGoals
      .map((goalId) => primaryGoalOptions.find((goal) => goal.id === goalId)?.label)
      .filter(Boolean)
      .slice(0, 3);

    return {
      goals: goalLabels.length > 0 ? goalLabels : ['Tiết kiệm chi phí'],
      diet: selectedDiets.length > 0 ? selectedDiets.map((diet) => dietOptions.find((option) => option.id === diet)?.label).filter(Boolean) : ['Chế độ ăn uống'],
      family: `${familySize} người`,
      shopping: shoppingFrequency,
    };
  }, [familySize, selectedDiets, selectedGoals, shoppingFrequency]);

  const renderHeader = () => {
    const showSkip = step === 0 || step === 1 || step === 2 || step === 3;

    return (
      <View style={styles.headerRow}>
        <Pressable style={styles.headerAction} onPress={goBack}>
          <Icon name="arrow-left" family="material-community" size={20} color={colors.text} />
        </Pressable>

        <View style={styles.progressWrap}>
          <AppText variant="caption" color="textMuted" style={styles.progressLabel}>
            {step === 4 ? 'Hoàn tất' : `Bước ${step + 1}/5`}
          </AppText>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>
        </View>

        {showSkip ? (
          <Pressable onPress={() => router.replace('/(tabs)' as Parameters<typeof router.replace>[0])}>
            <AppText variant="body" color="textMuted" style={styles.skipText}>
              Bỏ qua
            </AppText>
          </Pressable>
        ) : (
          <View style={{ width: 56 }} />
        )}
      </View>
    );
  };

  const renderStepZero = () => (
    <View style={styles.stepContent}>
      <AppText variant="h2" color="text" style={styles.stepTitle}>
        Mục tiêu chính của bạn khi dùng EcoSave là gì?
      </AppText>
      <AppText variant="body" color="textMuted" style={styles.stepDescription}>
        Chọn các mục tiêu bạn quan tâm nhất để EcoSave tối ưu hóa trải nghiệm.
      </AppText>

      <View style={styles.optionList}>
        {primaryGoalOptions.map((option) => {
          const selected = selectedGoals.includes(option.id);

          return (
            <Pressable
              key={option.id}
              onPress={() => toggleGoal(option.id)}
              style={[styles.goalCard, selected && styles.goalCardSelected]}
            >
              <View style={styles.goalIconWrap}>
                <Icon
                  name={option.icon as any}
                  family="material-community"
                  size={20}
                  color={selected ? colors.white : colors.text}
                />
              </View>

              <View style={styles.goalTextWrap}>
                <AppText variant="subhead" color="text" style={styles.goalTitle}>
                  {option.label}
                </AppText>
                <AppText variant="caption" color="textMuted" style={styles.goalDesc}>
                  {option.description}
                </AppText>
              </View>

              <View style={[styles.checkCircle, selected && styles.checkCircleSelected]}>
                {selected ? <Icon name="check" family="material-community" size={14} color={colors.white} /> : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );

  const renderStepOne = () => (
    <View style={styles.stepContent}>
      <AppText variant="h2" color="text" style={styles.stepTitle}>
        Bạn có chế độ ăn đặc biệt hoặc dị ứng nào không?
      </AppText>
      <AppText variant="body" color="textMuted" style={styles.stepDescription}>
        Chọn các nhu cầu dinh dưỡng phù hợp để EcoSave đề xuất thực phẩm tốt cho bạn.
      </AppText>

      <View style={styles.chipGrid}>
        {dietOptions.map((option) => {
          const selected = selectedDiets.includes(option.id);

          return (
            <Pressable
              key={option.id}
              onPress={() => toggleDiet(option.id)}
              style={[styles.dietChoice, selected && styles.dietChoiceSelected]}
            >
              <View style={styles.foodIcon}>
                <Icon name={option.icon as any} family="material-community" size={18} color={selected ? colors.primary : colors.textMuted} />
              </View>
              <View style={styles.dietTextWrap}>
                <AppText variant="subhead" color="text" style={styles.dietTitle}>
                  {option.label}
                </AppText>
                <AppText variant="caption" color="textMuted" style={styles.dietDescription}>
                  {option.description}
                </AppText>
              </View>
              {selected ? <View style={styles.checkDot} /> : null}
            </Pressable>
          );
        })}
      </View>

      <View style={styles.allergyWrap}>
        <AppText variant="body" color="textMuted" style={styles.sectionLabel}>
          Bạn đang mắc các vấn đề nào?
        </AppText>
        <View style={styles.pillWrap}>
          {allergyOptions.map((item) => {
            const active = selectedAllergies.includes(item);
            return (
              <Pressable
                key={item}
                onPress={() => toggleAllergy(item)}
                style={[styles.pill, active && styles.pillSelected]}
              >
                <AppText variant="body" color={active ? 'primary' : 'textMuted'} style={styles.pillText}>
                  {item}
                </AppText>
                {active ? <Icon name="check" family="material-community" size={14} color={colors.primary} /> : null}
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );

  const renderStepTwo = () => (
    <View style={styles.stepContent}>
      <AppText variant="h2" color="text" style={styles.stepTitle}>
        Quy mô gia đình và thói quen nấu nướng
      </AppText>
      <AppText variant="body" color="textMuted" style={styles.stepDescription}>
        Dựa trên thông tin này, EcoSave sẽ gợi ý khẩu phần phù hợp hơn cho bạn.
      </AppText>

      <Card style={styles.familyCard} elevated={false}>
        <AppText variant="body" color="textMuted" style={styles.sectionLabel}>
          Quy mô gia đình
        </AppText>

        <View style={styles.stepperRow}>
          <Pressable
            style={styles.stepperButton}
            onPress={() => setFamilySize((current) => Math.max(1, current - 1))}
          >
            <Icon name="minus" family="material-community" size={18} color={colors.text} />
          </Pressable>

          <AppText variant="h2" color="text" style={styles.familyNumber}>
            {familySize}
          </AppText>

          <Pressable
            style={styles.stepperButton}
            onPress={() => setFamilySize((current) => Math.min(10, current + 1))}
          >
            <Icon name="plus" family="material-community" size={18} color={colors.text} />
          </Pressable>
        </View>

        <View style={styles.familyPickGrid}>
          {[1, 2, 3, 4, 5, 6].map((value) => {
            const active = familySize === value;
            return (
              <Pressable
                key={value}
                onPress={() => setFamilySize(value)}
                style={[styles.familyPick, active && styles.familyPickSelected]}
              >
                <AppText variant="body" color={active ? 'primary' : 'textMuted'}>
                  {value}
                </AppText>
              </Pressable>
            );
          })}
        </View>
      </Card>

      <View style={styles.frequencyWrap}>
        <AppText variant="body" color="textMuted" style={styles.sectionLabel}>
          Tần suất mua thực phẩm
        </AppText>

        {shoppingFrequencies.map((option) => {
          const active = shoppingFrequency === option;
          return (
            <Pressable
              key={option}
              onPress={() => setShoppingFrequency(option)}
              style={[styles.frequencyOption, active && styles.frequencyOptionSelected]}
            >
              <View style={[styles.radio, active && styles.radioSelected]} />
              <AppText variant="body" color={active ? 'text' : 'textMuted'} style={styles.frequencyText}>
                {option}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );

  const renderStepThree = () => (
    <View style={styles.stepContent}>
      <AppText variant="h2" color="text" style={styles.stepTitle}>
        Hoàn tất hồ sơ cá nhân
      </AppText>
      <AppText variant="body" color="textMuted" style={styles.stepDescription}>
        Tạo hồ sơ của bạn và giúp EcoSave gợi ý chính xác hơn.
      </AppText>

      <View style={styles.avatarSection}>
        <View style={styles.avatarCircle}>
          <Icon name="account" family="material-community" size={54} color={colors.primary} />
        </View>
        <Pressable style={styles.cameraButton}>
          <Icon name="camera" family="material-community" size={18} color={colors.white} />
        </Pressable>
      </View>

      <Controller
        control={control}
        name="nickname"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Biệt danh / Nickname"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Nhập tên của bạn"
            leftIcon={<Icon name="account-edit" family="material-community" size={18} color={colors.primary} />}
            error={errors.nickname?.message}
            style={styles.inputStyle}
          />
        )}
      />

      <Controller
        control={control}
        name="location"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Vị trí hiện tại"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Nhập vị trí của bạn"
            leftIcon={<Icon name="map-marker-radius" family="material-community" size={18} color={colors.primary} />}
            rightIcon={<Icon name="crosshairs-gps" family="material-community" size={18} color={colors.textMuted} />}
            error={errors.location?.message}
            style={styles.inputStyle}
          />
        )}
      />
    </View>
  );

  const renderStepFour = () => (
    <View style={styles.stepContent}>
      <View style={styles.successBadgeWrap}>
        <View style={styles.successBadgeCircle}>
          <Icon name="sprout" family="material-community" size={32} color={colors.white} />
        </View>
      </View>

      <AppText variant="h2" color="text" style={styles.successTitle}>
        Chúc mừng! Bạn đã nhận được 50 EcoPoints khởi nguồn
      </AppText>

      <Card style={styles.summaryCard} elevated={false}>
        <View style={styles.summaryHeaderRow}>
          <Icon name="trophy" family="material-community" size={18} color={colors.primary} />
          <AppText variant="subhead" color="text">
            Quà tặng công dân xanh
          </AppText>
        </View>

        <View style={styles.summaryGrid}>
          <View style={styles.summaryBox}>
            <AppText variant="caption" color="textMuted">
              EcoPoints
            </AppText>
            <AppText variant="subhead" color="text" style={styles.summaryValue}>
              +50 Xu
            </AppText>
          </View>
          <View style={styles.summaryBox}>
            <AppText variant="caption" color="textMuted">
              Voucher
            </AppText>
            <AppText variant="subhead" color="text" style={styles.summaryValue}>
              20.000đ
            </AppText>
          </View>
        </View>

        <View style={styles.finalSummaryList}>
          <AppText variant="body" color="text" style={styles.summaryLine}>
            Mục tiêu: {finalSummary.goals.join(', ')}
          </AppText>
          <AppText variant="body" color="text" style={styles.summaryLine}>
            Dinh dưỡng: {finalSummary.diet.join(', ')}
          </AppText>
          <AppText variant="body" color="text" style={styles.summaryLine}>
            Gia đình: {finalSummary.family}
          </AppText>
          <AppText variant="body" color="text" style={styles.summaryLine}>
            Mua sắm: {finalSummary.shopping}
          </AppText>
        </View>
      </Card>
    </View>
  );

  const renderCurrentStep = () => {
    switch (step) {
      case 0:
        return renderStepZero();
      case 1:
        return renderStepOne();
      case 2:
        return renderStepTwo();
      case 3:
        return renderStepThree();
      case 4:
        return renderStepFour();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {renderHeader()}
          {renderCurrentStep()}

          {step < 4 ? (
            <Button
              label={step === 3 ? 'Hoàn tất' : 'Tiếp tục'}
              variant="primary"
              onPress={() => {
                if (step === 3) {
                  void handleSubmit(handleProfileSubmit)();
                  return;
                }

                goNext();
              }}
              style={styles.primaryButton}
              rightIcon={<Icon name="arrow-right" family="material-community" size={18} color={colors.white} />}
            />
          ) : (
            <Button
              label="Bắt đầu khám phá ngay"
              variant="primary"
              onPress={() => router.replace('/(tabs)' as Parameters<typeof router.replace>[0])}
              style={styles.primaryButton}
              rightIcon={<Icon name="rocket-launch-outline" family="material-community" size={18} color={colors.white} />}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F9F6',
  },
  wrapper: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  headerAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  progressWrap: {
    flex: 1,
    gap: 6,
  },
  progressLabel: {
    textAlign: 'center',
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#DDEAE3',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  skipText: {
    fontWeight: '600',
  },
  stepContent: {
    flex: 1,
    gap: spacing.md,
  },
  stepTitle: {
    textAlign: 'left',
    lineHeight: 34,
  },
  stepDescription: {
    textAlign: 'left',
  },
  optionList: {
    gap: spacing.sm,
  },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#F9FBFA',
  },
  goalCardSelected: {
    backgroundColor: '#E7F6F0',
    borderColor: '#8FD5BA',
  },
  goalIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#D9F1E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalTextWrap: {
    flex: 1,
    gap: 4,
  },
  goalTitle: {
    fontWeight: '700',
  },
  goalDesc: {
    lineHeight: 16,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipGrid: {
    gap: spacing.sm,
  },
  dietChoice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: '#F5F7F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dietChoiceSelected: {
    backgroundColor: '#E7F6F0',
    borderColor: '#8FD5BA',
  },
  foodIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#EAF3EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dietTextWrap: {
    flex: 1,
    gap: 3,
  },
  dietTitle: {
    fontWeight: '700',
  },
  dietDescription: {
    lineHeight: 16,
  },
  checkDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  allergyWrap: {
    gap: spacing.sm,
  },
  sectionLabel: {
    marginBottom: spacing.xs,
  },
  pillWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    backgroundColor: '#F3F7F5',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  pillSelected: {
    backgroundColor: '#E8F6EF',
    borderColor: '#9BD3B5',
  },
  pillText: {
    fontWeight: '600',
  },
  familyCard: {
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: '#F5FAF8',
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.md,
    gap: spacing.lg,
  },
  stepperButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5F3EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  familyNumber: {
    minWidth: 40,
    textAlign: 'center',
  },
  familyPickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  familyPick: {
    width: '31%',
    minHeight: 64,
    borderRadius: radius.md,
    backgroundColor: '#EEF4F1',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  familyPickSelected: {
    backgroundColor: '#EAF8F3',
    borderColor: '#8FD5BA',
  },
  frequencyWrap: {
    gap: spacing.sm,
  },
  frequencyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: '#F7F9F8',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  frequencyOptionSelected: {
    backgroundColor: '#EAF8F3',
    borderColor: '#9BD3B5',
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#BFCDC5',
  },
  radioSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  frequencyText: {
    flex: 1,
    fontWeight: '600',
  },
  avatarSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  avatarCircle: {
    width: 118,
    height: 118,
    borderRadius: 59,
    backgroundColor: '#E7F5F0',
    borderWidth: 3,
    borderColor: '#87D4B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    position: 'absolute',
    right: '32%',
    bottom: -4,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.white,
  },
  inputStyle: {
    marginBottom: spacing.xs,
  },
  successBadgeWrap: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  successBadgeCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#14B75E',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 8,
    borderColor: '#EAF8F3',
  },
  successTitle: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  summaryCard: {
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: '#F9FCF9',
  },
  summaryHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: '#EAF8F3',
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 4,
  },
  summaryValue: {
    fontWeight: '700',
  },
  finalSummaryList: {
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  summaryLine: {
    lineHeight: 22,
  },
  primaryButton: {
    width: '100%',
    minHeight: 56,
    marginTop: spacing.lg,
    borderRadius: radius.lg,
  },
});
