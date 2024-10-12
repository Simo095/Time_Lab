export const ADD_LIST_USERS = "ADD_LIST_USERS";
export const ERROR_FETCH_LIST_USERS = "ERROR_FETCH_LIST_USERS";
export const LOADING_LIST_USERS = "LOADING_LIST_USERS";
export const UPDATE_USER_SCHEDULE = "UPDATE_USER_SCHEDULE";
export const UPDATE_USER_ABSENCE_SCHEDULE = "UPDATE_USER_ABSENCE_SCHEDULE";
export const MODAL_ADD_USER = "MODAL_ADD_USER";
export const MODAL_STATIC_USER = "MODAL_STATIC_USER";
export const ADD_REMINDER = "ADD_REMINDER";
export const DELETE_REMINDER = "DELETE_REMINDER";
export const ADD_NEW_USER = "ADD_NEW_USER";
export const RESET_NEW_USER = "RESET_NEW_USER";
export const DELETE_USER = "DELETE_USER";

export const addUsersOnStore = (usersList) => ({
  type: ADD_LIST_USERS,
  payload: usersList,
});
export const errorUsersOnStore = (condition) => ({
  type: ERROR_FETCH_LIST_USERS,
  payload: condition,
});
export const loadingUsersOnStore = (condition) => ({
  type: LOADING_LIST_USERS,
  payload: condition,
});

export const updateUserSchedule = (updatedUser) => ({
  type: UPDATE_USER_SCHEDULE,
  payload: updatedUser,
});
export const updateUserAbsenceSchedule = (updatedUser) => ({
  type: UPDATE_USER_ABSENCE_SCHEDULE,
  payload: updatedUser,
});

export const addNewUserOnStore = (user) => ({
  type: ADD_NEW_USER,
  payload: user,
});
export const modalAddUserChanger = (condition) => ({
  type: MODAL_ADD_USER,
  payload: condition,
});
export const modalStaticUserChanger = (condition) => ({
  type: MODAL_STATIC_USER,
  payload: condition,
});
export const resetNewUserOnStore = () => ({
  type: RESET_NEW_USER,
});

export const deleteUser = (userId) => ({
  type: DELETE_USER,
  payload: userId,
});

export const addReminder = (userId, reminder) => ({
  type: ADD_REMINDER,
  payload: { userId, reminder },
});
export const deleteReminder = (userId, reminder) => ({
  type: DELETE_REMINDER,
  payload: { userId, reminder },
});

export const getFileAndAddOldElements = () => {
  return async (dispatch) => {
    try {
      const getFile = await fetch(`https://agne-manager.vercel.app/api/get`, {
        method: "GET",
      });
      if (getFile.ok) {
        const objReq = await getFile.json();
        const url = objReq[0].url;
        const req = await fetch(`${url}`);
        if (req.ok) {
          const oldData = await req.json();
          dispatch(addUsersOnStore([...oldData]));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const saveListUsersOnVercel = (elements) => {
  return async (dispatch) => {
    try {
      const response = await fetch("https://agne-manager.vercel.app/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(elements),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("File salvato correttamente:", result.url);

        return true;
      } else {
        console.error("Errore nel salvataggio:", result.error);
        return false;
      }
    } catch (error) {
      console.error("Errore:", error);
    }
  };
};
