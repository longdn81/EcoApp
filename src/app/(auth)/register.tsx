import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';

import { colors } from '@/core/theme/colors';
import { radius } from '@/core/theme/radius';
import { spacing } from '@/core/theme/spacing';
import { AppText, Button, Card, Icon, Input } from '@/shared/components';

const registerSchema = z
  .object({
    fullName: z.string().trim().min(2, 'Tên của bạn phải có ít nhất 2 ký tự.'),
    email: z.string().trim().email('Email chưa đúng định dạng.'),
    password: z.string().min(8, 'Mật khẩu tối thiểu 8 ký tự.'),
    confirmPassword: z.string().min(8, 'Xác nhận mật khẩu tối thiểu 8 ký tự.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp.',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (_values: RegisterFormValues) => {
    router.replace('/(tabs)' as Parameters<typeof router.replace>[0]);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.wrapper, { paddingTop: insets.top + spacing.md }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingBottom: insets.bottom + spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Card elevated style={styles.card}>
          <View style={styles.headerSection}>
            <View style={styles.logoWrap}>
              <Icon name="leaf" family="material-community" size={28} color={colors.white} />
            </View>
            <AppText variant="h2" color="text" style={styles.title}>
              Tạo tài khoản
            </AppText>
            <AppText variant="body" color="textMuted" style={styles.subtitle}>
              Bắt đầu hành trình tiết kiệm và giảm lãng phí thực phẩm.
            </AppText>
          </View>

          <View style={styles.formSection}>
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Họ và tên"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Nhập tên của bạn"
                  autoCapitalize="words"
                  leftIcon={<Icon name="account" family="material-community" size={18} color={colors.primary} />}
                  error={errors.fullName?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="example@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  leftIcon={<Icon name="email-outline" family="material-community" size={18} color={colors.primary} />}
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Mật khẩu"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="••••••••"
                  secureTextEntry={!showPassword}
                  leftIcon={<Icon name="lock-outline" family="material-community" size={18} color={colors.primary} />}
                  rightIcon={
                    <Pressable onPress={() => setShowPassword((current) => !current)}>
                      <Icon
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        family="material-community"
                        size={18}
                        color={colors.textMuted}
                      />
                    </Pressable>
                  }
                  error={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Xác nhận mật khẩu"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Nhập lại mật khẩu"
                  secureTextEntry={!showConfirmPassword}
                  leftIcon={<Icon name="shield-check-outline" family="material-community" size={18} color={colors.primary} />}
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
                  error={errors.confirmPassword?.message}
                />
              )}
            />
          </View>

          <Button
            label="Đăng ký"
            variant="primary"
            loading={isSubmitting}
            onPress={() => {
              void handleSubmit(onSubmit)();
            }}
            style={styles.primaryButton}
          />

          <View style={styles.switchRow}>
            <AppText variant="body" color="textMuted">
              Đã có tài khoản?
            </AppText>
            <Pressable
              onPress={() =>
                router.replace('/(auth)/login' as Parameters<typeof router.replace>[0])
              }
            >
              <AppText variant="subhead" color="primary" style={styles.linkText}>
                Đăng nhập
              </AppText>
            </Pressable>
          </View>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    justifyContent: 'center',
  },
  card: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    backgroundColor: colors.surface,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoWrap: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    textAlign: 'center',
    maxWidth: 280,
  },
  formSection: {
    gap: spacing.md,
  },
  primaryButton: {
    marginTop: spacing.xl,
    minHeight: 54,
    borderRadius: radius.lg,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: spacing.lg,
  },
  linkText: {
    fontWeight: '700',
  },
});
