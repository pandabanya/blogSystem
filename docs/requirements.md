# 个人博客系统 - 需求分析与功能规格说明书 (MVP)

## 1. 项目背景
构建一个高性能、可扩展的个人博客系统，旨在通过实战掌握 Vue 3 全家桶、TypeScript、Node.js 及前端工程化体系。

## 2. 用户角色
- **访客 (Guest)**: 浏览文章、搜索、查看评论。
- **管理员 (Admin)**: 登录后台，管理文章、标签、分类及系统设置。

## 3. 核心功能模块 (MVP)

### 3.1 认证模块 (Auth)
- [ ] 用户登录 (JWT机制)
- [ ] Token 自动刷新与过期处理
- [ ] 路由权限守卫 (Guard)

### 3.2 内容管理 (Content)
- [ ] 文章列表 (分页、筛选)
- [ ] 文章详情 (Markdown 渲染, 目录生成)
- [ ] 文章发布/编辑 (集成 Markdown 编辑器)
- [ ] 标签与分类管理

### 3.3 系统设置 (System)
- [ ] 全局主题切换 (Light/Dark Mode)
- [ ] 个人信息配置

## 4. 非功能性需求
- **性能**: 首屏加载时间 < 1.5s (FCP)。
- **兼容性**: 适配移动端与 PC 端 (响应式布局)。
- **代码规范**: ESLint + Prettier + Husky 严格约束。
- **类型安全**: 全程使用 TypeScript，禁止隐式 any。

## 5. 技术栈概览
- **Frontend**: Vue 3, Vite, TypeScript, Pinia, Vue Router
- **UI Lib**: TailwindCSS (前台), Element Plus (后台)
- **Backend**: NestJS (后续阶段)