import { isMobile, REG_MOBILE } from '..';

describe('验证手机号码函数相关测试', () => {
  test('输入正确的手机号码:13333333333,应该返回true', () => {
    const res = isMobile('13333333333');
    expect(res).toBe(true);
  });

  test('输入错误的手机号码:1333333,应该返回false', () => {
    const res = isMobile('1333333');
    expect(res).toBe(false);
  });

  test('手机号码的正则表达式应该是11位数字', () => {
    expect(REG_MOBILE).toMatchSnapshot();
  });
});
