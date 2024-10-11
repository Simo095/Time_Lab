import {
  ADD_LIST_USERS,
  ADD_NEW_USER,
  ERROR_FETCH_LIST_USERS,
  LOADING_LIST_USERS,
  MODAL_ADD_USER,
  RESET_NEW_USER,
  UPDATE_USER_SCHEDULE,
} from "../actions/usersAction";

const initialState = {
  usersList: [],
  newUser: { id: 0, nome: "" },
  errorFetchUsersList: false,
  errorSaveUsersList: false,
  errorMsg: false,
  loadingFetchUsersList: false,
  handleModalAddUsers: false,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST_USERS:
      return {
        ...state,
        usersList: action.payload,
      };
    case ERROR_FETCH_LIST_USERS:
      return {
        ...state,
        errorFetchUsersList: action.payload,
      };
    case LOADING_LIST_USERS:
      return {
        ...state,
        loadingFetchUsersList: action.payload,
      };
    case UPDATE_USER_SCHEDULE:
      return {
        ...state,
        usersList: state.usersList.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case MODAL_ADD_USER:
      return {
        ...state,
        handleModalAddUsers: action.payload,
      };

    case ADD_NEW_USER:
      return {
        ...state,
        newUser: {
          ...state.newUser,
          ...action.payload,
        },
      };
    case RESET_NEW_USER:
      return {
        ...state,
        newUser: { id: state.usersList.length, nome: "" },
      };
    default:
      return state;
  }
};
export default usersReducer;
