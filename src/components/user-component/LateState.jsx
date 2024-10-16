import { FormCheck } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { handleChangeLateUser } from "../../asset/handler&method";

const LateState = ({ event, i, el }) => {
  const dispatch = useDispatch();
  return (
    <FormCheck
      type="switch"
      id={toString(el.id) + "-late"}
      label={event.ritardo === true ? "In Ritardo" : "In orario"}
      checked={event.ritardo}
      onChange={() => dispatch(handleChangeLateUser(i, el))}
      className="fs-6 fw-lighter"
    />
  );
};
export default LateState;
