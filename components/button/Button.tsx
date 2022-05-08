import React from 'react';
import {ViewStyle, TextStyle} from 'react-native';
import {ApplicationButton, ApplicationLabel} from '../application';

interface ButtonProps {
  title: string;
  disabled?: boolean;
  labelStyle?: TextStyle;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  onPress: () => void;
}

const Button = ({
  title,
  disabled,
  labelStyle,
  style,
  contentContainerStyle,
  onPress,
}: ButtonProps) => {
  // render
  return (
    <ApplicationButton
      containerStyle={style}
      contentContainerStyle={contentContainerStyle}
      onPress={onPress}
      disabled={disabled}>
      <ApplicationLabel style={labelStyle}>{title}</ApplicationLabel>
    </ApplicationButton>
  );
};

export default Button;
