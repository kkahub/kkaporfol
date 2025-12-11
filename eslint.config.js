// eslint.config.js

import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginImport from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import reactRecommended from "eslint-plugin-react/configs/recommended.js"; // React 기본 권장 설정
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    // 무시 파일 설정
    ignores: [
      ".next/",
      "out/",
      "node_modules/",
      "*.d.ts",
      "yarn.lock",
      "package-lock.json",
      "public/",
      "**/*.min.js",
      "**/*.bundle.js",
      "**/*.chunk.js",
    ],
  },

  // 1. 기본 설정 ESLint
  js.configs.recommended,

  // 2. Node.js 설정
  {
    files: ["**/*.config.js", "*.js"],
    languageOptions: {
      globals: {
        ...globals.node, // process, require, module 등 Node.js 전역 변수 활성화
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-console": "off",
    },
  },

  // 3. React/Browser 설정
  {
    ...reactRecommended,
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: reactPlugin,
    },
    settings: {
      react: { version: "detect" },
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser, // window, document, setTimeout 등 브라우저 전역 변수 활성화
      },
    },
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
    },
  },

  // 4. Next.js 설정
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
      // Next.js 파일에서 발생하는 특정 TypeScript/ESLint 규칙 임시 비활성화 유지
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-this-alias": "off",
    },
  },

  // 5. TypeScript 설정
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  // 6. import 플러그인 및 커스텀 규칙
  {
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
          ],
          pathGroups: [
            { pattern: "react", group: "external", position: "before" },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      // 공통 커스텀 규칙
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/no-explicit-any": "off",
      "no-useless-catch": "off",
      "no-unused-vars": "off",
    },
  },

  // 7. Prettier
  eslintConfigPrettier,
];
