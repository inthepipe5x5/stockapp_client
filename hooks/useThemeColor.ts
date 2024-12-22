/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import  Colors  from '@/constants/Colors';
import { useMemo } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  const themeColor = useMemo(() => {
    return colorFromProps || Colors[theme][colorName];
  }, [theme, colorFromProps, colorName]);

  return themeColor;
}
