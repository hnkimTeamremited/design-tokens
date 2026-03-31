# Figma Tokens Studio 설정 가이드

## 1. Figma에 플러그인 설치

1. Figma 열기
2. 메뉴에서 **Plugins** → **Browse plugins in Community**
3. **"Tokens Studio for Figma"** 검색 및 설치

## 2. 플러그인에서 토큰 가져오기

1. Figma 파일 열기
2. **Plugins** → **Tokens Studio for Figma** 실행
3. 왼쪽 하단 ⚙️ (Settings) 클릭
4. **Sync providers** → **GitHub** 선택 (또는 Local 선택)

### GitHub 연동 방법 (추천)

1. GitHub Personal Access Token 생성
   - https://github.com/settings/tokens
   - **repo** 권한 체크
2. Token 입력
3. Repository: `your-username/your-repo`
4. Branch: `main`
5. File Path: `design-tokens/tokens`

### Local 방법

1. **Settings** → **Sync providers** → **Local**
2. 토큰 정의 후
3. **Export** 버튼 클릭
4. JSON 파일들을 `design-tokens/tokens/` 폴더에 저장

## 3. 토큰 정의하기

### 색상 토큰
```
global/color/blue/500 = #2196F3
light/color/primary = {global.color.blue.500}
```

### 간격 토큰
```
global/spacing/md = 16px
```

### 타이포그래피 토큰
```
global/fontSize/md = 16px
global/fontWeight/bold = 700
```

## 4. 토큰 빌드

```bash
cd design-tokens
npm run build
```

## 5. 워크플로우

```
Figma 디자인 수정
    ↓
Tokens Studio에서 토큰 정의
    ↓
GitHub Sync (자동) 또는 Export (수동)
    ↓
npm run build
    ↓
Git commit & push
    ↓
harini와 my-b2c-app에서 사용
```

## 토큰 구조

```
tokens/
├── $themes.json      # 테마 정의 (light/dark)
├── global.json       # 기본 색상, 간격 등
├── light.json        # 라이트 테마
└── dark.json         # 다크 테마
```

## 주의사항

- 토큰 변경 후 반드시 `npm run build` 실행
- 참조는 `{global.color.blue.500}` 형식 사용
- CSS Variables는 자동으로 `--light-color-primary` 형식으로 변환됨
- React Native는 camelCase로 변환됨: `LightColorPrimary`
