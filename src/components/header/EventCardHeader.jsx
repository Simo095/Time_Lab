import { useDispatch } from "react-redux";
import { Container, FormCheck } from "react-bootstrap";
import {} from "../../redux/actions/usersAction";
import {
  getDayForEvent,
  handleChangePresenceUser,
} from "../../asset/handler&method";

const EventCardHeader = ({ event, el, i, setSelectedDate }) => {
  const dispatch = useDispatch();
  return (
    <Container fluid className="d-flex flex-column m-0 p-0">
      <div
        style={{ color: "red", cursor: "pointer" }}
        className="w-100 text-end m-0 p-0"
        onClick={() => {
          setSelectedDate(null);
        }}
      >
        x
      </div>
      <span className="event-date mb-1">{event.giorno}</span>
      {dispatch(getDayForEvent(event.giorno)) === 0 ||
      dispatch(getDayForEvent(event.giorno)) === 6 ? null : (
        <FormCheck
          type="switch"
          id={el.id}
          label={event.assente === false ? "Presente" : "Assente"}
          checked={event.assente}
          onChange={() => dispatch(handleChangePresenceUser(i, el))}
          className="fs-6 fw-lighter m-0"
        />
      )}
    </Container>
  );
};
export default EventCardHeader;
