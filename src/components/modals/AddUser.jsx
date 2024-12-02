import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, FormGroup, Modal } from "react-bootstrap";
import { IoIosCloseCircle } from "react-icons/io";
import { IoPersonAdd } from "react-icons/io5";
import { modalAddUserChanger } from "../../redux/actions/usersAction";
import { handleSaveUser } from "../../asset/handler&method";

const AddUser = () => {
  const dispatch = useDispatch();

  const show = useSelector((state) => state.users.handleModalAddUsers);
  const users = useSelector((state) => state.users.usersList);

  const [localUserStartDate, setLocalUserStartDate] = useState();
  const [localUser, setLocalUser] = useState({
    id: users.length + 1,
    nome: "",
    totaleAssenze: 0,
    totalePresenze: 0,
    totaleRitardi: 0,
    totaleRitardiAssenzeGiustificati: 0,
    totaleAssenzeGiustificati: 0,
    totaleRitardiGiustificati: 0,
  });

  const handleLocalUserChange = (key, value) => {
    setLocalUser((prev) => ({ ...prev, [key]: value }));
  };
  const handleLocalUserStartDateChange = (value) => {
    setLocalUserStartDate(value);
  };

  return (
    <Modal
      show={show}
      centered
      autoFocus
      scrollable
      backdrop
      keyboard
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
            defaultValue={localUser.id}
          />
          <FormControl
            className="mb-3"
            type="text"
            placeholder="Nome"
            value={localUser.nome}
            onChange={(e) => handleLocalUserChange("nome", e.target.value)}
          />
          <FormControl
            type="date"
            placeholder="Data di inizio"
            value={localUserStartDate}
            onChange={(e) => handleLocalUserStartDateChange(e.target.value)}
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
            dispatch(
              handleSaveUser(localUser, setLocalUser, users, localUserStartDate)
            );
            dispatch(modalAddUserChanger(false));
          }}
        />
      </Modal.Footer>
    </Modal>
  );
};
export default AddUser;
