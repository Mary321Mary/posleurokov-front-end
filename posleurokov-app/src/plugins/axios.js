import axios from "axios";
import {
  CATEGORIES,
  RANDOM_LESSONS,
  CITIES,
  COURSES,
  ADDITIONAL,
  POPULARS,
  LESSON,
  PROFILE
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
  async getProfile() {
    try {
      const response = await instance.get(PROFILE + '/profile',
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
        });
      return response.data;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async getProfileCounts() {
    try {
      const response = await instance.get(PROFILE + '/profile/lesson-count',
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
        });
      return response.data;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async updateUser(user) {
    try {
      const response = await instance.put(PROFILE + '/profile/user/', { 'user': user },
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
        });
      return response.data;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async updateOrganization(organization) {
    try {
      const response = await instance.put(PROFILE + '/profile/organizer/', { 'organizer': organization },
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
        });
      return response.data;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async getSubscriptions() {
    try {
      const response = await instance.get(PROFILE + '/subscriptions',
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
        });
      return response.data;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async getActive() {
    try {
      const response = await instance.get(PROFILE + '/active',
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
        });
      return response.data;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async getArchive() {
    try {
      const response = await instance.get(PROFILE + '/archive',
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
        });
      return response.data;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async unSubscribeUser(id) {
    try {
      const response = await instance.put(PROFILE + '/subscriptions/' + id + '/unsubscribe/', {},
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
        });
      return response.data;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async archivateLessons(id) {
    try {
      const response = await instance.put(PROFILE + '/lesson/' + id + '/archivate/', {},
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
        });
      return response.data;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async deArchivateLessons(id) {
    try {
      const response = await instance.put(PROFILE + '/lesson/' + id + '/dearchivate/', {},
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
        });
      return response.data;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
};
