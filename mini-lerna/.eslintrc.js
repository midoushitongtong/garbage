module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    // 继承 eslint 建议的规则
    'eslint:recommended',
  ],
  plugins: [
    // prettier 会关闭和 eslint 冲突的规则, 最终走 prettier 的规则
    'prettier',
  ],
  rules: {
    // 如果不符合 prettier 的规范, 弹出 warning 提示
    'prettier/prettier': ['warn'],
    'no-unused-vars': ['warn'],
  },
  env: {
    node: true,
  },
};
