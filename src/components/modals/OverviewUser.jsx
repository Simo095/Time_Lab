import { Modal, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { modalStaticUserChanger } from "../../redux/actions/usersAction";
import {
  calculateMonthlyStatistics,
  calculateTotals,
} from "../../asset/handler&method";

const OverviewUser = ({ el }) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.users.handleModalStaticUser);
  const monthlyStats = calculateMonthlyStatistics(el.schedule);
  const totalStats = calculateTotals(monthlyStats);

  return (
    <Modal
      show={show}
      autoFocus
      fullscreen
      onHide={() => {
        dispatch(modalStaticUserChanger(false));
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Statistiche di {el.nome}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <h5>Tabella riepilogativa mensile:</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Mese</th>
                <th>Ore teoriche</th>
                <th>Ore lavorate</th>
                <th>Ore di assenza</th>
                <th>Ore di assenza giustificata</th>
                <th>Ore di ritardo</th>
                <th>Ore di ritardo giustificato</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(monthlyStats).map(([month, stats]) => (
                <tr key={month}>
                  <td>{month}</td>
                  <td>{(stats.totalTheoreticalTime / 60).toFixed(2)}</td>
                  <td>{(stats.totalWorkedTime / 60).toFixed(2)}</td>
                  <td>{(stats.totalAbsenceTime / 60).toFixed(2)}</td>
                  <td>{(stats.justifiedAbsenceTime / 60).toFixed(2)}</td>
                  <td>{(stats.totalLateTime / 60).toFixed(2)}</td>
                  <td>{(stats.justifiedLateTime / 60).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h5>Totali generali fino ad oggi:</h5>
          <ul>
            <li>Tempo totale: {totalStats.totalTheoreticalTime}</li>
            <li>
              Tempo di presenza: {totalStats.presentDays} (
              {totalStats.presentPercentage}
              %)
            </li>
            <li>
              Tempo di assenza: {totalStats.absentDays} (
              {totalStats.absentPercentage}%)
            </li>
            <li>
              Tempo assenza e ritardo giustificati: {totalStats.justifiedDays} (
              {totalStats.justifiedPercentage}%)
            </li>
          </ul>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default OverviewUser;
