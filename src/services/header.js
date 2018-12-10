import {request} from 'utils/req';
export const doAsk = async (params) => {
    console.log(request);
    return await request(params)
}