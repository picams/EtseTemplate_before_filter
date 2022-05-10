import type { ReactNode } from 'react';
import type { TextStyle } from 'react-native';

export interface ApplicationLabelProps {
  children: string | ReactNode;
  style?: TextStyle;
}
