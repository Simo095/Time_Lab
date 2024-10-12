import { Modal, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { modalStaticUserChanger } from "../../redux/actions/usersAction";

const ShowHistory = ({ el }) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.users.handleModalStaticUsers);

  const calculateScheduleStatistics = (schedule) => {
    const today = new Date();

    const validDays = schedule.filter((entry) => {
      const entryDate = new Date(entry.giorno.split("/").reverse().join("-"));
      return entryDate <= today;
    });

    const totalDays = validDays.length;
    const presentDays = validDays.filter((day) => !day.assente).length;
    const absentDays = validDays.filter((day) => day.assente).length;
    const justifiedDays = validDays.filter((day) => day.giustificato).length;

    const presentPercentage = ((presentDays / totalDays) * 100).toFixed(2);
    const absentPercentage = ((absentDays / totalDays) * 100).toFixed(2);
    const justifiedPercentage = ((justifiedDays / totalDays) * 100).toFixed(2);

    return {
      totalDays,
      presentDays,
      absentDays,
      justifiedDays,
      presentPercentage,
      absentPercentage,
      justifiedPercentage,
    };
  };
  const stats = calculateScheduleStatistics(el.schedule);
  return (
    <Modal
      show={show}
      onHide={() => {
        dispatch(modalStaticUserChanger(false));
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Statistiche di {el.nome}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {/* Visualizzazione delle statistiche */}
          <h5>Statistiche fino ad oggi:</h5>
          <ul>
            <li>Giorni totali: {stats.totalDays}</li>
            <li>
              Giorni di presenza: {stats.presentDays} ({stats.presentPercentage}
              %)
            </li>
            <li>
              Giorni di assenza: {stats.absentDays} ({stats.absentPercentage}%)
            </li>
            <li>
              Giorni giustificati: {stats.justifiedDays} (
              {stats.justifiedPercentage}%)
            </li>
          </ul>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ShowHistory;
