import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

import { colors } from '@/core/theme/colors';
import { radius } from '@/core/theme/radius';
import { spacing } from '@/core/theme/spacing';
import { AppText, Button, Icon, Input } from '@/shared/components';

const forgotPasswordSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, 'Vui lòng nhập email hoặc số điện thoại.')
    .refine((value) => {
      const normalized = value.replace(/\s+/g, '');
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const isPhone = /^(\+?\d{9,15})$/.test(normalized);

      return isEmail || isPhone;
    }, 'Vui lòng nhập email hoặc số điện thoại hợp lệ.'),
});

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự.'),
    confirmPassword: z.string().min(8, 'Vui lòng xác nhận mật khẩu.'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Mật khẩu nhập lại không khớp.',
    path: ['confirmPassword'],
  });

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

type PasswordStrength = 'Yếu' | 'Trung bình' | 'Mạnh';

const OTP_LENGTH = 6;

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [step, setStep] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(30);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [contactValue, setContactValue] = useState('');
  const [passwordDraft, setPasswordDraft] = useState('');
  const [otpValue, setOtpValue] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const otpInputRefs = useRef<({ focus: () => void } | null)[]>([]);

  const {
    control: forgotControl,
    handleSubmit: handleForgotSubmit,
    formState: { errors: forgotErrors, isSubmitting: isSendingOtp },
    reset: resetForgotForm,
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { identifier: '' },
  });

  const {
    control: resetControl,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  useEffect(() => {
    if (step !== 1) {
      return;
    }

    if (countdown <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setCountdown((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, step]);

  const passwordStrength: PasswordStrength = (() => {
    if (!passwordDraft) {
      return 'Yếu';
    }

    const isStrong =
      passwordDraft.length >= 8 &&
      /[A-Z]/.test(passwordDraft) &&
      /[a-z]/.test(passwordDraft) &&
      /\d/.test(passwordDraft);

    const isMedium =
      passwordDraft.length >= 8 &&
      (/[A-Z]/.test(passwordDraft) || /[a-z]/.test(passwordDraft)) &&
      /\d/.test(passwordDraft);

    if (isStrong) {
      return 'Mạnh';
    }

    if (isMedium) {
      return 'Trung bình';
    }

    return 'Yếu';
  })();

  const passwordStrengthWidth = (() => {
    switch (passwordStrength) {
      case 'Mạnh':
        return '100%';
      case 'Trung bình':
        return '66%';
      default:
        return '33%';
    }
  })();

  const passwordStrengthColor = (() => {
    switch (passwordStrength) {
      case 'Mạnh':
        return colors.success;
      case 'Trung bình':
        return '#F7B955';
      default:
        return colors.error;
    }
  })();

  const handleBack = () => {
    if (step === 0) {
      router.replace('/(auth)/login');
      return;
    }

    setStep((current) => Math.max(current - 1, 0));
  };

  const handleForgotPasswordSubmit = (values: ForgotPasswordFormValues) => {
    setContactValue(values.identifier);
    setStep(1);
    setCountdown(30);
    setOtpValue(Array(OTP_LENGTH).fill(''));
    resetForgotForm({ identifier: values.identifier });
  };

  const handleOtpChange = (index: number, value: string) => {
    const sanitizedValue = value.replace(/\D/g, '').slice(0, 1);
    const nextOtp = [...otpValue];
    nextOtp[index] = sanitizedValue;
    setOtpValue(nextOtp);

    if (sanitizedValue && index < OTP_LENGTH - 1) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !otpValue[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const otpComplete = otpValue.every(Boolean);

  const handleResendCode = () => {
    setCountdown(30);
    setOtpValue(Array(OTP_LENGTH).fill(''));
    otpInputRefs.current[0]?.focus();
  };

  const handleResetPasswordSubmit = (_values: ResetPasswordFormValues) => {
    Alert.alert('Đổi mật khẩu thành công', 'Mật khẩu của bạn đã được cập nhật thành công.', [
      {
        text: 'Đăng nhập ngay',
        onPress: () => router.replace('/(auth)/login'),
      },
    ]);
  };

  const renderHeader = () => {
    const isOtpStep = step === 1;
    const isResetStep = step === 2;

    return (
      <View style={styles.headerRow}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" family="material-community" size={20} color={colors.text} />
        </Pressable>

        <AppText variant="subhead" color="text" style={styles.headerTitle}>
          {isOtpStep ? 'Xác thực OTP' : isResetStep ? 'Đặt lại mật khẩu' : 'Khôi phục tài khoản'}
        </AppText>

        <View style={styles.headerIconWrap}>
          <Icon name="shield-check" family="material-community" size={18} color={colors.white} />
        </View>
      </View>
    );
  };

  const renderStepContent = () => {
    if (step === 0) {
      return (
        <View style={styles.contentWrap}>
          <View style={styles.heroBadgeWrap}>
            <View style={styles.heroBadgeCircle}>
              <Icon name="lock-reset" family="material-community" size={28} color={colors.primary} />
            </View>
          </View>

          <AppText variant="h2" color="text" style={styles.titleText}>
            Quên mật khẩu?
          </AppText>

          <AppText variant="body" color="textMuted" style={styles.descriptionText}>
            Đừng lo lắng! Hãy nhập thông tin đã đăng ký trên EcoSave để nhận mã OTP thiết lập mật khẩu mới trong tích tắc.
          </AppText>

          <Controller
            control={forgotControl}
            name="identifier"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email hoặc SĐT"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Nhập email hoặc số điện thoại"
                keyboardType="default"
                autoCapitalize="none"
                leftIcon={<Icon name="email-outline" family="material-community" size={18} color={colors.primary} />}
                error={forgotErrors.identifier?.message}
                style={styles.inputStyle}
              />
            )}
          />

          <Button
            label="Gửi mã xác thực"
            variant="primary"
            loading={isSendingOtp}
            onPress={() => {
              void handleForgotSubmit(handleForgotPasswordSubmit)();
            }}
            style={styles.primaryButton}
            rightIcon={<Icon name="arrow-right" family="material-community" size={18} color={colors.white} />}
          />
        </View>
      );
    }

    if (step === 1) {
      return (
        <View style={styles.contentWrap}>
          <View style={styles.heroBadgeWrap}>
            <View style={styles.heroBadgeCircle}>
              <Icon name="message-lock" family="material-community" size={28} color={colors.primary} />
            </View>
          </View>

          <AppText variant="h2" color="text" style={styles.titleText}>
            Nhập mã xác thực
          </AppText>

          <AppText variant="body" color="textMuted" style={styles.descriptionText}>
            Mã 6 chữ số sẽ được gửi đến{' '}
            <AppText variant="body" color="text" style={styles.contactText}>
              {contactValue}
            </AppText>
          </AppText>

          <View style={styles.otpRow}>
            {otpValue.map((digit, index) => (
              <TextInput
                key={index}
                ref={(input) => {
                  otpInputRefs.current[index] = input;
                }}
                value={digit}
                onChangeText={(value) => handleOtpChange(index, value)}
                onKeyPress={({ nativeEvent }) => handleOtpKeyPress(index, nativeEvent.key)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                selectionColor={colors.primary}
                style={[
                  styles.otpBox,
                  digit ? styles.otpBoxFilled : null,
                  index === otpValue.length - 1 ? styles.otpBoxLast : null,
                ]}
                autoFocus={index === 0}
              />
            ))}
          </View>

          <View style={styles.otpMetaRow}>
            <AppText variant="caption" color="textMuted" style={styles.countdownText}>
              {countdown > 0 ? `Gửi lại mã sau (${countdown}s)` : 'Gửi lại mã'}
            </AppText>
            {countdown > 0 ? null : (
              <Pressable onPress={handleResendCode}>
                <AppText variant="caption" color="primary" style={styles.resendText}>
                  Gửi lại mã
                </AppText>
              </Pressable>
            )}
          </View>

          <Button
            label="Xác nhận OTP"
            variant="primary"
            onPress={() => otpComplete && setStep(2)}
            disabled={!otpComplete}
            style={styles.primaryButton}
            rightIcon={<Icon name="arrow-right" family="material-community" size={18} color={colors.white} />}
          />
        </View>
      );
    }

    return (
      <View style={styles.contentWrap}>
        <View style={styles.heroBadgeWrap}>
          <View style={styles.heroBadgeCircle}>
            <Icon name="shield-key" family="material-community" size={28} color={colors.primary} />
          </View>
        </View>

        <AppText variant="h2" color="text" style={styles.titleText}>
          Đặt lại mật khẩu
        </AppText>

        <AppText variant="body" color="textMuted" style={styles.descriptionText}>
          Tạo mật khẩu mới an toàn cho tài khoản của bạn.
        </AppText>

        <Controller
          control={resetControl}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Mật khẩu mới"
              value={value}
              onChangeText={(value) => {
                onChange(value);
                setPasswordDraft(value);
              }}
              onBlur={onBlur}
              placeholder="Nhập mật khẩu mới"
              secureTextEntry={!showNewPassword}
              leftIcon={<Icon name="lock-outline" family="material-community" size={18} color={colors.primary} />}
              rightIcon={
                <Pressable onPress={() => setShowNewPassword((current) => !current)}>
                  <Icon
                    name={showNewPassword ? 'eye-off-outline' : 'eye-outline'}
                    family="material-community"
                    size={18}
                    color={colors.textMuted}
                  />
                </Pressable>
              }
              error={resetErrors.password?.message}
              style={styles.inputStyle}
            />
          )}
        />

        <Controller
          control={resetControl}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Nhập lại mật khẩu mới"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Nhập lại mật khẩu mới"
              secureTextEntry={!showConfirmPassword}
              leftIcon={<Icon name="lock-check-outline" family="material-community" size={18} color={colors.primary} />}
              rightIcon={
                <Pressable onPress={() => setShowConfirmPassword((current) => !current)}>
                  <Icon
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                    family="material-community"
                    size={18}
                    color={colors.textMuted}
                  />
                </Pressable>
              }
              error={resetErrors.confirmPassword?.message}
              style={styles.inputStyle}
            />
          )}
        />

        <View style={styles.strengthWrap}>
          <View style={styles.strengthHeaderRow}>
            <AppText variant="caption" color="textMuted">
              Độ mạnh mật khẩu
            </AppText>
            <AppText variant="caption" color={passwordStrengthColor} style={styles.strengthLabel}>
              {passwordStrength}
            </AppText>
          </View>

          <View style={styles.strengthTrack}>
            <View
              style={[
                styles.strengthFill,
                {
                  width: passwordStrengthWidth,
                  backgroundColor: passwordStrengthColor,
                },
              ]}
            />
          </View>
        </View>

        <Button
          label="Hoàn tất & Đăng nhập"
          variant="primary"
          onPress={() => {
            void handleResetSubmit(handleResetPasswordSubmit)();
          }}
          style={styles.primaryButton}
          rightIcon={<Icon name="arrow-right" family="material-community" size={18} color={colors.white} />}
        />
      </View>
    );
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
          {renderStepContent()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
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
    marginBottom: spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: spacing.sm,
  },
  headerIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  contentWrap: {
    flex: 1,
    alignItems: 'center',
  },
  heroBadgeWrap: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  heroBadgeCircle: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: '#E8F8F4',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C9EFDE',
  },
  titleText: {
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  descriptionText: {
    textAlign: 'center',
    maxWidth: 310,
    marginBottom: spacing.lg,
  },
  contactText: {
    fontWeight: '700',
  },
  inputStyle: {
    marginBottom: spacing.sm,
  },
  primaryButton: {
    width: '100%',
    minHeight: 56,
    marginTop: spacing.md,
    borderRadius: radius.lg,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  otpBox: {
    flex: 1,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: '#F3F5F7',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
  },
  otpBoxFilled: {
    backgroundColor: '#EAF8F5',
    borderColor: '#B2E4D7',
  },
  otpBoxLast: {
    marginRight: 0,
  },
  otpMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  countdownText: {
    textAlign: 'center',
  },
  resendText: {
    fontWeight: '700',
  },
  strengthWrap: {
    width: '100%',
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  strengthHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  strengthLabel: {
    fontWeight: '700',
  },
  strengthTrack: {
    width: '100%',
    height: 8,
    borderRadius: 999,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
  },
  strengthFill: {
    height: '100%',
    borderRadius: 999,
  },
});
