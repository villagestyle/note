# angular

使用脚手架创建项目 angular-cli 命令：
> ng new project-name 

启动angular项目
> npm start
>> ng serve
>>> ng serve --open --port 40 // 自动在浏览器中打开, 端口使用40

## 1. 路由系统

> 安装项目时可选择默认安装路由

### 1. 配置app-routing.module.ts

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// 导入新创建的页面
import { LoginComponent } from './pages/login/index.component';

const routes: Routes = [
  {
    // 路由地址
    path: 'login',
    // 引入的模板
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  // 将模块注入到NgModule中
  declarations: [LoginComponent],
  // 导出RouterModule
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### 2. 配置app.component.html
```
// 配置路由, 根据不同的 URL, 跳转到不同的页面
<router-outlet></router-outlet>
```
index.html 是整个APP的页面入口, 关键的一行代码是：
``` 
<app-root></app-root>
// 相当于是局部页面的占位符。 这个区域是动态加载的, 运行时, 会被 app.component.html 替换掉。具体来说,就是被以下页面替换掉。
```

### 3. 配置子路由的懒加载
