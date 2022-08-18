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
} from "./endpoints";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const axiosAPI = {
  async getUser() {
    const response = await instance.get("", {
      params: {
        results: 1,
        inc: "name,email",
      },
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
  async getLessonCreate(param) {
    try {
      const response = await instance.post(LESSON_CREATE, param, {
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYwODM3NTkyLCJpYXQiOjE2NjA4MzAzOTIsImp0aSI6IjRjYjVkMDViODVjODRkZmE4ZTBmY2RjMDcxODA1MzM3IiwidXNlcl9pZCI6MjAsImVtYWlsIjoienp6ekBnbWFpbC5jb20iLCJuYW1lIjoidGVtcCJ9.p7oo0LGi_Hxb_Y_wOPNra7hoCTt02fbfm2HmKjD54V4",
        },
      });
      return response;
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
};
