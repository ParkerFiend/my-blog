import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/my-blog/",
  lang: "zh-Hans",
  title: "博客首页",
  description: "基于VitePress搭建的博客页面",
  lastUpdated: true,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "大前端", link: "/front-end/index" },
      { text: "工程化", link: "/engineering/index" },
      { text: "杂谈", link: "/lesson/index" },
    ],

    sidebar: [
      // {
      //   text: "大前端",
      //   items: [
      //     { text: "Markdown Examples", link: "/markdown-examples" },
      //     { text: "Runtime API Examples", link: "/api-examples" },
      //   ],
      // },
      // {
      //   text: "Examples",
      //   items: [
      //     { text: "Markdown Examples", link: "/markdown-examples" },
      //     { text: "Runtime API Examples", link: "/api-examples" },
      //   ],
      // },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],

    outline: {
      label: "页面导航",
    },
  },
});
