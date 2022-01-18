import Api from '../../helpers/Apis'
import Endpoints from '../../helpers/EndPoints'
import { actionTypes } from './actionTypes'


export default {

    deliveryOrder: (id) => {
        return async dispatch => {
            let url = Endpoints.Auth.delivery_boy+id+"/dashboard";
            // dispatch({ type: actionTypes.LOADER_ON })
            try {
                let response = await Api.get(Endpoints.Auth.delivery_boy+id+"/dashboard",{})
                dispatch({ type: actionTypes.FETCH_DELIVER_ORDER, payload: response })
                dispatch({ type: actionTypes.LOADER_OFF })
                return Promise.resolve(response)
            } catch (error) {
                dispatch({ type: actionTypes.LOADER_OFF })
                return Promise.reject(error)
            }
        }
    },
    returnOrder: (id) => {
        return async dispatch => {
            // dispatch({ type: actionTypes.LOADER_ON })
            try {
                let response = await Api.get(Endpoints.Auth.delivery_boy+id+"/dashboard?delivery_type=return",{})
                dispatch({ type: actionTypes.FETCH_RETURN_ORDER, payload: response })
                dispatch({ type: actionTypes.LOADER_OFF })
                return Promise.resolve(response)
            } catch (error) {
                dispatch({ type: actionTypes.LOADER_OFF })
                return Promise.reject(error)
            }
        }
    },
   
    orderDetail: (id,login) => {
        return async dispatch => {
            dispatch({ type: actionTypes.LOADER_ON })
            try {
                let response = await Api.get(Endpoints.Auth.delivery_boy + "pickings/" + id, login)
                dispatch({ type: actionTypes.FETCH_ORDER_DETAIL, payload: response })
                dispatch({ type: actionTypes.LOADER_OFF })
                return Promise.resolve(response)
            } catch (error) {
                dispatch({ type: actionTypes.LOADER_OFF })
                return Promise.reject(error)
            }
        }
    },

    acceptOrder: (id,data,login) => {
        return async dispatch => {
            dispatch({ type: actionTypes.LOADER_ON })
            try {
                let response = await Api.put(Endpoints.Auth.delivery_boy+"pickings/"+id, data,login)
                dispatch({ type: actionTypes.ACCEPT_ORDER, payload: response })
                return Promise.resolve(response)
            } catch (error) {
                dispatch({ type: actionTypes.LOADER_OFF })
                return Promise.reject(error)
            }
        }
    },
   
}