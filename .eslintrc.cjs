/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // TypeScript 지원
  parserOptions: {ecmaVersion: 'latest', sourceType: 'module'},
  extends: [
    'next/core-web-vitals', // ✅ react, react-hooks 규칙 포함
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier', // prettier와 충돌 방지
  ],
  plugins: [
    '@typescript-eslint',
    'import', // ✅ 정렬/정리용
  ],
  rules: {
    // 🔹 import 정렬 규칙
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

    // 🔹 필요 없는 규칙 예시 (원한다면 켜도 됨)
    'react/react-in-jsx-scope': 'off', // Next.js에서는 불필요
    '@typescript-eslint/no-unused-vars': ['warn'],
  },
};
