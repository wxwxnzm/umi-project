import axios from 'axios';
import {Toast} from 'antd-mobile';
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log(response, 'response')
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    if (error.response && error.response.data && error.response.data.resultCode !== 0) {
        Toast.fail(error.response.data.resultMessage)
    } else {
        Toast.fail('请求')
    }
    return {
        resultCode: -1
    }
    // return Promise.reject({
    //     resultCode: -1
    // });
  });
  