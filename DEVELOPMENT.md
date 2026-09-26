# React + Vite 开发与部署

已恢复最初开发的 React + Vite 项目。`src/main.jsx` 包含页面组件和交互，`src/data.js` 包含模拟数据、匹配逻辑和交换状态机，`src/style.css` 包含移动端视觉样式。

## 本地运行

需要 Node.js 22 或更新版本。

```sh
npm ci
npm run dev
```

打开终端输出的本地网址。根目录 index.html 是 Vite 开发入口，必须通过开发服务器运行，不要直接双击。

## 测试和构建

```sh
npm test
npm run build
npm run preview
```

构建产物写入 dist/。默认采用相对资源路径，可部署在 /MTDemo/ 子目录。

## GitHub Pages

仓库 Settings → Pages → Source 设为 **GitHub Actions**。推送到 main 后，`.github/workflows/deploy.yml` 自动安装依赖、运行测试、构建并仅发布 dist/。

线上地址：https://bingqian0901.github.io/MTDemo/

不要再将源码根目录直接作为静态文件发布，也无需手动上传构建产物或单文件 HTML。以后修改 src 中的内容并推送 main，即可自动更新线上页面。

## 演示范围

所有伙伴和聊天均为模拟数据；匹配在浏览器本地根据技能供需和学习形式计算，无真实 AI 或即时通讯接口。发布内容、消息、邀约和评价保存在当前浏览器的 localStorage 中。示例照片与字体需要网络；重置演示数据的入口位于「我的 → 个人设置」。
