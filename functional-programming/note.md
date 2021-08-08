# 编程范式分类

- 面向过程式编程 `C 语言`
- 面向对象式编程 `Java 语言`
- 函数式编程

# 函数式编程的优势

- 更少的 bug
- 更好的测试性
- 更适合并发性（不依赖全局或共享变量）
- 更高的复用性
- 更好的支持 tree-sharking

# 纯函数

- 相同的输入一定会产生相同的输出
- 执行过程中没有副作用
- ```javascript
  // 纯函数
  function add(a, b) {
    return a + b;
  }
  
  // 不纯的函数
  var c = 1;
  function add2(a, b) {
    c++; // 修改了外部的数据
    return a + b + c; // 返回结果依赖了外部的数据
  }
  ```

# 函数科里化

- 科里化是一种转换，将 f(a,b,c) 转换成 f(a)(b)(c) 的形式进行调用, 通常保持该函数可以被正常调用, 如果参数不足则返回偏函数

```javascript
function curry(func) {
  let argsLength = func.length; // 形参个个数
  let curried = (...args) => {
    if (args.length < argsLength) { // 形参的个数不一致, 返回偏函数
      return (...rest) => curried(...args, ...rest);
    }
    return func(...args);
  };
  return curried;
}

const curried = curry(add);
const curried2 = curried(1); // args 不足返回偏函数
curried2(2); // 3
```

# 函数组合

```javascript
function flow(...fns) {
  if (fns.length === 1) {
    return fns[0];
  }
  return fns.reduceRight((a, b) => (...args) => a(b(...args))); // fns 从左向右调用
}

const flowed = flow(() => '1', (str) => str + '2', (str) => str + '3');
flowed(); // 123
```

# 函子

概念:

函子是函数式编程里面最重要的数据类型, 也是基本的运算单位和功能单位

函子是一个容器, 包含了值和变形关系, 比较特殊的是, 他的变形可以依次作用于每一个值, 将当前容器变现成另一个容器

 https://www.ruanyifeng.com/blog/2017/02/fp-tutorial.html

个人理解：函子就是一种数据类型，内部提供了各种方法, 用于将 value 进行转换

```javascript
class Functor {
  constructor(value) {
    this.value = value;
  }
  
  // 直接 new Functor 不像函数式编程, 一般约定函子有 of 方法, 用来生成新的容器
  static of(value) {
    return new Functor(value);
  }
	
  // 一般约定，函子的标志就是容器具有 map 方法, 该方法将容器里面的每一个值，映射到另一个容器。
  map(fn) {
    return new Functor(fn(this.value));
  }
}

Functor.of(1).map(x => x + 1).map(x => x + 1); // value: 3

// 分割线 ========================================================

class MyBeFunctor {
  constructor(value) {
    this.value = value;
  }
  
  static of(value) {
    return new Functor(value);
  }
	
  map(fn) {
    return this.value ? new Functor(fn(this.value)) : this;
  }
}

MyBeFunctor.of(null).map(x => x + 1); // value: null
```

