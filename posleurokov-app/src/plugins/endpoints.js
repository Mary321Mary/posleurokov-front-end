export const RANDOM_LESSONS = (count) => `/api/panel/random-lessons/${count}/`;
export const CATEGORIES = (city) => `/api/main-page/categories/${city}/`;
export const CITIES = "/api/common-data/cities/";
export const COURSES = "/api/search-page";
export const ADDITIONAL = "/api/panel/random-lesson/";
export const POPULARS = (city) => `/api/main-page/popular-categories/${city}/`;
export const LESSON = (id) => `/api/lesson/${id}/`;
export const COUNT_CATEGORIES = (city, category) =>
  `/api/search-page/${city}/${category}`;
export const LESSON_CREATE = "/api/card/lesson/create/";
export const CATEGORIES_LIST = "/api/common-data/categories/";
export const SIMILARS = (id) => `/api/lesson/${id}/`;
export const SIGNUP = "/api/registration/";
export const LOGIN = "/api/login/";
export const PROFILE = '/api/cabinet';
