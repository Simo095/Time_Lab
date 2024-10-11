import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import RangeTimeJustify from "./RangeTimeJustify";
import AbsenceNote from "./AbsenceNote";
import AbsenceState from "./AbsenceState";

const EventCardBody = ({ event, i, el }) => {
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
    </Container>
  );
};
export default EventCardBody;
