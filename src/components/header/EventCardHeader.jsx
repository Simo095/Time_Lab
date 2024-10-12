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
  const getDayForEvent = (dateString) => {
    const [day, month, year] = dateString.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    return date.getDay();
  };
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
      {getDayForEvent(event.giorno) === 0 ||
      getDayForEvent(event.giorno) === 6 ? null : (
        <FormCheck
          type="switch"
          id={el.id}
          label={event.assente === false ? "Presente" : "Assente"}
          checked={event.assente}
          onChange={() => handleChangePresenceUser(i)}
          className="fs-6 fw-lighter m-0"
        />
      )}
    </Container>
  );
};
export default EventCardHeader;
