import { Container, FormCheck } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateUserSchedule } from "../../redux/actions/usersAction";

const AbsenceState = ({ event, i, el }) => {
  const dispatch = useDispatch();
  const handleChangeJustifyUser = (eventIndex) => {
    const updatedUser = {
      ...el,
      schedule: el.schedule.map((ev, idx) =>
        idx === eventIndex ? { ...ev, giustificato: !ev.giustificato } : ev
      ),
    };
    dispatch(updateUserSchedule(updatedUser));
  };

  return (
    <Container fluid className="m-0 p-0">
      <FormCheck
        type="switch"
        id={toString(el.id) + "-justify"}
        label={event.giustificato === false ? "Giustificato" : "Ingiustificato"}
        checked={event.giustificato}
        onChange={() => handleChangeJustifyUser(i)}
        className="fs-6 fw-lighter"
      />
    </Container>
  );
};
export default AbsenceState;
