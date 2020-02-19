## 1. Can't bind to 'formGroup' since it isn't a known property of 'form'错误解决方案 ( 使用zorro库时 )

项目中引用NG-ZORRO，在使用nz-form时报错Can't bind to 'formGroup' since it isn't a known property of 'form'

解决方案：
需要从@angular/forms导入ReactiveFormsModule。因为FormGroupDirective 指令属于ReactiveFormsModule一部分。

在share.module.ts中导入ReactiveFormsModule并在app-routing.module.ts中注入每个页面中( 在各级页面中都需导入 )

```
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

const PIPES = [
];

// 将类标记为NgModule并提供配置元数据的装饰器。@NgModule
@NgModule({
    declarations: [...PIPES],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        NgZorroAntdModule,
    ],
    exports: [
        ReactiveFormsModule,
        FormsModule,
        NgZorroAntdModule,
        ...PIPES
    ],
})

// 导出
export class SharedModule {
}

```

## 2. FormGroup表单验证

ng中一个重要的概念就是表单，ng提供了响应式表单(Reactive Form)和模板驱动表单(Template-driven form)两种形式。这两种形式的表单都基于几个共同的底层概念：

1. FormControl 实例用于追踪单个表单控件的值和验证状态。
2. FormGroup 用于追踪一个表单控件组的值和状态。
3. FormArray 用于追踪表单控件数组的值和状态。
4. ControlValueAccessor 用于在 Angular 的 FormControl 实例和原生 DOM 元素之间创建一个桥梁。

### 1. 声明/创建表单Group
```
this.user = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,4}/)]),
      password: new FormControl('', [Validators.required]),
      repeat: new FormControl('', [Validators.required]),
      address: new FormGroup({
        province: new FormControl(''),
        city: new FormControl(''),
        area: new FormControl(''),
        addr: new FormControl('')
      })
    });
```

1. FormGroup接收三个参数: controls（表单控件『数组』，其实不是数组，是一个类似字典的对象） 、 validator（验证器） 和 asyncValidator（异步验证器） ，其中只有 controls 数组是必须的参数，后两个都是可选参数
2. 表单控件的构造函数同样也接受三个可选参数，分别是：控件初始值（ formState ）、控件验证器或验证器数组（ validator ）和控件异步验证器或异步验证器数组（ asyncValidator ）。

> 参考 Angular表单 https://blog.csdn.net/u010552788/article/details/89396335
> 参考 Angular 深入浅出之----响应式表单 https://blog.csdn.net/feiying008/article/details/80412221