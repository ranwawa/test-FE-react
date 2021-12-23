
# 前端测试

请问在一个多人长期维护的项目中,你是如何保证代码质量的?

- [前端测试](#前端测试)
    - [产品需求](#产品需求)
    - [技术方案](#技术方案)
    - [开发准备](#开发准备)
    - [开发思路](#开发思路)
  - [1. 单元测试](#1-单元测试)
    - [1.1 测试一个函数](#11-测试一个函数)
    - [1.2 测试快照](#12-测试快照)
    - [1.3 测试组件](#13-测试组件)
    - [1.4 测试用户交互](#14-测试用户交互)
  - [2. 集成测试](#2-集成测试)
    - [2.1 测试接口](#21-测试接口)
    - [2.2 测试路由跳转](#22-测试路由跳转)
    - [2.3 测试自动登录](#23-测试自动登录)
  - [3. 端到端测试](#3-端到端测试)

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

## 1. 单元测试

通常只针对自己开发的一个小功能进行测试,不需要和其他插件/模块/函数进行交互.一般只需要一个断言即可完成测试

### 1.1 测试一个函数

#### 1.1.1 编写业务代码

通过正则来验手机号这个函数在找回密码,创建帐号等地方会用到,所以抽离到`utils/index.js`文件作为公共函数

```javascript
// src/utils/index.js

export const REG_MOBILE = /1[3-8]\d{9,9}/;

/**
 * 验证是否手机号
 * @param {string} mobile - 手机号码 
 * @returns {boolean}
 */
export const isMobile = function (mobile) {
  return REG_MOBILE.test(mobile);
}
```

#### 1.1.2 编写测试代码

1. 创建测试目录`utils/__test__`
2. 创建测试文件`utils/__test__/index.test.js`
3. 新增测试分组`describe('验证手机号码函数相关测试', ...`
4. 编写测试用例
   1. 新增测试用例`test('输入正确的手机号码', ...`
   2. 运行函数
   3. 断言函数结果`expect(...).to...`
5. 运行测试命令`npm run test`,检查测试结果

```javascript
// src/utils/__tests__/index.test.js

import {isMobile } from '..';

describe('验证手机号码函数相关测试', () => {
 test('输入正确的手机号码:13333333333,应该返回true', () => {
  const res = isMobile('13333333333')
  expect(res).toBe(true);
 });

 test('输入错误的手机号码:1333333,应该返回false', () => {
  const res = isMobile('1333333')
  expect(res).toBe(false);
 })
});
```

#### 1.1.3 测试结果

```bash
PASS  src/utils/__tests__/index.test.js
  验证手机号码函数相关测试
    ✓ 输入正确的手机号码:13333333333,应该返回true (2 ms)
    ✓ 输入错误的手机号码:1333333,应该返回false
```

#### 1.1.4 试一试

- 将第一个测试用例的验证函数`.toBe(true)`修改成`.toBe(false)`
- 将第2个测试用例的验证函数`.toBe(false)`修改成`.toBeFalsy()`

### 1.2 测试快照

针对正则的常量,我们可以保存一个快照.当修改常量时,会进行提示,以避免不小心被修改错了

#### 1.2.1 编写测试代码

1. 定位到验证手机号码的测试分组
2. 新增测试用例
3. 运行测试命令

```diff
// src/utils/__tests__/index.test.js

+ import {isMobile, REG_MOBILE } from '..';

describe('验证手机号码函数相关测试', () => {
 test('输入正确的手机号码:13333333333,应该返回true', () => {
  const res = isMobile('13333333333')
  expect(res).toBe(true);
 });

 test('输入错误的手机号码:1333333,应该返回false', () => {
  const res = isMobile('1333333')
  expect(res).toBe(false);
 })

+ test('手机号码的正则表达式应该是11位数字', () => {
+  expect(REG_MOBILE).toMatchSnapshot();
+ })
});

```

#### 1.2.2 测试结果

```bash
PASS  src/utils/__tests__/index.test.js
  验证手机号码函数相关测试
    ✓ 输入正确的手机号码:13333333333,应该返回true (3 ms)
    ✓ 输入错误的手机号码:1333333,应该返回false (1 ms)
    ✓ 手机号码的正则表达式应该是11位数字 (2 ms)

 › 1 snapshot written.
Snapshot Summary
 › 1 snapshot written from 1 test suite.
```

#### 1.2.3 试一试

- 看看`src/utils/__tests__/__snapshots__`
- 将断言函数`expect(REG_MOBILE)`修改成`expect('1[0-9]')`

### 1.3 测试组件

#### 1.3.1 编写业务代码

手机输入框组件在注册,修改手机号时也会用到,所以抽离成一个公共组件

```jsx
// src/components/Mobile.js

import { Form, Input } from 'antd';

const Mobile = () => {
  return (
    <Form.Item
      label='用户名'
      name='username'
    >
      <Input
        placeholder='请输入手机号'
      />
    </Form.Item>
  );
};

export default Mobile;
```

#### 1.3.2 编写测试代码

1. 引入第3方测试库
2. 模拟全局变量
3. 编写测试用例
   1. 新增测试分组和用例
   2. 渲染组件
   3. 断言组件渲染结果
4. 运行测试命令

```javascript
// src/components/__tests__/Mobile.test.js

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Form } from 'antd';
import Mobile from '../Mobile';

Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    addListener: () => {},
    removeListener: () => {},
  }),
});

describe('手机号输入框相关测试', () => {
  test('组件渲染成功后,界面上要显示用户名及请输入手机号', () => {
    render(
      <Form>
        <Mobile></Mobile>
      </Form>
    );

    expect(screen.getByText('用户名')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('请输入手机号')).toBeInTheDocument();
  });
});
```

#### 1.3.3 测试结果

```bash
PASS  src/components/__tests__/Mobile.test.js
  手机号输入框相关测试
    ✓ 组件渲染成功后,界面上要显示用户名及请输入手机号码 (58 ms)
```

#### 1.3.4 试一试

- 删除测试库'import '@testing-library/jest-dom';'
- 删除全局属性声明`Object.defineProperty(window`
- 将断言内容`expect(screen.getByText('用户名'))`修改成`expect(screen.getByText('密码'))`

### 1.4 测试用户交互

在手机号组件上,添加用户操作相关的逻辑,然后验证用户的操作是否会产生符合期望的结果

#### 1.4.1 编写业务代码

为方便测试,先把state管理写到组件里面,后面再通过props传递

```diff
// src/components/Mobile.js

import { Form, Input } from 'antd';
+ import { useState } from 'react';
+ import { isMobile } from '../utils';

const Mobile = () => {
+ const [value, setValue] = useState('');
+ const [err, setErr] = useState('');

+ function handleInputChange(e) {
+   setErr('');
+   setValue(e.target.value);
+ }

+ function handleInputBlur(e) {
+   if (value === '') {
+     setErr('');
+   } else if (!isMobile(value)) {
+     setErr('手机号码格式有误');
+   }
+ }

  return (
    <Form.Item
      label='用户名'
      name='username'
+     validateStatus={err ? 'error' : ''}
+     help={err}
    >
      <Input
        placeholder='请输入手机号'
+       value={value}
+       onChange={handleInputChange}
+       onBlur={handleInputBlur}
      />
    </Form.Item>
  );
};

export default Mobile;
```

#### 1.4.2 编写测试代码

1. 引入测试库
2. 新增测试用例
   1. 渲染组件
   2. 模拟用户操作
   3. 断言操作后的结果
3. 运行测试命令

```diff
// src/components/__tests__/Mobile.test.js

+ import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Form } from 'antd';
import Mobile from '../Mobile';

Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    addListener: () => {},
    removeListener: () => {},
  }),
});

describe('手机号输入框相关测试', () => {
  test('组件渲染成功后,界面上要显示用户名及请输入手机号码', () => {
    render(
      <Form>
        <Mobile></Mobile>
      </Form>
    );

    expect(screen.getByText('用户名')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('请输入手机号')).toBeInTheDocument();
  });
});

+ describe.only('用户操作相关测试', () => {
+  test('输入错误的手机号码,界面上要显示手机号码格式有误', () => {
+    render(
+      <Form>
+        <Mobile></Mobile>
+      </Form>
+    );

+    const input = screen.getByPlaceholderText('请输入手机号');
+    fireEvent.change(input, { target: { value: '133' } });
+    fireEvent.blur(input);

+    expect(screen.getByText('手机号码格式有误')).toBeInTheDocument();
+  });

+  test('手机号码输错后,再重新输入手机号码,要清空错误信息', async () => {
+    render(
+      <Form>
+        <Mobile></Mobile>
+      </Form>
+    );

+    const input = screen.getByPlaceholderText('请输入手机号');
+    fireEvent.change(input, { target: { value: '133' } });
+    fireEvent.blur(input);
+
+    expect(screen.getByText('手机号码格式有误')).toBeInTheDocument();

+    fireEvent.change(input, { target: { value: '' } });
+    await waitFor(() => {
+      expect(screen.queryByText('手机号码格式有误')).not.toBeInTheDocument();
+    });
+  });
});
```

#### 1.4.3 测试结果

```bash
PASS  src/components/__tests__/Mobile.test.js
  手机号输入框相关测试
    ○ skipped 组件渲染成功后,界面上要显示用户名及请输入手机号码
  用户操作相关测试
    ✓ 输入错误的手机号码,界面上要显示手机号码格式有误 (76 ms)
    ✓ 手机号码输错后,再重新输入手机号码,要清空错误信息 (33 ms)
```

#### 1.4.4 试一试

- 删除测试分组后面的`.isOnly`函数
- 删除异步等待的包裹函数`await waitFor(() => ...`

## 2. 集成测试

通常需要和外部库,其他依赖,用户操作一起进行测试

### 2.1 测试接口

对axios进行二次封装,接口请求失败或后端返回的状态码不是0,需要重新格式化返回的数据

#### 2.1.1 编写业务代码

屏蔽掉Promise的reject状态,通过express风格处理接口响应

```javascript
// src/api/index.js

import axios from 'axios';

/**
 * 二次封装的请求函数
 * @param {string} path - 接口路由
 * @param {object} params - 请求参数
 * @returns {Promise<([null, object] | [object | null])>}
 */
export const request = async function (path, params = {}) {
  try {
    const url = `test.com/${path}`;
    const res = await axios.get(url, { params });

    if (res?.ret !== 0) {
      return [res, null];
    }

    return [null, res.data];
  } catch (error) {
    return [error, null];
  }
};

export default request;
```

#### 2.1.2 编写测试代码

1. 创建测试文件
2. 新增测试用例
   1. 模拟依赖包`jest.spyOn(axios, 'get')`
   2. 模拟依赖包响应数据`spyGet.mockRejectedValue(...`
   3. 运行异步函数
   4. 断言运行结果
3. 运行测试命令

```javascript
// src/api/__tests__/index.test.js

import axios from 'axios';
import request from '../index';

const spyGet = jest.spyOn(axios, 'get');

describe('公共请求库相关测试', () => {
  test('如果http链接建立失败,测返回错误', async () => {
    spyGet.mockRejectedValue(new Error('请求超时'));

    const [err, res] = await request('login', {
      name: '13355556666',
      password: '123456',
    });

    expect(err).toEqual(new Error('请求超时'));
    expect(res).toBe(null);
  });

  test('如果后端返回的状态码是1,则返回错误', async () => {
    spyGet.mockResolvedValue({ ret: 1, data: {} });

    const [err, res] = await request('login', {
      name: '13355556666',
      password: '123456',
    });

    expect(err).toEqual({ ret: 1, data: {} });
    expect(res).toBeNull();
  });

  test('如果后端返回的状态码是0,则取后端返回的data数据', async () => {
    spyGet.mockResolvedValue({ ret: 0, data: { token: 'token' } });

    const [err, res] = await request('login', {
      name: '13355556666',
      password: '123456',
    });

    expect(err).toBe(null);
    expect(res).toEqual({ token: 'token' });
  });
});

```

#### 2.1.3 测试结果

```bash
PASS  src/api/__tests__/index.test.js
  公共请求库相关测试
    ✓ 如果http链接建立失败,测返回错误 (4 ms)
    ✓ 如果后端返回的状态码是1,则返回错误 (2 ms)
    ✓ 如果后端返回的状态码是0,则取后端返回的data数据 (2 ms)
```

#### 2.1.4 试一试

- 删除模拟响应结果`spyGet.mockResolvedValue({ ret: 1, data: {} })`
- 将最后一个断言的验证函数`toEqual({ token: 'token' })`修改成`toBe({ token: 'token' })`

### 2.2 测试路由跳转

路由是使用的`react-router`,在测试路由跳转时,必须结合react-router一起进行测试

#### 2.2.1 编写业务代码

1. 新增路入口文件
2. 在登录页面添加一个跳转链接

```javascript
// src/App.js

import { Routes, Route } from 'react-router-dom';
import { Login } from './Login';

export const App = () => {
 return <Routes>
  <Route path='/login' element={<Login />} />
  <Route path='/forgot' element='忘记密码页面' />
 </Routes>
}

export default App
```

```javascript
// src/Login.js

import sensors from 'sa-sdk-javascript'
import { Link } from "react-router-dom";
import { Form } from 'antd';
import Mobile from './components/Mobile';

export function Login() {
  return (
    <Form>
      <Mobile />
      <Link to="/forgot" onClick={() => sensors.track('forgot')}>忘记密码?</Link>
    </Form>
  );
}
```

#### 2.2.2 编写测试代码

1. 创建测试文件
2. 新增测试用例
   1. 引入相关依赖
   2. 模拟全局变量
   3. 模拟依赖包
   4. 渲染`被包裹起来`的组件
   5. 模拟用户操作
   6. 断言操作结果
3. 运行测试命令

```javascript
// src/__tests__/Login.test.jsx

import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom';
import App from '../App'

const mockTrack = jest.fn()
jest.mock('sa-sdk-javascript', () => ({
 track: (...params) => mockTrack(...params)
}))

Object.defineProperty(window, 'matchMedia', {
 value: () => ({
  addListener: () => { },
  removeListener: () => { },
 }),
});

describe('忘记密码相关测试', () => {
 test('点击忘记密码,要上报forgot神策事件', () => {
  render(<MemoryRouter initialEntries={['/login']}>
    <App />
  </MemoryRouter>)

  fireEvent.click(screen.getByText('忘记密码?'))

  expect(mockTrack).toBeCalledTimes(1)
  expect(mockTrack).toHaveBeenCalledWith('forgot');
 });

 test('点击忘记密码,要跳转到忘记密码页面', () => {
  render(<MemoryRouter initialEntries={['/login']}>
    <App />
  </MemoryRouter>)

  fireEvent.click(screen.getByText('忘记密码?'))

  expect(screen.getByText('忘记密码页面')).toBeInTheDocument()
 });
});
```

#### 2.2.3 测试结果

```bash
PASS  src/__tests__/Login.test.jsx
  忘记相关测试
    ✓ 点击忘记密码,要上报forgot神策事件 (78 ms)
    ✓ 点击忘记密码,要跳转到忘记密码页面 (18 ms)
```

#### 2.2.4 试一试

- 删除神策模拟`jest.mock('sa-sdk-javascript'...`
- 删除包裹层`<MemoryRouter...`

### 2.3 测试自动登录

需要结合localStorage,context和react-router一起进行验证

#### 2.3.1 编写业务代码

1. 新增一个context维护token
2. 新增个人中心页面路由
3. 登录页面引入对context的依赖
4. 将Mobile组件的状态管理通过props传递

```javascript
// src/context/Token.jsx

import React, { useState } from 'react'
import { useEffect } from 'react'

export const TokenContext = React.createContext('')

export const Token = ({ children }) => {
 const [ token, setToken ] = useState('')

 const storageToken = (mobile) => {
  localStorage.setItem('token', mobile)
  setToken(mobile)
 }

 useEffect(() => {
  setToken(localStorage.getItem('token') || '')
 }, [setToken])

 return <TokenContext.Provider value={{ token, storageToken }}>
  {children}
 </TokenContext.Provider>
}
```

```diff
// src/App.js

import { Routes, Route } from 'react-router-dom';
+ import { Token } from './context/Token';
import { Login } from './Login';

export const App = () => {
 return (
+  <Token>
   <Routes>
+    <Route path='/profile' element="个人中心页面" />
    <Route path='/login' element={<Login />} />
    <Route path='/forgot' element="忘记密码页面" />
   </Routes>
+  </Token>)
}

export default App
```

```diff
// src/Login.js

+ import { useContext, useEffect, useState } from 'react';
import sensors from 'sa-sdk-javascript'
+ import { Link, useNavigate } from "react-router-dom";
+ import { Form, Button } from 'antd';
import Mobile from './components/Mobile';
+ import { TokenContext } from './context/Token';

export function Login() {
+  const [mobile, setMobile] = useState('');
+  const { token, storageToken } = useContext(TokenContext)
+  const navigate = useNavigate()

+  useEffect(() => {
+    token && navigate('/profile')
+  }, [token, navigate])

  return (
    <Form>
+      <Mobile value={mobile} setValue={setMobile}/>
      <Link to="/forgot" onClick={() => sensors.track('forgot')}>忘记密码?</Link>
+      <Button disabled={!mobile} onClick={() => storageToken(mobile)}>登录</Button>
    </Form>
  );
}
```

```diff
// src/components/Mobile.js

const Mobile = ({ value, setValue }) => {
- const [value, setValue] = useState('');
+ const [err, setErr] = useState('');
```

#### 2.3.2 编写测试代码

1. 模拟全局变量
2. 模拟用户操作
3. 断言操作结果

```javascript
// src/__tests__/Login2.test.jsx

import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom';
import App from '../App'

Object.defineProperty(window, 'matchMedia', {
 value: () => ({
  addListener: () => { },
  removeListener: () => { },
 }),
});

const mockGetItem = jest.fn()
const mockSetItem = jest.fn()
Object.defineProperty(window, 'localStorage', {
 value: {
  getItem: () => mockGetItem(),
  setItem: (...params) => mockSetItem(...params),
 },
});

describe('自动登录相关测试', () => {
 test('如果storage中没有token,则停留在登录页面', () => {
  mockGetItem.mockReturnValueOnce(undefined)
  render(<MemoryRouter initialEntries={['/login']}>
   <App />
  </MemoryRouter>)

  expect(screen.getByText(/忘记密码/)).toBeInTheDocument();
 });

 test('点击登录按钮,要把token缓存到storage中,然后跳转个人中心页面', () => {
  mockGetItem.mockReturnValueOnce(undefined)
  render(<MemoryRouter initialEntries={['/login']}>
   <App />
  </MemoryRouter>)

  expect(screen.getByRole('button')).toHaveAttribute('disabled')

  fireEvent.input(screen.getByPlaceholderText('请输入手机号'), { target: { value: '13883198388' } })
  fireEvent.change(screen.getByPlaceholderText('请输入手机号'))
  expect(screen.getByRole('button')).not.toHaveAttribute('disabled')

  fireEvent.click(screen.getByRole('button'))
  expect(mockSetItem).toHaveBeenCalledWith('token', '13883198388');
  expect(screen.getByText('个人中心页面')).toBeInTheDocument();
 });

 test('如果storage中有token,则直接跳转个人中心页面', () => {
  mockGetItem.mockReturnValueOnce('13883198388')
  render(<MemoryRouter initialEntries={['/login']}>
   <App />
  </MemoryRouter>)

  expect(screen.getByText('个人中心页面')).toBeInTheDocument();
 });
});
```

#### 2.3.3 运行测试命令

```bash
PASS  src/__tests__/Login2.test.jsx
  自动登录相关测试
    ✓ 如果storage中没有token,则停留在登录页面 (71 ms)
    ✓ 点击登录按钮,要把token缓存到storage中,然后跳转个人中心页面 (131 ms)
    ✓ 如果storage中有token,则直接跳转个人中心页面 (17 ms)
```

#### 2.3.4 试一试

- 将模拟全局变量中的`getItem: () => mockGetItem...`修改成`getItem: mockGetItem`

## 3. 端到端测试
