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
│      settings.json
│      
├─mock							//mock service
│  │  api.ts
│  │  tsconfig.json
│  │  
│  └─routes
│          home.ts
│          index.ts
│          
├─public
│      favicon.ico
│      index.html
│      logo192.png
│      logo512.png
│      manifest.json
│      robots.txt
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
    │      index.ts
    │      
    ├─assets
    │      logo.png
    │      
    ├─components				//通用组件
    │  │  index.ts
    │  │  
    │  └─ModalRender
    │          index.tsx
    │          
    ├─domains					//领域模型
    │      index.ts
    │      user.ts
    │      
    ├─hooks						//通用hooks
    │      .gitkeep
    │      
    ├─layout					//页面布局
    │      index.tsx
    │      style.ts
    │      
    ├─locales					//多语言
    │      .gitkeep
    │      
    ├─pages						//不同页面
    │  ├─Home
    │  │      index.tsx
    │  │      operator.ts		//抽离的rxjs operator
    │  │      service.ts		//rxjs service
    │  │      style.ts
    │  │      translator.ts		//数据清洗
    │  │      
    │  ├─NotAuth
    │  │      index.tsx
    │  │      
    │  └─NotFound
    │          index.tsx
    │          
    ├─plugins					//插件模块
    │      axios.ts
    │      
    ├─route						//路由
    │      config.ts
    │      index.tsx
    │      
    ├─service					//rxjs 1.通用service；2.页面级service相互调用
    │      index.ts
    │      operator.ts
    │      
    ├─style						//全局 style
    │      index.ts
    │      
    ├─theme						//主题
    │      index.ts
    │      
    └─utils						//通用方法
            index.ts
```

### 项目启动
mock数据：`yarn mock`

开发模式：`yarn dev`

打包：`yarn build`

测试: `yarn test`

测试输出文件查看： `yarn coverage`

项目格式化：`yarn prettier`
