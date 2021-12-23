const INITIAL_STATE = {
    userdata: '',
    login: '',
    access_token: '',
    loading: false,
}
import { actionTypes } from '../action/actionTypes';
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case actionTypes.LOGIN:
            return ({
                ...state,
                loading: false,
                userdata: action.payload,
                login: action.payload?.login
            })
        case actionTypes.SIGNUP:
            return ({
                ...state,
                loading: false,
            })
        case actionTypes.LOGOUT:
            return ({
                ...state,
                access_token: '',
                userdata: '',
                login:'',
                loading: false,
            })
        case actionTypes.LOADER_ON:
            return ({
                ...state,
                loading: true
            })
        case actionTypes.LOADER_OFF:
            return ({
                ...state,
                loading: false
            })
        default:
            return state;
    }

}