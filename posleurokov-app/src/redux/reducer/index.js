import React from "react";
import ReactDom from "react-dom";

import { createStore } from "redux/stores";

const initialState = {
  count: "",
  tab: "any",
  city: "Гомель",
  params: {
    sex: "any",
    age: [],
    cost: [],
    addr: "",
    category: "ИСКУССТВО И ДИЗАЙН",
    isInSummer: "",
    inNotSummer: "",
    hasReception: "",
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "Add":
      return { ...state, count: action.amount };
    case "ChangeTab":
      return {
        ...state,
        tab: action.amount === undefined ? state.tab : action.amount,
      };
    case "ChangeCity":
      return {
        ...state,
        city: action.amount === undefined ? state.city : action.amount,
      };
    case "SetParamsForCatalogue":
      return {
        ...state,
        params: action.amount === undefined ? state.params : action.amount,
      };
    case "SetCategory":
      return {
        ...state,
        params: {
          ...state.params,
          category:
            action.amount === undefined ? state.params.category : action.amount,
        },
      };
    case "ChangeGender":
      return {
        ...state,
        params: {
          ...state.params,
          sex:
            action.amount === undefined ? state.params.sex : action.amount,
        },
      };
    case "ChangeAge":
      return {
        ...state,
        params: {
          ...state.params,
          age:
            action.amount === undefined ? state.params.age : action.amount,
        },
      };
    case "ChangeAddress":
      return {
        ...state,
        params: {
          ...state.params,
          addr:
            action.amount === undefined ? state.params.addr : action.amount,
        },
      };
    case "ChangeOther":
      return {
        ...state,
        params: {
          ...state.params,
          isInSummer:
            action.isInSummer === undefined ? state.params.isInSummer : action.isInSummer,
          inNotSummer:
            action.inNotSummer === undefined ? state.params.inNotSummer : action.inNotSummer,
          hasReception:
            action.hasReception === undefined ? state.params.hasReception : action.hasReception,

        },
      };
    default:
      return state;
  }
}

export default reducer;