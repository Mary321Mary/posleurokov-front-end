import axios from "axios";

import {
  CATEGORIES,
  RANDOM_LESSONS,
  CITIES,
  COURSES,
  ADDITIONAL,
  POPULARS,
  LESSON,
  ADDINFO,
  COUNT_CATEGORIES,
  LESSON_CREATE,
  CATEGORIES_LIST,
  SIMILARS,
  SIGNUP,
  LOGIN,
  LESSON_DATA,
  LESSON_UPDATE,
  LESSON_DELETE,
  ADD_PICTURE,
  DELETE_PICTURE,
  PROFILE,
  ORGANIZATION,
  ADVERTISEMENT,
  VIBERLINK
} from "./endpoints";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const axiosAPI = {
  async getCategories(param) {
    try {
      const response = await instance.get(CATEGORIES(param));
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
      const response = await instance.get(RANDOM_LESSONS(param));
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
      const response = await instance.get(LESSON(id) + "/organization/");
      return response.data;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async getAbout() {
    try {
      const response = await instance.get(ADDINFO + "about");
      return response.data;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async getProfile() {
    try {
      const response = await instance.get(PROFILE + "/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async getTerms() {
    try {
      const response = await instance.get(ADDINFO + "terms");
      return response.data;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async getCountCategories(city, category) {
    try {
      const response = await instance.get(
        COUNT_CATEGORIES(city, category) + "/counts/"
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async getFAQ() {
    try {
      const response = await instance.get(ADDINFO + "faq");
      return response.data;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async subscribe(id) {
    try {
      const response = await instance.put(
        LESSON(id) + "/subscribe/",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  },
  async getProfileCounts() {
    try {
      const response = await instance.get(PROFILE + "/profile/lesson-count", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
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
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return response;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  },
  async getSimilar(params) {
    try {
      const response = await instance.get(SIMILARS(params));
      return response.data.commonLessons;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async updateUser(user) {
    try {
      const response = await instance.put(
        PROFILE + "/profile/user/",
        { user: user },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  async getContacts() {
    try {
      const response = await instance.get(ADDINFO + "contacts");
      return response.data;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async updateOrganization(organization) {
    try {
      const response = await instance.put(
        PROFILE + "/profile/organizer/",
        { organizer: organization },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error.response);
      return "Ошибка сервера";
    }
  },
  async getSubscriptions() {
    try {
      const response = await instance.get(PROFILE + "/subscriptions", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async getActive() {
    try {
      const response = await instance.get(PROFILE + "/active", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async getArchive() {
    try {
      const response = await instance.get(PROFILE + "/archive", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async unSubscribeUser(id) {
    try {
      const response = await instance.put(
        PROFILE + "/subscriptions/" + id + "/unsubscribe/",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async archivateLessons(id) {
    try {
      const response = await instance.put(
        PROFILE + "/lesson/" + id + "/archivate/",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return "Ошибка сервера";
    }
  },
  async deArchivateLessons(id) {
    try {
      const response = await instance.put(
        PROFILE + "/lesson/" + id + "/dearchivate/",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      return response.data;
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
  async getLessonData(id) {
    try {
      const response = await instance.get(LESSON_DATA(id), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  },
  async sendCorrection(id, correction) {
    try {
      const response = await instance.post(
        LESSON(id) + "/correct/",
        { correction: correction },
        {}
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  },
  async getLessonUpdate(id, param) {
    try {
      const response = await instance.put(LESSON_UPDATE(id), param, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return response;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  },
  async getLessonDelete(id) {
    try {
      const response = await instance.delete(LESSON_DELETE(id), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return response;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  },
  async getPictureAdd(id, param) {
    try {
      const response = await instance.post(ADD_PICTURE(id), param, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return response;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  },
  async getPictureDelete(id) {
    try {
      const response = await instance.delete(DELETE_PICTURE(id), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      return response;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  },
  async sendApplication(id, phone) {
    try {
      const response = await instance.post(
        LESSON(id) + "/contact/",
        { phone: phone },
        {}
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  },
  async getOrganizationInfo(id) {
    try {
      const response = await instance.get(
        ORGANIZATION(id),
        {}
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  },
  async getOrganizationLessons(id, type, page) {
    try {
      const response = await instance.get(
        ORGANIZATION(id) + `/lessons?type=${type}&page=${page}`,
        {}
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  },
  async getAdvertisement() {
    try {
      const response = await instance.get(
        ADVERTISEMENT,
        {}
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  },
  async getViberLinks() {
    try {
      const response = await instance.get(
        VIBERLINK,
        {}
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return error.response;
    }
  }
};

export const getSuggestions = async (text) => {
  try {
    const suggestRequest = axios.create({
      baseURL: "https://suggest-maps.yandex.ru/v1",
    });
    const response = await suggestRequest.get(
      `suggest?apikey=${process.env.REACT_APP_SUGGEST_API_KEY}&text=${text}&results=10&types=street,district,area,province,house`,
      {}
    );
    return response;
  } catch (error) {
    console.error(error);
    if (error.response) {
      return error.response;
    }
    else {
      return error.request;
    }
  }
}
