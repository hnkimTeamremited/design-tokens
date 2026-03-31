module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    // Web (CSS Variables for Next.js)
    web: {
      transformGroup: 'css',
      buildPath: 'dist/web/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true
          }
        }
      ]
    },
    // React Native (JS Objects)
    rn: {
      transformGroup: 'js',
      buildPath: 'dist/rn/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
          options: {
            outputReferences: false
          }
        },
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations'
        }
      ]
    }
  }
};
