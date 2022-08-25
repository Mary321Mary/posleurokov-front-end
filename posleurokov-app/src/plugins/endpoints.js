export const RANDOM_LESSONS = "/api/panel/random-lessons/";
export const CATEGORIES = "/api/main-page/categories/";
export const CITIES = "/api/common-data/cities";
export const COURSES = "/api/search-page";
export const ADDITIONAL = "/api/panel/random-lesson";
export const POPULARS = (city) => `/api/main-page/popular-categories/${city}`;
export const LESSON = (id) => `/api/lesson/${id}`;
export const COUNT_CATEGORIES = (city, category) =>
  `/api/search-page/${city}/${category}`;
export const LESSON_CREATE = "/api/card/lesson/create/";
export const CATEGORIES_LIST = "/api/common-data/categories";
export const SIMILARS = "/api/lesson";
export const SIGNUP = "/api/registration/";
export const LOGIN = "/api/login/";
