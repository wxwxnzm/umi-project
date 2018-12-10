### 基于umi构建的多页应用

##### 待改善的事

1. ajax请求的封装：代码 ×
2. 打包的地址问题：会删除outputPath目录下的文件，这是我不想要的 √
3. 根据部署环境打包问题： 测试环境需要vconsole,线上不需要√
4. 打包想打包出dll来，多页好利用缓存，目前umi只在dev有这功能 √

##### ajax需求
1. 页面代码连url都不需要传，只需要传【业务】参数
2. 业务模块代码定义: url, 是否json发送/from发送/form-data发送, 是否json接受/arrayBuffer,blob/,  是否统一showerror 等
3. axios请求封装定义: 支持请求前数据，请求后code，showerror等
```
// index.js
const {a, b, c} = await getDetail(data);

// service/detail.js
import {httpGet, httpPost} srvice/request;
export const getDetail = (data) => {
    return httpGet('/get/arc/detail', data, 1)
}
export const delDetail = (data) => {
    return httpPost('/del/arc/detail', data, 1, 'from', 'araayBuffer')
}

// service/request;
import axios from 'axios';
export const httpPost = (url, data, isNeedShowError, requestType, responseType) => {
    ...
    return axios({
        ...
    })
}
```
