# 🏗️ NestJS 三大核心概念

1. Controller（控制器） - 处理请求
负责接收 HTTP 请求，调用服务处理，返回响应。

2. Service(服务层) - 写业务逻辑



## 装饰器模式与依赖注入详解
装饰器是一种设计模式，允许在不修改原有代码的情况下，动态地给对象或类添加新的功能

```typescript
@Controller('article')  // 路由前缀：/article  类装饰器，标记这是一个控制器，并设置路由前缀
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  //  get /article 获取所有文章  方法装饰器，标记这是一个 HTTP GET 请求处理器
  @Get()
  findAllArticle(){
    return this.articleService.findAllArticle();
  }

  @Get(':id')
  findOne(@Param('id') id:string){  // 参数装饰器，从 URL 参数中提取 id 值
    return this.articleService.findOne(id)
  }

}
```

用一个高档大的餐厅类比nextjs
Controller  - 服务员
职责: 接待客人，接收点单，把菜端给客人
不做：不做菜，不管厨房怎么运作
```typescript

@Controller('article') // 这个服务员专门负责"文章"相关的桌位
export class AricleController{
  constructor(private readonly articleService: ArticleService) {}

  @Get() // 客人说："给我看看所有文章"（GET 请求）
  findAll(){
    return this.articleService.findAll() // 转告厨房
  }
}
```

Service 厨师
职责: 做菜，处理数据写业务逻辑的
不做: 不直接接触客人
```typescript
@Injectable() // 这是可以被"注入"雇佣的厨师
export class ArticleService {
  private articles = []; // 食材库
  findAll(){
    return {code: 200,data: this.articles}; // 做好菜返回
  }
}
```

Module 餐厅的一个部门
职责：把服务员和厨师组织在一起
```typescript
@Module({
  controllers: [ArticleController],// 这个部门有哪些服务员
  providers: [ArticleService]// 这个部门有哪些厨师
})

export class ArticleModule{} 
```


## 依赖注入
传统办法 
```typescript
class ArticleService{
  getArticles() {
    return ['文章1', '文章2'];
  }
}

class ArticleController{
  private articleService = new ArticleService(); // 自己创建厨师

   handleRequest() {
    return this.articleService.getArticles();
  }
}
// 使用时
const controller = new ArticleController();
controller.handleRequest()

问题：

- 控制器和服务强绑定，换个厨师（Service）很麻烦
- 测试困难，无法替换成 Mock 数据
- 强耦合：ArticleController 写死了要用 ArticleService
- ，如果想换成 MockArticleService（测试用），必须修改 Controller 代码
- 重复创建：每次 new ArticleController() 都会 new 一个新的 ArticleService，浪费内存
```

```typescript
NestJS的依赖注入方案  Injectable 可注射的
1. 第一步：标记"可注入"的类
import { Injectable } from '@nestjs/common';
@Injectable()
export class ArticleService{
  getArticle(){
    return ['a','b']
  }
}
// 简化版源码
function Injectable() {
  return function(target) {
    // 给这个类打上"可注入"的标记
    Reflect.defineMetadata('injectable', true, target);
  };
}

2. 第二步：在 Controller 中"声明需求"
@Controller('article')
export class ArticleController{
  constructor(private readonly articleService: ArticleService)
    //      ↑ private: TypeScript 语法糖，自动创建并赋值 this.articleService
    //              ↑ readonly: 不允许修改
    //                      ↑ articleService: 参数名（可以随便取，但建议见名知意）
    //                                ↑ ArticleService: 类型（告诉 NestJS 注入哪个类）
  @Get()
  findAll(){
    return this.articleService.getArticle(){

  }
}

```

```typescript
class ArticleController{
  constructor(private readonly articleService: ArticleService){}  
  // NestJS 自动把 ArticleService 的实例"注入"进来
  // 代码等价于
  private readonly articleService: ArticleService;
  
  constructor(articleService: ArticleService) {
    this.articleService = articleService;
  }
}

1. NestJS 启动时扫描所有模块
2. 发现 ArticleController 需要 ArticleService
3. 检查 ArticleService 是否被 @Injectable() 标记
4. 自动创建 ArticleService 实例
5. 把实例"注入"到 ArticleController 的构造函数

好处：

✅ 解耦：控制器不关心 Service 怎么创建
✅ 单例模式：整个应用只创建一个 ArticleService 实例（省内存）
✅ 易测试：可以轻松替换成 Mock Service
```


## 装饰器原理（Decorator）
什么是装饰器？
就像给函数或类贴标签，NestJS 通过这些标签知道怎么处理代码。

### 常见装饰器：

```typescript
// 1. 类装饰器
@Controller('article')
export class ArticleContriller {}
// 2. 方法装饰器 RestFul
@Get(':id')
// 参数装饰器
findOnee(@Param('id') id:string){}
//       ↑ 标签：从 URL 参数中提取 id
```

装饰器本质是一个函数
```typescript
function Get(path?:string){
  return function(target, propertyKey, descriptor){
    // 给方法添加元数据: 路由路径、HTTP 方法
    Reflect.defineMetadata('path', path, target, propertyKey);
    Reflect.defineMetadata('method', 'GET', target, propertyKey);
  }
}
```

完整流程:
客户端发起请求
     ↓
http://localhost:3002/article/1
     ↓
NestJS 路由系统解析
     ↓
找到 @Controller('article') 
     ↓
匹配到 @Get(':id')
     ↓
调用 ArticleController.findOne('1')
     ↓
控制器调用 this.articleService.findOne('1')
     ↓
Service 从数据中查找 ID=1 的文章
     ↓
返回 { code: 200, data: {...} }
     ↓
控制器把结果返回给客户端
     ↓
客户端收到 JSON 响应


# 🎯 面试高频考点
1. 为什么要用依赖注入？
答：解耦代码，方便测试，统一管理实例（单例模式）

2. 装饰器的本质是什么？
答：装饰器是一个函数，通过元数据（Metadata）给类或方法添加额外信息，框架在运行时读取这些信息来决定如何处理

3. Controller 和 Service 的职责区别？
答：

Controller：接收请求，参数验证，调用 Service，返回响应（薄层）
Service：业务逻辑，数据处理，可复用（厚层）
4. NestJS 的模块化有什么好处?
答：

代码组织清晰（按功能划分）
便于团队协作（不同人负责不同模块）
支持懒加载（提升性能）