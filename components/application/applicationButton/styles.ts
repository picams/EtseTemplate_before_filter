import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useApplicationTheme } from '../../../hooks/useApplicationTheme';

export const useStyles = () => {
  const { colors } = useApplicationTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.secondaryCard,
          justifyContent: 'flex-end',
          borderRadius: 12,
          marginVertical: 6,
        },
        contentContainer: {
          padding: 0,
        },
      }),
    [colors.secondaryCard],
  );
};
