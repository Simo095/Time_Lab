import { FormCheck } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { handleChangePresenceUser } from "../../asset/handler&method";

const AbsenceState = ({ event, el, i }) => {
  const dispatch = useDispatch();
  return (
    <FormCheck
      type="switch"
      id={el.id}
      label={event.assente === false ? "Presente" : "Assente"}
      checked={event.assente}
      onChange={() => dispatch(handleChangePresenceUser(i, el))}
      className="fs-6 fw-lighter"
    />
  );
};
export default AbsenceState;
