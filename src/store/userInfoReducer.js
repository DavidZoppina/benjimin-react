import {SET_USER_INFO} from "./actions";

const initialState = {
    high: 0,
    low: 0
}

const userInfoReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_USER_INFO:
            const {user_info} = action.payload;
            return {
                ...state,
                high: user_info.high,
                low: user_info.low
            };
        default:
            return {
                ...state
            }

    }
};

export default userInfoReducer