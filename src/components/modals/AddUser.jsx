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
  const newUser = useSelector((state) => state.users.newUser);

  const [localUser, setLocalUser] = useState({
    id: newUser.id,
  });

  const handleLocalUserChange = (key, value) => {
    setLocalUser((prev) => ({ ...prev, [key]: value }));
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
            dispatch(handleSaveUser(localUser, setLocalUser, users, newUser));
            dispatch(modalAddUserChanger(false));
          }}
        />
      </Modal.Footer>
    </Modal>
  );
};
export default AddUser;
