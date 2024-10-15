import { Container, FormCheck } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { handleChangeLateUser } from "../../asset/handler&method";

const LateState = ({ event, i, el }) => {
  const dispatch = useDispatch();
  return (
    <Container fluid className="m-0 p-0">
      <FormCheck
        type="switch"
        id={toString(el.id) + "-late"}
        label={event.ritardo === true ? "In Ritardo" : "In orario"}
        checked={event.ritardo}
        onChange={() => dispatch(handleChangeLateUser(i, el))}
        className="fs-6 fw-lighter"
      />
    </Container>
  );
};
export default LateState;
