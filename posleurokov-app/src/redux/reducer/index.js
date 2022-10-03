const initialState = {
  count: "",
  tab: "all",
  city: "Гомель",
  suggestCity: "Гомель",
  params: {
    name: "",
    sex: "any",
    age: [],
    cost: [],
    addr: "",
    isInSummer: "",
    inNotSummer: "",
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
    case "ChangeSuggestCity":
      return {
        ...state,
        suggestCity:
          action.amount === undefined ? state.suggestCity : action.amount,
      };
    case "SetParamsForCatalogue":
      return {
        ...state,
        params: action.amount === undefined ? state.params : action.amount,
      };
    case "ChangeName":
      return {
        ...state,
        params: {
          ...state.params,
          name: action.amount === undefined ? state.params.name : action.amount,
        },
      };
    case "ChangeGender":
      return {
        ...state,
        params: {
          ...state.params,
          sex: action.amount === undefined ? state.params.sex : action.amount,
        },
      };
    case "ChangeAge":
      return {
        ...state,
        params: {
          ...state.params,
          age: action.amount === undefined ? state.params.age : action.amount,
        },
      };
    case "ChangeAddress":
      return {
        ...state,
        params: {
          ...state.params,
          addr: action.amount === undefined ? state.params.addr : action.amount,
        },
      };
    case "ChangeOther":
      return {
        ...state,
        params: {
          ...state.params,
          isInSummer:
            action.isInSummer === undefined
              ? state.params.isInSummer
              : action.isInSummer,
          inNotSummer:
            action.inNotSummer === undefined
              ? state.params.inNotSummer
              : action.inNotSummer,
        },
      };
    default:
      return state;
  }
}

export default reducer;
