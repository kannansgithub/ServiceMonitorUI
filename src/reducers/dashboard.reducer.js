import { LOAD_DASHBOARD } from "../constants";
const INIT_STATE = {
    dashboardDataList: [],
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOAD_DASHBOARD: {
            return { ...state, dashboardDataList: action.payload};
        }
        default:
            return state;
    }
};
