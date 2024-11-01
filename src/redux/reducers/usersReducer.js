import {
  ADD_LIST_USERS,
  ADD_REMINDER,
  DELETE_REMINDER,
  DELETE_USER,
  ERROR_FETCH_LIST_USERS,
  LOADING_LIST_USERS,
  MODAL_ADD_USER,
  MODAL_STATIC_USER,
  MODAL_STATIC_USERS,
  UPDATE_USER_SCHEDULE,
} from "../actions/usersAction";

const initialState = {
  usersList: [],
  newUser: {
    id: 1,
    nome: "",
    oreGiustificate: 0,
    totaleAssenze: 0,
    totalePresenze: 0,
    totaleRitardi: 0,
  },
  errorFetchUsersList: false,
  errorSaveUsersList: false,
  errorMsg: false,
  loadingFetchUsersList: false,
  handleModalAddUsers: false,
  handleModalStaticUserId: 0,
  handleModalStaticUsers: false,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST_USERS:
      return {
        ...state,
        usersList: action.payload,
        newUser: { id: state.usersList.length + 1, nome: "" },
      };
    case DELETE_USER:
      return {
        ...state,
        usersList: state.usersList.filter((user) => user.id !== action.payload),
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

    case MODAL_ADD_USER:
      return {
        ...state,
        handleModalAddUsers: action.payload,
      };
    case MODAL_STATIC_USER:
      return {
        ...state,
        handleModalStaticUserId: action.payload,
      };
    case MODAL_STATIC_USERS:
      return {
        ...state,
        handleModalStaticUsers: action.payload,
      };
    default:
      return state;
  }
};
export default usersReducer;
