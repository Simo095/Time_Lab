import { Container, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { modalStaticUsersChanger } from "../../redux/actions/usersAction";
import {
  calculateMonthlyStatisticsForAllUser,
  calculatePercentage,
} from "../../asset/handler&method";

const OverviewUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.usersList);
  const show = useSelector((state) => state.users.handleModalStaticUsers);

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
        <Modal.Title>Statistiche di Tutti</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <h5>Tabella riepilogativa totale:</h5>
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
                <th>% assenza e ritardo giustificato</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(calculateMonthlyStatisticsForAllUser(users)).map(
                ([month, stats]) => {
                  const tot = calculatePercentage(
                    stats.totalLateHours + stats.totalAbsenceHours,
                    stats.totalTheoreticalHours
                  );
                  return (
                    <tr key={month}>
                      <td>{month}</td>
                      <td>{(stats.totalTheoreticalHours / 60).toFixed(2)}</td>
                      <td>
                        {(stats.totalWorkedHours / 60).toFixed(2)} <br />{" "}
                        {calculatePercentage(
                          stats.totalWorkedHours,
                          stats.totalTheoreticalHours
                        )}
                        %
                      </td>
                      <td>
                        {(stats.totalAbsenceHours / 60).toFixed(2)}
                        <br />{" "}
                        {calculatePercentage(
                          stats.totalAbsenceHours,
                          stats.totalTheoreticalHours
                        )}
                        %
                      </td>
                      <td>
                        {(stats.totalJustifiedAbsenceHours / 60).toFixed(2)}
                      </td>
                      <td>{(stats.totalLateHours / 60).toFixed(2)}</td>
                      <td>
                        {(stats.totalJustifiedLateHours / 60).toFixed(2)}
                        <br />
                        {calculatePercentage(
                          stats.totalLateHours,
                          stats.totalTheoreticalHours
                        )}
                        %
                      </td>
                      <td>
                        {calculatePercentage(
                          stats.totalJustifiedAbsenceHours +
                            stats.totalJustifiedLateHours,
                          stats.totalTheoreticalHours
                        )}
                        % di {tot}%
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </Table>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default OverviewUsers;
