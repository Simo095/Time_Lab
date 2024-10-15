import { FormCheck } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { handleChangeJustifyUser } from "../../asset/handler&method";

const JustifyState = ({ event, i, el }) => {
  const dispatch = useDispatch();
  return (
    <FormCheck
      type="switch"
      id={toString(el.id) + "-justify"}
      label={event.giustificato === true ? "Giustificato" : "Ingiustificato"}
      checked={event.giustificato}
      onChange={() => dispatch(handleChangeJustifyUser(i, el))}
      className="fs-6 fw-lighter"
    />
  );
};
export default JustifyState;
