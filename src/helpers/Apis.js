import axios from 'axios';
import { BaseURL, BASIC_AUTH_KEY } from '../helpers/config';
const dev_url = BaseURL

const Api = {
    post:
        async (endpoint, data, formdata, token = '') => {
            let url = dev_url + endpoint;
            let headers = {
                "Accept": "application/json",
                "Authorization": BASIC_AUTH_KEY,
                "Login": data.login,
                "lang": 'en_US'
            }
            //  delete data.login;
            let obj = {};
            obj.fcmToken = data.fcmToken;
            obj.fcmDeviceId = data.fcmDeviceId

            let response = await axios.post(url, JSON.stringify(data), { headers })
            if (response.status == 200) {
                return Promise.resolve(response.data);
            }
            else
                return Promise.reject(response.data);
        },
    get:
        async (endpoint, data) => {
            let url = dev_url + endpoint;
            let headers = {
                "Accept": "application/json",
                "Authorization": BASIC_AUTH_KEY,
                "lang": 'en_US',
                "Login": data
            }
            let response = await axios.get(url, { headers })
            if (response.status == 200) {
                return Promise.resolve(response.data);
            }
            else
                return Promise.reject(response.data);
        },

    put:
        async (endpoint, data, login) => {
            let url = dev_url + endpoint;
            let headers = {
                "Accept": "application/json",
                "Authorization": BASIC_AUTH_KEY,
                "Login": login,
                "lang": 'en_US'
            }
            var bodyFormData = new FormData();
            bodyFormData.append('state', data.state);
            if(data.token){
                bodyFormData.append('token', data.token);
            }
            //  delete data.login;
            // let response = await fetch(url, {
            //     headers: headers,
            //     method: 'put',
            //     body: JSON.stringify(data)
            // })
            console.log("bodyFormData",bodyFormData);
            let response = await axios.put(url, bodyFormData, { headers })
            if (response.status == 200) {
                return Promise.resolve(response.data);
            }
            else
                return Promise.reject(response.data);
        },
}

export default Api;