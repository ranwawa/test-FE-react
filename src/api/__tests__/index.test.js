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
