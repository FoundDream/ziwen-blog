# 解决找不到模块"xx"或其相应的类型声明 ts(2307)

## 前言

最近在开发一个埋点 SDK，采用了 pnpm+workspace 架构，开发过程中遇到了各种 TypeScript 配置问题，尤其是模块解析和类型声明相关的坑，这次遇到的问题去网上查询了一些资料，很多也没有说明白具体问题，于是打算自己好好研究一下这个问题，说实话过程还是有些崎岖的，不过我们作为小白，遇到这种问题，去好好解决沉淀出文档也是一个很不错的事情

## 从一个错误开始 ❌

```
找不到模块"@trackpoint-sdk/core"或其相应的类型声明。ts(2307)
```

看到这个错误，我的第一反应是："明明已经安装了依赖，为什么还找不到？"
## .d.ts 

### 什么是 .d.ts 文件？📝

`.d.ts` 是 TypeScript 的类型声明文件，它就像是代码的"说明书"：

- 只包含类型信息，没有实现代码
- 让 TypeScript 理解 JavaScript 代码的类型结构
- 提供代码提示和类型检查

例如，我们的 core 包可能有这样的类型声明：

```typescript
// 编译后生成的 dist/index.d.ts
export interface TrackerOptions {
  debug?: boolean;
}

export declare function createTracker(options: TrackerOptions): TrackerInstance;

export interface TrackerInstance {
  use: (plugin: Plugin) => TrackerInstance;
  track: (event: TrackEvent) => void;
}
```

### 为什么需要 .d.ts 文件？🤔

在 monorepo 中，如果 core 包没有生成 `.d.ts` 文件，其他包引入时会遇到：

1. **编译报错**：TS2307 找不到模块的类型声明
2. **无类型提示**：IDE 无法提供参数提示（体验差）
3. **类型检查失效**：无法在编译时发现类型错误

比如，没有类型声明时，这样的错误代码可能不会被发现：

```typescript
createTracker({
  appid: "123"  // 拼写错误但编译时不会报错，等到运行时才爆炸 💥
});
```

## 配置 tsconfig.json ⚙️

要生成 `.d.ts` 文件，首先需要正确配置 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "outDir": "./dist",        // 编译输出目录
    "rootDir": "./src",        // 源码根目录
    "declaration": true,       // 生成 .d.ts 文件（重点！）
    "module": "ESNext",        // 使用最新的 ES 模块系统
    "moduleResolution": "Bundler", // 使用 Bundler 模式简化模块解析
    "target": "ES2020"         // 编译目标 JS 版本
  },
  "include": ["src"],
  "composite": true            // 启用项目引用特性
}
```

### moduleResolution 的选择 🔍

`moduleResolution` 有几种选择：

- `Node`：传统的 CommonJS 解析
- `NodeNext`：支持 package.json 的 `exports` 字段（导入要写 .js）
- `Bundler`：适合与打包工具配合使用（省心之选）

我选择了 `Bundler`，因为它更简单，不需要在导入时添加 `.js` 扩展名。谁想写 `import { foo } from './bar.js'` 这种代码啊？明明是 `.ts` 文件！😅

## 配置 package.json 📦

package.json 的配置也很关键，尤其是入口文件的定义：

```json
{
  "name": "@trackpoint-sdk/core",
  "type": "module",
  "main": "dist/index.js",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  }
}
```

这里的 `exports` 字段很重要，它明确告诉打包工具和 TypeScript："嘿，我的代码在这里，类型在那里，别乱找了！" 🗺️

## Monorepo 依赖配置 🔗

在 monorepo 中，包之间的依赖关系通过 workspace 声明：

```json
{
  "dependencies": {
    "@trackpoint-sdk/core": "workspace:*"
  }
}
```

这样 pnpm 会创建软链接，而不是从 npm 安装。这就像是告诉 pnpm："别出门找了，家里就有！" 🏠

## 构建脚本 🛠️

为了生成 `.d.ts` 文件，需要添加构建脚本：

```json
{
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  }
}
```

`tsc --watch` 很有用，它会监听文件变化并自动重新编译，提升开发体验。就像是给你配了一个勤劳的小助手，你写代码，它负责编译。👨‍💻

## 项目引用 📚

在根目录的 tsconfig.json 中，可以使用项目引用来管理依赖关系：

```json
{
  "files": [],
  "references": [
    { "path": "packages/core" },
    { "path": "packages/pageview" }
  ]
}
```

这样可以确保按正确的顺序编译各个包。就像是告诉 TypeScript："先编译 core，再编译 pageview，别搞混了顺序！" 📋

## 开发流程优化 ⚡

最初的开发流程很不丝滑：修改代码 → 手动构建 → 测试。这就像是开车还得下来推一把才能走...

通过添加 watch 模式和并行开发命令，可以大大改善体验：

```json
// 根目录 package.json
{
  "scripts": {
    "dev": "pnpm -r --parallel run dev"
  }
}
```

这样只需要运行 `pnpm dev`，所有包都会进入监听模式，修改代码后自动重新编译。开发体验直接起飞！🚀

