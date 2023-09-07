module.exports = {
  root: true,
  plugins: ["@typescript-eslint", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    sourceType: "module",
    createDefaultProgram: "true",
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true, // document나 window 인식되게 함
    node: true,
    es6: true,
  },
  ignorePatterns: ["node_modules/", "out/", ".eslintrc.js"], // eslint 미적용될 폴더나 파일 명시
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended", // ts 권장
    "prettier",
  ],
  rules: {
    "react/react-in-jsx-scope": "off", // react 17부턴 import 안해도돼서 기능 끔
    "react/jsx-filename-extension": ["warn", { extensions: [".ts", ".tsx"] }], // 경고표시, 파일 확장자를 .ts나 .tsx 모두 허용함
    "no-useless-catch": "off", // 불필요한 catch 못쓰게 하는 기능 끔
    "react/jsx-props-no-spreading": "off",
    "no-unused-vars": "off", //타입스크립트 사용시 interface의 변수명을 eslint가 잡지 않도록 함.
    "@typescript-eslint/no-unused-vars": "warn", //대신 사용하지 않는 변수는 @typescript/eslint를 통해 잡아줌.
    "@typescript-eslint/no-explicit-any": "off",
  },
};
