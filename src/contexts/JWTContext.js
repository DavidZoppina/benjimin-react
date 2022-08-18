import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
// import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';

const chance = new Chance();

// constant
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null,
    token: null
};

// const verifyToken = (serviceToken) => {
//     if (!serviceToken) {
//         return false;
//     }
//     const decoded = jwtDecode(serviceToken);
//     /**
//      * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
//      */
//     return decoded.exp > Date.now() / 1000;
// };

const setSession = (serviceToken) => {
    if (serviceToken) {
        // eslint-disable-next-line no-undef
        localStorage.setItem('user', serviceToken);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        // eslint-disable-next-line no-undef
        localStorage.removeItem('user');
        delete axios.defaults.headers.common.Authorization;
    }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    useEffect(() => {
        const init = async () => {
            try {
                // eslint-disable-next-line no-undef
                let serviceToken = null;
                if (window.localStorage.getItem('user') != null){
                    serviceToken = JSON.parse(window.localStorage.getItem('user')).token;
                }

                if (serviceToken != null) {
                    // eslint-disable-next-line no-undef
                    const { affiliate, token } = JSON.parse(window.localStorage.getItem('user'));
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            user: affiliate,
                            token: token
                        }
                    });
                } else {
                    dispatch({
                        type: LOGOUT
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: LOGOUT
                });
            }
        };

        init();
    }, []);

    const login = async (email, password) => {
        const response = await axios.post('https://api-pandora.lol/api/v1/signin', { email, password });
        const { serviceToken, user } = response.data;
        setSession(serviceToken);
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true,
                user
            }
        });
    };

    const register = async (email, password, firstName, lastName) => {
        // todo: this flow need to be recode as it not verified
        const id = chance.bb_pin();
        const response = await axios.post('/api/account/register', {
            id,
            email,
            password,
            firstName,
            lastName
        });
        let users = response.data;

        // eslint-disable-next-line no-undef
        if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
            // eslint-disable-next-line no-undef
            const localUsers = window.localStorage.getItem('users');
            users = [
                ...JSON.parse(localUsers),
                {
                    id,
                    email,
                    password,
                    name: `${firstName} ${lastName}`
                }
            ];
        }

        // eslint-disable-next-line no-undef
        window.localStorage.setItem('users', JSON.stringify(users));
    };

    const logout = () => {
        setSession(null);
        dispatch({ type: LOGOUT });
    };

    const resetPassword = (email) => console.log(email);

    const updateProfile = () => {};

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default JWTContext;
