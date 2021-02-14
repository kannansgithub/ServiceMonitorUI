import { SHOW_LOADER, HIDE_LOADER } from "../constants";

const INIT_STATE = {
    isLoading: false
};
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SHOW_LOADER: {
            return { ...state, isLoading: true };
        }
        case HIDE_LOADER: {
            return { ...state, isLoading: false };
        }
        default:
            return state;
    }
};
