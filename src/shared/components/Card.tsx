import type { ViewProps } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/core/theme/colors';
import { radius } from '@/core/theme/radius';
import { spacing } from '@/core/theme/spacing';

type CardProps = ViewProps & {
  padding?: number;
  radiusSize?: keyof typeof radius | number;
  elevated?: boolean;
};

export function Card({
  children,
  padding = spacing.md,
  radiusSize = 'md',
  elevated = true,
  style,
  ...props
}: CardProps) {
  const resolvedRadius =
    typeof radiusSize === 'number' ? radiusSize : radius[radiusSize];

  return (
    <View
      {...props}
      style={[
        styles.card,
        { padding, borderRadius: resolvedRadius },
        elevated && styles.elevated,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  elevated: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
});
