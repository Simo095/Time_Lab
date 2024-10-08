import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FaBusinessTime } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import ConfirmMonthlyTimetable from "./ConfirmMonthlyTimetable";

const AddMonthlyTimetable = ({
  showAddM,
  handleCloseAddM,
  handleShowAddM,
  handlerNameMonth,
  daysOfWeek,
  hoursPerDay,
  handleHoursChange,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={showAddM} onHide={handleCloseAddM}>
        <Modal.Header closeButton>
          <Modal.Title>Inserimento Orari Della Settimana</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Mese Corrente: <span>{handlerNameMonth()}</span>
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
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <IoIosCloseCircle size={30} color="red" onClick={handleCloseAddM} />
          <FaBusinessTime
            size={30}
            onClick={() => {
              handleShow();
              handleCloseAddM();
            }}
          />
        </Modal.Footer>
      </Modal>
      <ConfirmMonthlyTimetable
        show={show}
        handleClose={handleClose}
        hoursPerDay={hoursPerDay}
        handleShowAddM={handleShowAddM}
      />
    </>
  );
};

export default AddMonthlyTimetable;
