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
