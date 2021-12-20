import { BaseURL ,BASIC_AUTH_KEY} from '../helpers/config';
import axios from 'axios';
const dev_url = BaseURL

const Api = {
    post:
        async (endpoint, data, formdata, token = '') => {
            let url = dev_url + endpoint;
            let headers = {
                "Accept": "application/json",
                "Authorization":BASIC_AUTH_KEY,
                "Login":data.login,
                "lang":'en_US'
             }
            //  delete data.login;
            let obj={};
            obj.fcmToken=data.fcmToken;
            obj.fcmDeviceId = data.fcmDeviceId
            let response = await fetch(url, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify(data)
            })

            let jsonResponse = await response.json(response);

            console.log(response);

            if (response.status == 200) {
                return Promise.resolve(jsonResponse);
            }
            else
                return Promise.reject(jsonResponse);
        },
    get:
        async (endpoint, token) => {
            let url = dev_url + endpoint;
            let headers = {
                'Content-Type': 'application/json',
                "X-Requested-With": "application/x-www-form-urlencoded",
                "auth-token": token
            }
            let response = await fetch(url, {
                headers: headers,
                method: 'GET',
                // body: JSON.stringify(data)
            })

            let jsonResponse = await response.json(response);

            console.log(response);

            if (response.status == 200) {
                return Promise.resolve(jsonResponse);
            }
            else
                return Promise.reject(jsonResponse);
        }
}

export default Api;