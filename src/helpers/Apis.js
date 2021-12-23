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
            let response = await fetch(url, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify(data)
            })

            let jsonResponse = await response.json(response);
            if (response.status == 200) {
                return Promise.resolve(jsonResponse);
            }
            else
                return Promise.reject(jsonResponse);
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
            let response = await fetch(url, {
                headers: headers,
                method: 'GET',
                // body: JSON.stringify(data)
            })

            let jsonResponse = await response.json(response);


            if (response.status == 200) {
                return Promise.resolve(jsonResponse);
            }
            else
                return Promise.reject(jsonResponse);
        },

    put:
        async (endpoint, data, login) => {
            let url = dev_url + endpoint;
            console.log("url", url);
            console.log("data", JSON.stringify(data));
            console.log("login", login);
            let headers = {
                "Accept": "application/json",
                "Authorization": BASIC_AUTH_KEY,
                "Login": login,
                "lang": 'en_US'
            }
            //  delete data.login;
            let response = await fetch(url, {
                headers: headers,
                method: 'put',
                body: JSON.stringify(data)
            })

            let jsonResponse = await response.json(response);
            if (response.status == 200) {
                return Promise.resolve(jsonResponse);
            }
            else
                return Promise.reject(jsonResponse);
        },
}

export default Api;