import axios from 'axios';
import { password } from '../constants/Constants';

const loginService = async (params) => {
    let qs = require('qs');
    let data = qs.stringify({
        'UserName': params.username,
       'Password': params.password,
       'grant_type': params.grantType 
       });
    let config = {
        method: 'post',
        url: 'http://wsstg01.devtpit.com/YokagowaEnergyAPI/token',
        headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
    };

     return await axios(config).then(result => {
        return result;
      }).catch(error => {
        alert(error);
      });
}

export default loginService;
