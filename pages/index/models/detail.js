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
      let query = qs.parse(location.search.slice(1));
      let data = {...query};
      yield put({ type: 'set', payload: data });
      
    },
  },
};