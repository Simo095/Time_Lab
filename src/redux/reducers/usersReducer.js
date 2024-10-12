import {
  ADD_LIST_USERS,
  ADD_NEW_USER,
  ADD_REMINDER,
  DELETE_REMINDER,
  DELETE_USER,
  ERROR_FETCH_LIST_USERS,
  LOADING_LIST_USERS,
  MODAL_ADD_USER,
  MODAL_STATIC_USER,
  RESET_NEW_USER,
  UPDATE_USER_ABSENCE_SCHEDULE,
  UPDATE_USER_SCHEDULE,
} from "../actions/usersAction";

const initialState = {
  usersList: [],
  newUser: { id: 1, nome: "" },
  errorFetchUsersList: false,
  errorSaveUsersList: false,
  errorMsg: false,
  loadingFetchUsersList: false,
  handleModalAddUsers: false,
  handleModalStaticUsers: false,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST_USERS:
      return {
        ...state,
        usersList: action.payload,
        newUser: { id: state.newUser.id + 1, nome: "" },
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
    case UPDATE_USER_ABSENCE_SCHEDULE:
      return {
        ...state,
        usersList: state.usersList.map((user) =>
          user.id === action.payload.id
            ? {
                ...user,
                orarioAssente: [...action.payload.orarioAssente],
              }
            : user
        ),
      };
    case MODAL_ADD_USER:
      return {
        ...state,
        handleModalAddUsers: action.payload,
      };
    case MODAL_STATIC_USER:
      return {
        ...state,
        handleModalStaticUsers: action.payload,
      };

    case ADD_REMINDER:
      return {
        ...state,
        usersList: state.usersList.map((user) =>
          user.id === action.payload.userId
            ? {
                ...user,
                reminders: [...(user.reminders || []), action.payload.reminder],
              }
            : user
        ),
      };
    case DELETE_REMINDER:
      return {
        ...state,
        usersList: state.usersList.map((user) =>
          user.id === action.payload.userId
            ? {
                ...user,
                reminders: [
                  ...user.reminders.filter(
                    (rem) => rem !== action.payload.reminder
                  ),
                ],
              }
            : user
        ),
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

    case DELETE_USER:
      return {
        ...state,
        usersList: state.usersList.filter((user) => user.id !== action.payload),
      };

    default:
      return state;
  }
};
export default usersReducer;
