// action - state management
import { LOGIN, LOGOUT, REGISTER } from './actions';

// ==============================|| ACCOUNT REDUCER ||============================== //

const accountReducer = (state, action) => {
    switch (action.type) {
        case REGISTER: {
            const { user } = action.payload;
            return {
                ...state,
                user
            };
        }
        case LOGIN: {
            const { user, token } = action.payload;
            return {
                ...state,
                isLoggedIn: true,
                isInitialized: true,
                user,
                token
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isInitialized: true,
                isLoggedIn: false,
                user: null,
                token: null
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
