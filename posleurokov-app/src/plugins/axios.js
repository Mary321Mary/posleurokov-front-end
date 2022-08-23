import axios from "axios";

import {
  CATEGORIES,
  RANDOM_LESSONS,
  CITIES,
  COURSES,
  ADDITIONAL,
  POPULARS,
  LESSON,
  LESSON_CREATE,
  CATEGORIES_LIST,
  SIMILARS,
  SIGNUP,
  LOGIN,
} from "./endpoints";

let instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const axiosAPI = {
  async getCategories() {
    try {
      const response = await instance.get(CATEGORIES);
      return response.data;
    } catch (error) {
      console.error(error);
    }
    return "Ошибка сервера";
  },
  async getAdditional() {
    try {
      const response = await instance.get(ADDITIONAL);
      return response.data;
    } catch (error) {
      console.error(error);
    }
    return "Ошибка сервера";
  },
  async getCities() {
    try {
      const response = await instance.get(CITIES);
      return response.data;
    } catch (error) {
      console.error(error);
    }
    return "Ошибка сервера";
  },
  async getCourses(params) {
    try {
      const response = await instance.get(COURSES + params);
      return response.data;
    } catch (error) {
      console.error(error);
    }
    return "Ошибка сервера";
  },
  async getPopulars(city) {
    try {
      const response = await instance.get(POPULARS(city));
      return response.data.popular;
    } catch (error) {
      console.error(error);
    }
    return "Ошибка сервера";
  },
  async getRandomLessons(param) {
    try {
      const response = await instance.get(RANDOM_LESSONS + param);
      return response.data;
    } catch (error) {
      console.error(error);
    }
    return "Ошибка сервера";
  },
  async getLessonInfo(id) {
    try {
      const response = await instance.get(LESSON(id));
      return response.data;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async getLessonOrganization(id) {
    try {
      const response = await instance.get(LESSON(id) + "/organization");
      return response.data;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async subscribe(id) {
    try {
      const response = await instance.put(LESSON(id) + '/subscribe/', {},
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
        });
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  },
  async getLessonCreate(param) {
    try {
      const response = await instance.post(LESSON_CREATE, param, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      });
      return response;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  },
  async getSimilar(params) {
    try {
      const response = await instance.get(SIMILARS + params);
      return response.data.commonLessons;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async getSignUp(params) {
    try {
      const response = await instance.post(SIGNUP, { user: params }, {});
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  },
  async getLogin(params) {
    try {
      const response = await instance.post(LOGIN, { user: params }, {});
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  },
  async getCategoriesList() {
    try {
      const response = await instance.get(CATEGORIES_LIST);
      return response.data.categories;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async sendCorrection(id, correction) {
    try {
      const response = await instance.post(LESSON(id) + '/correct/', { 'correction': correction }, {});
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  },
  async sendApplication(id, phone) {
    try {
      const response = await instance.post(LESSON(id) + '/contact/', { 'phone': phone }, {});
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  },
};
