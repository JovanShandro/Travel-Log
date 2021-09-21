module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'eslint-config-prettier',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'vue/no-unused-vars': 'error',
  },
};
