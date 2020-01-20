module.exports = {
    root: true,
    env: {
      browser: true,
      node: true
    },
    parserOptions: {
      parser: 'babel-eslint'
    },
    extends: [
      'eslint:recommended',
      // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
      // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
      'plugin:vue/recommended'
    //   'plugin:prettier/recommended'
    ],
    // 校验 .vue 文件
    plugins: [
      'vue'
    ],
    // 自定义规则
    rules: {
      'quotes': [1, 'single'],
      'indent': ['error', 4],
      'semi': 0,
    //   'no-console': 'off',
    //   'vue/max-attributes-per-line': 'off',
    //   'prettier/prettier': 'error'
      // 空格
      "indent": ["error", 4],
      // 注释后面的空格
      "spaced-comment": 0,
      // 禁用不必要的转义
      "no-useless-escape": "warn",
      // 不允许在语句后存在多余的空格
      "no-trailing-spaces": "warn",
      //块语句内行首行尾是否要空行  0 = off, 1 = warn, 2 = error
    //   "padded-blocks": 1,
      // allow paren-less arrow functions
      'arrow-parens': 0,
      // allow async-await
      'generator-star-spacing': 0,
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      'no-multi-spaces': 'off',
      'no-irregular-whitespace': 'off',
      "comma-dangle": [0, "never"], //对象字面量项尾有逗号
    }
  }