
# 前端测试

面试官: 请问在一个多人长期维护的项目中,你是如何保证代码质量的?

通过一个登录页面来介绍前端项目(react)涉及到的单元测试,集成测试以及端到端测试.介绍相关测试工具以及最佳实践.

- [前端测试](#前端测试)
  - [准备工作](#准备工作)
    - [产品需求](#产品需求)
    - [技术方案](#技术方案)
    - [开发准备](#开发准备)
    - [开发思路](#开发思路)
  - [单元测试](#单元测试)
    - [测试函数](#测试函数)
      - [业务代码](#业务代码)
      - [测试代码 isMobile](#测试代码-ismobile)
      - [Tips](#tips)
      - [测试代码 isPwd](#测试代码-ispwd)
    - [测试快照](#测试快照)
    - [测试组件](#测试组件)
    - [测试接口](#测试接口)
  - [集成测试](#集成测试)
    - [测试路由跳转](#测试路由跳转)
    - [测试用户交互](#测试用户交互)
    - [测试登录逻辑](#测试登录逻辑)
  - [端到端测试](#端到端测试)
    - [模拟用户操作](#模拟用户操作)

## 准备工作

### 产品需求

[在线产品文档](https://modao.cc/app/c8355de305d32a92e2e1bb2b1029f6e4160ee376#screen=sku96tp038xyxco)

### 技术方案

[在线技术方案](https://modao.cc/app/c8355de305d32a92e2e1bb2b1029f6e4160ee376#screen=sku96tp03cc0ptp)

### 开发准备

```bash
git clone https://github.com/ranwawa/test-FE-react
cd test-FE-react
npm install
```

### 开发思路

沿着从小到大,从局部到整体的思路开发.

1. 编写验证手机号和密码的函数
2. 封装手机号和密码的ui组件
3. 封装登录状态的context
4. 二次封装axios请求函数
5. 编写登录页面
6. 编写登录逻辑

## 单元测试

通常只针对自己开发的一个小功能进行测试,不需要和其他插件/模块/函数进行交互.一般只需要一个断言即可完成测试

### 测试函数

#### 业务代码

通过正则来验手机号和密码

这两个验证函数可能会在找回密码,创建帐号等地方用到

所以抽离到`utils/index.js`文件作为公共函数

```javascript
// utils/index.js

const REG_MOBILE = /1\d{10,10}/;
const REG_PWD = /.{6}/;

export const isMobile = function (mobile) {
  return REG_MOBILE.test(mobile);
}

export const isPwd = function (pwd) {
  eturn REG_MOBILE.test(pwd);
}
```

#### 测试代码 isMobile

1. 在业务代码同级目录新增`__test__`目录
2. 在里面新增一个以`test.js`结尾的测试文件.

3. 然后编写`isMobile`的测试用例,我们需要测试这个函数
   - 输入正确的手机号码,要返回true
   - 输入错误的手机号码要返回false
4. 运行测试命令,检查测试用例是否通过

```javascript
// utils/__test__/index.function.test.js

import {isMobile } from '..';

describe('isMobile', () => {
  test('13333333333应该返回true', () => {
    expect(isMobile('13333333333')).toBe(true);
  });

  test('1333333应该返回false', () => {
    expect(isMobile('1333333')).toBe(false);
  })
});
```

在终端运行`npm run test`即可看到测试结果

```bash
 PASS  src/utils/__test__/index.function.test.js
  isMobile
    ✓ 13333333333应该返回true (1 ms)
    ✓ 1333333应该返回false (1 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.436 s, estimated 1 s
Ran all test suites.

Watch Usage: Press w to show more.
```

#### Tips

> 1. 为什么要在\__test__目录下以.test.js为后缀来命名测试文件?
>    - 这是jest的默认行为,也可自定义jest配置来修改.详情: <https://jestjs.io/docs/configuration#projects-arraystring--projectconfig>
> 2. describe/test/expect这些全局函数是哪儿来的,有什么作用?
>    - 是jest提供的用于测试的全局函数,这3个是固定的写法
>    - 主要是toBe/toXXX会有一些差异.详情: <https://jestjs.io/docs/using-matchers>
> 3. 为什么npm run test就会运行测试用例?
>    - Create-react-app项目默认和jest集成,相当于是执行了jest命令.详情: <https://create-react-app.dev/docs/running-tests/>

#### 测试代码 isPwd

```diff
// utils/__test__/index.function.test.js

- import {isMobile } from '..';
+ import {isMobile, isPwd } from '..'

+ describe('isPwd', () => {
+  test('123456应该返回true', () => {
+   expect(isPwd('123456')).toBeTruthy();
+  });

+  test('12345应该返回false', () => {
+   expect(isPwd('12345')).toBeFalsy();
+  })
+ });
```

在终端发现运行结果出错

```bash
 FAIL  src/utils/__test__/index.function.test.js
  isMobile
    ✓ 13333333333应该返回true
    ✓ 1333333应该返回false
  isPwd
    ✕ 123456应该返回true
    ✓ 123应该返回false (1 ms)

  ● isPwd › 123456应该返回true

    expect(received).toBeTruthy()

    Received: false

      14 | describe('isPwd', () => {
      15 |      test('123456应该返回true', () => {
    > 16 |              expect(isPwd(123456)).toBeTruthy();
         |                                    ^
      17 |      });
      18 |
      19 |      test('123应该返回false', () => {

      at Object.<anonymous> (src/utils/__test__/index.function.test.js:16:25)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 3 passed, 4 total
Snapshots:   0 total
Time:        0.176 s, estimated 1 s
Ran all test suites.
```

排查发现,是业务代码中.isPwd函数中的正则表达式引用错导致的.

这样就可以提前发现和解决错误

```diff
// utils/index.js

export const isPwd = function (pwd) {
- return REG_MOBILE.test(pwd);
+ return REG_PWD.test(pwd);
}
```

修改保存之后,测试用例自动重新运行.

```bash
 PASS  src/utils/__test__/index.function.test.js
  isMobile
    ✓ 13333333333应该返回true (2 ms)
    ✓ 1333333应该返回false (1 ms)
  isPwd
    ✓ 123456应该返回true (1 ms)
    ✓ 123应该返回false (1 ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        0.256 s, estimated 1 s
Ran all test suites.

Watch Usage: Press w to show more.
```

### 测试快照

针对正则的常量,我们可以保存一个快照.

当修改常量时,会进行提示,以避免不小心被修改错了

```diff
// utils/__test__/index.function.test.js

- import {isMobile, isPwd } from '..';
+ import {isMobile, isPwd, REG_MOBILE, REG_PWD } from '..';

+ describe('snapshot', () => {
+  test('手机号码的正则表达式', () => {
+   expect(REG_MOBILE).toMatchSnapshot();
+  })

+  test('密码的正则表达式', () => {
+   expect(REG_PWD).toMatchSnapshot();
+  })
+ })
```

保存之后 ,测试用例会自动运行通过

`toMatchSnapshot`函数会在测试文件所在目录下自动创建\__snapshots__/测试文件名.snap的文件

用于缓存当前正则的值

```bash
 PASS  src/utils/__test__/index.function.test.js
  isMobile
    ✓ 13333333333应该返回true
    ✓ 1333333应该返回false (1 ms)
  isPwd
    ✓ 123456应该返回true
    ✓ 123应该返回false
  snapshot
    ✓ 手机号码的正则表达式 (2 ms)
    ✓ 密码的正则表达式 (1 ms)

 › 2 snapshots written.
Snapshot Summary
 › 2 snapshots written from 1 test suite.

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   2 written, 2 total
Time:        0.391 s, estimated 1 s
Ran all test suites.

Watch Usage: Press w to show more.
```

当你更新手机号的正则时,jest就会报错,因为之前缓存的和你改的结果不一样

```diff
// utils/index.js

- const REG_MOBILE = /1\d{10,10}/;
+ export const REG_MOBILE = /1[3-8]\d{9,9}/;
```

```bash
 FAIL  src/utils/__test__/index.function.test.js
  isMobile
    ✓ 13333333333应该返回true (2 ms)
    ✓ 1333333应该返回false (1 ms)
  isPwd
    ✓ 123456应该返回true
    ✓ 123应该返回false
  snapshot
    ✕ 手机号码的正则表达式 (4 ms)
    ✓ 密码的正则表达式

  ● snapshot › 手机号码的正则表达式

    expect(received).toMatchSnapshot()

    Snapshot name: `snapshot 手机号码的正则表达式 1`

    Snapshot: /1\\d\{10,10\}/
    Received: /1\[3-8\]\\d\{9,9\}/

      24 | describe('snapshot', () => {
      25 |      test('手机号码的正则表达式', () => {
    > 26 |              expect(REG_MOBILE).toMatchSnapshot();
         |                                 ^
      27 |      })
      28 |
      29 |      test('密码的正则表达式', () => {

      at Object.<anonymous> (src/utils/__test__/index.function.test.js:26:22)

 › 1 snapshot failed.
Snapshot Summary
 › 1 snapshot failed from 1 test suite. Inspect your code changes or press `u` to update them.

Test Suites: 1 failed, 1 total
Tests:       1 failed, 5 passed, 6 total
Snapshots:   1 failed, 1 passed, 2 total
Time:        0.28 s, estimated 1 s
Ran all test suites.
```

这个时候,只需要在终端按一下`u`键(更新)即可将最新的值同步到snap文件中

如果发现自己是不小心改到.或者改错了,就可以撤消刚刚的改动,避免引起新的bug.

### 测试组件

### 测试接口

## 集成测试

### 测试路由跳转

### 测试用户交互

### 测试登录逻辑

## 端到端测试

### 模拟用户操作
