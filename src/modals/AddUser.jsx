import { FormControl, FormGroup, Modal } from "react-bootstrap";
import { IoIosCloseCircle } from "react-icons/io";
import { IoPersonAdd } from "react-icons/io5";
const AddUser = ({
  showAdd,
  handleCloseAdd,
  newElement,
  setNewElement,
  addElement,
}) => {
  return (
    <Modal show={showAdd} onHide={handleCloseAdd}>
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
            value={newElement.id}
            onChange={(e) =>
              setNewElement({ ...newElement, id: e.target.value })
            }
          />
          <FormControl
            type="text"
            placeholder="Nome"
            value={newElement.nome}
            required
            onChange={(e) =>
              setNewElement({ ...newElement, nome: e.target.value })
            }
          />
        </FormGroup>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <IoIosCloseCircle size={30} color="red" onClick={handleCloseAdd} />
        <IoPersonAdd size={30} onClick={addElement} />
      </Modal.Footer>
    </Modal>
  );
};
export default AddUser;
