# 一些常用的 TS 操作总结

### 字符串数组转类型

```ts
const arr = ["a", "b"] as const;

type ArrType = (typeof arr)[number]; // 'a' | 'b'
```
