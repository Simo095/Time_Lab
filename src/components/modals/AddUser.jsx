import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, FormGroup, Modal } from "react-bootstrap";
import { IoIosCloseCircle } from "react-icons/io";
import { IoPersonAdd } from "react-icons/io5";
import {
  addUsersOnStore,
  modalAddUserChanger,
} from "../../redux/actions/usersAction";

const AddUser = () => {
  const dispatch = useDispatch();

  const show = useSelector((state) => state.users.handleModalAddUsers);
  const users = useSelector((state) => state.users.usersList);
  const newUser = useSelector((state) => state.users.newUser);

  const [localUser, setLocalUser] = useState({
    id: newUser.id,
  });

  const handleLocalUserChange = (key, value) => {
    setLocalUser((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveUser = () => {
    const maxId = users.reduce(
      (max, user) => (user.id > max ? user.id : max),
      1
    );
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
  };

  const generateYearSchedule = () => {
    const schedule = [];
    const currentYear = new Date().getFullYear();
    for (let month = new Date().getMonth(); month < 12; month++) {
      const daysInMonth = new Date(currentYear, month + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, month, day);
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          schedule.push({
            giorno: date.toLocaleDateString("it-IT"),
          });
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
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        dispatch(modalAddUserChanger(false));
      }}
    >
      <Modal.Header>
        <Modal.Title>Aggiungi Utente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup>
          <FormControl
            className="mb-3"
            type="text"
            placeholder="ID"
            required
            defaultValue={localUser.id}
          />
          <FormControl
            type="text"
            placeholder="Nome"
            value={localUser.nome}
            onChange={(e) => handleLocalUserChange("nome", e.target.value)}
          />
        </FormGroup>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <IoIosCloseCircle
          size={30}
          color="red"
          onClick={() => {
            dispatch(modalAddUserChanger(false));
          }}
        />
        <IoPersonAdd
          size={30}
          onClick={() => {
            handleSaveUser();
            dispatch(modalAddUserChanger(false));
          }}
        />
      </Modal.Footer>
    </Modal>
  );
};
export default AddUser;
