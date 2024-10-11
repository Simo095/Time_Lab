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

  const [localUser, setLocalUser] = useState({
    id: users?.length + 1,
    nome: "",
  });

  const handleLocalUserChange = (key, value) => {
    setLocalUser((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveUser = () => {
    const completeUser = {
      ...localUser,
      schedule: generateYearSchedule(),
    };
    const updatedUsersList = [...users, completeUser];
    dispatch(addUsersOnStore(updatedUsersList));
    setLocalUser({
      id: users?.length + 2,
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
            assente: true,
            giustificato: true,
          });
        } else if (dayOfWeek === 2 || dayOfWeek === 4) {
          schedule.push({
            giorno: date.toLocaleDateString("it-IT"),
            orario: ["08:30", "12:30", "14:30", "16"],
            giustificato: false,
            assente: false,
            oreGiustificate: 0,
            note: "",
          });
        } else {
          schedule.push({
            giorno: date.toLocaleDateString("it-IT"),
            orario: ["08:30", "12:30"],
            giustificato: false,
            assente: false,
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
        setLocalUser({
          id: users?.length + 2,
          nome: "",
        });
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
            value={localUser.id}
            onChange={(e) => handleLocalUserChange("id", e.target.value)}
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
            setLocalUser({
              id: users?.length + 2,
              nome: "",
            });
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
