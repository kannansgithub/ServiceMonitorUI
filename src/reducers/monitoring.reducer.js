import { GET_SERVICES, GET_SERVICES_LOG } from "../constants";

const INIT_STATE = {
    serviceList: [],
    serviceLogs: null,

};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_SERVICES: {
            return { ...state, serviceList: action.payload };
        }
        case GET_SERVICES_LOG: {
            return { ...state, serviceLogs: action.payload };
        }
        default:
            return state;
    }
};
