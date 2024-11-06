import { Modal, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { modalStaticUserChanger } from "../../redux/actions/usersAction";
import {
  calculateMonthlyStatistics,
  formatHoursAndMinutes,
  formatHoursFromMinutes,
} from "../../asset/handler&method";

const OverviewUser = ({ el }) => {
  const dispatch = useDispatch();
  const show =
    useSelector((state) => state.users.handleModalStaticUserId) === el.id;
  const monthlyStats = calculateMonthlyStatistics(el.schedule);
  return (
    <Modal
      show={show}
      autoFocus
      centered
      scrollable
      keyboard
      backdrop
      fullscreen="md-down"
      size="lg"
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
                <th>Teoriche</th>
                <th>Lavorate</th>
                <th>Assenza</th>
                <th>Assenza giustificata</th>
                <th>Ritardo</th>
                <th>Ritardo giustificato</th>
                <th>Assenza e ritardo giustificati</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(monthlyStats).map(([month, stats]) => (
                <tr key={month}>
                  <td>{month}</td>
                  <td>
                    {formatHoursAndMinutes(stats.totalTheoreticalTime)}
                    <br />
                    {formatHoursFromMinutes(stats.totalTheoreticalTime)} h
                  </td>
                  <td>
                    {formatHoursAndMinutes(stats.totalWorkedTime)} <br />
                    {formatHoursFromMinutes(stats.totalWorkedTime)} h <br />
                    {`${stats.presentPercentage}%`}
                  </td>
                  <td>
                    {formatHoursAndMinutes(stats.totalAbsenceTime)}
                    <br />
                    {formatHoursFromMinutes(stats.totalAbsenceTime)} h<br />
                    {`${stats.absentPercentage}%`}
                  </td>
                  <td>
                    {formatHoursAndMinutes(stats.justifiedAbsenceTime)}
                    <br />
                    {formatHoursFromMinutes(stats.justifiedAbsenceTime)} h<br />
                  </td>
                  <td>
                    {formatHoursAndMinutes(stats.totalLateTime)} <br />
                    {formatHoursFromMinutes(stats.totalLateTime)} h<br />
                    {`${stats.latePercentage}%`}
                  </td>
                  <td>
                    {formatHoursAndMinutes(stats.justifiedLateTime)}
                    <br />
                    {formatHoursFromMinutes(stats.justifiedAbsenceTime)} h
                  </td>
                  <td>
                    {formatHoursAndMinutes(
                      stats.justifiedLateTime + stats.justifiedAbsenceTime
                    )}
                    <br />
                    {formatHoursFromMinutes(
                      stats.justifiedLateTime + stats.justifiedAbsenceTime
                    )}
                    h<br />
                    {`${stats.totalJustify}%`}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default OverviewUser;
