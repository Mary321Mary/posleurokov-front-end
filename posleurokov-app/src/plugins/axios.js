import axios from 'axios';
import {
    CATEGORIES,
    RANDOM_LESSONS,
    CITIES
} from './endpoints';

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
        try {
            const response = await instance.get(CATEGORIES);
            return response.data;
        } catch (error) {
            console.error(error);
        }
        return 'Ошибка сервера';
    },
    async getRandomLessons() {
        try {
            const response = await instance.get(RANDOM_LESSONS);
            return response.data;
        } catch (error) {
            console.error(error);
        }
        return 'Ошибка сервера';
    },
    async getCities() {
        try {
            const response = await instance.get(CITIES);
            return response.data;
        }
        catch (error) {
            console.error(error)
        }
        return "Ошибка сервера";
    }
}