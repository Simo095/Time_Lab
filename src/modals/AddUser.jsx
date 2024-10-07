import { Button, FormControl, Modal } from "react-bootstrap";

const AddUser = ({
  showAdd,
  handleCloseAdd,
  newElement,
  setNewElement,
  addElement,
}) => {
  return (
    <Modal show={showAdd} onHide={handleCloseAdd}>
      <Modal.Header closeButton>
        <Modal.Title>Aggiungi Utente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          type="text"
          placeholder="ID"
          value={newElement.id}
          onChange={(e) => setNewElement({ ...newElement, id: e.target.value })}
        />
        <FormControl
          type="text"
          placeholder="Nome"
          value={newElement.nome}
          onChange={(e) =>
            setNewElement({ ...newElement, nome: e.target.value })
          }
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseAdd}>
          Chiudi
        </Button>
        <Button onClick={addElement}>Aggiungi Elemento</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default AddUser;
