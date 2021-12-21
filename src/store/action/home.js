import Api from '../../helpers/Apis'
import Endpoints from '../../helpers/EndPoints'
import { actionTypes } from './actionTypes'


export default {

    deliveryOrder: (id) => {
        return async dispatch => {
            let url = Endpoints.Auth.delivery_boy+id+"/dashboard";
            dispatch({ type: actionTypes.LOADER_ON })
            try {
                let response = await Api.get(Endpoints.Auth.delivery_boy+id+"/dashboard",{})
                dispatch({ type: actionTypes.FETCH_DELIVER_ORDER, payload: response })
                return Promise.resolve(response)
            } catch (error) {
                dispatch({ type: actionTypes.LOADER_OFF })
                return Promise.reject(error)
            }
        }
    },
    returnOrder: (id) => {
        return async dispatch => {
            dispatch({ type: actionTypes.LOADER_ON })
            try {
                let response = await Api.get(Endpoints.Auth.delivery_boy+id+"/dashboard?delivery_type=return",{})
                dispatch({ type: actionTypes.FETCH_RETURN_ORDER, payload: response })
                return Promise.resolve(response)
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
                let logoutSuccess = await Api.post(Endpoints.Auth.logout, data, false)
                dispatch({ type: actionTypes.LOGOUT, payload: logoutSuccess })
                return Promise.resolve(logoutSuccess)
            } catch (error) {
                dispatch({ type: actionTypes.LOADER_OFF })
                return Promise.reject(error)
            }
        }
    },
}