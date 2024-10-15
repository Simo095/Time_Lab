import {
  addReminder,
  addUsersOnStore,
  deleteUser,
  updateUserSchedule,
} from "../redux/actions/usersAction";

//HANDLER
export const handleSaveUser = (localUser, setLocalUser, users, newUser) => {
  return async (dispatch) => {
    try {
      const schedule = generateYearSchedule();

      const {
        totaleAssenze,
        totalePresenze,
        totaleRitardi,
        totaleRitardiAssenzeGiustificati,
        totaleAssenzeGiustificati,
        totaleRitardiGiustificati,
      } = calculateUserStats(schedule);

      const completeUser = {
        ...localUser,
        schedule,
        totaleAssenze,
        totalePresenze,
        totaleRitardi,
        totaleRitardiAssenzeGiustificati,
        totaleAssenzeGiustificati,
        totaleRitardiGiustificati,
      };

      const updatedUsersList = [...users, completeUser];
      dispatch(addUsersOnStore(updatedUsersList));

      setLocalUser({
        id: newUser.id + 1,
        nome: "",
        totaleAssenze: 0,
        totalePresenze: 0,
        totaleRitardi: 0,
        totaleRitardiAssenzeGiustificati: 0,
        totaleAssenzeGiustificati: 0,
        totaleRitardiGiustificati: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

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

export const handleChangePresenceUser = (index, user) => {
  return async (dispatch, getState) => {
    try {
      const updatedSchedule = user.schedule.map((day, i) =>
        i === index ? { ...day, assente: !day.assente } : day
      );
      const {
        totaleAssenze,
        totalePresenze,
        totaleRitardi,
        totaleRitardiAssenzeGiustificati,
        totaleAssenzeGiustificati,
        totaleRitardiGiustificati,
      } = calculateUserStats(updatedSchedule);
      const updatedUser = {
        ...user,
        schedule: updatedSchedule,
        totaleAssenze,
        totalePresenze,
        totaleRitardi,
        totaleRitardiAssenzeGiustificati,
        totaleAssenzeGiustificati,
        totaleRitardiGiustificati,
      };
      const usersList = getState().users.usersList;
      const updatedUsersList = usersList.map((u) =>
        u.id === user.id ? updatedUser : u
      );
      dispatch(addUsersOnStore(updatedUsersList));
    } catch (error) {
      console.log(error);
    }
  };
};

export const handleChangeJustifyUser = (index, user) => {
  return async (dispatch, getState) => {
    try {
      const updatedSchedule = user.schedule.map((day, i) =>
        i === index ? { ...day, giustificato: !day.giustificato } : day
      );
      const {
        totaleAssenze,
        totalePresenze,
        totaleRitardi,
        totaleRitardiAssenzeGiustificati,
        totaleAssenzeGiustificati,
        totaleRitardiGiustificati,
      } = calculateUserStats(updatedSchedule);
      const updatedUser = {
        ...user,
        schedule: updatedSchedule,
        totaleAssenze,
        totalePresenze,
        totaleRitardi,
        totaleRitardiAssenzeGiustificati,
        totaleAssenzeGiustificati,
        totaleRitardiGiustificati,
      };
      const usersList = getState().users.usersList;
      const updatedUsersList = usersList.map((u) =>
        u.id === user.id ? updatedUser : u
      );
      dispatch(addUsersOnStore(updatedUsersList));
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

export const handleChangeLateUser = (index, user) => {
  return async (dispatch, getState) => {
    try {
      const updatedSchedule = user.schedule.map((day, i) =>
        i === index ? { ...day, ritardo: !day.ritardo } : day
      );
      const {
        totaleAssenze,
        totalePresenze,
        totaleRitardi,
        totaleRitardiAssenzeGiustificati,
        totaleAssenzeGiustificati,
        totaleRitardiGiustificati,
      } = calculateUserStats(updatedSchedule);
      const updatedUser = {
        ...user,
        schedule: updatedSchedule,
        totaleAssenze,
        totalePresenze,
        totaleRitardi,
        totaleRitardiAssenzeGiustificati,
        totaleAssenzeGiustificati,
        totaleRitardiGiustificati,
      };
      const usersList = getState().users.usersList;
      const updatedUsersList = usersList.map((u) =>
        u.id === user.id ? updatedUser : u
      );
      dispatch(addUsersOnStore(updatedUsersList));
    } catch (error) {
      console.log(error);
    }
  };
};

export const handleChangeTimeUser = (
  eventIndex,
  el,
  arrayPresenceEffective,
  arrayLate
) => {
  return async (dispatch) => {
    try {
      const updatedUser = {
        ...el,
        schedule: el.schedule.map((ev, idx) =>
          idx === eventIndex
            ? {
                ...ev,
                orarioLavorato: arrayPresenceEffective,
                orarioRitardo: arrayLate,
              }
            : ev
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
          idx === eventIndex
            ? { ...ev, orarioLavorato: [], orarioRitardo: [] }
            : ev
        ),
      };

      dispatch(updateUserSchedule(updatedUser));
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

//METHODS
const calculateUserStats = (schedule) => {
  let totaleAssenze = 0;
  let totalePresenze = 0;
  let totaleRitardi = 0;
  let totaleRitardiAssenzeGiustificati = 0;
  let totaleAssenzeGiustificati = 0;
  let totaleRitardiGiustificati = 0;

  schedule.forEach((day) => {
    if (day.assente) {
      totaleAssenze++;
    } else {
      totalePresenze++;
    }

    if (day.ritardo) {
      totaleRitardi++;
    }

    if (day.giustificato && day.assente && day.ritardo) {
      totaleRitardiAssenzeGiustificati++;
    }
    if (day.giustificato && day.assente) {
      totaleAssenzeGiustificati++;
    }
    if (day.giustificato && day.ritardo) {
      totaleRitardiGiustificati++;
    }
  });

  return {
    totaleAssenze,
    totalePresenze,
    totaleRitardi,
    totaleRitardiAssenzeGiustificati,
    totaleAssenzeGiustificati,
    totaleRitardiGiustificati,
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
            orarioTeorico: ["08:30", "12:30", "14:30", "16:00"],
            orarioLavorato: ["08:30", "12:30", "14:30", "16:00"],
            orarioRitardo: [],
            assente: false,
            giustificato: true,
            ritardo: false,
            note: "",
          });
        } else {
          schedule.push({
            giorno: date.toLocaleDateString("it-IT"),
            orarioTeorico: ["08:30", "12:30"],
            orarioLavorato: ["08:30", "12:30"],
            orarioRitardo: [],
            assente: false,
            giustificato: true,
            ritardo: false,
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

export const calculateMonthlyStatistics = (schedule) => {
  const today = new Date();
  const groupedByMonth = {};
  schedule.forEach((entry) => {
    const entryDate = new Date(entry.giorno.split("/").reverse().join("-"));
    if (entryDate <= today) {
      const month = entryDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      if (!groupedByMonth[month]) {
        groupedByMonth[month] = {
          totalTheoreticalTime: 0,
          totalWorkedTime: 0,
          totalAbsenceTime: 0,
          justifiedAbsenceTime: 0,
          totalLateTime: 0,
          justifiedLateTime: 0,
        };
      }
      const theoreticalTime = calculateTotalMinutes(entry.orarioTeorico);
      groupedByMonth[month].totalTheoreticalTime += theoreticalTime;

      if (!entry.assente) {
        const workedTime = calculateTotalMinutes(entry.orarioLavorato);
        groupedByMonth[month].totalWorkedTime += workedTime;
        if (entry.ritardo) {
          const lateTime = calculateTotalMinutes(entry.orarioRitardo);
          groupedByMonth[month].totalLateTime += lateTime;
          if (entry.giustificato) {
            groupedByMonth[month].justifiedLateTime += lateTime;
          }
        }
      } else {
        const absenceTime = theoreticalTime;
        groupedByMonth[month].totalAbsenceTime += absenceTime;
        if (entry.giustificato) {
          groupedByMonth[month].justifiedAbsenceTime += absenceTime;
        }
      }
    }
  });
  return groupedByMonth;
};

export const calculateTotalMinutes = (timeArray) => {
  if (!timeArray || timeArray.length < 2) return 0;

  let totalMinutes = 0;

  for (let i = 0; i < timeArray.length; i += 2) {
    if (timeArray[i] && timeArray[i + 1]) {
      const [startHour, startMinute] = timeArray[i].split(":").map(Number);
      const [endHour, endMinute] = timeArray[i + 1].split(":").map(Number);
      const startMinutesTotal = startHour * 60 + startMinute;
      const endMinutesTotal = endHour * 60 + endMinute;
      totalMinutes += endMinutesTotal - startMinutesTotal;
    }
  }
  return totalMinutes;
};

export const calculateTotals = (monthlyStats) => {
  let totalTheoreticalTime = 0,
    presentDays = 0,
    absentDays = 0,
    justifiedDays = 0;

  Object.values(monthlyStats).forEach((monthStats) => {
    totalTheoreticalTime += monthStats.totalTheoreticalTime;
    presentDays += monthStats.totalWorkedTime;
    absentDays += monthStats.totalAbsenceTime;
    justifiedDays +=
      monthStats.justifiedLateTime + monthStats.justifiedAbsenceTime;
  });

  const presentPercentage =
    totalTheoreticalTime > 0
      ? ((presentDays / totalTheoreticalTime) * 100).toFixed(2)
      : 0;
  const absentPercentage =
    totalTheoreticalTime > 0
      ? ((absentDays / totalTheoreticalTime) * 100).toFixed(2)
      : 0;
  const justifiedPercentage =
    totalTheoreticalTime > 0
      ? ((justifiedDays / totalTheoreticalTime) * 100).toFixed(2)
      : 0;

  return {
    totalTheoreticalTime,
    presentDays,
    absentDays,
    justifiedDays,
    presentPercentage,
    absentPercentage,
    justifiedPercentage,
  };
};

export const getDayForEvent = (dateString) => {
  try {
    const [day, month, year] = dateString.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    return date.getDay();
  } catch (error) {
    console.log(error);
  }
};
export const calculateAbsenceHours = (
  startTimeM,
  endTimeM,
  startTimeE,
  endTimeE
) => {
  if ((!startTimeM || !endTimeM) && (!startTimeE || !endTimeE)) {
    return 0;
  } else if (!startTimeE || !endTimeE) {
    const startParts = startTimeM.split(":");
    const endParts = endTimeM.split(":");
    const startMinutes = parseInt(startParts[0]) * 60 + parseInt(startParts[1]);
    const endMinutes = parseInt(endParts[0]) * 60 + parseInt(endParts[1]);
    return Math.max(endMinutes - startMinutes, 0);
  } else {
    const startPartsM = startTimeM.split(":");
    const endPartsM = endTimeM.split(":");
    const startPartsE = startTimeE.split(":");
    const endPartsE = endTimeE.split(":");
    const startMinutes =
      parseInt(startPartsM[0]) * 60 +
      parseInt(startPartsM[1]) +
      parseInt(startPartsE[0]) * 60 +
      parseInt(startPartsE[1]);
    const endMinutes =
      parseInt(endPartsM[0]) * 60 +
      parseInt(endPartsM[1]) +
      parseInt(endPartsE[0]) * 60 +
      parseInt(endPartsE[1]);
    return Math.max(endMinutes - startMinutes, 0);
  }
};
