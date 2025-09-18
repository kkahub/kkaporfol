/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {ecmaVersion: 'latest', sourceType: 'module'},
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // node 기본 모듈
          'external', // 외부 라이브러리
          'internal', // 내부 alias
          ['parent', 'sibling', 'index'], // 상대 경로
        ],
        pathGroups: [{pattern: 'react', group: 'external', position: 'before'}],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always', // 그룹 간 줄바꿈
        alphabetize: {order: 'asc', caseInsensitive: true},
      },
    ],
    '@typescript-eslint/no-unused-vars': ['error'],
    "react/jsx-filename-extension": ["warn", { extensions: [".ts", ".tsx"] }], // 경고표시, 파일 확장자를 .ts나 .tsx 모두 허용함
		"no-useless-catch": "off", // 불필요한 catch 못쓰게 하는 기능 끔
		"react/jsx-props-no-spreading": "off",
		"no-unused-vars": "off", // 타입스크립트 사용시 interface의 변수명을 eslint가 잡지 않도록 함.
		"@typescript-eslint/no-explicit-any": "off",
  },
};
