import type { TextProps, TextStyle } from 'react-native';
import { Text } from 'react-native';

import { colors, type ColorToken } from '@/core/theme/colors';
import { typography, type TypographyVariant } from '@/core/theme/typography';

type AppTextProps = TextProps & {
  variant?: TypographyVariant;
  color?: ColorToken | string;
  weight?: TextStyle['fontWeight'];
  align?: TextStyle['textAlign'];
};

export function AppText({
  variant = 'body',
  color = 'text',
  weight,
  align,
  style,
  ...props
}: AppTextProps) {
  const resolvedColor = color in colors ? colors[color as ColorToken] : color;

  return (
    <Text
      {...props}
      style={[
        typography[variant],
        { color: resolvedColor, textAlign: align },
        weight !== undefined ? { fontWeight: weight } : null,
        style,
      ]}
    />
  );
}
