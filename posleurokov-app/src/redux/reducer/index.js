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
    isInSummer: "false",
    inNotSummer: "false",
    hasReception: "false",
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
    default:
      return state;
  }
}

export default reducer;
