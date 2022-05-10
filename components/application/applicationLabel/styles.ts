import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useApplicationTheme } from '../../../hooks/useApplicationTheme';

export const useStyles = () => {
  const { colors } = useApplicationTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        text: {
          color: colors.text,
        },
      }),
    [colors.text],
  );
};
