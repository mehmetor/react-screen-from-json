import { combineReducers } from "redux";
import configSlice from "../config/configSlice";
import screenSlice from "../config/screenSlice";

export default combineReducers({
  config: configSlice,
  screen: screenSlice
});
