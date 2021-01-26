### 项目简介:

使用React + Typescript + Rxjs 的开发模板

### 项目结构
```
│  .editorconfig
│  .gitignore
│  .prettierrc.js
│  config-overrides.js
│  package.json
│  paths.json
│  README.md
│  tsconfig.json
│  yarn.lock
│  
├─.vscode
│      
├─mock							//mock service
│          
├─public
│      
└─src
    │  App.test.tsx
    │  App.tsx
    │  index.tsx
    │  react-app-env.d.ts
    │  serviceWorker.ts
    │  setupTests.ts
    │  style.ts
    │  
    ├─api					    //接口
    │      
    ├─assets
    │      
    ├─components				//通用组件
    │          
    ├─domains					//领域模型
    │      
    ├─hooks						//通用hooks
    │      
    ├─layout					//页面布局
    │      
    ├─locales					//多语言
    │      
    ├─pages						//不同页面
    │  ├─Home
    │  │      index.tsx
    │  │      operator.ts		//抽离的rxjs operator
    │  │      service.ts		//rxjs service
    │  │      style.ts
    │  │      translator.ts		//数据清洗
    │          
    ├─plugins					//插件模块
    │      
    ├─route						//路由
    │      
    ├─service					//rxjs 1.通用service；2.页面级service相互调用
    │      
    ├─style						//全局 style
    │      
    ├─theme						//主题
    │      
    └─utils						//通用方法
```

### 项目启动
mock数据：`yarn mock`

开发模式：`yarn dev`

打包：`yarn build`

测试: `yarn test`

测试输出文件查看： `yarn coverage`

项目格式化：`yarn prettier`
