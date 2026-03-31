// my-b2c-app (React Native) 사용 예시

// 1. 토큰 임포트
import {
  LightColorPrimary,
  LightColorTextPrimary,
  GlobalSpacingMd,
  GlobalBorderRadiusMd,
  GlobalFontSizeMd,
  GlobalFontWeightSemibold,
} from '../../../design-tokens/dist/rn/tokens';

import { View, Text, StyleSheet, Pressable } from 'react-native';

// 2. 컴포넌트에서 사용
export default function Button() {
  return (
    <Pressable style={styles.button}>
      <Text style={styles.text}>Click Me</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: LightColorPrimary,
    padding: parseInt(GlobalSpacingMd), // "16px" → 16
    borderRadius: parseInt(GlobalBorderRadiusMd),
  },
  text: {
    color: LightColorTextPrimary,
    fontSize: parseInt(GlobalFontSizeMd),
    fontWeight: GlobalFontWeightSemibold,
  },
});

// 3. 헬퍼 함수 (선택사항)
// utils/tokens.ts
export const parseSize = (value: string): number => {
  return parseInt(value.replace('px', ''));
};

// 사용:
// padding: parseSize(GlobalSpacingMd)
