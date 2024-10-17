# 在`Vue CLI`和`Vite`中，对本地请求的代理配置有差异：

## Vue CLI

在 Vue CLI 中，当你配置代理时，开发服务器会自动去掉路径前缀。例如：

::: code-group

```Js [vue.config.js]
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://xx:8088/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
};
```

```Js [axios.js]
axios.get('/api/users')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
```

:::

实际请求路径会是：

- 前端请求路径：/api/users
- 实际请求路径：http://xx:8088/users

  Vue CLI 的开发服务器会自动去掉 /api 前缀。

## Vite

在 Vite 中，代理配置默认不会自动去掉路径前缀。需要手动添加 rewrite 函数来实现这一点。例如：

::: code-group

```Js [vite.config.js]
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://xx:8088',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '') // 重写路径，去掉 /api 前缀
      }
    }
  }
});
```

```Js [axios.js]
axios.get('/api/users')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
```

:::

实际请求路径也会是：

- 前端请求路径：/api/users
- 实际请求路径：http://xx:8088/users

## 总结

- <span :style="{fontWeight: 500, fontSize: '20px'}">Vue CLI: 自动去掉路径前缀 /api。</span>
- <span :style="{fontWeight: 500, fontSize: '20px'}">Vite: 需要手动添加 rewrite 函数来去掉路径前缀 /api。</span>
