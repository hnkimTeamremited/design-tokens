# ⚡️ 빠른 시작 가이드

## 🎯 지금 바로 시작하기

### 1️⃣ Figma 플러그인 설치 (2분)

1. Figma 열기
2. **Cmd/Ctrl + /** → `Tokens Studio` 입력 → Enter
3. 또는 **Plugins** → **Browse** → **"Tokens Studio for Figma"** 검색

### 2️⃣ GitHub Token 생성 (2분)

1. https://github.com/settings/tokens/new 접속
2. Note: `Figma Tokens`
3. ✅ **repo** 체크
4. **Generate token** → 토큰 복사 📋

### 3️⃣ Figma에서 GitHub 연동 (3분)

```
Tokens Studio 플러그인 실행
    ↓
⚙️ Settings → Sync providers
    ↓
Add new → GitHub
    ↓
입력:
  - Token: [복사한 토큰]
  - Repository: YOUR_USERNAME/REPO_NAME
  - Branch: main
  - File Path: tokens
    ↓
Save → 상단에서 GitHub provider 선택
```

### 4️⃣ 첫 토큰 만들기 (1분)

```
+ New Token
    ↓
Name: color.primary
Value: #2196F3
Type: Color
    ↓
Push 버튼 클릭
```

### 5️⃣ 로컬에서 빌드 (1분)

```bash
cd /Users/kimhaneui/design-tokens
git pull origin main
npm run build
```

## ✅ 완료!

이제 다음 파일들이 생성됩니다:
- `dist/web/tokens.css` → harini (Next.js)
- `dist/rn/tokens.js` → my-b2c-app (RN)

## 📖 더 자세한 설정

- 상세 가이드: `GITHUB_SETUP.md`
- Figma 사용법: `FIGMA_SETUP.md`
- 코드 예시: `examples/`

## 🆘 문제 해결

### "Reference Errors" 발생
→ 참조 토큰 문법 확인: `{global.color.primary}` (중괄호 필수)

### GitHub Push 실패
→ Token 권한 확인 (repo 전체 체크 필요)

### 빌드 후 파일이 비어있음
→ `tokens/` 폴더에 JSON 파일 있는지 확인

## 💡 팁

1. **테마 사용**: light/dark 모드는 `$themes.json`에서 설정
2. **참조 활용**: 기본 색상 정의 후 semantic 색상에서 참조
3. **자동 빌드**: GitHub Actions 사용 (GITHUB_SETUP.md 참고)
