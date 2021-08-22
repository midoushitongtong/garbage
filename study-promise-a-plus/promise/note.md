# 什么是高阶函数

1. 函数的参数是函数， 可以称这个函数为高阶函数
2. 函数的返回值是一个函数，也可以称这个函数为高阶函数

# 什么是科里化

含义：科里化目的就是让函数变得更具体

偏函数：返回一个函数，函数的参数不止一个

```javascript
const curring = (fn) => {
  const inner = (...args) => {
    return args.length >= fn.length
      ? fn(...args)
      : (...rest) => inner(...args, ...rest);
  };

  return inner;
};

const sum = (a, b, c) => {
  return a + b + c;
};

const fn1 = curring(sum);
const fn2 = fn1(1, 2);
const fn3 = fn2(3);
console.log(fn3);
```



# 什么是是反科里化

含义：反科里化的目的就是扩大函数的适用性

