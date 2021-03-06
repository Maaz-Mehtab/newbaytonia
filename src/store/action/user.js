import Api from '../../helpers/Apis'
import Endpoints from '../../helpers/EndPoints'
import { actionTypes } from './actionTypes'


export default {

    login: (data) => {
        return async dispatch => {
            dispatch({ type: actionTypes.LOADER_ON })
            try {
                let loginsuccess = await Api.post(Endpoints.Auth.login, data, false);
                loginsuccess.login = loginsuccess.success ? data.login : '';
                dispatch({ type: actionTypes.LOGIN, payload: loginsuccess })
                return Promise.resolve(loginsuccess)
            } catch (error) {
                dispatch({ type: actionTypes.LOADER_OFF })
                return Promise.reject(error)
            }
        }
    },
    signup: (data) => {
        return async dispatch => {
            dispatch({ type: actionTypes.LOADER_ON })
            try {
                let signupSuccess = await Api.post(Endpoints.Auth.signup, data, false)
                dispatch({ type: actionTypes.SIGNUP, payload: signupSuccess })
                return Promise.resolve(signupSuccess)
            } catch (error) {
                dispatch({ type: actionTypes.LOADER_OFF })
                return Promise.reject(error)
            }
        }
    },

    logout: (data) => {
        return async dispatch => {
            dispatch({ type: actionTypes.LOADER_ON })
            try {
                // let logoutSuccess = await Api.post(Endpoints.Auth.logout, data, false)
                dispatch({ type: actionTypes.LOGOUT, payload: {} })
                dispatch({ type: actionTypes.LOADER_OFF })
                return Promise.resolve(false)
            } catch (error) {
                dispatch({ type: actionTypes.LOADER_OFF })
                return Promise.reject(error)
            }
        }
    },
}