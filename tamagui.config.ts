import { defaultConfig } from '@tamagui/config/v5';
import { createTamagui } from 'tamagui';

export const tamaguiConfig = createTamagui(defaultConfig);

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends Conf {}
}

declare module '@tamagui/core' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends Conf {}
}
