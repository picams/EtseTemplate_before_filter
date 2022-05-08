import {Dimensions, Platform} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';

export const CONTENT_SPACING = 15;

const SAFE_BOTTOM =
  Platform.select({
    ios: initialWindowMetrics?.insets.bottom,
  }) ?? 0;

export const SAFE_AREA_PADDING = {
  paddingLeft: initialWindowMetrics!.insets.left + CONTENT_SPACING,
  paddingTop: initialWindowMetrics!.insets.top + CONTENT_SPACING,
  paddingRight: initialWindowMetrics!.insets.right + CONTENT_SPACING,
  paddingBottom: SAFE_BOTTOM + CONTENT_SPACING,
};

// The maximum zoom _factor_ you should be able to zoom in
export const MAX_ZOOM_FACTOR = 20;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Platform.select<number>({
  android:
    Dimensions.get('screen').height - initialWindowMetrics!.insets.bottom,
  ios: Dimensions.get('window').height,
}) as number;
