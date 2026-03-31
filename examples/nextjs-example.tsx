// harini (Next.js) 사용 예시

// 1. app/layout.tsx에 CSS 임포트
import '../../../design-tokens/dist/web/tokens.css';

// 2. 컴포넌트에서 CSS Variables 사용
export default function Button() {
  return (
    <button
      style={{
        backgroundColor: 'var(--light-color-primary)',
        color: 'var(--light-color-text-primary)',
        padding: 'var(--global-spacing-md)',
        borderRadius: 'var(--global-border-radius-md)',
        fontSize: 'var(--global-font-size-md)',
        fontWeight: 'var(--global-font-weight-semibold)',
      }}
    >
      Click Me
    </button>
  );
}

// 3. Tailwind CSS와 함께 사용 (선택사항)
// tailwind.config.js에서:
// module.exports = {
//   theme: {
//     extend: {
//       colors: {
//         primary: 'var(--light-color-primary)',
//       },
//       spacing: {
//         xs: 'var(--global-spacing-xs)',
//         sm: 'var(--global-spacing-sm)',
//       }
//     }
//   }
// }
