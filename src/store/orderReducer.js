// action - state management
import {
    CHANGE_AMOUNT,
    REQUEST, REQUEST_FAILURE,
    REQUEST_SUCCESS,
    SET_ACTION_TYPE,
    SET_AMOUNT,
    SET_AMOUNT_DISABLED,
    SET_URL
} from "./actions";

// ==============================|| ACCOUNT REDUCER ||============================== //

const initialState = {
    name: '',
    description: '',
    action_id: '',
    action_type: '',
    type: '',
    url: 'https://www.instagram.com/p/ChQmiQ0Lcog/',
    amount: 0,
    amount_disabled: false,
    isLoading: false,
    high: 0,
    low: 0
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACTION_TYPE:
            const { service } = action.payload;
            return {
                ...state,
                action_type: service.action_type,
                description: service.description,
                name: service.name,
                action_id: service.action_id,
                type: service.type
            };
        case SET_URL:
            const { url } = action.payload;
            return {
                ...state,
                url: url
            };
        case SET_AMOUNT:
            const {amount} = action.payload;
            return {
                ...state,
                amount
            }
        case CHANGE_AMOUNT:
            const {amountt} = action.payload;
            return {
                ...state,
                amount: amountt
            }
        case SET_AMOUNT_DISABLED:
            const {amount_disabled} = action.payload;
            return {
                ...state,
                amount_disabled: amount_disabled
            }

        case REQUEST:
            const {request} = action.payload;
            return {
                ...state,
                isLoading: request
            }

        case REQUEST_SUCCESS:
            const {request_success} = action.payload;
            return {
                ...state,
                isLoading: request_success
            }
        case REQUEST_FAILURE:
            const {request_failure} = action.payload;
            return {
                ...state,
                isLoading: request_failure
            }
        default:
            return { ...state };
    }
};
export default orderReducer;
