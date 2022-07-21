import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

export const axiosAPI = {
    async getUser() {
        const response = await instance.get('', {
            params: {
                results: 1,
                inc: 'name,email'
            }
        });
        return response.data;
    },
    async getCategories() {
        const response = await instance.get('categories');
        return response.data;
    }
}