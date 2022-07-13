import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

export const axiosAPI = {
    async getUser() {
        return await instance.get('', {
                params: {
                    results: 1,
                    inc: 'name,email'
                }
            }).then(response => {
                return response.data;
            });
    }
}