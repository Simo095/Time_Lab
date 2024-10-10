import { Modal, Table, Tabs, Tab } from "react-bootstrap";
import { useState } from "react";

const ShowHistory = ({ showS, handleCloseS, hoursPerDay, users }) => {
  const [selectedMonth, setSelectedMonth] = useState(null);

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
  };

  return (
    <Modal show={showS} onHide={handleCloseS}>
      <Modal.Header closeButton>
        <Modal.Title>Storico Orari Settimanali</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {users.map((user) => null)}
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab
            eventKey={month.mese}
            title={month.mese}
            onClick={() => handleMonthClick(month)}
          ></Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default ShowHistory;
