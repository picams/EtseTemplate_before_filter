import React from 'react';
import { TextStyle } from 'react-native';
import Base from 'react-native-vector-icons/Ionicons';

interface IconProps {
  size?: number;
  name: string;
  color?: string;
  style?: TextStyle;
}

export function Icon({ size, name, color, style }: IconProps) {
  return <Base name={name} size={size} style={[{ width: size, height: size }, style]} color={color} />;
}
