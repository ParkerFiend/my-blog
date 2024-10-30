# 针对升级到 `eslint9` 的配置文件更改

最新的 `eslint9` 版本(准确的说是高于 `v8.57.0`)，已经将默认的**对象**配置优化成了**数组**(`flat`)形式。

原有配置文件从`.eslintrc`变成了`eslint.config.{js,cjs,mjs}`
<br>

## 针对 js、cjs 和 mjs 文件的差异

> 以下内容节选自通义回答：

- <span class="list-title">.js (JavaScript)</span>

  - **含义：** 这是最通用的 `JavaScript` 文件扩展名。当你没有特别指定模块系统或使用特定语言特性时，默认使用这个扩展名。
  - **兼容性：** 几乎所有的 Node.js 版本都支持`.js` 文件，且浏览器也默认支持加载`.js` 文件。
  - **模块系统：** 默认情况下，`.js` 文件在 Node.js 中被视为 CommonJS 模块，除非你在项目的 `package.json` 文件中设置了`"type": "module"`，这样`.js` 文件将被视为 ES 模块。

- <span class="list-title">.cjs (CommonJS)</span>

  - **含义：** `.cjs` 明确指出了这是一个遵循 CommonJS 规范的模块文件。CommonJS 是服务器端 JavaScript 的主要模块格式，它通过 `require` 函数来导入其他模块，并使用 `module.exports` 导出模块。
  - **兼容性：** 所有版本的 Node.js 都支持`.cjs` 文件。
  - **优点：** 使用`.cjs` 可以避免与未来的 JavaScript 特性发生冲突，特别是当你的项目中同时使用了 ES 模块和其他需要 CommonJS 语法的功能时。

- <span class="list-title">.mjs (ECMAScript Module)</span>
  - **含义：** `.mjs` 文件明确表示这是一个遵循 `ECMAScript` 标准的模块文件。ES 模块通过 `import` 语句导入其他模块，并使用 `export` 语句导出模块。
  - **兼容性：** 从 Node.js v12 开始，`.mjs` 文件得到了更好的支持。但是需要注意的是，在某些旧版本的 Node.js 中可能需要额外的配置才能正确解析`.mjs` 文件。
  - **优点：** ES 模块提供了更强大的功能，如静态分析能力、命名空间隔离等。此外，它们也是 Web 平台的标准模块系统。

### 使用建议

- 如果项目完全基于现代 JavaScript 并且希望利用 ES 模块的所有特性，那么推荐使用`.mjs` 文件。
- 如果需要确保最大的兼容性和稳定性，特别是在使用较旧版本的 Node.js 时，或者项目依赖于大量现有的 CommonJS 模块，那么.cjs 是一个不错的选择。
- 对于大多数情况下的新项目，如果不确定应该选择哪一个，可以先从.js 开始，然后根据需要调整为`.cjs` 或`.mjs`。例如，可以先设置`"type": "module"`来尝试使用 ES 模块，如果遇到任何问题，再回退到 CommonJS。

## 新写法

### 使用默认 eslint 配置

```Javascript
import eslint from '@eslint/js';

export default [
  eslint.configs.recommended
];
```

### 使用 Vue 配置

```Javascript
import pluginVue from 'eslint-plugin-vue';

export default [
  // Vue3 推荐设置
  ...pluginVue.configs['flat/recommended'],
  // Vue2 推荐设置
  // ...pluginVue.configs['flat/vue2-recommended'],
  {
    rules: {
      // 覆写规则
      // 'vue/no-unused-vars': 'error'
    }
  }
];
```

### 使用 Prettier 配置

```Javascript
import pluginPrettier from 'eslint-plugin-prettier/recommended';

export default [
  pluginPrettier
];
```

### 使用 Typescript 配置

```Javascript
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
);
```

### 完整版参考

集成了 eslint、ts、vue 和 prettier 的推荐规则，后面使用 rules 进行自定义规则覆写。

> 针对`no-unused-vars`，开启 typescript-eslint 的规则

```Javascript
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import pluginPrettier from 'eslint-plugin-prettier/recommended';

export default [
  ...tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
  ),
  ...pluginVue.configs['flat/recommended'],
  pluginPrettier,
  {
    rules: {
      // 无用变量可以添加下划线规避
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      // 组件名报错降级
      'vue/multi-word-component-names': ['warn'],
      // 其他自定义规则
    },
  },
];
```

<style scoped>
.list-title{
  font-weight: 500;
  font-size: 18px;
}
</style>
