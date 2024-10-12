import { Container, FormCheck } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { handleChangeJustifyUser } from "../../asset/handler&method";

const AbsenceState = ({ event, i, el }) => {
  const dispatch = useDispatch();
  return (
    <Container fluid className="m-0 p-0">
      <FormCheck
        type="switch"
        id={toString(el.id) + "-justify"}
        label={event.giustificato === true ? "Giustificato" : "Ingiustificato"}
        checked={event.giustificato}
        onChange={() => dispatch(handleChangeJustifyUser(i, el))}
        className="fs-6 fw-lighter"
      />
    </Container>
  );
};
export default AbsenceState;
