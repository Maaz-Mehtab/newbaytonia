import Api from '../../helpers/Apis';
import Endpoints from '../../helpers/EndPoints';
import {actionTypes} from './actionTypes';

export default {
  resetOrderDetail: () => {
    return async dispatch => {
      dispatch({type: actionTypes.RESET_ORDER_DETAIL});
    };
  },

  deliveryOrder: id => {
    return async dispatch => {
      let url = Endpoints.Auth.delivery_boy + id + '/dashboard';
      // dispatch({ type: actionTypes.LOADER_ON })
      try {
        let response = await Api.get(
          Endpoints.Auth.delivery_boy + id + '/dashboard',
          {},
        );
        dispatch({type: actionTypes.FETCH_DELIVER_ORDER, payload: response});
        dispatch({type: actionTypes.LOADER_OFF});
        return Promise.resolve(response);
      } catch (error) {
        dispatch({type: actionTypes.LOADER_OFF});
        return Promise.reject(error);
      }
    };
  },
  receivedOrder: id => {
    return async dispatch => {
      let url = Endpoints.Auth.delivery_boy + id + '/dashboard?state=accept';
      // dispatch({ type: actionTypes.LOADER_ON })
      try {
        let response = await Api.get(
          Endpoints.Auth.delivery_boy + id + '/dashboard?delivery_type=receive',
          {},
        );
        dispatch({type: actionTypes.FETCH_RECEIVED_ORDER, payload: response});
        dispatch({type: actionTypes.LOADER_OFF});
        return Promise.resolve(response);
      } catch (error) {
        dispatch({type: actionTypes.LOADER_OFF});
        return Promise.reject(error);
      }
    };
  },
  returnOrder: id => {
    return async dispatch => {
      // dispatch({ type: actionTypes.LOADER_ON })
      try {
        let response = await Api.get(
          Endpoints.Auth.delivery_boy + id + '/dashboard?delivery_type=return',
          {},
        );
        dispatch({type: actionTypes.FETCH_RETURN_ORDER, payload: response});
        dispatch({type: actionTypes.LOADER_OFF});
        return Promise.resolve(response);
      } catch (error) {
        dispatch({type: actionTypes.LOADER_OFF});
        return Promise.reject(error);
      }
    };
  },
  getReasonsList: (id, login) => {
    return async dispatch => {
      // dispatch({ type: actionTypes.LOADER_ON })
      try {
        let response = await Api.get(
          Endpoints.Auth.delivery_boy + 'get_reasons',
          login,
        );
        dispatch({type: actionTypes.FETCH_REASON_LIST, payload: response});
        dispatch({type: actionTypes.LOADER_OFF});
        return Promise.resolve(response);
      } catch (error) {
        dispatch({type: actionTypes.LOADER_OFF});
        return Promise.reject(error);
      }
    };
  },
  sendOtpCode: (id, login) => {
    return async dispatch => {
      // dispatch({ type: actionTypes.LOADER_ON })
      try {
        let response = await Api.get(Endpoints.Auth.getOtp + id, login);
        dispatch({type: actionTypes.GET_OTP, payload: response});
        dispatch({type: actionTypes.LOADER_OFF});
        return Promise.resolve(response);
      } catch (error) {
        dispatch({type: actionTypes.LOADER_OFF});
        return Promise.reject(error);
      }
    };
  },

  orderDetail: (id, login) => {
    return async dispatch => {
      dispatch({type: actionTypes.LOADER_ON});
      try {
        let response = await Api.get(
          Endpoints.Auth.delivery_boy + 'pickings/' + id,
          login,
        );
        dispatch({type: actionTypes.FETCH_ORDER_DETAIL, payload: response});
        dispatch({type: actionTypes.LOADER_OFF});
        return Promise.resolve(response);
      } catch (error) {
        dispatch({type: actionTypes.LOADER_OFF});
        return Promise.reject(error);
      }
    };
  },

  acceptOrder: (id, data, login) => {
    return async dispatch => {
      dispatch({type: actionTypes.LOADER_ON});
      try {
        let response = await Api.put(
          Endpoints.Auth.delivery_boy + 'pickings/' + id, 
          data,
          login,
        );
        dispatch({type: actionTypes.ACCEPT_ORDER, payload: response});
        return Promise.resolve(response);
      } catch (error) {
        dispatch({type: actionTypes.LOADER_OFF});
        return Promise.reject(error);
      }
    };
  },

  acceptMultiOrder: (data, login) => {
    return async dispatch => {
      dispatch({type: actionTypes.LOADER_ON});
      try {
        let response = await Api.postWithToken(
          Endpoints.Auth.delivery_boy + 'pickings/bulk',
          data,
          login,
        );
        dispatch({type: actionTypes.ACCEPT_ORDER, payload: response});
        return Promise.resolve(response);
      } catch (error) {
        dispatch({type: actionTypes.LOADER_OFF});
        return Promise.reject(error);
      }
    };
  },

  saveReasonDelivery: (orderId, formData) => {
    return async dispatch => {
      dispatch({type: actionTypes.LOADER_ON});
      try {
        let response = await Api.apiPost(
          Endpoints.Auth.set_reason + orderId,
          formData,
          false,
        );
        // loginsuccess.login = loginsuccess.success ? data.login : '';
        dispatch({type: actionTypes.DELEVIERY_FAILED_POST, payload: response});
        dispatch({type: actionTypes.LOADER_OFF});
        return Promise.resolve(response);
      } catch (error) {
        dispatch({type: actionTypes.LOADER_OFF});
        return Promise.reject(error);
      }
    };
  },
};
