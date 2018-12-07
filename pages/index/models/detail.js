import {getAppDetail, getWechatDetail} from 'services';
import qs from 'qs';
export default {
  namespace: 'detail',
  state: {
    id: '',
  },
  
  reducers: {
    set(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    itemSet(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    },
    signin(state) {
      return {
        ...state,
        login: true,
      };
    },
  },
  effects: {
    *throwError() {
      throw new Error('hi error');
    },
    *get({ payload }, { call, put }) {
      // http://uat3.xuebangsoft.net/eduboss/MobileInterface/staffPhoneLogin.do?contact=18825154993&passwordMd5=666666
      let query = qs.parse(location.search.slice(1));
      let data = {...query};
      console.log(query, 'qu')
      if (query.id) {
        const detail = yield call(query.from === 'app' ? getAppDetail : getWechatDetail, { id: query.id, token: query.token});
        const d = getList(detail.content);
        data = {...data, ...d};
      }
      yield put({ type: 'set', payload: data });
      
      // yield put({ type: 'loading', payload: { loading: false } });
    },
    // *loading({ payload: { loading } }, { put }) {
    //   yield put({ type: 'handleLoading', payload: { loading } });
    // },
  },
};

function getList(content) {
// 111111<div><br></div><div>2222222</div><video src="https://pingtai-uat.oss-cn-shenzhen.aliyuncs.com/0a10c0ea-c6b6-4fab-a26c-02af5c7996f4.mp4" ></video><img src="https://oss-uat.xuebangsoft.net/788b34be-0276-4c24-8e5a-602dac423bdd.jpg" ></img>
  var list = [];
  content = content.replace(/((<video.*?src="(.*?)".*?\/?>(<\/video>)?)|(<img.*?src="(.*?)"(.*?)>(<\/img>)?))/g, function(type, a, b, c, d, f, g, h){
      if (type.indexOf('<video') === 0) {
        list.push({ type: 'video', url: c });
      } else {
        list.push({ type: 'image', url: g });
      }
      return '';
  });
  return {
    list,
    content
  }
}