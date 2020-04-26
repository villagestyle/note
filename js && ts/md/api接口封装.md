```
// axios 封装
export const ajax = async ({ url, data = {} }) => {
  const ret = await axios({
    method: 'post',
    url: config.baseUrl + url,
    transformRequest: (data) => {
      let ret = [];
      for (let it in data) {
        ret.push(encodeURIComponent(it) + '=' + encodeURIComponent(data[it]));
      }
      return ret.join('&');
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  });
  return ret;
};

export const ajaxPayload = async ({ url, data = {} }) => {
  const ret = await axios({
    method: 'post',
    url: config.baseUrl + url,
    data
  });
  return ret;
};

export const ajaxDelete = async ({ url, data = {} }) => {
  const ret = await axios.delete(config.baseUrl + url, {
    data
  });
  return ret;
};

export const ajaxPut = async ({ url, data = {} }) => {
  const ret = await axios.put(config.baseUrl + url, data);
  return ret;
};

export const ajaxGet = async ({ url, data = {} }) => {
  const ret = await axios({
    method: 'get',
    url: config.baseUrl + url,
    params: data
  });
  return ret;
};

/* 项目请求接口 */
export const post = async (url, data = {}) => {
  const ret = await ajax({ url, data });
  // 数据监测
  return dataCheck(ret);
};
/*
export const axiosPost = async (url) => {
  const ret = await axios.post(config.baseUrl + url);
  return dataCheck(ret);
};
*/

export const payloadPost = async (url, data = {}) => {
  const ret = await ajaxPayload({ url, data });
  return dataCheck(ret);
};

export const put = async (url, data = {}) => {
  const ret = await ajaxPut({ url, data });
  return dataCheck(ret);
};

export const Delete = async (url, data = {}) => {
  const ret = await ajaxDelete({ url, data });
  return dataCheck(ret);
};

export const get = async (url, data = {}) => {
  const ret = await ajaxGet({ url, data });
  return dataCheck(ret);
};
```