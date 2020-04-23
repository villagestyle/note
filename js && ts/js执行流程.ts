var scope = "global scope";
function checkscope(){
    var scope2 = 'local scope';
    return scope2;
}
checkscope();

// 执行上下文栈
ECStrack = [];

// 代码开始执行，向执行上下文栈中压入全局的执行上下文
ECStrack = [
  globalContext
];

// 函数被创建，保存作用域链到内部属性[[scope]] (函数的作用域在函数创建时就决定了)
checkscope = {
  [[scope]]: [
    globalContext.VO // [[scope]]指向函数父级对象的作用域
  ]
}

// 执行到checkscope函数，创建checkscope函数上下文，checkscope函数执行上下文被压入执行上下文栈
ECStrack = [
  checkscopeContext,
  globalContext,
]

// 函数被执行，进入准备工作，函数执行上下文，第一步，复制函数[[scope]]属性到函数上下文(用来创建作用域链）
checkscopeContext = {
    Scope: checkscope.[[scope]]
}
// 函数执行上下文，第二步，解析函数内部，创建活动对象、初始化活动对象、随后加入形参、函数声明、变量声明
checkscopeContext = {
  AO: {
    arguments: {
      length: 0
    },
    scope2: undefined
  },
  Scope: checkscope.[[scope]]
}

// 第三步，将活动对象压入checkscope作用域顶端(在执行上下文初始化完毕之后)
checkscopeContext = {
  AO: {
    arguments: {
      length: 0
    },
    scope2: undefined
  },
  // Scope: 执行上下文的作用域链
  Scope: [AO, checkscope.[[scope]]]
}

// 执行函数，随着函数的执行，修改AO的属性值
checkscopeContext = {
  AO: {
    arguments: {
      length: 0
    },
    scope2: 'local scope'
  },
  Scope: [AO, checkscope.[[scope]]]
}

// 查找到scope2的值，返回后函数执行完毕，函数上下文从执行上下文栈中弹出
ECStack = [
  globalContext
]