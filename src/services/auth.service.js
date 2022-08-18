import axios from 'axios';
import config from "../config";

const login = async (username, password) => {
    return await axios
        .post(
            `${config.base_url}/auth/signin`,
            JSON.stringify({
                username,
                password
            }),
            {
                headers: {"Content-Type": "application/json"}
            }
        )
        .then((response) => {
            if (response.data.affiliate.username) {
                // eslint-disable-next-line no-undef
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
}

const AuthService = {
    login
};

export default AuthService;
