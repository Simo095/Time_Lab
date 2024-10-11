import { useDispatch } from "react-redux";
import { Container, FormCheck } from "react-bootstrap";
import { updateUserSchedule } from "../../redux/actions/usersAction";

const EventCardHeader = ({ event, el, i, setSelectedDate }) => {
  const dispatch = useDispatch();
  const handleChangePresenceUser = (eventIndex) => {
    const updatedUser = {
      ...el,
      schedule: el.schedule.map((ev, idx) =>
        idx === eventIndex ? { ...ev, assente: !ev.assente } : ev
      ),
    };
    dispatch(updateUserSchedule(updatedUser));
  };
  return (
    <Container className="d-flex flex-column">
      <div
        style={{ color: "red", cursor: "pointer" }}
        className="w-100 text-end m-0 p-0"
        onClick={() => {
          setSelectedDate(null);
        }}
      >
        x
      </div>
      <span className="event-date">{event.giorno}</span>
      <FormCheck
        type="switch"
        id={el.id}
        label={event.assente === false ? "Presente" : "Assente"}
        checked={event.assente}
        onChange={() => handleChangePresenceUser(i)}
        className="fs-6 fw-lighter"
      />
    </Container>
  );
};
export default EventCardHeader;
