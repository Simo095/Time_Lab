import {
  addReminder,
  addUsersOnStore,
  deleteUser,
  updateUserSchedule,
} from "../redux/actions/usersAction";

export const handleDeleteUser = (el) => {
  return async (dispatch) => {
    try {
      const confirmed = window.confirm(
        `Sei sicuro di voler eliminare l'utente ${el.nome}?`
      );
      if (confirmed) {
        dispatch(deleteUser(el.id));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const handleAddReminder = (el) => {
  return async (dispatch) => {
    try {
      const reminder = prompt("Inserisci il promemoria:");
      const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
      };
      const today = new Date();
      const formattedDate = today.toLocaleDateString("it-IT", options);
      if (reminder) {
        dispatch(
          addReminder(el.id, formattedDate + " hai scritto:\n" + reminder)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getDayForEvent = (dateString) => {
  return async (dispatch) => {
    try {
      const [day, month, year] = dateString.split("/").map(Number);
      const date = new Date(year, month - 1, day);
      return date.getDay();
    } catch (error) {
      console.log(error);
    }
  };
};
export const handleChangePresenceUser = (eventIndex, el) => {
  return async (dispatch) => {
    try {
      const updatedUser = {
        ...el,
        schedule: el.schedule.map((ev, idx) =>
          idx === eventIndex ? { ...ev, assente: !ev.assente } : ev
        ),
      };
      dispatch(updateUserSchedule(updatedUser));
    } catch (error) {
      console.log(error);
    }
  };
};
export const handleChangeJustifyUser = (eventIndex, el) => {
  return async (dispatch) => {
    try {
      const updatedUser = {
        ...el,
        schedule: el.schedule.map((ev, idx) =>
          idx === eventIndex ? { ...ev, giustificato: !ev.giustificato } : ev
        ),
      };
      dispatch(updateUserSchedule(updatedUser));
    } catch (error) {
      console.log(error);
    }
  };
};
export const handleChangeNoteUser = (eventIndex, comment, el) => {
  return async (dispatch) => {
    try {
      const updatedUser = {
        ...el,
        schedule: el.schedule.map((ev, idx) =>
          idx === eventIndex ? { ...ev, note: comment } : ev
        ),
      };
      dispatch(updateUserSchedule(updatedUser));
    } catch (error) {
      console.log(error);
    }
  };
};
export const handleChangeTimeUser = (eventIndex, el, arrayAbsence) => {
  return async (dispatch) => {
    try {
      const updatedUser = {
        ...el,
        schedule: el.schedule.map((ev, idx) =>
          idx === eventIndex ? { ...ev, orarioAssente: arrayAbsence } : ev
        ),
      };

      dispatch(updateUserSchedule(updatedUser));
    } catch (error) {
      console.log(error);
    }
  };
};
export const handleDeleteTimeUser = (eventIndex, el) => {
  return async (dispatch) => {
    try {
      const updatedUser = {
        ...el,
        schedule: el.schedule.map((ev, idx) =>
          idx === eventIndex ? { ...ev, orarioAssente: [] } : ev
        ),
      };

      dispatch(updateUserSchedule(updatedUser));
    } catch (error) {
      console.log(error);
    }
  };
};
export const handleSaveUser = (localUser, setLocalUser, users, newUser) => {
  return async (dispatch) => {
    try {
      const schedule = generateYearSchedule();
      console.log(schedule);
      const completeUser = {
        ...localUser,
        schedule: generateYearSchedule(),
      };
      const updatedUsersList = [...users, completeUser];
      dispatch(addUsersOnStore(updatedUsersList));
      setLocalUser({
        id: newUser.id + 1,
        nome: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const generateYearSchedule = () => {
  try {
    const schedule = [];
    const currentYear = new Date().getFullYear();
    for (let month = new Date().getMonth(); month < 12; month++) {
      const daysInMonth = new Date(currentYear, month + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, month, day);
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          continue;
        } else if (dayOfWeek === 2 || dayOfWeek === 4) {
          schedule.push({
            giorno: date.toLocaleDateString("it-IT"),
            orarioLavorato: ["08:30", "12:30", "14:30", "16:00"],
            orarioTeorico: ["08:30", "12:30", "14:30", "16:00"],
            giustificato: true,
            assente: false,
            orarioAssente: [],
            oreGiustificate: 0,
            note: "",
          });
        } else {
          schedule.push({
            giorno: date.toLocaleDateString("it-IT"),
            orarioLavorato: ["08:30", "12:30"],
            orarioTeorico: ["08:30", "12:30"],
            giustificato: true,
            assente: false,
            orarioAssente: [],
            oreGiustificate: 0,
            note: "",
          });
        }
      }
    }
    return schedule;
  } catch (error) {
    console.log(error);
  }
};
