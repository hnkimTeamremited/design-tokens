const { default: StyleDictionary } = require('style-dictionary');
const fs = require('fs');
const path = require('path');

// Tokens Studio JSON을 Style Dictionary 형식으로 변환
function transformTokensStudioFormat(tokens) {
  const result = {};

  for (const [key, value] of Object.entries(tokens)) {
    if (value && typeof value === 'object') {
      if (value.value !== undefined && value.type !== undefined) {
        // 토큰 값 - 그대로 유지
        result[key] = value;
      } else {
        // 중첩된 객체 - 재귀적으로 변환
        result[key] = transformTokensStudioFormat(value);
      }
    }
  }

  return result;
}

// 토큰 파일 읽기 및 병합
function loadTokens() {
  const tokensDir = path.join(__dirname, 'tokens');
  const files = fs.readdirSync(tokensDir)
    .filter(file => file.endsWith('.json') && !file.startsWith('$'));

  let mergedTokens = {};

  files.forEach(file => {
    const filePath = path.join(tokensDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    mergedTokens = { ...mergedTokens, ...content };
  });

  return mergedTokens;
}

// Style Dictionary 빌드
console.log('🎨 Building design tokens...\n');

const tokens = loadTokens();
const transformed = transformTokensStudioFormat(tokens);

// 임시 토큰 파일 생성
const tempTokenPath = path.join(__dirname, 'tokens-temp.json');
fs.writeFileSync(tempTokenPath, JSON.stringify(transformed, null, 2));

// Style Dictionary 설정 로드
const config = require('./config.js');
config.source = [tempTokenPath];

// Style Dictionary v4 새로운 API 사용
const sd = new StyleDictionary(config);

// 빌드 실행
sd.buildAllPlatforms();

// 임시 파일 삭제
fs.unlinkSync(tempTokenPath);

console.log('\n✅ Design tokens built successfully!');
console.log('📦 Output:');
console.log('   - Web (CSS): dist/web/tokens.css');
console.log('   - React Native (JS): dist/rn/tokens.js');
