import {
    Entypo,
    Feather,
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
} from '@expo/vector-icons';
import type { StyleProp, TextStyle } from 'react-native';

import { colors } from '@/core/theme/colors';

export type IconFamily =
  | 'material'
  | 'material-community'
  | 'ionicons'
  | 'feather'
  | 'font-awesome'
  | 'entypo';

type IconName =
  | keyof typeof MaterialCommunityIcons.glyphMap
  | keyof typeof MaterialIcons.glyphMap
  | keyof typeof Ionicons.glyphMap
  | keyof typeof Feather.glyphMap
  | keyof typeof FontAwesome.glyphMap
  | keyof typeof Entypo.glyphMap;

type IconProps = {
  name: IconName;
  family?: IconFamily;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
};

export function Icon({
  name,
  family = 'material-community',
  size = 20,
  color = colors.text,
  style,
}: IconProps) {
  switch (family) {
    case 'material':
      return (
        <MaterialIcons
          name={name as keyof typeof MaterialIcons.glyphMap}
          size={size}
          color={color}
          style={style}
        />
      );
    case 'ionicons':
      return (
        <Ionicons
          name={name as keyof typeof Ionicons.glyphMap}
          size={size}
          color={color}
          style={style}
        />
      );
    case 'feather':
      return (
        <Feather
          name={name as keyof typeof Feather.glyphMap}
          size={size}
          color={color}
          style={style}
        />
      );
    case 'font-awesome':
      return (
        <FontAwesome
          name={name as keyof typeof FontAwesome.glyphMap}
          size={size}
          color={color}
          style={style}
        />
      );
    case 'entypo':
      return (
        <Entypo
          name={name as keyof typeof Entypo.glyphMap}
          size={size}
          color={color}
          style={style}
        />
      );
    case 'material-community':
    default:
      return (
        <MaterialCommunityIcons
          name={name as keyof typeof MaterialCommunityIcons.glyphMap}
          size={size}
          color={color}
          style={style}
        />
      );
  }
}
