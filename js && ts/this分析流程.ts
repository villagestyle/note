/**
 * 当ref为Reference类型时：
 * 1. IsPropertyReference(ref)为true，那么this的值为GetBase(ref);
 * 2. base value值时Environment Record, 那么this的值为ImplicitThisValue(ref)  ==> this为undefined
 *
 * 当ref不为Reference类型时：
 * this为undefined
 */

var foo = {
  value: 1,
  bar: function () {
    return this.value;
  }
};

foo.bar();
// this分析
/**
 * 1. 取得MenberExpression赋值给ref
 * 2. 判断ref是否为Reference类型
 *  true
 * 3. 当ref为Reference类型时, 开始判断
 *  3.1 IsPropertyReference(ref)
 *      ture
 *      this的值为GetBase(ref);
 *      foo
 */

var fooReference: Reference = {
  strict: false,
  baseValue: "foo",
  referenceName: "bar"
};

function foo2() {
  console.log(this);
}

foo2();
// this分析：
/**
 * 1. 取得MemberExporession(左侧)赋值给ref
 * foo2
 * 2. 判断ref是否为Reference类型
 * true
 * 3. 当ref为Reference类型时, 开始判断
 *  3.1 IsPropertyReference(ref)的值
 *      false == > 中断
 *  3.2 base value值时Environment Record
 *      true
 *      this的值为ImplicitThisValue(ref)
 *      this为undefined
 */

/** 检测base value的值是否为boolean */
function IsPropertyReference(ref: Reference) {
  if (ref.baseValue instanceof Object) {
    return true;
  }
  return false;
}

/** 返回reference的base value */
function GetBase(ref: Reference) {
  return ref.baseValue;
}

/** 返回undefined */
function ImplicitThisValue(ref: Reference): undefined {
  return undefined;
}

interface EnvironmentRecord {
  name: "Environment Record";
}

interface Reference {
  strict: boolean;
  /** 属性所在的对象或者Environment Record(全局环境记录) */
  baseValue:
    | EnvironmentRecord
    | Object
    | string
    | boolean
    | number
    | undefined
    | bigint
    | symbol;
  referenceName: string;
}

var foo2Reference: Reference = {
  strict: false,
  baseValue: {
    name: "Environment Record"
  },
  referenceName: "foo"
};

// 判断ref是否为Reference类型
// 在使用赋值操作符, 逻辑算法(与或非等), 逗号运算符时, 将不会为Reference类型
// 详见 https://yanhaijing.com/es5/
