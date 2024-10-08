import { Modal, Table, Tabs, Tab } from "react-bootstrap";
import { useState } from "react";

const ShowOldMonthly = ({ showS, handleCloseS, hoursPerDay }) => {
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
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          {hoursPerDay.map((month) => (
            <Tab
              eventKey={month.mese}
              title={month.mese}
              onClick={() => handleMonthClick(month)}
            >
              {}
              <Table striped bordered hover className="table">
                <thead>
                  <tr>
                    <th>Giorno</th>
                    <th>Ore</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(month.giorni).map((day) => (
                    <tr key={`${month.mese}-${day}`}>
                      <td>{day}</td>
                      <td>{month.giorni[day]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
          ))}
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default ShowOldMonthly;
