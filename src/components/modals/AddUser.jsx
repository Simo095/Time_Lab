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
            onChange={(e) =>
              setNewElement({
                ...newElement,
                nome: e.target.value,
                schedule: generateYearSchedule(),
              })
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
