import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FaBusinessTime } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

const AddMonthlyTimetable = ({ showAddM, handleCloseAddM }) => {
  // Array dei giorni della settimana
  const daysOfWeek = [
    "Lunedì",
    "Martedì",
    "Mercoledì",
    "Giovedì",
    "Venerdì",
    "Sabato",
    "Domenica",
  ];

  // Stato per gestire le ore per ciascun giorno
  const [hoursPerDay, setHoursPerDay] = useState({
    Lunedì: 0,
    Martedì: 0,
    Mercoledì: 0,
    Giovedì: 0,
    Venerdì: 0,
    Sabato: 0,
    Domenica: 0,
  });

  // Funzione per aggiornare le ore per ogni giorno
  const handleHoursChange = (day, value) => {
    setHoursPerDay((prevHours) => ({
      ...prevHours,
      [day]: value,
    }));
  };

  return (
    <Modal show={showAddM} onHide={handleCloseAddM}>
      <Modal.Header closeButton>
        <Modal.Title>Orari totali del mese</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Mese Corrente: <span>{"mese"}</span>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Giorno</th>
              <th>Ore</th>
            </tr>
          </thead>
          <tbody>
            {daysOfWeek.map((day) => (
              <tr key={day}>
                <td>{day}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    value={hoursPerDay[day]}
                    onChange={(e) => handleHoursChange(day, e.target.value)}
                    className="form-control"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Totale ore per giorno: <span>{"mese"}</span>
        </p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <IoIosCloseCircle size={30} color="red" onClick={handleCloseAddM} />
        <FaBusinessTime size={30} onClick={handleCloseAddM} />
      </Modal.Footer>
    </Modal>
  );
};

export default AddMonthlyTimetable;
