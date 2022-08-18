import axios from 'axios';
import config from "../config";

const order_history = async (token) => {
    // eslint-disable-next-line no-return-await
     return await axios
        .get(
            `${config.base_url}/users/me/history`,
            {
                headers: {
                    'auth-token': token,
                }
            },
        )
        .then((response) => {
            return response.data;
        });
};

const services = async (token) => {
    return await axios.get(
        `${config.base_url}/users/me/services`,
        {
            headers: {
                'auth-token': token,
            }
        },
    ).then((response) => {
        return response.data;
    });
}

const service_availables = async (token, action_type, input_url) => {
    return await axios.get(
        `${config.base_url}/order/availables?action=${action_type}&url=${input_url}`,
        {
            headers: {
                'auth-token': token,
            }
        },
    ).then((response) => {
        return response.data;
    });
}

const new_order = async (token, type, url, amount) => {
    return await axios.post(
        `${config.base_url}/order/new`,
        {
            "type": type,
            "url": url,
            "amount": amount
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token,
            }
        },
    ).then((response) => {
        return response.data;
    })
}


const user_info = async (token) => {
    return await axios.get(
        `${config.base_url}/users/me`,
        {
            headers: {
                'auth-token': token,
            }
        },
    ).then((response) => {
        return response.data;
    });
}


const OrderService = {
    order_history,
    services,
    service_availables,
    new_order,
    user_info
};

export default OrderService;
