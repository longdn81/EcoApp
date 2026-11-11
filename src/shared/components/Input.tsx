import React from 'react';
import type {
    StyleProp,
    TextInputProps,
    TextStyle,
    ViewStyle,
} from 'react-native';
import { StyleSheet, TextInput, View } from 'react-native';

import { colors } from '@/core/theme/colors';
import { radius } from '@/core/theme/radius';
import { spacing } from '@/core/theme/spacing';

import { AppText } from './AppText';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  placeholderTextColor = colors.textMuted,
  style,
  ...props
}: InputProps) {
  const hasError = Boolean(error);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? (
        <AppText variant="caption" color="text" style={styles.label}>
          {label}
        </AppText>
      ) : null}

      <View
        style={[
          styles.field,
          { borderRadius: radius.md },
          hasError && styles.fieldError,
        ]}
      >
        {leftIcon ? <View style={styles.iconWrap}>{leftIcon}</View> : null}

        <TextInput
          {...props}
          placeholderTextColor={placeholderTextColor}
          style={[
            styles.input,
            { color: colors.text },
            inputStyle,
            style,
          ]}
        />

        {rightIcon ? <View style={styles.iconWrap}>{rightIcon}</View> : null}
      </View>

      {hasError ? (
        <AppText variant="caption" color="error" style={styles.errorText}>
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {
    marginBottom: spacing.xs,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
  },
  fieldError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    minHeight: 44,
    paddingVertical: spacing.sm,
    fontSize: 16,
    lineHeight: 24,
  },
  iconWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  errorText: {
    marginTop: spacing.xs,
  },
});
