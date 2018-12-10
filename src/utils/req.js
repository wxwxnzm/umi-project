import axios from 'axios';
import {Toast} from 'antd-mobile';
function showError(e) {
    Toast(e);
}
const request = async (opts, isNeedShowError) => {
    const backData = await axios(opts);
    console.log(backData);
    if (isNeedShowError) {
        showError();
    }
}

export default {
    request
}