# GitHub 자동 동기화 설정 가이드

## 1단계: GitHub Personal Access Token 생성

1. https://github.com/settings/tokens 접속
2. **Generate new token (classic)** 클릭
3. 설정:
   - **Note**: `Figma Tokens Studio`
   - **Expiration**: `No expiration` 또는 원하는 기간
   - **권한 체크**:
     - ✅ **repo** (전체 체크)
4. **Generate token** 클릭
5. 🔐 **생성된 토큰 복사** (다시 볼 수 없으니 안전한 곳에 저장!)

## 2단계: GitHub Repository 생성 또는 선택

### 옵션 A: 새 Repository 생성
```bash
# GitHub에서 new repository 생성
# Repository name: design-tokens
# Public 또는 Private 선택
```

### 옵션 B: 기존 Repository 사용 (harini 또는 my-b2c-app)
```bash
# 기존 프로젝트에 design-tokens 폴더 추가
```

## 3단계: design-tokens를 Git에 추가

```bash
cd /Users/kimhaneui/design-tokens

# Git 초기화 (이미 완료됨)
git init

# GitHub remote 추가 (본인의 repo URL로 변경)
git remote add origin https://github.com/YOUR_USERNAME/design-tokens.git

# 또는 기존 repo의 subfolder로 사용하려면:
# cd /Users/kimhaneui/harini
# git add design-tokens/
```

## 4단계: Figma에서 Tokens Studio 플러그인 설치

1. Figma 열기
2. 메뉴에서 **Plugins** → **Browse plugins in Community**
3. 검색: **"Tokens Studio for Figma"**
4. **Install** 클릭

## 5단계: Tokens Studio에서 GitHub 연동

1. Figma 파일 열기
2. **Plugins** → **Tokens Studio for Figma** 실행
3. 플러그인 왼쪽 하단 **⚙️ Settings** 클릭
4. **Sync providers** 탭 선택
5. **Add new** → **GitHub** 선택
6. 다음 정보 입력:

```
Personal Access Token: [1단계에서 복사한 토큰]
Repository: YOUR_USERNAME/REPO_NAME
Branch: main (또는 master)
File Path: tokens
Base Branch: main
```

7. **Save** 클릭
8. 상단에서 방금 만든 sync provider 선택

## 6단계: 토큰 정의하고 Sync

### 색상 토큰 예시
1. 플러그인에서 **+** 버튼 → **New Token**
2. 토큰 정의:
```
Name: color.primary
Value: #2196F3
Type: Color
```

### 참조 토큰 (Alias) 예시
```
Name: semantic.button.background
Value: {color.primary}
Type: Color
```

### GitHub에 Push
1. 플러그인 오른쪽 상단 **Push** 버튼 클릭
2. Commit message 입력: `feat: add initial design tokens`
3. **Push changes** 클릭

## 7단계: 로컬에서 Pull 받고 빌드

```bash
cd /Users/kimhaneui/design-tokens

# GitHub에서 변경사항 받아오기
git pull origin main

# 토큰 빌드
npm run build

# 결과 확인
ls -la dist/web/tokens.css
ls -la dist/rn/tokens.js
```

## 🔄 일상적인 워크플로우

```
Figma에서 디자인 수정
    ↓
Tokens Studio에서 토큰 정의/수정
    ↓
플러그인에서 Push 버튼 클릭
    ↓ (자동으로 GitHub에 커밋)
로컬에서 git pull
    ↓
npm run build
    ↓
harini/my-b2c-app에서 사용
```

## 📌 주의사항

1. **Personal Access Token은 비밀번호처럼 관리하세요**
   - 절대 코드에 하드코딩하지 마세요
   - `.env` 파일에도 넣지 마세요 (Figma 플러그인에서만 사용)

2. **Figma Variables vs Tokens Studio**
   - Figma Variables는 Figma 내부용
   - Tokens Studio는 코드 export용
   - 둘 다 사용 가능

3. **토큰 이름 규칙**
   - 점(.) 또는 슬래시(/)로 계층 구조 표현
   - 예: `color.primary` 또는 `color/primary`

4. **Theme 설정**
   - `$themes.json`에서 light/dark 테마 정의
   - 각 테마별로 어떤 토큰 세트를 사용할지 지정

## 🚀 고급: GitHub Actions로 자동 빌드 (선택사항)

design-tokens에 GitHub Actions를 추가하면 Figma에서 Push할 때 자동으로 빌드됩니다.

`.github/workflows/build-tokens.yml` 생성 후:
```yaml
name: Build Design Tokens

on:
  push:
    paths:
      - 'tokens/**'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
      - uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: 'chore: rebuild tokens'
```
