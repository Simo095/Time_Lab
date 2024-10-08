import { Modal, Table } from "react-bootstrap";
import { IoIosCloseCircle } from "react-icons/io";
import { GiSave } from "react-icons/gi";

const ConfirmMonthlyTimetable = ({
  show,
  handleClose,
  hoursPerDay,
  handleShowAddM,
}) => {
  const handleSave = async () => {
    try {
      const response = await fetch(
        "https://agne-manager.vercel.app/api/postMT",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(hoursPerDay), // Invia i dati come JSON
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log("File salvato correttamente:", result.url); // L'URL del file salvato
        alert("File salvato correttamente");
      } else {
        console.error("Errore nel salvataggio:", result.error);
      }
    } catch (error) {
      console.error("Errore:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Conferma Orari del Mese</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Mese: {hoursPerDay.mese}</p>
        <Table striped bordered hover className="table">
          <thead>
            <tr>
              <th>Giorno</th>
              <th>Ore</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(hoursPerDay).map((day) =>
              day !== "mese" ? (
                <tr key={day}>
                  <td>{day}</td>
                  <td>{hoursPerDay[day]}</td>
                </tr>
              ) : null
            )}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <IoIosCloseCircle
          size={30}
          color="red"
          onClick={() => {
            handleShowAddM();
            handleClose();
          }}
        />
        <GiSave
          size={30}
          onClick={() => {
            handleSave();
          }}
        />
      </Modal.Footer>
    </Modal>
  );
};
export default ConfirmMonthlyTimetable;
