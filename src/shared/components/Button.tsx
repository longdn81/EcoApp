import React from 'react';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';

import { colors } from '@/core/theme/colors';
import { radius } from '@/core/theme/radius';
import { spacing } from '@/core/theme/spacing';

import { AppText } from './AppText';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

type ButtonProps = PressableProps & {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  label,
  variant = 'primary',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const variantStyles: Record<ButtonVariant, StyleProp<ViewStyle>> = {
    primary: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    secondary: {
      backgroundColor: '#EAF3F1',
      borderColor: '#EAF3F1',
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: colors.border,
    },
  };

  const textColor: keyof typeof colors =
    variant === 'primary' ? 'white' : variant === 'secondary' ? 'text' : 'text';

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      {...props}
      style={[
        styles.button,
        { borderRadius: radius.lg },
        { borderWidth: variant === 'outline' ? 1 : 0 },
        variantStyles[variant],
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.white : colors.primary}
          style={styles.loader}
        />
      ) : (
        leftIcon
      )}

      <AppText
        variant="subhead"
        color={textColor}
        style={styles.label}
        numberOfLines={1}
      >
        {label}
      </AppText>

      {!loading && rightIcon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderWidth: 1,
  },
  label: {
    textAlign: 'center',
  },
  loader: {
    marginRight: spacing.xs,
  },
  disabled: {
    opacity: 0.5,
  },
});
