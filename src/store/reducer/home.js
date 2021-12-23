const INITIAL_STATE = {

    loading: false,
    deliverOrder: '',
    returnOrder: '',
    oderDetail:'',
}
import { actionTypes } from '../action/actionTypes';
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case actionTypes.FETCH_DELIVER_ORDER:
            return ({
                ...state,
                loading: false,
                deliverOrder: action.payload
            })
            case actionTypes.FETCH_ORDER_DETAIL:
                return ({
                    ...state,
                    loading: false,
                    oderDetail: action.payload
                })
            
        case actionTypes.FETCH_RETURN_ORDER:
            return ({
                ...state,
                loading: false,
                returnOrder: action.payload
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