import { GET_ENVIRONMENT, ENVIRONMENT_CHANGE, UPDATE_CURRENT_CATEGORY } from "../constants";

const INIT_STATE = {
  environmentList: [],
  currentEnvironment: null,
  currentCategory:null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ENVIRONMENT: {
      return { ...state, environmentList: action.payload };
    }
    case ENVIRONMENT_CHANGE:{
      return { ...state, currentEnvironment: action.payload };
    }
    case UPDATE_CURRENT_CATEGORY: {
      return { ...state, currentCategory: action.payload };
    }
    default:
      return state;
  }
};
