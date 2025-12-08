# 个人博客系统 - 技术架构设计文档

## 1. 项目架构 (Monorepo Structure)
本项目采用轻量级 Monorepo 结构，统一管理前后端代码。

```text
personal-blog-system/
├── packages/
│   ├── admin/          # 后台管理系统 (Vue 3 + Vite)
│   ├── blog/           # 前台博客展示 (Vue 3 + Vite / Nuxt)
│   ├── server/         # 后端 API 服务 (NestJS)
│   └── shared/         # 共享类型定义、工具函数 (Shared Types/Utils)
├── docs/               # 项目文档
├── package.json        # 根依赖管理
└── pnpm-workspace.yaml # Monorepo 工作区配置