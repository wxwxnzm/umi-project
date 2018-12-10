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
  
export const getAppDetail = async (params) => {
    // test
    return await axios.get('/eduboss/app/StudentCommentManageAppController/findReplyRecord4Teacher.do', {
        params
    });
    // test
    // try {
        const {resultCode, resultMessage, data} =  await axios.get('/eduboss/app/StudentCommentManageAppController/findReplyRecord4Teacher.do', {
            params
        });
        // console.log()
          if (resultCode === 0) {
              console.log(data, 'data')
              return data;
          } else {
            //   console.log(resultCode, 'resultCode')
            // Toast.fail(resultMessage || '获取留言失败')
          }
    // } catch(err) {
        // console.log(err, 'er');
        // Toast.fail('获取留言失败')
    // }
    
}
export const getWechatDetail = async (params) => {
    // try {
        const {resultCode, resultMessage, data} =  await axios.get('/eduboss/weChat/studentCommentReplyRecordWeChatController/findReplyRecord4Student.do', {
            params
        });
        // console.log()
          if (resultCode === 0) {
              console.log(data, 'data')
              return data;
          } else {
              return {}
            //   console.log(resultCode, 'resultCode')
            // Toast.fail(resultMessage || '获取留言失败')
          }
    // } catch(err) {
        // console.log(err, 'er');
        // Toast.fail('获取留言失败')
    // }
    
}

export async function updateCommentApp(params = {}) {
    return axios.get('/eduboss/app/StudentCommentManageAppController/modifyReplyRecord4Teacher.do', {params});
}
export async function addCommentApp(params = {}) {
    return axios.get('/eduboss/app/StudentCommentManageAppController/saveReplyRecord4Teacher.do', {params});
}
export async function updateCommentWechat(params = {}) {
    return axios.get('/eduboss/weChat/studentCommentReplyRecordWeChatController/modifyReplyRecord4Student.do', {params});
}
export async function addCommentWechat(params = {}) {
    return axios.get('/eduboss/weChat/studentCommentReplyRecordWeChatController/saveReplyRecord4Student.do', {params});
}

export const getAliConfigAndPostFiles = async (files, aliPath) => {
    var filesLength = files.length;
    const {resultCode, data} = await axios.get('/eduboss/weChat/ossWebController/getWebFileStsAuth.do', {
        clientType: 'PC', 
        fileCount: filesLength 
    });
    if (resultCode == 0) {
      var ossObj = data;
      var client = new OSS.Wrapper({
          endpoint: ossObj.endPoint,
          accessKeyId: ossObj.accessKeyId,
          accessKeySecret: ossObj.accessKeySecret,
          stsToken: ossObj.securityToken,
          bucket: ossObj.bucketName,
      });
      var item = files[0],
      fileType = item.name.substring(item.name.lastIndexOf(".")),
      ossFileName = ossObj.objectKeys[0] + fileType;
      const {name} = await client.multipartUpload(ossFileName, item);
      if (name) {
        return {
          success: true,
          data: {
            url: aliPath + name,
          }
        };
      } else {
        return {
            success: false,
        };
      }
    } else {
      return {success: false}
    }
  
}