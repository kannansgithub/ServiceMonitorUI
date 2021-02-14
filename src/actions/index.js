import {
  GET_ENVIRONMENT,
  NOTIFY_ERROR,
  LOAD_DASHBOARD,
  ENVIRONMENT_CHANGE,
  GET_SERVICES,
  UPDATE_CURRENT_CATEGORY,
  GET_SERVICES_LOG
} from "../constants";
import api from "../services/APIService";

export const GetAllEnvironment = () => async dispatch => {
  const response = await api.get("/Dashboard/GetEnvironment");
  if (response.data && !response.data.hasError) {
    if (response && response.data.model && response.data.model.length > 0) {
      dispatch({ type: ENVIRONMENT_CHANGE, payload: response.data.model[0].id });
      const dashboardResponse = await api.get(`/Dashboard/${response.data.model[0].id}/LoadDatabaseData`);
      dispatch({ type: LOAD_DASHBOARD, payload: dashboardResponse.data.model });
    }
    dispatch({ type: GET_ENVIRONMENT, payload: response.data.model });

  } else {
    dispatch({ type: NOTIFY_ERROR, payload: response.data.errorMessage });
  }
};
export const LoadDashboard = (id) => async (dispatch) => {
  dispatch({ type: ENVIRONMENT_CHANGE, payload: id });
  const dashboardResponse = await api.get(`/Dashboard/${id}/LoadDatabaseData`);
  dispatch({ type: LOAD_DASHBOARD, payload: dashboardResponse.data.model });
}
export const LoadServices = (envId, category) => async (dispatch) => {
  dispatch({ type: UPDATE_CURRENT_CATEGORY, payload: category });
  dispatch({ type: ENVIRONMENT_CHANGE, payload: envId });
  const dashboardResponse = await api.get(`/Dashboard/${category}/${envId}/GetServiceData`);
  dispatch({ type: GET_SERVICES, payload: dashboardResponse.data.model });
}
export const LoadServiceLog = (request) => async (dispatch) => {
  const dashboardResponse = await api.get(`/Dashboard?ServiceId=${request.serviceId}&EnvironmentId=${request.environmentId}&SearchQuery=${request.searchQuery}&PageNumber=${request.currentPage}&OrderBy=${request.orderBy}&Fields=${request.fields}&PageSize=${request.pageSize}`);
  console.log('Headers', dashboardResponse.headers);
  dispatch({ type: GET_SERVICES_LOG, payload: { data: dashboardResponse.data.model, pagination: dashboardResponse.headers['x-pagination'] } });
}

