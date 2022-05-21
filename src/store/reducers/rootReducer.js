import { combineReducers } from "redux";
import * as actions from "../action";
const initialState = {
  users: [],
  allUsersInfo: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.data };
    case "CREATE_USER":
      return { ...state, users: [...state.users, action.data] };
    default:
      return state;
  }
};

const getAllUser = (state = initialState.allUsersInfo, action) => {
  switch (action.type) {
    case actions.GET_ALL_USER:
      return [...action.params];
    case actions.DELETE_USER:
      let result = state.filter((val, i) => {   
        return Number(val.id) != Number(action.params);
      });
      return result;
    case actions.UPDATE_USERS:
      let updateUsr = state.map((val, i) => {
        if (action.params.id == val.id) {
          val.name = action.params.updatedUser.name;
          val.role = action.params.updatedUser.role;
          val.email = action.params.updatedUser.email;
          return val;
        } else {
          return val;
        }
      });
      return updateUsr;
    default:
      return state;
  }
};

export default combineReducers({ rootReducer, getAllUser });
