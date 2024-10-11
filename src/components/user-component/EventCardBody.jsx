import { Container } from "react-bootstrap";
import RangeTimeJustify from "./RangeTimeJustify";
import AbsenceNote from "./AbsenceNote";
import AbsenceState from "./AbsenceState";
import { CiTrash } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { deleteReminder } from "../../redux/actions/usersAction";

const EventCardBody = ({ event, i, el }) => {
  const dispatch = useDispatch();
  const getDayForEvent = (dateString) => {
    const [day, month, year] = dateString.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    return date.getDay();
  };

  return (
    <Container fluid className="m-0 p-0">
      {event.assente === false ? (
        <Container fluid className="m-0 p-0">
          <p
            key={i}
            style={{
              fontSize: "0.8em",
              color: "green",
            }}
          >
            Presente
          </p>
          <p>{event.orario.join(" - ")}</p>
        </Container>
      ) : getDayForEvent(event.giorno) === 0 ||
        getDayForEvent(event.giorno) === 6 ? (
        <p
          key={i}
          style={{
            fontSize: "0.8em",
            color: "black",
          }}
        >
          Chiuso
        </p>
      ) : (
        <Container fluid className="m-0 p-0">
          <p
            style={{
              fontSize: "0.8em",
              color: "red",
            }}
          >
            Assente
          </p>
        </Container>
      )}

      <Container className="d-flex flex-column justify-content-between">
        {event.assente === false ? null : (
          <Container fluid className="m-0 p-0">
            <AbsenceState event={event} el={el} i={i} />
            {event.giustificato === true ? <RangeTimeJustify /> : null}
            <AbsenceNote event={event} el={el} i={i} />
          </Container>
        )}
      </Container>
      <Container className="">
        <h6 className="fw-lighter">Promemoria per {el.nome}</h6>

        {el.reminders &&
          el.reminders.map((reminder, i) => (
            <Container
              fluid
              className="m-0 p-0 d-flex align-items-center justify-content-between"
            >
              <p> {i + 1}-</p>
              <p
                key={i}
                className="reminder m-0 p-0 fw-lighter overflow-x-scroll w-75"
              >
                {reminder}
              </p>
              <CiTrash
                className="delete-memo"
                onClick={() => {
                  dispatch(deleteReminder(el.id, reminder));
                }}
              />
            </Container>
          ))}
      </Container>
    </Container>
  );
};
export default EventCardBody;
