import { isValidMobile, isValidPassword } from '../index.js';

describe('验证函数', () => {
  it('输入正确的手机号码返回true', () => {
    expect(isValidMobile('13883198386')).toBe(true);
  });

  it('输入错误的手机号码返回false', () => {
    expect(isValidMobile('51682621')).toBe(false);
  });

  it('输入正确的密码返回true', () => {
    expect(isValidPassword('abc')).toBe(false);
  });

  it('输入错误的密码返回false', () => {
    expect(isValidPassword('abcdefg123')).toBe(true);
  });
});
