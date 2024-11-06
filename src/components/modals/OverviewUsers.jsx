import {
  Container,
  FormSelect,
  Modal,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap";
import { BsCloudDownload } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { modalStaticUsersChanger } from "../../redux/actions/usersAction";
import { calculateMonthlyStatistics } from "../../asset/handler&method";

import * as XLSX from "xlsx";
import { useState } from "react";

const OverviewUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.usersList);
  const show = useSelector((state) => state.users.handleModalStaticUsers);
  const [selectedMonth, setSelectedMonth] = useState("");

  const userStatistics = users
    .sort((a, b) => b.totaleAssenze - a.totaleAssenze)
    .reduce((acc, user) => {
      acc[user.id] = calculateMonthlyStatistics(user.schedule);
      return acc;
    }, {});

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    if (selectedMonth) {
      const data = Object.keys(userStatistics)
        .sort(
          (a, b) =>
            (userStatistics[b][selectedMonth]?.absentPercentage || 0) -
            (userStatistics[a][selectedMonth]?.absentPercentage || 0)
        )
        .map((userId) => ({
          Utente:
            users.find((user) => user.id.toString() === userId.toString())
              ?.nome || "Anonimo",
          "Presenza (%)":
            userStatistics[userId][selectedMonth]?.presentPercentage || "0",
          "Assenza (%)":
            userStatistics[userId][selectedMonth]?.absentPercentage || "0",
          "Ritardo (%)":
            userStatistics[userId][selectedMonth]?.latePercentage || "0",
          "Giustificato (%)":
            userStatistics[userId][selectedMonth]?.totalJustify || "0",
        }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, selectedMonth);
      XLSX.writeFile(workbook, `Statistiche ${selectedMonth}.xlsx`);
    } else {
      alert("Seleziona un mese da esportare.");
    }
  };
  return (
    <Modal
      show={show}
      autoFocus
      centered
      scrollable
      backdrop
      fullscreen="md-down"
      size="lg"
      keyboard
      onHide={() => {
        dispatch(modalStaticUsersChanger(false));
      }}
    >
      <Modal.Header closeButton>
        <Container
          fluid
          className="m-0 p-0 d-flex justify-content-between align-items-center me-5"
        >
          <Modal.Title>Percentuali per Mese</Modal.Title>
          <FormSelect
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-50"
            aria-label="Seleziona il mese"
          >
            <option value="">Seleziona Mese</option>
            {Object.keys(
              userStatistics[Object.keys(userStatistics)[0]] || {}
            ).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </FormSelect>
          <BsCloudDownload
            color="success"
            size={30}
            onClick={exportToExcel}
            cursor={"pointer"}
          />
        </Container>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Tabs defaultActiveKey="0" id="monthly-stats-tabs" className="mb-3">
            {Object.keys(
              userStatistics[Object.keys(userStatistics)[0]] || {}
            ).map((month, index) => (
              <Tab eventKey={index} title={month} key={month}>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Utente</th>
                      <th>Presenza (%)</th>
                      <th>Assenza (%)</th>
                      <th>Ritardo (%)</th>
                      <th>Giustificato (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(userStatistics)
                      .sort(
                        (a, b) =>
                          (userStatistics[b][month]?.absentPercentage || 0) -
                          (userStatistics[a][month]?.absentPercentage || 0)
                      )
                      .map((userId) => (
                        <tr key={userId}>
                          <td>
                            {users.find(
                              (user) => user.id.toString() === userId.toString()
                            )?.nome || "Anonimo"}
                          </td>
                          <td>
                            {userStatistics[userId][month]?.presentPercentage ||
                              "0"}
                            %
                          </td>
                          <td>
                            {userStatistics[userId][month]?.absentPercentage ||
                              "0"}
                            %
                          </td>
                          <td>
                            {userStatistics[userId][month]?.latePercentage ||
                              "0"}
                            %
                          </td>
                          <td>
                            {userStatistics[userId][month]?.totalJustify || "0"}
                            %
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Tab>
            ))}
          </Tabs>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default OverviewUsers;
