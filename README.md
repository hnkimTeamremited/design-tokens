# Design Tokens

Figma Tokens Studio와 Style Dictionary를 사용한 공유 디자인 토큰 패키지

## 📁 구조

```
design-tokens/
├── tokens/              # Figma Tokens Studio에서 내보낸 JSON 파일
│   ├── $themes.json    # 테마 정의
│   ├── global.json     # 기본 색상, 간격 등
│   ├── light.json      # 라이트 테마
│   └── dark.json       # 다크 테마
├── dist/               # 빌드 결과물
│   ├── web/           # Next.js용 CSS Variables
│   └── rn/            # React Native용 JS Objects
├── config.js          # Style Dictionary 설정
└── build.js           # 빌드 스크립트
```

## 🚀 설치 및 빌드

```bash
cd design-tokens
npm install
npm run build
```

## 📝 Figma에서 토큰 가져오기

1. Figma에서 **Tokens Studio for Figma** 플러그인 설치
2. 플러그인에서 토큰 정의
3. **Export** → JSON 파일들을 `tokens/` 폴더에 저장
4. `npm run build` 실행

## 💻 사용 방법

### Next.js (harini)

```tsx
// app/layout.tsx
import '../../design-tokens/dist/web/tokens.css';

// 컴포넌트에서
<div style={{
  color: 'var(--light-color-primary)',
  padding: 'var(--global-spacing-md)'
}} />
```

### React Native (my-b2c-app)

```tsx
// App.tsx 또는 최상위
import tokens from '../../design-tokens/dist/rn/tokens';

// 컴포넌트에서
<View style={{
  backgroundColor: tokens.lightColorPrimary,
  padding: parseInt(tokens.globalSpacingMd)
}} />
```

## 🔄 개발 워크플로우

1. Figma에서 디자인 토큰 수정
2. Tokens Studio 플러그인에서 JSON 내보내기
3. `tokens/` 폴더에 저장
4. `npm run build` 실행
5. Git commit & push
6. harini와 my-b2c-app에서 사용
