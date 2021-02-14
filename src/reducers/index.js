import { combineReducers } from "redux";
import EnvironmentReducer from "./environment.reducer";
import DashboardReducer from "./dashboard.reducer";
import ServicesReducer from "./monitoring.reducer";
import interceptorReducer from "./interceptor.reducer";

export default combineReducers({
  environments: EnvironmentReducer,
  dashboardData: DashboardReducer,
  servicesData: ServicesReducer,
  interceptors: interceptorReducer
});
