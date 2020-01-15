import axios from 'axios';
import config from '../../../../config';

export const callAPI = (router, data, header) => {
    axios.post(`${config.host}${router}`, data, { headers: { header } })
        .then(res => ({ success: true, res: res }))
        .catch(err => ({ success: false, err: err }))
}